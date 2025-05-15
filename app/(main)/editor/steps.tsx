import React from "react";
import GeneralInfoForm from "./forms/general-info-form";
import PersonalInfoForm from "./forms/personal-info-form";

export const steps: {
  title: string;
  component: React.ComponentType;
  key: string;
}[] = [
  {
    title: "General Info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal Info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
];
