"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "./JobCard";

const JobListingContainer = ({ jobs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from the current URL
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") || null,
    jobType: searchParams.get("jobType") || null,
  }));

  // 1. Filter jobs only. No navigation inside useMemo.
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search
    const search = (filters.search ?? "").trim().toLowerCase();

    if (search) {
      result = result.filter((job) => {
        return (
          job.jobTitle?.toLowerCase().includes(search) ||
          job.companyName?.toLowerCase().includes(search) ||
          job.jobCategory?.toLowerCase().includes(search) ||
          job.requirements?.toLowerCase().includes(search) ||
          job.responsibilities?.toLowerCase().includes(search)
        );
      });
    }

    // Category
    if (filters.category) {
      result = result.filter((job) => job.jobCategory === filters.category);
    }

    // Job type
    if (filters.jobType) {
      result = result.filter((job) => job.jobType === filters.jobType);
    }

    return result;
  }, [jobs, filters]);

  // 2. Update URL when filters change
  const currentQuery = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search.trim()) {
      params.set("search", filters.search.trim());
    }

    if (filters.category) {
      params.set("category", filters.category);
    }

    if (filters.jobType) {
      params.set("jobType", filters.jobType);
    }

    const query = params.toString();

    // Avoid unnecessary navigation
    if (query === currentQuery) return;

    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [filters, pathname, router, currentQuery]);

  return (
    <>
      {/* Filters */}
      <JobFilters jobs={jobs} filters={filters} onFiltersChange={setFilters} />

      {/* Result Count */}
      <div className="mb-6 mt-8">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredJobs.length}
          </span>{" "}
          {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-default p-12 text-center">
          <h3 className="text-lg font-semibold">No jobs found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filter options.
          </p>
        </div>
      )}
    </>
  );
};

export default JobListingContainer;
