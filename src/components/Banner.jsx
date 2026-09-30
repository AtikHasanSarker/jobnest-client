"use client";

import Image from "next/image";
import Link from "next/link";

import globe from "../../public/images/globe.png";

import {
  IoSearchOutline,
  IoLocationOutline,
  IoArrowForward,
  IoCheckmarkCircle,
  IoSparklesOutline,
} from "react-icons/io5";

import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import {
  MdOutlinePersonSearch,
  MdOutlineSpeed,
  MdOutlineVerified,
  MdOutlineTrackChanges,
} from "react-icons/md";

import {
  TbChartBarPopular,
  TbDeviceAnalytics,
  TbTargetArrow,
  TbRocket,
} from "react-icons/tb";

import { FiArrowUpRight, FiSearch } from "react-icons/fi";

const stats = [
  {
    value: "50K+",
    label: "Active Jobs",
    icon: <HiOutlineBriefcase />,
  },
  {
    value: "12K+",
    label: "Companies",
    icon: <HiOutlineBuildingOffice2 />,
  },
  {
    value: "2M+",
    label: "Job Seekers",
    icon: <HiOutlineUserGroup />,
  },
  {
    value: "97%",
    label: "Success Rate",
    icon: <TbChartBarPopular />,
  },
];

const companies = [
  {
    name: "Airbnb",
    logo: "https://i.ibb.co/B5pj8B5x/airbnb.png",
  },
  {
    name: "Apple",
    logo: "https://i.ibb.co/8gcgqHtw/apple.png",
  },
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google",
  },
  {
    name: "Meta",
    logo: "https://cdn.simpleicons.org/meta",
  },
  {
    name: "Microsoft",
    logo: "https://cdn.simpleicons.org/microsoft",
  },
];

const features = [
  {
    icon: <MdOutlinePersonSearch />,
    title: "Smart Job Discovery",
    description:
      "Find relevant opportunities faster with powerful search and intelligent filters.",
  },
  {
    icon: <MdOutlineTrackChanges />,
    title: "Application Tracking",
    description:
      "Keep every application organized and follow your progress from one dashboard.",
  },
  {
    icon: <MdOutlineVerified />,
    title: "Verified Companies",
    description:
      "Explore opportunities from trusted companies and growing teams.",
  },
  {
    icon: <TbDeviceAnalytics />,
    title: "Career Insights",
    description:
      "Get salary insights, market trends and useful information before you apply.",
  },
];

const categories = [
  {
    title: "Software Development",
    jobs: "12,480 jobs",
    icon: <HiOutlineBriefcase />,
  },
  {
    title: "Artificial Intelligence",
    jobs: "8,240 jobs",
    icon: <TbRocket />,
  },
  {
    title: "Design & Creative",
    jobs: "6,920 jobs",
    icon: <TbTargetArrow />,
  },
  {
    title: "Data & Analytics",
    jobs: "5,810 jobs",
    icon: <TbDeviceAnalytics />,
  },
  {
    title: "Marketing",
    jobs: "4,630 jobs",
    icon: <TbChartBarPopular />,
  },
  {
    title: "Product Management",
    jobs: "3,920 jobs",
    icon: <MdOutlineSpeed />,
  },
];

const steps = [
  {
    number: "01",
    icon: <FiSearch />,
    title: "Discover",
    description:
      "Search thousands of opportunities from companies around the world.",
  },
  {
    number: "02",
    icon: <TbTargetArrow />,
    title: "Apply",
    description:
      "Find the right role and submit your application in just a few clicks.",
  },
  {
    number: "03",
    icon: <MdOutlineTrackChanges />,
    title: "Track",
    description: "Manage your applications and monitor your hiring progress.",
  },
];

export default function Banner() {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.20),transparent_35%)]" />

        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />

        {/* Globe */}
        <div className="absolute inset-x-0 top-0 flex justify-center overflow-hidden">
          <Image
            src={globe}
            alt="Global job network"
            priority
            className="pointer-events-none w-full max-w-[1500px] select-none opacity-70"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-44 md:pt-52">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-400 backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                <IoSparklesOutline />
              </span>

              <span>
                Trusted by <strong className="text-white">2M+</strong> job
                seekers worldwide
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mx-auto mt-8 max-w-5xl text-center">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Your next opportunity
              <br />
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              JobNest connects ambitious professionals with exceptional
              companies. Discover better jobs, build your career, and move
              forward with confidence.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-[#101014]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Job */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <IoSearchOutline className="text-xl text-gray-500" />

                  <input
                    type="text"
                    placeholder="Job title, skill or company"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>

                <div className="hidden h-10 w-px self-center bg-white/10 md:block" />

                {/* Location */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <IoLocationOutline className="text-xl text-gray-500" />

                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>

                {/* Button */}
                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black transition hover:bg-gray-200">
                  Search Jobs
                  <FiArrowUpRight className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="mr-2 py-2 text-xs text-gray-500">Trending:</span>

            {[
              "AI Engineer",
              "Software Engineer",
              "Product Designer",
              "Data Scientist",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Floating mini dashboard */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute inset-x-20 top-10 h-40 rounded-full bg-indigo-600/20 blur-[100px]" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10]/90 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-[#111114] p-5 md:p-7">
                {/* Fake dashboard header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">JobNest Dashboard</p>
                    <h3 className="mt-1 text-lg font-medium">
                      Your career at a glance
                    </h3>
                  </div>

                  <div className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 sm:block">
                    Profile 92% complete
                  </div>
                </div>

                {/* Dashboard cards */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-500">Recommended</p>
                    <p className="mt-2 text-2xl font-semibold">128</p>
                    <p className="mt-1 text-xs text-emerald-400">
                      +18 this week
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-500">Applications</p>
                    <p className="mt-2 text-2xl font-semibold">24</p>
                    <p className="mt-1 text-xs text-indigo-400">
                      8 shortlisted
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-500">Profile views</p>
                    <p className="mt-2 text-2xl font-semibold">1,284</p>
                    <p className="mt-1 text-xs text-purple-400">
                      +32% this month
                    </p>
                  </div>
                </div>

                {/* Fake job rows */}
                <div className="mt-4 space-y-2">
                  {[
                    ["Senior Software Engineer", "Airbnb", "$120K–$165K"],
                    ["Machine Learning Engineer", "Apple", "$140K–$195K"],
                    ["Product Designer", "Meta", "$110K–$150K"],
                  ].map(([title, company, salary]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                    >
                      <div>
                        <p className="text-xs font-medium">{title}</p>
                        <p className="mt-1 text-[11px] text-gray-500">
                          {company}
                        </p>
                      </div>

                      <span className="hidden text-xs text-gray-400 sm:block">
                        {salary}
                      </span>

                      <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] text-indigo-400">
                        Match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUSTED COMPANIES
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-600">
            Opportunities from companies you know
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-2 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />

                <span className="text-sm font-medium text-gray-300">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0f] md:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={`group relative p-8 ${
                  index !== stats.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl text-indigo-400 transition group-hover:bg-indigo-500/10">
                  {item.icon}
                </div>

                <p className="mt-8 text-4xl font-semibold tracking-tight">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY JOBNEST
      ========================================================= */}

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-400">
                <IoSparklesOutline />
                Built for modern careers
              </div>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
                More than a job board.
                <br />
                <span className="text-gray-500">A career platform.</span>
              </h2>

              <p className="mt-6 max-w-lg leading-7 text-gray-500">
                JobNest brings job discovery, applications, career insights and
                professional growth together in one focused platform.
              </p>

              <Link
                href="/jobs"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Explore Jobs
                <IoArrowForward />
              </Link>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/10 bg-[#0c0c0f] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101014]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 font-medium">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs text-gray-600 transition group-hover:text-indigo-400">
                    Learn more
                    <IoArrowForward />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-[#080808] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-400">
              Simple process
            </span>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Find the right job in three steps
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              No complicated process. Just discover, apply and move forward.
            </p>
          </div>

          <div className="relative mt-16 grid gap-6 md:grid-cols-3">
            {/* connector */}
            <div className="absolute left-[17%] right-[17%] top-14 hidden h-px bg-linear-to-r from-transparent via-white/10 to-transparent md:block" />

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-[#0d0d10] p-7 text-center"
              >
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-indigo-400">
                  {step.icon}

                  <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#080808] bg-indigo-500 text-[9px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 font-medium">{step.title}</h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-indigo-400">
                Explore opportunities
              </span>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Find your field
              </h2>
            </div>

            <Link
              href="/jobs"
              className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              View all jobs
              <IoArrowForward />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                href="/jobs"
                key={category.title}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b0b0e] p-5 transition duration-300 hover:border-indigo-500/30 hover:bg-[#101014]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-lg text-gray-400 transition group-hover:bg-indigo-500/10 group-hover:text-indigo-400">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">{category.title}</h3>

                    <p className="mt-1 text-xs text-gray-600">
                      {category.jobs}
                    </p>
                  </div>
                </div>

                <IoArrowForward className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          JOB SEEKER / RECRUITER
      ========================================================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-2">
            {/* Job seeker */}
            <div className="relative overflow-hidden bg-linear-to-br from-indigo-950/60 to-[#0c0c10] p-8 md:p-12">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400">
                  <MdOutlinePersonSearch />
                </div>

                <p className="mt-8 text-xs uppercase tracking-widest text-indigo-400">
                  For Job Seekers
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                  Build your next career move.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
                  Discover better opportunities, save your favorite jobs, track
                  applications and get noticed by top employers.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "Personalized job discovery",
                    "Application tracking",
                    "Salary insights",
                    "Profile visibility",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <IoCheckmarkCircle className="text-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/jobs"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                >
                  Find a Job
                  <IoArrowForward />
                </Link>
              </div>
            </div>

            {/* Recruiter */}
            <div className="relative overflow-hidden bg-[#101014] p-8 md:p-12">
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-400">
                  <HiOutlineBuildingOffice2 />
                </div>

                <p className="mt-8 text-xs uppercase tracking-widest text-purple-400">
                  For Recruiters
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                  Meet your next great hire.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
                  Reach qualified candidates, manage applications and build your
                  hiring pipeline from one powerful workspace.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "Reach qualified candidates",
                    "Applicant management",
                    "Hiring analytics",
                    "Featured job listings",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <IoCheckmarkCircle className="text-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard/recruiter"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Start Hiring
                  <IoArrowForward />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PREMIUM CTA
      ========================================================= */}

      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-indigo-950 via-[#111018] to-purple-950/40 px-6 py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.20),transparent_55%)]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-indigo-300">
              <IoSparklesOutline />
            </div>

            <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Your next opportunity is closer than you think.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-400">
              Join JobNest and turn your next search into your next career move.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Explore Jobs
                <IoArrowForward />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Plans
                <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
