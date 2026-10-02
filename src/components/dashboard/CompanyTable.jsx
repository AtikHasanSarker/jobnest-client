"use client";

import { Plus, Check, CircleXmark, Ban } from "@gravity-ui/icons";

/* ==========================================
   MAIN COMPONENT
========================================== */

const CompanyRegistrations = ({ companies }) => {
  /* -----------------------------------------
     Normalize companies
  ----------------------------------------- */

  const companyList = Array.isArray(companies) ? companies : [];

  /* -----------------------------------------
     Statistics
  ----------------------------------------- */

  const pendingCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "pending",
  ).length;

  const approvedCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "approved",
  ).length;

  const rejectedCount = companyList.filter(
    (company) => company.status?.toLowerCase() === "rejected",
  ).length;

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="p-7">
        {/* =====================================
            PAGE HEADER
        ===================================== */}

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

          {/* =====================================
              TABLE BODY
          ===================================== */}

          {companyList.length > 0 ? (
            companyList.map((company) => (
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
              {companyList.length > 0
                ? `Showing ${companyList.length} companies`
                : "No companies"}
            </p>
          </div>
        </div>

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            icon={<Check className="size-3.5" />}
            label="PENDING REVIEW"
            value={pendingCount}
            change="Awaiting review"
            iconClass="text-amber-400"
          />

          <StatCard
            icon={<Check className="size-3.5" />}
            label="APPROVED PARTNERS"
            value={approvedCount}
            change="Approved companies"
            iconClass="text-emerald-400"
          />

          <StatCard
            icon={<Ban className="size-3.5" />}
            label="TOTAL REJECTIONS"
            value={rejectedCount}
            change="Rejected companies"
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
  const companyName =
    company?.companyName || company?.name || "Unknown Company";

  const recruiterEmail = company?.recruiterEmail || company?.email || "—";

  const industry = company?.industry || "—";

  const status = company?.status || "pending";

  const dateSubmitted = company?.dateSubmitted || company?.createdAt || null;

  return (
    <div className="grid min-h-[54px] grid-cols-[1.4fr_1.45fr_1.1fr_0.9fr_1fr_1.1fr] items-center border-b border-white/[0.05] px-4 last:border-b-0 hover:bg-white/[0.015]">
      {/* =====================================
          COMPANY
      ===================================== */}

      <div className="flex min-w-0 items-center gap-2.5">
        <CompanyAvatar name={companyName} />

        <span className="truncate text-[9px] text-gray-300">{companyName}</span>
      </div>

      {/* =====================================
          RECRUITER EMAIL
      ===================================== */}

      <div className="truncate pr-3 text-[8px] text-gray-400">
        {recruiterEmail}
      </div>

      {/* =====================================
          INDUSTRY
      ===================================== */}

      <div>
        <span className="inline-flex max-w-[110px] truncate rounded-full bg-[#242424] px-2 py-1 text-[7px] text-gray-400">
          {industry}
        </span>
      </div>

      {/* =====================================
          STATUS
      ===================================== */}

      <div>
        <StatusBadge status={status} />
      </div>

      {/* =====================================
          DATE
      ===================================== */}

      <div className="text-[8px] text-gray-400">
        {formatDate(dateSubmitted)}
      </div>

      {/* =====================================
          ACTIONS
      ===================================== */}

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
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-[#292929] text-[7px] font-medium text-gray-300">
      {initials || "CO"}
    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase() || "pending";

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
          className={`text-[7px] ${stable ? "text-gray-400" : "text-gray-500"}`}
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
    return String(date);
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default CompanyRegistrations;
