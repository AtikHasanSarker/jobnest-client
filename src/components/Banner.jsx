"use client";

import Image from "next/image";
import Link from "next/link";
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
import { getCompanies } from "@/lib/actions/companies";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getFeaturedJobs } from "@/lib/actions/jobs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    image: "/images/software-development.jpg",
    icon: "⌘",
    linear: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Artificial Intelligence",
    jobs: "8,230 jobs",
    image: "/images/ai&data.jpg",
    icon: "✦",
    linear: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Design",
    jobs: "5,840 jobs",
    image: "/images/design.jpg",
    icon: "◈",
    linear: "from-pink-500/20 to-rose-500/10",
  },
  {
    title: "Marketing",
    jobs: "4,920 jobs",
    image: "/images/marketing.jpg",
    icon: "↗",
    linear: "from-orange-500/20 to-amber-500/10",
  },
  {
    title: "Engineering",
    jobs: "3,710 jobs",
    image: "/images/engineering.jpg",
    icon: "⩩",
    linear: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "Research",
    jobs: "2,650 jobs",
    image: "/images/research.jpg",
    icon: "⌕",
    linear: "from-sky-500/20 to-blue-500/10",
  },
];

export default function Banner() {
  const [companies, setCompanies] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchData();

    const fetchFeaturedJobs = async () => {
      const data = await getFeaturedJobs();
      setFeaturedJobs(data);
    };
    fetchFeaturedJobs();
  }, [setCompanies, setFeaturedJobs]);

  return (
    <main className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#080b14]">
        {/* Background — same dark purple / blue aesthetic */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-20 h-[600px] w-[600px] rounded-full bg-violet-700/20 blur-[150px]" />

          <div className="absolute right-[-180px] top-10 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[150px]" />

          <div className="absolute left-[35%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-36">
          {/* Main hero layout */}
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
            {/* LEFT — Hero content */}
            <div className="relative z-20 max-w-2xl">
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2 text-xs font-medium text-violet-200 shadow-lg shadow-violet-950/20 backdrop-blur-xl">
                <span className="flex size-6 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                  <IoSparklesOutline className="size-3.5" />
                </span>
                Better opportunities. Brighter futures.
              </div>

              {/* Heading */}
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[68px]">
                Better careers
                <span className="mt-1 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text pb-2 text-transparent">
                  start here.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                Discover top opportunities, connect with leading companies, and
                take the next step in your career — all in one place.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/jobs"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500"
                >
                  <IoSearchOutline className="size-5" />
                  Browse Jobs
                  <IoArrowForward className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/dashboard/recruiter/jobs/create"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <HiOutlineBriefcase className="size-5" />
                  Post a Job
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-4 lg:max-w-2xl">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-violet-300">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-xl font-semibold tracking-tight text-white">
                        {item.value}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-4 text-gray-500 sm:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Your cutout image */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto lg:mr-0 lg:max-w-none">
              {/* Image glow */}
              <div className="pointer-events-none absolute left-1/2 top-[42%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[100px] sm:h-[430px] sm:w-[430px]" />

              <div className="pointer-events-none absolute right-[8%] top-[18%] size-24 rounded-full bg-blue-500/10 blur-3xl" />

              {/* Floating opportunity card */}
              <div className="absolute left-0 top-[5%] z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151827]/90 p-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex xl:left-[-2%]">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                  <IoSparklesOutline className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    New opportunities
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Every single day
                  </p>
                </div>
              </div>

              {/* Floating career card */}
              <div className="absolute right-0 top-[15%] z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151827]/90 p-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex xl:left-[-3%]">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <MdOutlineVerified className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Your next chapter
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Starts with one search
                  </p>
                </div>
              </div>

              {/* Floating company card */}
              <div className="absolute right-0 top-[35%] z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151827]/90 p-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex xl:right-[-1%]">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <HiOutlineBuildingOffice2 className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Top companies
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Ready to hire
                  </p>
                </div>
              </div>

              <div className="relative mx-auto aspect-[4/4.2] w-full max-w-[530px]">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] bg-gradient-to-t from-[#080b14] via-[#080b14]/60 to-transparent" />

                <Image
                  src="/images/hero-person.png"
                  alt="Professional exploring career opportunities on JobNest"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Search panel */}
          <div className="relative z-30 mx-auto mt-8 max-w-6xl rounded-2xl border border-white/10 bg-[#111522]/90 p-3 shadow-[0_25px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-12 sm:p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto] md:items-center">
              {/* Job search */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3.5 transition focus-within:bg-white/[0.04] sm:px-4">
                <IoSearchOutline className="size-5 shrink-0 text-violet-300" />

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="hero-job-search"
                    className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500"
                  >
                    What are you looking for?
                  </label>

                  <input
                    id="hero-job-search"
                    type="text"
                    placeholder="Job title, skills or keywords"
                    className="mt-1.5 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3.5 transition focus-within:bg-white/[0.04] sm:px-4">
                <IoLocationOutline className="size-5 shrink-0 text-violet-300" />

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="hero-job-location"
                    className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Location
                  </label>

                  <input
                    id="hero-job-location"
                    type="text"
                    placeholder="City, country or remote"
                    className="mt-1.5 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Search action */}
              <div>
                <Link
                  href="/jobs"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 text-sm font-semibold text-white transition hover:from-violet-500 hover:to-indigo-500"
                >
                  <IoSearchOutline className="size-4" />
                  Search Jobs
                </Link>
              </div>
            </div>

            {/* Trending searches */}
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-2 pt-4">
              <span className="mr-1 text-[11px] font-medium text-gray-500">
                Trending:
              </span>

              {trending.map((item) => (
                <Link
                  href={`/jobs?search=${encodeURIComponent(item)}`}
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="relative py-20">
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                href={`/jobs?category=${encodeURIComponent(category.title)}`}
                key={category.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                <div
                  className="absolute inset-0 -z-20 opacity-70 transition duration-300 group-hover:opacity-60"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div
                  className={`absolute inset-0 -z-10 bg-linear-to-br ${category.linear} opacity-90`}
                />

                {/* Decorative blur */}
                <div className="absolute right-[-30px] top-[-30px] -z-0 h-32 w-32 rounded-full bg-white/[0.04] blur-2xl" />

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
                    {category.icon}
                  </div>

                  <FiArrowUpRight className="text-gray-600 transition group-hover:text-white" />
                </div>

                <h3 className="mt-20 text-xl font-medium">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED JOBS
      ====================================================== */}

      <section className="bg-[#09090c] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
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

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={featuredJobs?.length > 3}
            speed={700}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="featured-jobs-swiper !pb-12"
          >
            {featuredJobs?.map((job) => (
              <SwiperSlide key={job._id} className="!h-auto">
                <div className="group rounded-2xl border border-white/10 bg-[#111115] p-6 transition hover:border-violet-500/30">
                  <div className="flex justify-between">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl">
                        <Image
                          width={56}
                          height={56}
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="h-full w-full object-contain rounded-xl"
                        />
                      </div>

                      <div>
                        <h3 className="font-medium">{job.jobTitle}</h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {job.companyName}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-500/10 h-fit px-3 py-1 text-xs text-emerald-400">
                      {job.isRemote ? "Remote" : "On-site"}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-md bg-white/5 px-3 capitalize py-1.5 text-xs text-gray-300">
                      {job.jobType}
                    </span>

                    <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-gray-300 capitalize">
                      {job.jobCategory}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-sm font-medium">
                        ${job.minSalary} - ${job.maxSalary}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Annual salary
                      </p>
                    </div>

                    <Link
                      href={`/jobs/${job._id}`}
                      className="rounded-lg bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-200"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =====================================================
          WHY JOBNEST
      ====================================================== */}

      <section className="relative overflow-hidden py-20">
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
                  <MdOutlineVerified key="verified-icon" />,
                  "Verified Companies",
                  "Discover trusted employers.",
                ],
                [
                  <IoSearchOutline key="search-icon" />,
                  "Smarter Discovery",
                  "Find roles that match your skills.",
                ],
                [
                  <TbWorld key="world-icon" />,
                  "Global Opportunities",
                  "Remote and international jobs.",
                ],
                [
                  <HiOutlineBriefcase key="briefcase-icon" />,
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
            <div className="absolute inset-0 rounded-[40px] bg-linear-to-br from-violet-600/20 via-blue-600/10 to-transparent blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d12] p-4">
              <Image
                width={100}
                height={100}
                src="/images/illustration.png"
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

      <section className="bg-[#09090c] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-green-500">
              Trusted employers
            </p>

            <h2 className="mt-3 mb-5 text-3xl font-semibold">
              Build your future with leading companies
            </h2>
          </div>

          <Marquee
            speed={60}
            pauseOnHover={true}
            gradient={true}
            gradientColor="black"
          >
            {companies.map((company) => (
              <div
                key={company._id}
                className="flex items-center justify-between mr-5 rounded-2xl border border-white/10 bg-[#111115] p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl">
                    <Image
                      width={56}
                      height={56}
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{company.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {company.jobCount} Jobs
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* =====================================================
          RECRUITER CTA
      ====================================================== */}

      <section className="px-6 py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-violet-500/20 bg-linear-to-br from-violet-950/60 via-[#111116] to-blue-950/50 p-10 md:p-16">
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

      <section className="relative overflow-hidden py-20 text-center">
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
