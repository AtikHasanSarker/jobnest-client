"use client";

import { useState, useTransition } from "react";
import { Table } from "@heroui/react";

import { updateCompany } from "@/lib/actions/companies";

import { Plus, Check, CircleXmark, Ban } from "@gravity-ui/icons";

const CompanyRegistrations = ({ companies = [] }) => {
  const [companyList, setCompanyList] = useState(
    Array.isArray(companies) ? companies : [],
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [isPending, startTransition] = useTransition();

  const pendingCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "pending",
  ).length;

  const approvedCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "approved",
  ).length;

  const rejectedCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "rejected",
  ).length;

  const handleStatusChange = (companyId, status) => {
    if (!companyId || updatingId) return;

    setError("");
    setSuccess("");
    setUpdatingId(String(companyId));

    startTransition(async () => {
      try {
        const result = await updateCompany(companyId, { status });

        if (result?.success === false || result?.error) {
          setError(
            result?.message ||
              result?.error ||
              "Unable to update company status.",
          );
          return;
        }

        setCompanyList((current) =>
          current.map((company) =>
            String(company._id) === String(companyId)
              ? { ...company, status }
              : company,
          ),
        );

        setSuccess(`Company status updated to ${formatText(status)}.`);
      } catch (err) {
        console.error("Company status update failed:", err);
        setError("Something went wrong while updating the company.");
      } finally {
        setUpdatingId(null);
      }
    });
  };

  const handleApproved = (companyId) => {
    handleStatusChange(companyId, "approved");
  };

  const handleRejected = (companyId) => {
    handleStatusChange(companyId, "rejected");
  };

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <div className="p-4 sm:p-6 lg:p-7">
        {/* Page Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-indigo-400">
              Administration
            </p>

            <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              Company Registrations
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
              Review and manage corporate entity access requests for the JobNest
              ecosystem.
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-fit items-center gap-2 rounded-lg bg-white px-4 text-xs font-medium text-black transition hover:bg-gray-200"
          >
            <Plus className="size-3.5" />
            Register New
          </button>
        </header>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-xs text-red-400"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-xs text-emerald-400"
          >
            {success}
          </div>
        )}

        {/* Company Table */}
        <section className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#191919]">
          <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-medium text-white">
                All Company Registrations
              </h2>

              <p className="mt-1 text-[10px] text-gray-500">
                Review company details and manage approval status.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-400">
              {companyList.length} companies
            </span>
          </div>

          {companyList.length > 0 ? (
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Company registrations"
                  className="w-full min-w-[1050px]"
                >
                  <Table.Header>
                    <Table.Column isRowHeader>Company Name</Table.Column>

                    <Table.Column>Recruiter Email</Table.Column>

                    <Table.Column>Industry</Table.Column>

                    <Table.Column>Job Count</Table.Column>

                    <Table.Column>Status</Table.Column>

                    <Table.Column>Date Submitted</Table.Column>

                    <Table.Column>Actions</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {companyList.map((company) => {
                      const companyId = String(company._id);
                      const status = (
                        company.status || "pending"
                      ).toLowerCase();

                      const isUpdating = isPending && updatingId === companyId;

                      return (
                        <Table.Row key={companyId}>
                          {/* Company */}
                          <Table.Cell>
                            <div className="flex items-center gap-3">
                              <CompanyAvatar
                                name={company.name || "Unknown Company"}
                              />

                              <span className="whitespace-nowrap text-xs font-medium text-gray-200">
                                {company.name || "Unknown Company"}
                              </span>
                            </div>
                          </Table.Cell>

                          {/* Recruiter Email */}
                          <Table.Cell>
                            <span className="text-xs text-gray-400">
                              {company.recruiterEmail ||
                                `${company.name.toLowerCase()}@${company.name.toLowerCase().replace(/\s+/g, "")}.com`}
                            </span>
                          </Table.Cell>

                          {/* Industry */}
                          <Table.Cell>
                            <span className="inline-flex max-w-44 truncate rounded-full bg-[#242424] px-2.5 py-1 text-[10px] text-gray-400">
                              {company.industry || "—"}
                            </span>
                          </Table.Cell>

                          {/* Job Count */}
                          <Table.Cell>
                            <span className="text-xs text-gray-300">
                              {company.jobCount ?? 0}
                            </span>
                          </Table.Cell>

                          {/* Status */}
                          <Table.Cell>
                            <StatusBadge status={status} />
                          </Table.Cell>

                          {/* Date */}
                          <Table.Cell>
                            <span className="whitespace-nowrap text-[11px] text-gray-400">
                              {formatDate(
                                company.dateSubmitted || company.createdAt,
                              )}
                            </span>
                          </Table.Cell>

                          {/* Actions */}
                          <Table.Cell>
                            <div className="flex items-center gap-2">
                              {status !== "approved" && (
                                <button
                                  type="button"
                                  disabled={isUpdating || isPending}
                                  onClick={() => handleApproved(companyId)}
                                  className="cursor-pointer rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isUpdating ? "Saving..." : "Approve"}
                                </button>
                              )}

                              {status !== "rejected" && (
                                <button
                                  type="button"
                                  disabled={isUpdating || isPending}
                                  onClick={() => handleRejected(companyId)}
                                  className="cursor-pointer rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 text-[10px] text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isUpdating ? "Saving..." : "Reject"}
                                </button>
                              )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          ) : (
            <EmptyState />
          )}

          <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 sm:px-5">
            <p className="text-[10px] text-gray-500">
              {companyList.length > 0
                ? `Showing ${companyList.length} companies`
                : "No companies"}
            </p>

            <p className="text-[10px] text-gray-600">JobNest Admin Console</p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            icon={<Check className="size-4" />}
            label="PENDING REVIEW"
            value={pendingCount}
            description="Awaiting review"
            iconClass="text-amber-400"
            accentClass="bg-amber-500/10"
          />

          <StatCard
            icon={<Check className="size-4" />}
            label="APPROVED PARTNERS"
            value={approvedCount}
            description="Approved companies"
            iconClass="text-emerald-400"
            accentClass="bg-emerald-500/10"
          />

          <StatCard
            icon={<Ban className="size-4" />}
            label="TOTAL REJECTIONS"
            value={rejectedCount}
            description="Rejected companies"
            iconClass="text-red-400"
            accentClass="bg-red-500/10"
          />
        </section>
      </div>
    </main>
  );
};

/* ==========================================
   COMPANY AVATAR
========================================== */

const CompanyAvatar = ({ name }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#292929] text-[10px] font-medium text-gray-300">
      {initials || "CO"}
    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status }) => {
  const config = {
    pending: {
      dot: "bg-amber-400",
      text: "text-amber-400",
      label: "Pending",
    },
    approved: {
      dot: "bg-emerald-400",
      text: "text-emerald-400",
      label: "Approved",
    },
    rejected: {
      dot: "bg-red-400",
      text: "text-red-400",
      label: "Rejected",
    },
  };

  const current = config[status] || config.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] ${current.text}`}
    >
      <span className={`size-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
};

/* ==========================================
   STAT CARD
========================================== */

const StatCard = ({
  icon,
  label,
  value,
  description,
  iconClass,
  accentClass,
}) => (
  <div className="rounded-xl border border-white/[0.07] bg-[#191919] p-4 sm:p-5">
    <div className="flex items-start justify-between">
      <div
        className={`flex size-9 items-center justify-center rounded-lg ${accentClass} ${iconClass}`}
      >
        {icon}
      </div>

      <span className="text-[10px] text-gray-500">Live count</span>
    </div>

    <p className="mt-5 text-[10px] font-medium tracking-wide text-gray-500">
      {label}
    </p>

    <p className="mt-1 text-2xl font-semibold text-gray-100">
      {value.toLocaleString()}
    </p>

    <p className="mt-2 text-[10px] text-gray-500">{description}</p>
  </div>
);

/* ==========================================
   EMPTY STATE
========================================== */

const EmptyState = () => (
  <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
    <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
      <CircleXmark className="size-5 text-gray-500" />
    </div>

    <h3 className="mt-4 text-sm font-medium text-gray-300">
      No company registrations found
    </h3>

    <p className="mt-1 text-xs text-gray-500">
      Company registrations will appear here when available.
    </p>
  </div>
);

/* ==========================================
   HELPERS
========================================== */

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatText = (value) =>
  value.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default CompanyRegistrations;
