"use client";

import { useState } from "react";
import Link from "next/link";

import Check from "@gravity-ui/icons/Check";
import ChevronDown from "@gravity-ui/icons/ChevronDown";
import ArrowRight from "@gravity-ui/icons/ArrowRight";
import Sparkles from "@gravity-ui/icons/Sparkles";

const pricingData = {
  seekers: {
    label: "For Job Seekers",
    description:
      "Choose the plan that fits your job search and take your career to the next level.",
    plans: [
      {
        name: "Free",
        id: "seeker_free",
        price: "$0",
        period: "forever",
        description: "Everything you need to start your job search.",
        features: [
          "Browse & save up to 10 jobs",
          "Apply to 3 jobs per month",
          "Basic profile",
          "Email job alerts",
        ],
        button: "Get Started",
        highlighted: false,
      },
      {
        name: "Pro",
        id: "seeker_pro",
        price: "$19",
        period: "month",
        description: "More applications and powerful tools for active seekers.",
        features: [
          "Apply to 10 jobs per month",
          "Unlimited saved jobs",
          "Application tracking",
          "Salary insights",
        ],
        button: "Choose Pro",
        highlighted: true,
        badge: "Most Popular",
      },
      {
        name: "Premium",
        id: "seeker_premium",
        price: "$39",
        period: "month",
        description: "Maximum visibility and unlimited opportunities.",
        features: [
          "Unlimited applications & saved jobs",
          "Profile boost to recruiters",
          "Early access to new jobs",
          "Priority support",
        ],
        button: "Go Premium",
        highlighted: false,
      },
    ],
  },

  recruiters: {
    label: "For Recruiters",
    description:
      "Powerful hiring tools to help you find, manage, and hire the right talent.",
    plans: [
      {
        name: "Free",
        id: "recruiter_free",
        price: "$0",
        period: "forever",
        description: "A simple way to start hiring for your company.",
        features: [
          "Up to 3 active job posts",
          "Basic applicant management",
          "Standard listing visibility",
          "Ideal for first-time hiring",
        ],
        button: "Get Started",
        highlighted: false,
      },
      {
        name: "Growth",
        id: "recruiter_growth",
        price: "$49",
        period: "month",
        description: "Everything you need to scale your hiring process.",
        features: [
          "Up to 10 active job posts",
          "Applicant tracking",
          "Basic analytics",
          "Email support",
        ],
        button: "Choose Growth",
        highlighted: true,
        badge: "Best Value",
      },
      {
        name: "Enterprise",
        id: "recruiter_enterprise",
        price: "$149",
        period: "month",
        description: "Advanced hiring tools for growing organizations.",
        features: [
          "Up to 50 active job posts",
          "Advanced analytics dashboard",
          "Featured job listings",
          "Custom branding",
          "Priority support",
        ],
        button: "Contact Sales",
        highlighted: false,
      },
    ],
  },
};

const faqs = [
  {
    question: "Can I cancel my plan at any time?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings. Your current plan will remain active until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Paid subscriptions are generally non-refundable after a billing cycle begins. If you experience an issue with your subscription, you can contact our support team for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support major debit and credit cards. Additional payment methods may be available depending on your location and payment provider.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or change your plan whenever you need. Any applicable billing adjustment will be handled automatically.",
  },
  {
    question: "Can I switch from a Job Seeker account to a Recruiter account?",
    answer:
      "Yes. You can use the appropriate account type based on your needs. Recruiter features become available when you activate a recruiter plan.",
  },
];

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("seekers");

  const currentPricing = pricingData[activeTab];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="absolute left-[-180px] top-[420px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute right-[-180px] top-[650px] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        {/* Header */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-purple-400" />
            Simple & transparent pricing
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Plans that help you{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              move forward
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Whether you are searching for your next opportunity or building your
            next team, choose a plan that works for you.
          </p>
        </section>

        {/* Toggle */}
        <div className="mx-auto mt-10 flex w-fit rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl shadow-purple-950/20 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab("seekers")}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 sm:px-8 ${
              activeTab === "seekers"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            For Job Seekers
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recruiters")}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 sm:px-8 ${
              activeTab === "recruiters"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            For Recruiters
          </button>
        </div>

        {/* Current section heading */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {currentPricing.label}
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
            {currentPricing.description}
          </p>
        </div>

        {/* Pricing Cards */}
        <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
          {currentPricing.plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-28 max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-medium text-purple-400">
              HAVE QUESTIONS?
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
              Everything you need to know about pricing, billing and plans.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-colors hover:border-white/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-sm font-medium text-white sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}

                  <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-6 text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto mt-24 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-cyan-500/10 px-6 py-12 text-center shadow-2xl shadow-purple-950/20 backdrop-blur-xl sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Start for free and upgrade whenever you need more powerful features.
          </p>

          <Link
            href="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            Explore Jobs
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
};

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 ${
        plan.highlighted
          ? "border-purple-400/40 bg-gradient-to-b from-purple-500/[0.14] to-white/[0.035] shadow-2xl shadow-purple-950/30 lg:-translate-y-2"
          : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-xl">
          {plan.badge}
        </div>
      )}

      {/* Plan */}
      <div>
        <h3 className="text-xl font-semibold">{plan.name}</h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mt-7 flex items-end gap-2">
        <span className="text-4xl font-bold tracking-tight">{plan.price}</span>

        <span className="mb-1.5 text-sm text-gray-500">/{plan.period}</span>
      </div>

      {/* Divider */}
      <div className="my-7 h-px bg-white/10" />

      {/* Features */}
      <div className="flex-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          What&apos;s included
        </p>

        <ul className="space-y-3.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-300"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                <Check className="size-3.5" />
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <input type="hidden" name="plan_id" value={plan.id} />
          <button
            type="submit"
            role="link"
            className={`mt-7 flex w-full cursor-pointer h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
              plan.highlighted
                ? "bg-purple-600 hover:bg-purple-800"
                : "border border-white/10 bg-white/6 text-white hover:bg-purple-800"
            }`}
          >
            Checkout
          </button>
        </section>
      </form>
    </div>
  );
};

export default PricingPage;
