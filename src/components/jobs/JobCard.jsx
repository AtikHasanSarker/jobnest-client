import { CircleDollar, } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { ArrowUpRight, Briefcase, Calendar, Clock, Laptop, MapPin } from "lucide-react";
import Link from "next/link";

export default function JobCard({ job }) {
  const formatSalary = () => {
    if (!job.minSalary && !job.maxSalary) return null;

    const min = Number(job.minSalary).toLocaleString();
    const max = Number(job.maxSalary).toLocaleString();

    return `${job.currency} ${min} – ${max}`;
  };

  const formatDeadline = () => {
    if (!job.deadline) return null;

    return new Date(job.deadline).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className="w-full max-w-2xl rounded-2xl border border-default bg-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-mist-900"
    >
      {/* Header */}
      <Card.Header className="flex items-start justify-between gap-4 p-2 pb-2">
        <div className="flex min-w-0 items-start gap-4">
          {/* Company Logo */}
          <div
            className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg"
          >
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              className="size-full object-contain"
            />
          </div>

          {/* Job Info */}
          <div className="">
            <Card.Title className="text-ellipsis text-xl font-semibold">
              {job.jobTitle}
            </Card.Title>

            <Card.Description className="mt-1 text-sm">
              {job.companyName}
            </Card.Description>
          </div>
        </div>

        {/* Job Category */}
        <span className="shrink-0 rounded-full bg-primary/10 px-3 text-xs font-medium text-primary capitalize text-muted">
          {job.jobCategory}
        </span>
      </Card.Header>

      {/* Content */}
      <Card.Content className="px-2 pb-3">
        <div className="flex flex-wrap gap-x-2 gap-y-3 text-sm text-muted-foreground">
          {/* Job Type */}
          <div className="flex items-center py-1 px-3 rounded-3xl bg-cyan-950 gap-2">
            <Briefcase className="size-4" color="violet" />
            <span className="capitalize">{job.jobType}</span>
          </div>

          {/* Remote */}
          {job.isRemote && (
            <div className="flex items-center py-1 px-3 rounded-3xl bg-cyan-950 gap-2">
              <Laptop className="size-4" color="violet" />
              <span>Remote</span>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center py-1 px-3 rounded-3xl bg-cyan-950 gap-2">
            <MapPin className="size-4" color="violet" />
            <span>USA</span>
          </div>
        </div>

        {/* Salary + Deadline */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Salary */}
          <div
            className="rounded-xl border border-default bg-default-50 p-4"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CircleDollar className="size-4" />
              <span>Salary</span>
            </div>

            <p className="mt-1 text-sm font-semibold">
              {formatSalary()}
              <span className="ml-1 font-normal text-muted-foreground">
                / year
              </span>
            </p>
          </div>

          {/* Deadline */}
          <div
            className="rounded-xl border border-default bg-default-50 p-4"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-4" />
              <span>Application Deadline</span>
            </div>

            <p className="mt-1 text-sm font-semibold">{formatDeadline()}</p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {job.responsibilities}
        </p>
      </Card.Content>

      {/* Footer */}
      <Card.Footer
        className="flex items-center justify-between gap-4 border-t border-default px-4 py-2"
      >
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-2  px-5 py-2 font-semibold text-primary-foreground transition hover:text-purple-600"
        >
          Apply Now
          <ArrowUpRight className="size-4" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
