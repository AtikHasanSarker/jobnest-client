import { getUserSession } from "@/lib/api/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyForm from "./ApplyForm";
import { getJobById } from "@/lib/actions/jobs";
import { getApplicationsByApplicant } from "@/lib/actions/applications";
import Link from "next/link";
import { CheckCircle2, Crown } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { getPlanById } from "@/lib/actions/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-gray-800 p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full">
            <span className="text-xl text-red-500">!</span>
          </div>

          <h2 className="text-xl font-semibold">Access Restricted</h2>

          <p className="mt-2 text-sm leading-6">
            Only seekers can apply for jobs. Please sign in with a seeker
            account to continue.
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium transition hover:bg-purple-600"
          >
            Sign in as Seeker
          </Link>
        </div>
      </div>
    );
  }

  const plan = await getPlanById(user?.plan || 'seeker_free');
  console.log('plan:', plan);
  const job = await getJobById(id);
  const applications = await getApplicationsByApplicant(user?.id);
  const applicationCount = applications?.length || 0;
  const applicationLimit = plan.maxApplicationPerMonth;
  const progress = Math.min((applicationCount / applicationLimit) * 100, 100);
  const canApply = applicationCount < applicationLimit;

  return (
    <main className="mt-30 min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <BackButton />

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-600">
            Job Application
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Submit your application
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6sm:text-base">
            Complete the form below to apply for this position. Make sure your
            resume and other information are up to date.
          </p>
        </div>

        {/* Application Quota Card */}
        <div className="mb-8 rounded-2xl border p-5 shadow-sm sm:p-6 bg-gray-800">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg">
                  <CheckCircle2 className="size-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm font-medium">Current plan</p>

                  <p className="font-semibold">{plan.name}</p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm">Applications this month</p>

              <p className="mt-1 text-2xl font-bold">
                {applicationCount}
                <span className="text-base font-medium">
                  {" "}
                  / {applicationLimit}
                </span>
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-pink-50">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span>{applicationCount} used</span>
              <span>
                {Math.max(applicationLimit - applicationCount, 0)} remaining
              </span>
            </div>
          </div>
        </div>

        {/* Application Form / Limit */}
        {canApply ? (
          <ApplyForm applicant={user} job={job} />
        ) : (
          <div className="rounded-2xl bg-gray-800 p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-purple-50">
              <Crown className="size-7 text-purple-600" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              You&apos;ve reached your application limit
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6">
              You have used all {applicationLimit} applications available in the{" "}
              {plan.name}. Upgrade your plan to apply for more positions.
            </p>

            <Link
              href="/planning"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              <Crown className="size-4" />
              View Plans
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplyPage;
