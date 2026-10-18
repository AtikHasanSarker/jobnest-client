"use client";

import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-gray-400">
      <div className="mx-auto max-w-6xl px-6 py-15">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Left Side */}
          <div>
            <Image
              src="/nav-logo.png"
              alt="JobNest Logo"
              width={160}
              height={64}
              priority
              className="h-auto w-60 object-contain"
            />

            <p className="mt-1 max-w-sm text-sm leading-7">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 transition hover:bg-zinc-800"
              >
                <FaFacebookF size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 text-white transition hover:bg-indigo-500"
              >
                <FaPinterestP size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 transition hover:bg-zinc-800"
              >
                <FaLinkedinIn size={16} />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-indigo-500">
              Product
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Job discovery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Worker AI
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-indigo-500">
              Navigation
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Career library
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-indigo-500">
              Resources
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-gray-600 md:flex-row">
          <p>Copyright 2026 — All rights reserved</p>

          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              Terms & Policy
            </Link>

            <span>-</span>

            <Link href="#" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
