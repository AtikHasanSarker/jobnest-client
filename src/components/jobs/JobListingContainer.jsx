"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "./JobCard";
import { Pagination } from "@heroui/react";

const JobListingContainer = ({  jobs, total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from the current URL
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") || null,
    jobType: searchParams.get("jobType") || null,
  }));

    const [page, setPage] = useState( searchParams.get("page") || 1);
    const totalItems = total;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers =  () => {
      const pages = [];
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (page > 3) {
          pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        if (page < totalPages - 2) {
          pages.push("ellipsis");
        }
        pages.push(totalPages);
      }
      return pages;
    };

      const startItem = (page - 1) * itemsPerPage + 1;
      const endItem = Math.min(page * itemsPerPage, totalItems);


  // 2. Update URL when filters change
  const currentQuery = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search.trim()) {
      params.set("search", filters.search.trim());
    }

    if (filters.category) {
      params.set("jobCategory", filters.category);
    }

    if (filters.jobType) {
      params.set("jobType", filters.jobType);
    }
    if(page){
      params.set("page", page);
    }

    const query = params.toString();

    // Avoid unnecessary navigation
    if (query === currentQuery) return;

    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [filters, pathname, router, currentQuery, page]);

  return (
    <>
      {/* Filters */}
      <JobFilters
        jobs={jobs}
        filters={filters}
        onFiltersChange={(nextFilters) => {
          setFilters(nextFilters);
          setPage(1);
        }}
      />

      {/* Result Count */}
      <div className="mb-6 mt-8">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{jobs?.length}</span>{" "}
          {jobs?.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Job Cards */}
      {jobs?.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          <Pagination>
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
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
