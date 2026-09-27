import Link from "next/link";
import { redirect } from "next/navigation";

import {
  CircleCheckFill,
  ArrowRight,
  Briefcase,
  Envelope,
} from "@gravity-ui/icons";
import { stripe } from "@/lib/stripe";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (cs_test_...)");
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
    line_items,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // Checkout session is still open
  if (status === "open") {
    redirect("/");
  }

  // Payment completed
  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    const result = await createSubscription(subsInfo);
    console.log(result);

    const productName =
      line_items?.data?.[0]?.description || "Your JobNest plan";

    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
        {/* ================= Background ================= */}

        <div className="pointer-events-none absolute inset-0">
          {/* Main purple glow */}
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[150px]" />

          {/* Cyan glow */}
          <div className="absolute -right-40 top-[35%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

          {/* Pink glow */}
          <div className="absolute -left-40 bottom-[10%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        </div>

        {/* ================= Content ================= */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 mt-20 py-20">
          <section className="w-full max-w-2xl">
            {/* Success Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-8 text-center shadow-2xl shadow-purple-950/30 backdrop-blur-2xl sm:p-12">
              {/* Top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent" />

              {/* Success Icon */}
              <div className="relative mx-auto flex size-24 items-center justify-center">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                <div className="relative flex size-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <CircleCheckFill className="size-11 text-emerald-400" />
                </div>
              </div>

              {/* Badge */}
              <div className="mt-7 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Payment Successful
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                You&apos;re all set!
              </h1>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Thank you for choosing{" "}
                <span className="font-medium text-white">JobNest</span>. Your
                payment has been successfully processed and your plan is now
                active.
              </p>

              {/* ================= Order Details ================= */}

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-left">
                {/* Product */}
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                    <Briefcase className="size-5 text-purple-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Purchased plan</p>

                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {productName}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/10" />

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Envelope className="size-5 text-cyan-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      Confirmation sent to
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-gray-200">
                      {customerEmail || "your email address"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= Buttons ================= */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200"
                >
                  Go to Dashboard
                  <ArrowRight className="size-4" />
                </Link>

                {/* Home */}
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/4 px-6 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/8 hover:text-white"
                >
                  Back to Home
                </Link>
              </div>

              {/* Support */}
              <p className="mt-8 text-xs leading-5 text-gray-500">
                Need help with your payment?{" "}
                <a
                  href="mailto:support@jobnest.com"
                  className="text-purple-400 transition hover:text-purple-300"
                >
                  Contact JobNest Support
                </a>
              </p>
            </div>

            {/* Footer branding */}
            <div className="mt-7 text-center">
              <Link href="/" className="text-lg font-bold tracking-tight">
                <span className="text-cyan-400">Job</span>
                <span className="bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Nest
                </span>
              </Link>

              <p className="mt-1 text-xs text-gray-600">
                Find your next opportunity.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Fallback for expired/cancelled/other sessions
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Payment could not be completed</h1>

        <p className="mt-3 text-sm text-gray-400">
          Your checkout session is no longer active.
        </p>

        <Link
          href="/pricing"
          className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}
