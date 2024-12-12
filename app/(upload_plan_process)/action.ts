// Copyright 2024 selvinkamal
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use server";

import { planBaseAddress } from "@/DoxleAPI";
import { TDetailState } from "./user_details/page";
import { z } from "zod";
import { IPlanProjectDetails, Project } from "@/Models/project";
import { redirect } from "next/navigation";
import { DoxleRoutes } from "@/DoxleRoutes";
import { revalidateTag } from "next/cache";
import { getCookie, setCookie } from "cookies-next/server";
import { COOKIE_KEYS } from "@/app/Cookies";
import { cookies } from "next/headers";
import { TCodeInputState } from "./user_details/_components/CodeInputForm";
import { NextResponse } from "next/server";

const getProjectIdCookies = async () => {
  return await getCookie(COOKIE_KEYS.ProjectId, { cookies });
};
//get project details
export const getProjectData = async (): Promise<
  IPlanProjectDetails | undefined
> => {
  const projectId = await getProjectIdCookies();
  if (!projectId) {
    redirect(DoxleRoutes.UploadPlanPage); // if project id not found redirect to upload plan page to initialize the project
    return;
  }
  try {
    const resp = await fetch(`${planBaseAddress}/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: {
        tags: [`getProjectData-${projectId}`],
      },
    });

    if (!resp.ok) {
      console.log("RESPONSE FAILED:", resp);
      return;
    }

    return resp.json();
  } catch (error) {
    console.error("ERROR getProjectData:", error);
  }
};

export const createProject = async (
  project: Partial<Project>
): Promise<IPlanProjectDetails | undefined> => {
  try {
    const resp = await fetch(`${planBaseAddress}/create-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!resp.ok) {
      console.log("RESPONSE FAILED:", resp);
      return;
    }

    const data = await resp.json();
    // set cookies to store project id
    await setCookie(COOKIE_KEYS.ProjectId, data.projectId, {
      cookies,
      maxAge: 60 * 60 * 24 * 7,
    });
    return data;
  } catch (error) {
    console.error("ERROR createProject:", error);
  }
};
// schema to check validation of form data
const formSchema = z.object({
  projectName: z.string().min(5, "Project name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(5, "Name must be at least 5 characters"),
  projectId: z.string().min(1, "Missing project id").uuid("Invalid project id"),
});
const findErrors = (fieldName: string, errors: z.ZodIssue[]) => {
  return errors
    .filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};
//update user details (project data)
export const updateProjectData = async (
  data: FormData
): Promise<TDetailState | undefined> => {
  // extract data from form data
  const projectName = data.get("projectName")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const name = data.get("name")?.toString() ?? "";
  const projectId = (await getProjectIdCookies()) ?? "";
  const validation = formSchema.safeParse({
    projectName,
    email,
    name,
    projectId,
  });
  if (!validation.success)
    return {
      projectName,
      email,
      name,

      errorEmail: findErrors("email", validation.error.errors),
      errorName: findErrors("name", validation.error.errors),
      errorProjectName: findErrors("projectName", validation.error.errors),
      errorServer: findErrors("projectId", validation.error.errors),
    };
  try {
    // using validation schema to validate form data

    const body = JSON.stringify({
      projectName,
      userEmail: email,
      userName: name,
    });

    // Perform the PATCH request
    const resp = await fetch(`${planBaseAddress}/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Specify the JSON content type
      },
      body, // Attach the body as JSON
    });

    if (!resp.ok) {
      console.log("RESPONSE FAILED:", resp);
      return {
        errorServer: ["Failed to update project data: " + resp.statusText],
      };
    }
  } catch (error) {
    console.log("ERROR updateProjectData:", error);
    return { errorServer: ["Failed to update project data: " + error] };
  }

  // revalidate tag to update project detail api call
  revalidateTag(`getProjectData-${projectId}`);
  // redirect to confirm code page
  redirect(DoxleRoutes.ConfirmCode);
};

// Resend verification email
export const resendVerification = async (): Promise<{
  success: boolean;
  error?: string;
  data?: IPlanProjectDetails;
}> => {
  try {
    const projectId = await getProjectIdCookies();
    if (!projectId)
      return {
        success: false,
        error: "Project id not found",
      };
    const resp = await fetch(
      `${planBaseAddress}/${projectId}/resend-verification/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await resp.json();
    if (!resp.ok) {
      console.log("RESPONSE resendVerification failed:", resp);
      return {
        success: false,
        error: data.detail.detail ?? "Failed to resend verification email",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("ERROR resendVerification:", error);
    return {
      success: false,
      error: "Failed to resend verification email",
    };
  }
};

const codeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .pipe(z.number({ coerce: true }).int("Invalid code")),
});

export const verifyCode = async (
  data: FormData
): Promise<TCodeInputState | undefined> => {
  let code = "";
  // get code from input form data
  for (let [key, value] of data.entries()) {
    code += value;
  }

  //validate code
  const validation = codeSchema.safeParse({
    code,
  });
  if (!validation.success)
    return { errors: findErrors("code", validation.error.errors) };
  try {
    const param = JSON.stringify({
      verification_code: parseInt(code),
    });
    const result = await fetch(`${planBaseAddress}/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: param,
    });
    const resp = await result.json();
    if (!result.ok) {
      console.log("STATUS:", result.status);
      console.log("RESPONSE verifyCode failed:", resp);
      return {
        errors: [resp.detail?.detail ?? "Failed to verify code"],
        isExpired: result.status === 412,
      };
    }
  } catch (error) {
    return { errors: ["Failed to verify code: " + error] };
  }

  redirect(DoxleRoutes.VerifySuccessPage);
};
