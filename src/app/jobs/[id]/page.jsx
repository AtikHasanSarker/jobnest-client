import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  CircleDollar,
  Tag,
} from "@gravity-ui/icons";

import { Laptop } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import Image from "next/image";
import { getJobById } from "@/lib/actions/jobs";

const JobDetailPage = async ({ params }) => {
  const { id } = await params;

  const job = await getJobById(id);

  // If job doesn't exist
  if (!job) {
    notFound();
  }

  const formatCategory = (category) => {
    if (!category) return "";

    return category.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatJobType = (type) => {
    if (!type) return "";

    return type
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = () => {
    if (!job.minSalary && !job.maxSalary) {
      return "Salary not specified";
    }

    const min = Number(job.minSalary).toLocaleString();
    const max = Number(job.maxSalary).toLocaleString();

    return `${job.currency} ${min} - ${max}/year`;
  };

  return (
    <main className="mx-auto container px-6 pt-30 pb-16">
      {/* Back Button */}
      <BackButton />

      {/* ================= Job Header ================= */}
      <section className="rounded-3xl border border-default bg-background p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Company + Job */}
          <div className="flex items-center gap-5">
            {/* Company Logo */}
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl">
              <Image
                width={100}
                height={100}
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="size-full object-contain"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                {job.companyName}
              </p>

              <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
                {job.jobTitle}
              </h1>

              <p className="mt-2 text-xs text-muted-foreground">
                {formatCategory(job.jobCategory)}
              </p>
            </div>
          </div>

          {/* Status */}
          <span className="w-fit rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            {job.status === "active" ? "Actively Hiring" : job.status}
          </span>
        </div>

        {/* ================= Job Meta ================= */}
        <div className="mt-8 grid grid-cols-1 gap-3 border-t border-default pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Job Type */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-default-100">
              <Briefcase className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Job Type</p>

              <p className="mt-0.5 text-sm font-semibold">
                {formatJobType(job.jobType)}
              </p>
            </div>
          </div>

          {/* Work Mode */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-default-100">
              <Laptop className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Work Mode</p>

              <p className="mt-0.5 text-sm font-semibold">
                {job.isRemote ? "Remote" : "On-site"}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-default-100">
              <CircleDollar className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Salary</p>

              <p className="mt-0.5 text-sm font-semibold">{formatSalary()}</p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-default-100">
              <Calendar className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Application Deadline
              </p>

              <p className="mt-0.5 text-sm font-semibold">
                {formatDate(job.deadline)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Main Content ================= */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Responsibilities */}
          <section className="rounded-2xl border border-default bg-background p-6 md:p-8">
            <h2 className="text-xl font-semibold">Responsibilities</h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {job.responsibilities}
            </p>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl border border-default bg-background p-6 md:p-8">
            <h2 className="text-xl font-semibold">Requirements</h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {job.requirements}
            </p>
          </section>

          {/* Benefits */}
          <section className="rounded-2xl border border-default bg-background p-6 md:p-8">
            <h2 className="text-xl font-semibold">Benefits</h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {job.benefits}
            </p>
          </section>

          {/* Category */}
          <section className="rounded-2xl border border-default bg-background p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Tag className="size-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">Job Category</p>

                <p className="mt-1 text-sm font-medium">
                  {formatCategory(job.jobCategory)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ================= Sidebar ================= */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-default bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Interested in this position?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Apply now and take the next step toward joining {job.companyName}.
            </p>

            {/* Apply Button */}
            <Link
              href={`/jobs/${job._id}/apply`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-purple-800 hover:scale-105"
            >
              Apply Now For This Job
              <ArrowUpRight className="size-4" />
            </Link>

            {/* Deadline */}
            <div className="mt-6 border-t border-default pt-5">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Application deadline
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(job.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default JobDetailPage;
