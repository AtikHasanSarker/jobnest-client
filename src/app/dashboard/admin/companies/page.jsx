"use client";

import {
  Magnifier,
  Sliders,
  Plus,
  Check,
  CircleXmark,
  Ban,
} from "@gravity-ui/icons";

const CompanyRegistrations = ({ companies = [] }) => {
  // Demo fallback data
  const demoCompanies = [
    {
      _id: "1",
      companyName: "Nexus Labs",
      recruiterEmail: "sarah.j@nexuslabs.io",
      industry: "Quantum Computing",
      status: "Pending",
      dateSubmitted: "Oct 12, 2023",
    },
    {
      _id: "2",
      companyName: "Aether Ventures",
      recruiterEmail: "hiring@aetherv.co",
      industry: "Venture Capital",
      status: "Approved",
      dateSubmitted: "Oct 10, 2023",
    },
    {
      _id: "3",
      companyName: "Flux Tech",
      recruiterEmail: "admin@fluxtech.net",
      industry: "E-commerce",
      status: "Rejected",
      dateSubmitted: "Oct 09, 2023",
    },
    {
      _id: "4",
      companyName: "Orbital Systems",
      recruiterEmail: "ops@orbital.space",
      industry: "Aerospace",
      status: "Pending",
      dateSubmitted: "Oct 14, 2023",
    },
    {
      _id: "5",
      companyName: "Solaris Robotics",
      recruiterEmail: "hr@solaris-robotics.com",
      industry: "Robotics",
      status: "Approved",
      dateSubmitted: "Oct 05, 2023",
    },
  ];

  const data = companies.length > 0 ? companies : demoCompanies;

  // -----------------------------------------
  // Statistics
  // -----------------------------------------

  const pendingCount = data.filter(
    (company) => company.status?.toLowerCase() === "pending",
  ).length;

  const approvedCount = data.filter(
    (company) => company.status?.toLowerCase() === "approved",
  ).length;

  const rejectedCount = data.filter(
    (company) => company.status?.toLowerCase() === "rejected",
  ).length;

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* =====================================
          TOP SEARCH BAR
      ===================================== */}

      <div className="flex h-11 items-center border-b border-white/[0.06] bg-[#121212] px-5">
        <div className="flex h-full w-full max-w-[760px] items-center">
          <Magnifier className="mr-2 size-3 text-gray-500" />

          <input
            type="text"
            placeholder="Search companies, recruiters, or industries..."
            className="h-full w-full bg-transparent text-[10px] text-gray-300 outline-none placeholder:text-gray-600"
          />
        </div>

        <div className="ml-auto flex items-center gap-5">
          {/* Notification */}

          <button
            type="button"
            className="relative text-gray-500 transition hover:text-white"
          >
            <span className="absolute -right-0.5 -top-0.5 size-1 rounded-full bg-red-500" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-3.5"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </button>

          {/* Help */}

          <button
            type="button"
            className="text-gray-500 transition hover:text-white"
          >
            <span className="flex size-3.5 items-center justify-center rounded-full border border-gray-500 text-[8px]">
              ?
            </span>
          </button>

          {/* Avatar */}

          <div className="flex size-5 items-center justify-center rounded-full border border-white/10 bg-[#272727] text-[7px] text-gray-400">
            A
          </div>
        </div>
      </div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="p-7">
        {/* Page Header */}

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-lg font-medium tracking-tight">
              Company Registrations
            </h1>

            <p className="mt-2 text-[9px] text-gray-500">
              Review and manage corporate entity access requests for the JobNest
              ecosystem.
            </p>
          </div>

          {/* Header Actions */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-7 items-center gap-2 rounded-md bg-[#252525] px-4 text-[9px] text-gray-300 transition hover:bg-[#303030]"
            >
              <Sliders className="size-3" />
              Filter
            </button>

            <button
              type="button"
              className="flex h-7 items-center gap-2 rounded-md bg-white px-4 text-[9px] font-medium text-black transition hover:bg-gray-200"
            >
              <Plus className="size-3" />
              Register New
            </button>
          </div>
        </div>

        {/* =====================================
            TABLE
        ===================================== */}

        <div className="mt-10 overflow-hidden rounded-lg border border-white/[0.07] bg-[#191919]">
          {/* Table Header */}

          <div className="grid grid-cols-[1.4fr_1.45fr_1.1fr_0.9fr_1fr_1.1fr] items-center border-b border-white/[0.07] bg-[#222222] px-4 py-3 text-[8px] text-gray-400">
            <div>Company Name</div>

            <div>Recruiter Email</div>

            <div>Industry</div>

            <div>Status</div>

            <div>Date Submitted</div>

            <div className="text-right">Actions</div>
          </div>

          {/* Table Body */}

          {data.length > 0 ? (
            data.map((company) => (
              <CompanyRow key={company._id} company={company} />
            ))
          ) : (
            <EmptyState />
          )}

          {/* =====================================
              TABLE FOOTER
          ===================================== */}

          <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3">
            <p className="text-[8px] text-gray-500">
              Showing 1-{Math.min(data.length, 5)} of {data.length} companies
            </p>

            {/* Pagination UI only */}

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex size-6 items-center justify-center rounded text-gray-500 hover:bg-white/5"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex size-6 items-center justify-center rounded bg-white text-[8px] font-medium text-black"
              >
                1
              </button>

              <button
                type="button"
                className="flex size-6 items-center justify-center rounded bg-[#252525] text-[8px] text-gray-400 hover:bg-[#303030]"
              >
                2
              </button>

              <button
                type="button"
                className="flex size-6 items-center justify-center rounded bg-[#252525] text-[8px] text-gray-400 hover:bg-[#303030]"
              >
                3
              </button>

              <button
                type="button"
                className="flex size-6 items-center justify-center rounded bg-[#252525] text-gray-400 hover:bg-[#303030]"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            icon={<Check className="size-3.5" />}
            label="PENDING REVIEW"
            value={pendingCount || 14}
            change="+12% vs last week"
            iconClass="text-amber-400"
          />

          <StatCard
            icon={<Check className="size-3.5" />}
            label="APPROVED PARTNERS"
            value={approvedCount || 892}
            change="+5% vs last week"
            iconClass="text-emerald-400"
          />

          <StatCard
            icon={<Ban className="size-3.5" />}
            label="TOTAL REJECTIONS"
            value={rejectedCount || 42}
            change="Stable"
            iconClass="text-red-400"
            stable
          />
        </div>
      </div>
    </main>
  );
};

/* ==========================================
   COMPANY ROW
========================================== */

const CompanyRow = ({ company }) => {
  const companyName = company.companyName || "Unknown Company";

  const recruiterEmail = company.recruiterEmail || "—";

  const industry = company.industry || "—";

  const status = company.status || "Pending";

  const dateSubmitted = company.dateSubmitted || company.createdAt || "—";

  return (
    <div className="grid min-h-[54px] grid-cols-[1.4fr_1.45fr_1.1fr_0.9fr_1fr_1.1fr] items-center border-b border-white/[0.05] px-4 last:border-b-0 hover:bg-white/[0.015]">
      {/* Company */}

      <div className="flex min-w-0 items-center gap-2.5">
        <CompanyAvatar name={companyName} />

        <span className="truncate text-[9px] text-gray-300">{companyName}</span>
      </div>

      {/* Recruiter */}

      <div className="truncate pr-3 text-[8px] text-gray-400">
        {recruiterEmail}
      </div>

      {/* Industry */}

      <div>
        <span className="inline-flex max-w-[110px] truncate rounded-full bg-[#242424] px-2 py-1 text-[7px] text-gray-400">
          {industry}
        </span>
      </div>

      {/* Status */}

      <div>
        <StatusBadge status={status} />
      </div>

      {/* Date */}

      <div className="text-[8px] text-gray-400">
        {formatDate(dateSubmitted)}
      </div>

      {/* Actions */}

      <div className="flex items-center justify-end gap-1.5">
        {status.toLowerCase() !== "approved" && (
          <button
            type="button"
            className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[7px] text-emerald-400 transition hover:bg-emerald-500/20"
          >
            Approve
          </button>
        )}

        {status.toLowerCase() !== "rejected" && (
          <button
            type="button"
            className="rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-[7px] text-red-400 transition hover:bg-red-500/20"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

/* ==========================================
   COMPANY AVATAR
========================================== */

const CompanyAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-[#292929] text-[7px] font-medium text-gray-300">
      {initials}
    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status }) => {
  const normalized = status.toLowerCase();

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

  const current = config[normalized] || config.pending;

  return (
    <div className={`flex items-center gap-1.5 text-[8px] ${current.text}`}>
      <span className={`size-1 rounded-full ${current.dot}`} />

      {current.label}
    </div>
  );
};

/* ==========================================
   STAT CARD
========================================== */

const StatCard = ({
  icon,
  label,
  value,
  change,
  iconClass,
  stable = false,
}) => {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#191919] p-4">
      <div className="flex items-start justify-between">
        <div className={iconClass}>{icon}</div>

        <span
          className={`text-[7px] ${
            stable ? "text-gray-400" : "text-emerald-400"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-4 text-[7px] uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-medium text-gray-100">{value}</p>
    </div>
  );
};

/* ==========================================
   EMPTY STATE
========================================== */

const EmptyState = () => {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-white/5">
          <CircleXmark className="size-4 text-gray-600" />
        </div>

        <p className="mt-3 text-[10px] text-gray-500">
          No company registrations found.
        </p>
      </div>
    </div>
  );
};

/* ==========================================
   DATE FORMATTER
========================================== */

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default CompanyRegistrations;
