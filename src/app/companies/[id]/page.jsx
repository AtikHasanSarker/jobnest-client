import { getJobsByCompany } from "@/lib/actions/companies";
import CompanyJobsClient from "@/components/companies/CompanyJobsClient";

const CompanyJobs = async ({ params }) => {
  const { id } = await params;
  const result = await getJobsByCompany(id);

  const jobs = Array.isArray(result)
    ? result
    : Array.isArray(result?.jobs)
      ? result.jobs
      : [];

  return <CompanyJobsClient jobs={jobs} />;
};

export default CompanyJobs;
