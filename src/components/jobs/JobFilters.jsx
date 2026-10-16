"use client";

import { Magnifier, Xmark } from "@gravity-ui/icons";
import { Select, Label, ListBox, InputGroup, TextField } from "@heroui/react";

const JobFilters = ({ jobs = [], filters, onFiltersChange }) => {
  // Get unique job categories from the jobs
  const categories = [
    ...new Set(jobs.map((job) => job.jobCategory).filter(Boolean)),
  ];

  const handleChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: null,
      jobType: null,
    });
  };

  const hasFilters =
    filters.search ||
    filters.category ||
    filters.jobType;

  const formatCategory = (category) => {
    return category.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-full rounded-2xl border border-default bg-background p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* ================= Search ================= */}
        <TextField className="w-full col-span-2">
          <Label className="text-muted">Search jobs</Label>

          <InputGroup>
            <InputGroup.Prefix>
              <Magnifier className="size-5 text-muted-foreground" />
            </InputGroup.Prefix>

            <InputGroup.Input
              value={filters.search}
              onChange={(event) => handleChange("search", event.target.value)}
              placeholder="Search jobs by title, company or keyword..."
              className="min-w-0 truncate text-xs"
            />
          </InputGroup>
        </TextField>

        {/* ================= Filters ================= */}
        {/* ---------- Category ---------- */}

        <Select
          value={filters.category}
          onChange={(value) => handleChange("category", value)}
        >
          <Label className="text-muted">Job Category</Label>

          <Select.Trigger>
            <Select.Value className="text-xs">
              {filters.category
                ? formatCategory(filters.category)
                : "All categories"}
            </Select.Value>

            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item
                id="software development"
                textValue="Software Development"
              >
                <Label>Software Development</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="engineering" textValue="Engineering">
                <Label>Engineering</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="cloud computing" textValue="Cloud Computing">
                <Label>Cloud Computing</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="data science" textValue="Data Science">
                <Label>Data Science</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item
                id="artificial intelligence"
                textValue="Artificial Intelligence"
              >
                <Label>Artificial Intelligence</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="design" textValue="Design">
                <Label>Design</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item
                id="project management"
                textValue="Project Management"
              >
                <Label>Project Management</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="management" textValue="Management">
                <Label>Management</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="marketing" textValue="Marketing">
                <Label>Marketing</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="research" textValue="Research">
                <Label>Research</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* ---------- Job Type ---------- */}
        <Select
          value={filters.jobType}
          onChange={(value) => handleChange("jobType", value)}
        >
          <Label className="text-muted">Job Type</Label>

          <Select.Trigger>
            <Select.Value className="text-xs">
              {filters.jobType
                ? formatCategory(filters.jobType.replace("-", " "))
                : "All types"}
            </Select.Value>

            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox className="text-xs">
              <ListBox.Item id="full-time" textValue="Full-time">
                <Label>Full-time</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="part-time" textValue="Part-time">
                <Label>Part-time</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="contract" textValue="Contract">
                <Label>Contract</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="internship" textValue="Internship">
                <Label>Internship</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* ================= Clear Filters ================= */}
      {hasFilters && (
        <div className="mt-5 flex items-center justify-end border-t border-default pt-4">
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-danger transition-opacity hover:opacity-90"
          >
            <Xmark className="size-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
