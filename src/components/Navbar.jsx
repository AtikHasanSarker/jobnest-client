"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { MdLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logout Successfully!");
    router.push("/");
  };

  return (
    <div className="px-6 absolute top-0 left-0 right-0 z-50">
      <nav className="w-full max-w-7xl  py-10 z-50 mx-auto px-6 sticky top-10">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-6 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/nav-logo.png"
              alt="JobNest Logo"
              width={150}
              height={40}
              className="w-32 h-auto"
            />
          </Link>

          {/* Right Section */}
          <div className="hidden ml-auto items-center md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-10">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="mx-8 h-6 w-px bg-white/15" />
          </div>

          {/* Mobile Toggle */}
          <div className="flex gap-4">
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Auth Actions */}
            <div>
              {user ? (
                <div>
                  {isPending ? (
                    <p>loading...</p>
                  ) : (
                    <Dropdown>
                      <Button aria-label="Menu" className="p-0 w-fit">
                        <Avatar>
                          <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name}
                            src={user?.image}
                          />
                          <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                        </Avatar>
                      </Button>

                      <Dropdown.Popover>
                        <Dropdown.Menu
                          onAction={(key) => console.log(`Selected: ${key}`)}
                        >
                          <Dropdown.Item id="userName" textValue={user?.name}>
                            <Label className="font-semibold">
                              <p className="font-medium mr-3">
                                Hello, {user?.name.split(" ")[0]}
                              </p>
                            </Label>
                          </Dropdown.Item>

                          <Dropdown.Item
                            id="dashboard"
                            onClick={() => router.push("/dashboard/recruiter")}
                            textValue="Dashboard"
                          >
                            <Label className="cursor-pointer flex gap-2 items-center font-semibold">
                              <LayoutDashboard size={16} />
                              Dashboard
                            </Label>
                          </Dropdown.Item>

                          <Dropdown.Item
                            id="profile"
                            onClick={() => router.push("/profile")}
                            textValue="Profile"
                          >
                            <Label className="cursor-pointer flex gap-2 items-center font-semibold">
                              <AiOutlineUser />
                              Profile
                            </Label>
                          </Dropdown.Item>

                          <Dropdown.Item
                            id="logout"
                            onClick={handleLogout}
                            textValue="Logout"
                          >
                            <Label className="text-red-600 cursor-pointer flex gap-2 items-center font-semibold">
                              <MdLogout />
                              Logout
                            </Label>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-6">
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-[#7B6CFF] hover:text-[#8F82FF]"
                  >
                    Sign In
                  </Link>

                  <Link href="/signup">
                    <Button
                      radius="lg"
                      className="h-11 bg-linear-to-r from-[#6E5BFF] to-[#5C6CFF] px-6 font-medium text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#111118] p-5 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  href={item.href}
                >
                  <Button className="text-gray-300 hover:text-white">
                    {item.label}
                  </Button>
                </Link>
              ))}

              <div>
                {!user && (
                  <div className="mt-2 border-t border-white/10 pt-4 flex flex-col gap-4">
                    <Link
                      href="/signin"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <Button className="w-full bg-white text-black">
                        Sign In
                      </Button>
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <Button className="w-full bg-linear-to-r from-[#6E5BFF] to-[#5C6CFF] text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
