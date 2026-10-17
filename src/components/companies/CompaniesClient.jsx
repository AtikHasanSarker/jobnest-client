"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";

import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Globe,
  MapPin,
  Building2,
} from "lucide-react";
import Image from "next/image";


const ITEMS_PER_PAGE = 6;

const getCompanyName = (company) =>
  company?.name || company?.companyName || "Unnamed Company";

const getCompanyId = (company) =>
  company?._id?.toString?.() || company?.id || "";

const getCompanyDescription = (company) =>
  company?.description ||
  company?.about ||
  "Explore this company and discover exciting career opportunities.";

const getCompanyIndustry = (company) =>
  company?.industry || company?.category || "Technology";

const getCompanyLocation = (company) =>
  company?.location ||
  company?.city ||
  company?.address ||
  "Location not specified";

const getJobCount = (company) => {
  if (typeof company?.jobCount === "number") return company.jobCount;
  if (typeof company?.activeJobs === "number") return company.activeJobs;
  if (Array.isArray(company?.jobs)) return company.jobs.length;
  return 0;
};

const isVerified = (company) =>
  company?.verified === true ||
  company?.isVerified === true ||
  company?.status === "approved";

const getLogo = (company) =>
  company?.logo || company?.logoUrl || company?.image || "";

const CompaniesClient = ({ companies = [] }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return companies;

    return companies.filter((company) => {
      const searchableText = [
        getCompanyName(company),
        getCompanyDescription(company),
        getCompanyIndustry(company),
        getCompanyLocation(company),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [companies, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCompanies = filteredCompanies.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen mt-30">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        {/* Page Header */}
        <div className="mb-9">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse Companies
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
            Discover leading organizations and explore your next career
            opportunity. Search companies by name, industry, or location.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1a1a1a] p-3 sm:flex-row sm:items-center">
          <Input
            aria-label="Search companies"
            placeholder="Search by name, industry, or location..."
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            startContent={
              <Search className="size-4 shrink-0 text-zinc-400" />
            }
            className="min-w-0 flex-1"
            classNames={{
              inputWrapper:
                "min-h-11 border-0 bg-transparent shadow-none data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
              input: "text-sm text-white placeholder:text-zinc-500",
            }}
          />

          <Button
            onPress={() => setCurrentPage(1)}
            className="h-11 shrink-0 rounded-lg bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Find Companies
          </Button>
        </div>

        {/* Results summary */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            {filteredCompanies.length}{" "}
            {filteredCompanies.length === 1 ? "company" : "companies"} found
          </p>
        </div>

        {/* Company Grid */}
        {paginatedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCompanies.map((company, index) => {
              const id = getCompanyId(company);
              const name = getCompanyName(company);
              const logo = getLogo(company);
              const jobCount = getJobCount(company);
              const verified = isVerified(company);

              return (
                <Card
                  key={id || `${name}-${index}`}
                  className="group flex min-w-0 flex-col rounded-xl border border-white/[0.07] bg-[#1e1e1e] p-5 shadow-none transition-colors hover:border-white/20"
                >
                  {/* Logo + Verification */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                      {logo ? (
                        <Image
                        width={56}
                        height={56}
                          src={logo}
                          alt={`${name} logo`}
                          className="size-full object-contain p-1.5"
                        />
                      ) : (
                        <Building2 className="size-5 text-zinc-400" />
                      )}
                    </div>

                    {verified && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-1 text-[9px] font-semibold tracking-wide text-emerald-400">
                        <Check className="size-3" />
                        VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Company Info */}
                  <h2 className="truncate text-lg font-medium text-zinc-100">
                    {name}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-zinc-400">
                    {getCompanyDescription(company)}
                  </p>

                  {/* Industry + Location */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-zinc-300">
                      <Globe className="size-3 shrink-0" />
                      <span className="truncate">
                        {getCompanyIndustry(company)}
                      </span>
                    </span>

                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-zinc-300">
                      <MapPin className="size-3 shrink-0" />
                      <span className="truncate">
                        {getCompanyLocation(company)}
                      </span>
                    </span>
                  </div>

                  <div className="my-5 border-t border-white/10" />

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-xs text-zinc-300">
                      <span className="font-medium text-white">{jobCount}</span>{" "}
                      Active {jobCount === 1 ? "Job" : "Jobs"}
                    </p>

                    <Link
                      href={id ? `/companies/${id}` : "/companies"}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-white transition-colors hover:text-violet-300"
                    >
                      View Openings
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-5 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/5">
              <Search className="size-5 text-zinc-400" />
            </div>

            <h2 className="text-lg font-medium">No companies found</h2>

            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Try a different company name, industry, or location.
            </p>

            {search && (
              <Button
                variant="outline"
                className="mt-5 border-white/15 text-white"
                onPress={() => handleSearch("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredCompanies.length > ITEMS_PER_PAGE && (
          <nav
            aria-label="Company pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <Button
              isIconOnly
              aria-label="Previous page"
              variant="outline"
              isDisabled={safePage === 1}
              onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="size-10 min-w-10 border-white/10 bg-[#1e1e1e] text-zinc-300"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safePage) <= 1,
              )
              .map((page, index, pages) => (
                <span key={page} className="contents">
                  {index > 0 && page - pages[index - 1] > 1 && (
                    <span className="px-1 text-sm text-zinc-500">...</span>
                  )}

                  <Button
                    aria-label={`Page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                    onPress={() => setCurrentPage(page)}
                    className={`size-10 min-w-10 rounded-lg text-sm ${
                      safePage === page
                        ? "bg-white text-black"
                        : "border border-white/10 bg-[#1e1e1e] text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </Button>
                </span>
              ))}

            <Button
              isIconOnly
              aria-label="Next page"
              variant="outline"
              isDisabled={safePage === totalPages}
              onPress={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="size-10 min-w-10 border-white/10 bg-[#1e1e1e] text-zinc-300"
            >
              <ChevronRight className="size-4" />
            </Button>
          </nav>
        )}
      </section>
    </main>
  );
};

export default CompaniesClient;
