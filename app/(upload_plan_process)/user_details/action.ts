"use server";

import { planBaseAddress } from "@/DoxleAPI";
import { TDetailState } from "./page";
import { z } from "zod";
import { IPlanProjectDetails } from "@/Models/project";
import { redirect } from "next/navigation";
import { DoxleRoutes } from "@/DoxleRoutes";

//get project details
export const getProjectData = async (
  projectId: string
): Promise<IPlanProjectDetails | undefined> => {
  try {
    const resp = await fetch(`${planBaseAddress}/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      next: {
        revalidate: 0,
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

const formSchema = z.object({
  projectName: z.string().min(5, "Project name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(5, "Name must be at least 5 characters"),
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
  const projectId = data.get("projectId")?.toString();
  try {
    // using validation schema to validate form data
    const validation = formSchema.safeParse({ projectName, email, name });
    if (!validation.success)
      return {
        projectName,
        email,
        name,
        errorEmail: findErrors("email", validation.error.errors),
        errorName: findErrors("name", validation.error.errors),
        errorProjectName: findErrors("projectName", validation.error.errors),
      };

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
    return { errorServer: ["Failed to update project data: " + error] };
  }
  // redirect to success page
  redirect(
    DoxleRoutes.SuccessPage + "?email=" + email + "&projectId=" + projectId
  );
};

// Resend verification email
export const resendVerification = async (projectId: string): Promise<void> => {
  try {
    const resp = await fetch(
      `${planBaseAddress}/${projectId}/resend-verification`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        next: {
          revalidate: 0,
        },
      }
    );

    if (!resp.ok) {
      console.log("RESPONSE resendVerification failed:", resp);
      return;
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("ERROR resendVerification:", error);
  }
};
