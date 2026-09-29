import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  CreditCard,
  FileText,
  Bookmark,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { HiOutlineBriefcase } from "react-icons/hi";
import Link from "next/link";
import { BriefcaseBusiness, LayoutDashboard, Search, Settings, Users } from "lucide-react";

export async function DashboardSidebar({ user }) {

  const recruiterNavItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Jobs" },
    {
      icon: HiOutlineBriefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavItems = [
    {
      icon: LayoutDashboard,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },

    { icon: Search, href: "/dashboard/seeker/jobs", label: "Jobs" },

    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },

    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },

    {
      icon: CreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },

    { icon: Settings, href: "/settings", label: "Settings" },
  ];

const adminNavItems = [
  {
    icon: LayoutDashboard,
    href: "/dashboard/admin",
    label: "Dashboard",
  },
  {
    icon: BriefcaseBusiness,
    href: "/dashboard/admin/jobs",
    label: "Jobs",
  },
  {
    icon: Users,
    href: "/dashboard/admin/users",
    label: "Users",
  },
  {
    icon: FileText,
    href: "/dashboard/admin/applications",
    label: "Applications",
  },
  {
    icon: CreditCard,
    href: "/dashboard/admin/billing",
    label: "Billing",
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
  },
];

  const navLinksMap = {
    seeker: seekerNavItems,
    recruiter: recruiterNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 border-r shrink-0 border-default p-4">
        {navContent}
      </aside>
      <Drawer>
        <Button variant="secondary" className="lg:hidden">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
