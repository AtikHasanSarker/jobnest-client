"use client";

import Image from "next/image";
import Link from "next/link";

import globe from "../../public/images/globe.png";

import {
  IoLocationOutline,
  IoSearchOutline,
  IoArrowForward,
  IoSparklesOutline,
} from "react-icons/io5";

import { HiOutlineBriefcase, HiOutlineBuildingOffice2 } from "react-icons/hi2";

import {
  MdOutlinePersonSearch,
  MdOutlineStarRate,
  MdOutlineVerified,
} from "react-icons/md";

import { TbWorld } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";

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
    icon: <MdOutlinePersonSearch />,
  },
  {
    value: "97%",
    label: "Success Rate",
    icon: <MdOutlineStarRate />,
  },
];

const trending = [
  "AI Engineer",
  "Software Engineer",
  "Product Designer",
  "Data Scientist",
  "DevOps Engineer",
];

const categories = [
  {
    title: "Software Development",
    jobs: "12,450 jobs",
    icon: "⌘",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "AI & Data",
    jobs: "8,230 jobs",
    icon: "✦",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Design & Creative",
    jobs: "5,840 jobs",
    icon: "◈",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  {
    title: "Marketing",
    jobs: "4,920 jobs",
    icon: "↗",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    title: "Finance",
    jobs: "3,710 jobs",
    icon: "$",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "Research",
    jobs: "2,650 jobs",
    icon: "⌕",
    gradient: "from-sky-500/20 to-blue-500/10",
  },
];

const companies = [
  {
    name: "Airbnb",
    logo: "https://i.ibb.co/B5pj8B5x/airbnb.png",
    jobs: "124 open jobs",
  },
  {
    name: "Apple",
    logo: "https://i.ibb.co/8gcgqHtw/apple.png",
    jobs: "218 open jobs",
  },
];

export default function Banner() {
  return (
    <main className="overflow-hidden bg-[#050507] text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[900px] overflow-hidden">
        {/* Background gradients */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-300px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

          <div className="absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

          <div className="absolute bottom-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        </div>

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Globe */}

        <div className="pointer-events-none absolute left-1/2 top-[120px] w-[1000px] -translate-x-1/2 opacity-70 md:top-[100px] md:w-[1200px]">
          <Image
            src={globe}
            alt="Global Job Network"
            priority
            className="w-full"
          />
        </div>

        {/* Hero content */}

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-44">
          {/* Badge */}

          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-gray-300 shadow-2xl backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                <IoSparklesOutline />
              </span>

              <span>
                <strong className="text-white">50,000+</strong> new jobs added
                this month
              </span>
            </div>
          </div>

          {/* Heading */}

          <div className="mx-auto mt-8 max-w-5xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              Find work that
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                moves you forward.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              JobNest connects ambitious professionals with leading companies
              and opportunities that match their skills, goals, and career
              ambitions.
            </p>
          </div>

          {/* Search */}

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-[#0d0d11]/90 p-2 shadow-[0_20px_80px_rgba(0,0,0,.5)] backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Job */}

                <div className="flex flex-1 items-center gap-3 px-4 py-4">
                  <IoSearchOutline className="text-xl text-gray-500" />

                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      What are you looking for?
                    </p>

                    <input
                      type="text"
                      placeholder="Job title, skill or company"
                      className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="hidden h-12 w-px self-center bg-white/10 md:block" />

                {/* Location */}

                <div className="flex flex-1 items-center gap-3 px-4 py-4">
                  <IoLocationOutline className="text-xl text-gray-500" />

                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Location
                    </p>

                    <input
                      type="text"
                      placeholder="City, country or remote"
                      className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Search button */}

                <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 text-sm font-medium transition hover:scale-[1.02] hover:from-violet-500 hover:to-blue-500">
                  <IoSearchOutline className="text-xl" />
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Trending */}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-xs text-gray-600">Trending:</span>

              {trending.map((item) => (
                <Link
                  href={`/jobs?search=${encodeURIComponent(item)}`}
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Floating visual cards */}

          <div className="pointer-events-none absolute left-0 top-[600px] hidden xl:block">
            <div className="rounded-2xl border border-white/10 bg-[#111116]/90 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <MdOutlineVerified className="text-xl" />
                </div>

                <div>
                  <p className="text-xs font-medium">Verified Companies</p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    Trusted opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-[520px] hidden xl:block">
            <div className="w-56 rounded-2xl border border-white/10 bg-[#111116]/90 p-4 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">
                  REMOTE OPPORTUNITY
                </span>

                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <p className="text-sm font-medium">Senior Software Engineer</p>

              <p className="mt-1 text-xs text-gray-500">Airbnb · Remote</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-emerald-400">$120k–$165k</span>

                <FiArrowUpRight className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="relative border-y border-white/10 bg-[#09090c]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`group flex items-center gap-4 px-6 py-8 md:px-10 ${
                index !== stats.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-xl text-violet-400">
                {item.icon}
              </div>

              <div>
                <p className="text-2xl font-semibold">{item.value}</p>

                <p className="mt-1 text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
                Explore opportunities
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Find your field
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                Explore thousands of opportunities across the industries shaping
                the future.
              </p>
            </div>

            <Link
              href="/jobs"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              View all jobs
              <IoArrowForward />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                href={`/jobs?category=${encodeURIComponent(category.title)}`}
                key={category.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${category.gradient} p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                <div className="absolute right-[-30px] top-[-30px] h-32 w-32 rounded-full bg-white/[0.03] blur-2xl" />

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
                    {category.icon}
                  </div>

                  <FiArrowUpRight className="text-gray-600 transition group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-lg font-medium">{category.title}</h3>

                <p className="mt-2 text-xs text-gray-500">{category.jobs}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED JOBS
      ====================================================== */}

      <section className="bg-[#09090c] py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
                Curated for you
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Featured opportunities
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                High-quality roles from companies hiring right now.
              </p>
            </div>

            <Link
              href="/jobs"
              className="hidden items-center gap-2 text-sm text-gray-400 hover:text-white md:flex"
            >
              Browse all
              <IoArrowForward />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {/* Job 1 */}

            <div className="group rounded-2xl border border-white/10 bg-[#111115] p-6 transition hover:border-violet-500/30">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src="https://i.ibb.co/B5pj8B5x/airbnb.png"
                      alt="Airbnb"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">Senior Software Engineer</h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Airbnb · Remote
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-400">
                  Remote
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  Full-time
                </span>

                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  Software
                </span>

                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  Senior
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm font-medium">$120k – $165k</p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Annual salary
                  </p>
                </div>

                <Link
                  href="/jobs"
                  className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-200"
                >
                  View Job
                </Link>
              </div>
            </div>

            {/* Job 2 */}

            <div className="group rounded-2xl border border-white/10 bg-[#111115] p-6 transition hover:border-blue-500/30">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src="https://i.ibb.co/8gcgqHtw/apple.png"
                      alt="Apple"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">Machine Learning Engineer</h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Apple · On-site
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] text-blue-400">
                  Full-time
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  Machine Learning
                </span>

                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  Python
                </span>

                <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  AI
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm font-medium">$140k – $195k</p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Annual salary
                  </p>
                </div>

                <Link
                  href="/jobs"
                  className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-200"
                >
                  View Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY JOBNEST
      ====================================================== */}

      <section className="relative overflow-hidden py-28">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
              Why JobNest
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              More than a job board.
              <span className="block text-gray-500">
                A better way to build your career.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500">
              JobNest brings job discovery, applications, company discovery and
              career intelligence into one focused platform.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                [
                  <MdOutlineVerified />,
                  "Verified Companies",
                  "Discover trusted employers.",
                ],
                [
                  <IoSearchOutline />,
                  "Smarter Discovery",
                  "Find roles that match your skills.",
                ],
                [
                  <TbWorld />,
                  "Global Opportunities",
                  "Remote and international jobs.",
                ],
                [
                  <HiOutlineBriefcase />,
                  "Application Tracking",
                  "Keep every application organized.",
                ],
              ].map(([icon, title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    {icon}
                  </div>

                  <h3 className="mt-4 text-sm font-medium">{title}</h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}

          <div className="relative">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-transparent blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d12] p-4">
              <img
                src="https://remotegenie.ai/blog/the-ultimate-guide-to-remote-software-engineering-jobs.png"
                alt="Remote career opportunities"
                className="w-full rounded-2xl opacity-90"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      GLOBAL OPPORTUNITIES
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      Work from anywhere.
                    </p>
                  </div>

                  <TbWorld className="text-2xl text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOP COMPANIES
      ====================================================== */}

      <section className="bg-[#09090c] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
              Trusted employers
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Build your future with leading companies
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111115] p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">{company.name}</h3>

                    <p className="mt-1 text-xs text-gray-500">{company.jobs}</p>
                  </div>
                </div>

                <FiArrowUpRight className="text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          RECRUITER CTA
      ====================================================== */}

      <section className="px-6 py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-violet-500/20 bg-gradient-to-br from-violet-950/60 via-[#111116] to-blue-950/50 p-10 md:p-16">
          <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                <HiOutlineBuildingOffice2 />
                For employers
              </div>

              <h2 className="text-3xl font-semibold md:text-5xl">
                Your next great hire is already looking.
              </h2>

              <p className="mt-5 text-sm leading-6 text-gray-400 md:text-base">
                Reach skilled professionals, publish your opportunities and
                build your team faster with JobNest.
              </p>
            </div>

            <Link
              href="/dashboard/recruiter/jobs/create"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Post a Job
              <IoArrowForward />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[130px]" />

        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-2xl text-violet-400">
            <IoSparklesOutline />
          </div>

          <h2 className="mt-7 text-4xl font-semibold md:text-5xl">
            Your next opportunity
            <span className="block text-gray-500">
              could be one search away.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-500">
            Explore thousands of opportunities and take the next step in your
            career with JobNest.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="rounded-xl bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Explore Jobs
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
