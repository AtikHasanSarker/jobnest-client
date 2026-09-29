"use client";

import React from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
} from "@heroui/react";
import {
  FileText,
  Link as LinkIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const ApplyForm = ({ job, applicant }) => {
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const applicationData = {
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      companyName: job?.companyName,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      resumeUrl: formData.get("resumeUrl"),
      portfolioUrl: formData.get("portfolioUrl"),
      linkedinUrl: formData.get("linkedinUrl"),
      coverLetter: formData.get("coverLetter"),
      status: "applied",
    };

    const res = await submitApplication(applicationData);
    if (res.insertedId) {
      toast.success("Application Submitted Successfully!");
      redirect(`/jobs`);
    } else {
      toast.error("Application Failed!");
    }
  };

  return (
    <div className="mx-auto w-full min-h-screen p-10 rounded-3xl max-w-3xl bg-gray-800">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-purple-600">
          Job Application
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Apply for {job?.jobTitle}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Submit your resume and a few optional details to complete your
          application.
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="space-y-6"
        validationBehavior="native"
      >
        {/* Resume URL */}
        <TextField name="resumeUrl" type="url" isRequired className="w-full">
          <Label className="flex items-center gap-2">
            <FileText className="size-4" />
            Resume URL
          </Label>

          <Input
            placeholder="https://drive.google.com/your-resume"
            className="h-11"
          />

          <Description>
            Add a publicly accessible link to your resume.
          </Description>

          <FieldError />
        </TextField>

        {/* Portfolio URL */}
        <TextField name="portfolioUrl" type="url" className="w-full">
          <Label className="flex items-center gap-2">
            <LinkIcon className="size-4" />
            Portfolio URL
            <span className="text-xs font-normal text-muted-foreground">
              (Optional)
            </span>
          </Label>

          <Input placeholder="https://yourportfolio.com" className="h-11" />

          <Description>
            Share your portfolio, GitHub, or personal website.
          </Description>

          <FieldError />
        </TextField>

        {/* LinkedIn */}
        <TextField name="linkedinUrl" type="url" className="w-full">
          <Label className="flex items-center gap-2">
            <FaLinkedin className="size-4" />
            LinkedIn URL
            <span className="text-xs font-normal text-muted-foreground">
              (Optional)
            </span>
          </Label>

          <Input
            placeholder="https://linkedin.com/in/your-profile"
            className="h-11"
          />

          <FieldError />
        </TextField>

        {/* Cover Letter */}
        <TextField name="coverLetter" className="w-full">
          <Label className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            Cover Letter
            <span className="text-xs font-normal text-muted-foreground">
              (Optional)
            </span>
          </Label>

          <TextArea
            placeholder="Tell the employer briefly why you're a good fit for this position..."
            className="min-h-36 resize-y"
          />

          <FieldError />
        </TextField>

        {/* Buttons */}
        <div className="flex w-full items-center justify-end gap-3 pt-2">
          <Button type="reset" variant="flat">
            Clear
          </Button>

          <Button type="submit" color="primary" className="px-6">
            <Send className="size-4" />
            Submit Application
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplyForm;
