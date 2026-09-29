"use client";

import {
  Code,
  Palette,
  Database,
  Server,
  Briefcase,
  Download,
} from "lucide-react";

const ApplicationsTable = ({ applications = [] }) => {
  // -----------------------------------------
  // Statistics
  // -----------------------------------------

  const totalApplied = applications.length;

  const shortlisted = applications.filter(
    (application) => application.status?.toLowerCase() === "shortlisted",
  ).length;

  const interviews = applications.filter(
    (application) => application.status?.toLowerCase() === "interview",
  ).length;

  const successRate =
    totalApplied > 0 ? Math.round((shortlisted / totalApplied) * 100) : 0;

  return (
    <main className="min-h-full bg-[#111111] text-white">
      <div className="p-5">
        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">My Applications</h1>

            <p className="mt-1 text-[10px] text-gray-500">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md bg-white px-4 text-[10px] font-medium text-black transition hover:bg-gray-200"
          >
            <Download className="size-3" />
            Export PDF
          </button>
        </div>

        {/* =====================================
            STAT CARDS
        ===================================== */}

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total Applied" value={totalApplied} />

          <StatCard label="Shortlisted" value={shortlisted} />

          <StatCard
            label="Interviews"
            value={interviews}
            valueClass="text-amber-400"
          />

          <StatCard
            label="Success Rate"
            value={`${successRate}%`}
            valueClass="text-emerald-400"
          />
        </div>

        {/* =====================================
            APPLICATION TABLE
        ===================================== */}

        <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#171717]">
          {/* Table Header */}

          <div className="grid grid-cols-[2fr_1.4fr_1fr_1fr_0.7fr] border-b border-white/10 px-3 py-3 text-[9px] text-gray-400">
            <div>Job Title</div>
            <div>Company</div>
            <div>Applied</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}

          {applications.length > 0 ? (
            applications.map((application) => (
              <ApplicationRow key={application._id} application={application} />
            ))
          ) : (
            <EmptyState />
          )}

          {/* =====================================
              TABLE FOOTER
          ===================================== */}

          <div className="border-t border-white/10 px-3 py-2.5">
            <p className="text-[8px] text-gray-500">
              Showing {applications.length} application
              {applications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ==========================================
   STAT CARD
========================================== */

const StatCard = ({ label, value, valueClass = "text-white" }) => {
  return (
    <div className="rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3">
      <p className="text-[9px] text-gray-500">{label}</p>

      <p className={`mt-1 text-xl font-semibold ${valueClass}`}>{value}</p>
    </div>
  );
};

/* ==========================================
   APPLICATION ROW
========================================== */

const ApplicationRow = ({ application }) => {
  const jobTitle =
    application.jobTitle || application.job?.jobTitle || "Untitled Job";

  const companyName =
    application.companyName ||
    application.job?.companyName ||
    "Unknown Company";

  const jobType =
    application.jobType || application.job?.jobType || "full-time";

  const isRemote = application.isRemote ?? application.job?.isRemote ?? false;

  const appliedAt = application.appliedAt || application.createdAt;

  const status = application.status || "Applied";

  const Icon = getJobIcon(jobTitle);

  return (
    <div className="grid min-h-[58px] grid-cols-[2fr_1.4fr_1fr_1fr_0.7fr] items-center border-b border-white/[0.06] px-3 last:border-b-0 transition hover:bg-white/[0.02]">
      {/* Job Title */}

      <div className="flex min-w-0 items-center gap-2">
        <div className="flex size-5 shrink-0 items-center justify-center rounded bg-white/10 text-gray-300">
          <Icon className="size-3" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-medium text-gray-200">
            {jobTitle}
          </p>

          <p className="mt-0.5 text-[7px] text-gray-500">
            {formatJobType(jobType)} • {isRemote ? "Remote" : "On-site"}
          </p>
        </div>
      </div>

      {/* Company */}

      <div className="truncate pr-2 text-[8px] text-gray-400">
        {companyName}
      </div>

      {/* Applied Date */}

      <div className="text-[8px] text-gray-400">{formatDate(appliedAt)}</div>

      {/* Status */}

      <div>
        <StatusBadge status={status} />
      </div>

      {/* Action */}

      <div>
        <button
          type="button"
          className="text-[8px] text-gray-400 transition hover:text-white"
        >
          Details
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase().replace(/\s+/g, "");

  const styles = {
    applied: "border-white/30 bg-white/5 text-gray-200",

    review: "border-amber-500/50 bg-amber-500/5 text-amber-400",

    shortlisted: "border-emerald-500/50 bg-emerald-500/5 text-emerald-400",

    interview: "border-blue-500/50 bg-blue-500/5 text-blue-400",

    rejected: "border-red-500/50 bg-red-500/5 text-red-400",

    offered: "border-white/30 bg-white/5 text-gray-200",

    archived: "border-gray-500/40 bg-gray-500/5 text-gray-400",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[7px] font-medium ${
        styles[normalizedStatus] || "border-white/20 bg-white/5 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
};

/* ==========================================
   EMPTY STATE
========================================== */

const EmptyState = () => {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-white/5">
        <Briefcase className="size-4 text-gray-500" />
      </div>

      <h3 className="mt-3 text-sm font-medium text-gray-300">
        No applications yet
      </h3>

      <p className="mt-1 text-[9px] text-gray-600">
        Your job applications will appear here once you apply for a position.
      </p>
    </div>
  );
};

/* ==========================================
   JOB ICON
========================================== */

const getJobIcon = (jobTitle = "") => {
  const title = jobTitle.toLowerCase();

  if (
    title.includes("frontend") ||
    title.includes("developer") ||
    title.includes("engineer")
  ) {
    return Code;
  }

  if (
    title.includes("design") ||
    title.includes("designer") ||
    title.includes("ux") ||
    title.includes("ui")
  ) {
    return Palette;
  }

  if (
    title.includes("data") ||
    title.includes("scientist") ||
    title.includes("analytics")
  ) {
    return Database;
  }

  if (
    title.includes("cloud") ||
    title.includes("devops") ||
    title.includes("architect")
  ) {
    return Server;
  }

  return Briefcase;
};

/* ==========================================
   FORMAT JOB TYPE
========================================== */

const formatJobType = (type) => {
  if (!type) return "Full-time";

  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

/* ==========================================
   FORMAT DATE
========================================== */

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const now = new Date();

  const diff = now - parsedDate;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${Math.max(minutes, 1)} min ago`;
  }

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default ApplicationsTable;
