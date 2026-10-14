"use client";

import { useState, useTransition } from "react";
import { Table } from "@heroui/react";
import {
  Users,
  Briefcase,
  ShieldCheck,
  UserPlus,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { updateUserRole } from "@/lib/actions/users";

const UserManagement = ({ users = [] }) => {
  const [userList, setUserList] = useState(Array.isArray(users) ? users : []);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const totalUsers = userList.length;

  const recruiterCount = userList.filter(
    (user) => user.role?.toLowerCase() === "recruiter",
  ).length;

  const suspendedCount = userList.filter(
    (user) =>
      user.status?.toLowerCase() === "suspended" || user.isSuspended === true,
  ).length;

  const newSignups = userList.filter((user) => {
    const value = user.createdAt || user.joinDate;
    if (!value) return false;

    const date = new Date(value);
    const age = Date.now() - date.getTime();

    return (
      !Number.isNaN(date.getTime()) && age >= 0 && age < 24 * 60 * 60 * 1000
    );
  }).length;

  const stats = [
    {
      label: "TOTAL USERS",
      value: totalUsers,
      description: "Users in loaded data",
      icon: <Users className="size-4" />,
      color: "text-blue-400",
      accent: "bg-blue-500/10",
    },
    {
      label: "RECRUITERS",
      value: recruiterCount,
      description: "Recruiter accounts",
      icon: <Briefcase className="size-4" />,
      color: "text-emerald-400",
      accent: "bg-emerald-500/10",
    },
    {
      label: "SUSPENDED ACCOUNTS",
      value: suspendedCount,
      description: "Suspended users",
      icon: <ShieldCheck className="size-4" />,
      color: "text-red-400",
      accent: "bg-red-500/10",
    },
    {
      label: "NEW SIGNUPS (24H)",
      value: newSignups,
      description: "Registered in the last 24 hours",
      icon: <UserPlus className="size-4" />,
      color: "text-amber-400",
      accent: "bg-amber-500/10",
    },
  ];

  const handleRoleChange = async (userId, newRole) => {
    const data = await updateUserRole(userId, newRole);
  }

  return (
    <main className="min-h-screen bg-[#111111] p-4 text-white sm:p-6 lg:p-7">
      {/* Header */}
      <header className="mb-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-indigo-400">
          Administration
        </p>

        <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          User Management
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
          Review user accounts, manage roles, and maintain the JobNest
          community.
        </p>
      </header>

      {/* Statistics */}
      <section
        aria-label="User statistics"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.07] bg-[#1b1b1d] p-4 transition-colors hover:border-white/[0.13] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[9px] font-medium tracking-wide text-gray-500 sm:text-[10px]">
                {stat.label}
              </p>

              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.accent} ${stat.color}`}
              >
                {stat.icon}
              </div>
            </div>

            <p className="mt-5 text-2xl font-semibold tabular-nums sm:text-3xl">
              {stat.value.toLocaleString()}
            </p>

            <p className="mt-2 text-[10px] text-gray-500">{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Table */}
      <section className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#191919]">
        <div className="flex flex-col gap-1 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-sm font-medium">All Users</h2>
            <p className="mt-1 text-[10px] text-gray-500">
              Manage roles and review account status
            </p>
          </div>

          <span className="w-fit rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-400">
            {totalUsers} records
          </span>
        </div>

        {error && (
          <div
            role="alert"
            className="border-b border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs text-red-400"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="border-b border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-400"
          >
            {success}
          </div>
        )}

        {userList.length > 0 ? (
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="JobNest user management"
                className="min-w-[1050px] w-full"
              >
                <Table.Header>
                  <Table.Column isRowHeader>User</Table.Column>
                  <Table.Column>Email Address</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Join Date</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {userList.map((user) => {
                    const userId = String(user._id || user.id || user.email);
                    const name =
                      user.name ||
                      "Unnamed User";

                    const suspended =
                      user.isSuspended === true ||
                      ["suspended", "inactive"].includes(
                        user.status?.toLowerCase(),
                      );

                    const currentRole = user.role?.toLowerCase() || "seeker";

                    const initials = name
                      .trim()
                      .split(/\s+/)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <Table.Row key={userId}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            {user.image || user.photoURL || user.avatar ? (
                              <img
                                src={user.image || user.photoURL || user.avatar}
                                alt=""
                                className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
                              />
                            ) : (
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-[10px] font-medium text-indigo-200">
                                {initials || "U"}
                              </div>
                            )}

                            <span className="whitespace-nowrap text-xs font-medium text-gray-200">
                              {name}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-xs text-gray-400">
                            {user.email || "—"}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <RoleBadge role={currentRole} />
                        </Table.Cell>

                        <Table.Cell>
                          <span className="whitespace-nowrap text-[11px] text-gray-400">
                            {formatDate(user.createdAt)}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <UserStatusBadge suspended={suspended} />
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <select
                              aria-label={`Change role for ${name}`}
                              value={
                                ["seeker", "recruiter", "admin", "suspend"].includes(currentRole)
                                  ? currentRole
                                  : "seeker"
                              }
                              disabled={isPending || updatingId === userId}
                              onChange={(event) =>
                                handleRoleChange(user._id, event.target.value)
                              }
                              className="max-w-36 cursor-pointer rounded-lg border border-white/10 bg-[#242426] px-2.5 py-2 text-[11px] text-gray-200 outline-none transition focus:border-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="seeker">Seeker</option>
                              <option value="recruiter">Recruiter</option>
                              <option value="admin">Admin</option>
                              <option value="suspend">Suspend</option>
                            </select>

                            {updatingId === userId && (
                              <span className="text-[10px] text-indigo-400">
                                Saving...
                              </span>
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
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <Users className="size-6 text-gray-500" />
            <h3 className="mt-4 text-sm font-medium text-gray-300">
              No users found
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              User records will appear here when available.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[10px] text-gray-500">
            Showing {totalUsers} loaded users
          </p>
          <p className="text-[10px] text-gray-600">JobNest Admin Console</p>
        </div>
      </section>
    </main>
  );
};

const RoleBadge = ({ role }) => {
  const isRecruiter = role === "recruiter";
  const isAdmin = role === "admin";

  const style = isAdmin
    ? "bg-violet-500/10 text-violet-300"
    : isRecruiter
      ? "bg-blue-500/10 text-blue-300"
      : "bg-white/[0.07] text-gray-300";

  const label = role
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] ${style}`}
    >
      {label}
    </span>
  );
};

const UserStatusBadge = ({ suspended }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] ${
      suspended
        ? "border-red-500/20 bg-red-500/[0.07] text-red-400"
        : "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400"
    }`}
  >
    {suspended ? (
      <CircleX className="size-3" />
    ) : (
      <CircleCheck className="size-3" />
    )}
    {suspended ? "Suspended" : "Active"}
  </span>
);

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default UserManagement;
