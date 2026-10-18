import { getCompanyById, getJobsByCompany } from "@/lib/actions/companies";
import CompanyJobsClient from "@/components/companies/CompanyJobsClient";

const CompanyJobs = async ({ params }) => {
  const { id } = await params;
  const company = await getCompanyById(id);
  const jobs = await getJobsByCompany(id);

  return <CompanyJobsClient company={company} jobs={jobs} />;
};

export default CompanyJobs;
