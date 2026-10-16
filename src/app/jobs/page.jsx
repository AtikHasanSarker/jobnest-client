import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getJobs } from "@/lib/actions/jobs";


const JobsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters);

  if (!querySearch.has("page")) {
    querySearch.set("page", "1");
  }

  const queryString = querySearch.toString();
  const {jobs, total} = await getJobs(queryString);

  return (
    <section className="mx-auto container px-6 pt-50 py-10">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">Latest Job Opportunities</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Find your next opportunity from top companies.
        </p>
      </div>

      <JobListingContainer jobs={jobs} total={total} />
    </section>
  );
};

export default JobsPage;
