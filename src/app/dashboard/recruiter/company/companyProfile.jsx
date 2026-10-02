"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { ArrowUpFromLine, Globe, Pencil, Plus } from "@gravity-ui/icons";
import {
  FiExternalLink,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { IoLocation } from "react-icons/io5";
import {
  listItemClasses,
  popoverClasses,
  selectBoxClass,
  textAreaClass,
  textInputClass,
  triggerClasses,
} from "@/components/style";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany); 
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [errors, setErrors] = useState({});

  // ImgBB Upload Handler
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Failed to upload image to ImgBB.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic Validation
    const newErrors = {};
    if (!data.companyName) newErrors.companyName = "Company name is required";
    if (!data.websiteUrl) newErrors.websiteUrl = "Website URL is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      recruiterId: recruiter.id,
      name: data.companyName,
      industry: data.industry || "Technology",
      websiteUrl: `https://${data.websiteUrl}`,
      location: data.location,
      employeeCount: data.employeeCount || "1-10 employees",
      description: data.description,
      logo: logoUrl || "https://via.placeholder.com/150",
      status: company?.status || "Pending", 
    };

    setCompany(payload);

    // Create company
    const res = await createCompany(payload);
    if (res.insertId) {
      toast.success("Company created successfully!");
    }

    setIsOpen(false);
    setErrors({});
  };

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    const config = {
      Pending: {
        bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: FiClock,
      },
      Approved: {
        bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: FiCheckCircle,
      },
      Rejected: {
        bg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        icon: FiXCircle,
      },
    };

    const current = config[status] || config.Pending;
    const Icon = current.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${current.bg}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* 1. NO COMPANY REGISTERED STATE */}
      {!company?._id && !isOpen && (
        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
            <Globe size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">
              No Company Registered
            </h3>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto">
              You haven&apos;t set up a company profile yet. Register your
              business to start posting jobs.
            </p>
          </div>
          <Button
            onClick={() => {
              setLogoUrl("");
              setIsOpen(true);
            }}
            className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors mt-2"
          >
            <Plus size={16} />
            Register Company
          </Button>
        </div>
      )}

      {/* 2. REGISTERED COMPANY DETAILS VIEW */}
      {company && !isOpen && (
        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">
                    {company.name}
                  </h2>
                  {renderStatusBadge(company.status)}
                </div>
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 text-sm hover:text-white inline-flex items-center gap-1 mt-1 transition-colors"
                >
                  {company.websiteUrl} <FiExternalLink size={12} />
                </a>
              </div>
            </div>

            <Button
              onClick={() => {
                setLogoUrl(company.logo);
                setIsOpen(true);
              }}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <Pencil size={14} />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
            <div>
              <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-1">
                Industry
              </span>
              <p className="text-zinc-200 text-sm font-medium">
                {company.industry}
              </p>
            </div>
            <div>
              <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-1">
                Location
              </span>
              <p className="text-zinc-200 text-sm font-medium">
                {company.location || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-1">
                Employees
              </span>
              <p className="text-zinc-200 text-sm font-medium">
                {company.employeeCount}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/60">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-2">
              About Company
            </span>
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {company.description || "No description provided."}
            </p>
          </div>
        </div>
      )}

      {/* 3. REGISTRATION / EDIT MODAL (MATCHING ATTACHED DESIGN) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {company ? "Edit Company Details" : "Register New Company"}
                </h3>
                <p className="text-zinc-400 text-xs mt-1">
                  Enter your business details to start hiring on JobNest.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <Form
              onSubmit={handleSubmit}
              validationErrors={errors}
              validationBehavior="aria"
              className="p-6 space-y-5"
            >
              {/* Row 1: Company Name & Industry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="companyName"
                  defaultValue={company?.name || ""}
                  isInvalid={!!errors.companyName}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-zinc-300 font-medium text-xs">
                    Company Name
                  </Label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    className={textInputClass}
                  />
                  {errors.companyName && (
                    <FieldError className="text-xs text-rose-500">
                      {errors.companyName}
                    </FieldError>
                  )}
                </TextField>

                <Select
                  className={selectBoxClass}
                  name="industry"
                  defaultSelectedKeys={[company?.industry || "Technology"]}
                >
                  <Label className="text-zinc-300 font-medium text-xs mb-1.5 block">
                    Industry / Category
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value className="text-white placeholder:text-zinc-600" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox className="outline-none">
                      <ListBox.Item
                        id="Technology"
                        className={listItemClasses}
                        textValue="Technology"
                      >
                        Technology
                      </ListBox.Item>
                      <ListBox.Item
                        id="Design"
                        className={listItemClasses}
                        textValue="Design"
                      >
                        Design
                      </ListBox.Item>
                      <ListBox.Item
                        id="Marketing"
                        className={listItemClasses}
                        textValue="Marketing"
                      >
                        Marketing
                      </ListBox.Item>
                      <ListBox.Item
                        id="Finance"
                        className={listItemClasses}
                        textValue="Finance"
                      >
                        Finance
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Row 2: Website URL & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="websiteUrl"
                  defaultValue={
                    company?.websiteUrl?.replace("https://", "") || ""
                  }
                  isInvalid={!!errors.websiteUrl}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-zinc-300 font-medium text-xs">
                    Website URL
                  </Label>
                  <div className="flex items-center bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden focus-within:border-zinc-600">
                    <span className="bg-zinc-800/50 text-zinc-400 text-xs px-3 py-2.5 border-r border-zinc-800">
                      https://
                    </span>
                    <Input
                      placeholder="www.company.com"
                      className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>
                  {errors.websiteUrl && (
                    <FieldError className="text-xs text-rose-500">
                      {errors.websiteUrl}
                    </FieldError>
                  )}
                </TextField>

                <TextField
                  name="location"
                  defaultValue={company?.location || ""}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-zinc-300 font-medium text-xs">
                    Location
                  </Label>
                  <div className="relative flex items-center">
                    <IoLocation
                      size={16}
                      className="absolute left-3 text-zinc-500 pointer-events-none z-10"
                    />
                    <Input
                      placeholder="City, Country"
                      className={`${textInputClass} pl-9`}
                    />
                  </div>
                </TextField>
              </div>

              {/* Row 3: Employee Count Range & Logo Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  className={selectBoxClass}
                  name="employeeCount"
                  defaultSelectedKeys={[
                    company?.employeeCount || "1-10 employees",
                  ]}
                >
                  <Label className="text-zinc-300 font-medium text-xs mb-1.5 block">
                    Employee Count Range
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox className="outline-none">
                      <ListBox.Item
                        id="1-10 employees"
                        className={listItemClasses}
                        textValue="1-10 employees"
                      >
                        1-10 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="11-50 employees"
                        className={listItemClasses}
                        textValue="11-50 employees"
                      >
                        11-50 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="51-200 employees"
                        className={listItemClasses}
                        textValue="51-200 employees"
                      >
                        51-200 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="500+ employees"
                        className={listItemClasses}
                        textValue="500+ employees"
                      >
                        500+ employees
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* ImgBB File Upload Input */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-zinc-300 font-medium text-xs">
                    Company Logo
                  </Label>
                  <label className="flex items-center gap-3 p-2 bg-zinc-900/80 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg cursor-pointer transition-colors group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors flex-shrink-0">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <ArrowUpFromLine size={18} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-zinc-200">
                        {isUploading
                          ? "Uploading..."
                          : logoUrl
                            ? "Change Logo"
                            : "Upload image"}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        PNG, JPG up to 5MB
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Row 4: Brief Description */}
              <TextField
                name="description"
                defaultValue={company?.description || ""}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-300 font-medium text-xs">
                  Brief Description
                </Label>
                <TextArea
                  placeholder="Tell us about your company's mission and culture..."
                  rows={3}
                  className={textAreaClass}
                />
              </TextField>

              {/* Form Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg px-5 py-2 text-sm font-medium transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-5 py-2 text-sm transition-colors disabled:opacity-50"
                >
                  {company ? "Save Changes" : "Register Company"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
