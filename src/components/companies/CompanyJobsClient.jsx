"use client";

import { useMemo, useState } from "react";
import { Input, Button } from "@heroui/react";
import {
  Search,
  BriefcaseBusiness,
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
} from "lucide-react";

import JobCard from "@/components/jobs/JobCard";

const CompanyJobsClient = ({ jobs = [] }) => {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const company = jobs[0]?.company || jobs[0]?.companyId || null;

  const companyName =
    typeof company === "string"
      ? "Company"
      : company?.name || company?.companyName || "Company";

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((job) =>
        [
          job?.title,
          job?.jobTitle,
          job?.description,
          job?.location,
          job?.jobType,
          job?.employmentType,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (jobType !== "all") {
      result = result.filter(
        (job) =>
          (job?.jobType || job?.employmentType || "").toLowerCase() === jobType,
      );
    }

    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime(),
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a?.createdAt || 0).getTime() -
          new Date(b?.createdAt || 0).getTime(),
      );
    }

    return result;
  }, [jobs, search, jobType, sortBy]);

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-zinc-500">
          <span>Companies</span>
          <span>/</span>
          <span className="text-zinc-300">{companyName}</span>
        </div>

        {/* Company Header */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111111]">
                <Building2 className="size-7 text-violet-400" />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
                  Company Careers
                </p>

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {companyName} Jobs
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                  Explore available opportunities and find a role that matches
                  your skills and career goals.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-5 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10">
                <BriefcaseBusiness className="size-5 text-violet-400" />
              </div>

              <div>
                <p className="text-2xl font-semibold">{jobs.length}</p>
                <p className="text-xs text-zinc-400">Available Jobs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Open Positions</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Find your next opportunity at {companyName}.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1a1a1a] p-3 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#111111] px-3">
              <Search className="size-4 shrink-0 text-zinc-500" />

              <Input
                aria-label="Search jobs"
                placeholder="Search job title, location, or keywords..."
                value={search}
                onChange={(value) =>
                  setSearch(
                    typeof value === "string" ? value : value.target.value,
                  )
                }
                className="min-w-0 flex-1"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111111] px-3">
                <SlidersHorizontal className="size-4 text-zinc-500" />

                <select
                  aria-label="Filter by employment type"
                  value={jobType}
                  onChange={(event) => setJobType(event.target.value)}
                  className="h-11 min-w-36 bg-transparent text-sm text-zinc-300 outline-none"
                >
                  <option value="all" className="bg-[#1a1a1a]">
                    All Job Types
                  </option>
                  <option value="full-time" className="bg-[#1a1a1a]">
                    Full-time
                  </option>
                  <option value="part-time" className="bg-[#1a1a1a]">
                    Part-time
                  </option>
                  <option value="contract" className="bg-[#1a1a1a]">
                    Contract
                  </option>
                  <option value="internship" className="bg-[#1a1a1a]">
                    Internship
                  </option>
                  <option value="remote" className="bg-[#1a1a1a]">
                    Remote
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111111] px-3">
                <ArrowUpDown className="size-4 text-zinc-500" />

                <select
                  aria-label="Sort jobs"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-11 min-w-32 bg-transparent text-sm text-zinc-300 outline-none"
                >
                  <option value="latest" className="bg-[#1a1a1a]">
                    Newest First
                  </option>
                  <option value="oldest" className="bg-[#1a1a1a]">
                    Oldest First
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-5 mt-6 flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-400">
              Showing{" "}
              <span className="font-medium text-white">
                {filteredJobs.length}
              </span>{" "}
              of {jobs.length} jobs
            </p>

            {(search || jobType !== "all" || sortBy !== "latest") && (
              <Button
                variant="ghost"
                className="text-sm text-zinc-300"
                onPress={() => {
                  setSearch("");
                  setJobType("all");
                  setSortBy("latest");
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>

          {/* Job Cards */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredJobs.map((job, index) => (
                <JobCard key={job?._id || job?.id || index} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#171717] px-5 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/5">
                <BriefcaseBusiness className="size-5 text-zinc-400" />
              </div>

              <h3 className="text-lg font-medium">No jobs found</h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                No positions match your current search or filters. Try changing
                your keywords or selecting a different job type.
              </p>

              <Button
                className="mt-5 bg-white text-black"
                onPress={() => {
                  setSearch("");
                  setJobType("all");
                  setSortBy("latest");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CompanyJobsClient;
