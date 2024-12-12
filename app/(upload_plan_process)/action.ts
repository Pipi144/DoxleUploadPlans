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

const getProjectIdCookies = async () => {
  return await getCookie(COOKIE_KEYS.ProjectId, { cookies });
};

// Fetch project details
export const getProjectData = async (): Promise<
  IPlanProjectDetails | undefined
> => {
  const projectId = await getProjectIdCookies();
  if (!projectId) {
    redirect(DoxleRoutes.UploadPlanPage);
    return;
  }

  try {
    const resp = await fetch(`${planBaseAddress}/${projectId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { tags: [`getProjectData-${projectId}`] },
    });

    if (!resp.ok) {
      console.error("Failed to fetch project data:", resp);
      return;
    }

    return await resp.json();
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
};

// Create a new project
export const createProject = async (
  project: Partial<Project>
): Promise<IPlanProjectDetails | undefined> => {
  try {
    const resp = await fetch(`${planBaseAddress}/create-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    if (!resp.ok) {
      console.error("Failed to create project:", resp);
      return;
    }

    const data = await resp.json();
    await setCookie(COOKIE_KEYS.ProjectId, data.projectId, {
      cookies,
      maxAge: 60 * 60 * 24 * 7,
    });
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

// Form validation schema
const formSchema = z.object({
  projectName: z.string().min(5, "Project name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(5, "Name must be at least 5 characters"),
  projectId: z.string().uuid("Invalid project ID"),
});

// Extract validation errors
const findErrors = (fieldName: string, errors: z.ZodIssue[]) => {
  return errors
    .filter((item) => item.path.includes(fieldName))
    .map((item) => item.message);
};

// Update project details
export const updateProjectData = async (
  projectDetails: IPlanProjectDetails | undefined,
  data: FormData
): Promise<TDetailState | undefined> => {
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
  if (!validation.success) {
    return {
      projectName,
      email,
      name,
      errorEmail: findErrors("email", validation.error.errors),
      errorName: findErrors("name", validation.error.errors),
      errorProjectName: findErrors("projectName", validation.error.errors),
      errorServer: findErrors("projectId", validation.error.errors),
    };
  }

  try {
    const resp = await fetch(`${planBaseAddress}/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectName, userEmail: email, userName: name }),
    });

    if (!resp.ok) {
      console.error("Failed to update project data:", resp);
      return {
        errorServer: ["Failed to update project data: " + resp.statusText],
      };
    }
  } catch (error) {
    console.error("Error updating project data:", error);
    return { errorServer: ["Failed to update project data: " + error] };
  }

  revalidateTag(`getProjectData-${projectId}`);

  if (projectDetails?.emailVerified) redirect(DoxleRoutes.VerifySuccessPage);
  else redirect(DoxleRoutes.ConfirmCode);
};

// Resend verification email
export const resendVerification = async (): Promise<{
  success: boolean;
  error?: string;
  data?: IPlanProjectDetails;
}> => {
  try {
    const projectId = await getProjectIdCookies();
    if (!projectId) return { success: false, error: "Project ID not found" };

    const resp = await fetch(
      `${planBaseAddress}/${projectId}/resend-verification/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 0 },
      }
    );

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Failed to resend verification email:", resp);
      return {
        success: false,
        error: data.detail?.detail ?? "Error resending verification email",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error resending verification email:", error);
    return { success: false, error: "Error resending verification email" };
  }
};

// Code validation schema
const codeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .pipe(z.number({ coerce: true }).int()),
});

// Verify code
export const verifyCode = async (
  data: FormData
): Promise<TCodeInputState | undefined> => {
  const code = Array.from(data.values()).join("");

  const validation = codeSchema.safeParse({ code });
  if (!validation.success) {
    return { errors: findErrors("code", validation.error.errors) };
  }

  try {
    const resp = await fetch(`${planBaseAddress}/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verification_code: parseInt(code) }),
    });

    const result = await resp.json();
    if (!resp.ok) {
      console.error("Failed to verify code:", result);
      return {
        errors: [result.detail?.detail ?? "Error verifying code"],
        isExpired: resp.status === 412,
      };
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return { errors: ["Error verifying code: " + error] };
  }

  redirect(DoxleRoutes.VerifySuccessPage);
};
