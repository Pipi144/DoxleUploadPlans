"use client";

import AnimatedForm from "@/components/AnimatedComponents/AnimatedForm";
import InputField from "./_components/InputField";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { getProjectData, updateProjectData } from "../action";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import React from "react";
import { IPlanProjectDetails } from "@/Models/project";

export type TDetailState = {
  projectName?: string;
  email?: string;
  name?: string;
  errorProjectName?: string[];
  errorEmail?: string[];
  errorName?: string[];
  errorServer?: string[];
};
// Fetch the project data based on the `projectId` parameter

const DetailForm = () => {
  const [projectDetails, setProjectDetails] = useState<
    IPlanProjectDetails | undefined
  >(undefined);
  const [state, action, isPending] = useActionState<TDetailState, FormData>(
    async (data, payload) => {
      return (await updateProjectData(projectDetails, payload)) ?? data;
    },
    {}
  );
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await getProjectData();
        if (!data) {
          throw new Error("Project data not found");
        }
        setProjectDetails(data); // Set the project details in the state
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  return (
    <AnimatedForm
      className="max-w-[600px] p-[20px] w-full flex flex-col "
      action={action}
      animate={{ y: [-5, 0], opacity: [0, 1] }}
      exit={{ y: [0, -5], opacity: [1, 0] }}
    >
      <span className="text-black text-[30px] tablet:text-[40px] mb-[15px] tablet:mb-[20px] font-semibold font-lexend">
        Your details .
      </span>
      <InputField
        labelText="project name"
        fieldDesc="typically, the address of your building project site."
        id="projectName"
        name="projectName"
        required
        defaultValue={state.projectName ?? projectDetails?.projectName}
        errors={state.errorProjectName}
      />
      <InputField
        labelText="email"
        fieldDesc="we will send the measurements to the provided email address"
        id="email"
        name="email"
        required
        defaultValue={state.email ?? projectDetails?.userEmail ?? ""}
        errors={state.errorEmail}
      />
      <InputField
        labelText="name"
        fieldDesc="Enter your company name or your name"
        id="name"
        name="name"
        required
        defaultValue={state.name ?? projectDetails?.userName ?? ""}
        errors={state.errorName}
      />

      {state.errorServer && (
        <AnimatedDiv
          className="input-error text-center"
          animate={{
            x: [-5, 0],
            opacity: [0, 1],
          }}
        >
          {state.errorServer.join(", ")}
        </AnimatedDiv>
      )}
      <span
        className={
          "input-field-desc my-[20px] font-light font-lexend text-justify"
        }
      >
        Doxle requires your contact information to allow you to make corrections
        to your project drawings and download your measurements. For further
        details, including our privacy practices and our strong commitment to
        safeguarding your privacy, please refer to our Privacy Policy.
      </span>
      <Button
        type="submit"
        className="text-[14px] tablet:text-[16px] font-lexend font-medium text-white bg-black mt-[20px] max-w-[140px] py-[10px] px-[20px]  rounded-[4px] hover:rounded-[12px] self-center hover:opacity-80 cursor-pointer transition-all duration-200 ease-linear"
        disabled={isPending}
      >
        {isPending ? "Submitting ..." : "Submit"}
      </Button>
    </AnimatedForm>
  );
};

export default DetailForm;
