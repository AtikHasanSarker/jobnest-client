import { getCompanies } from "@/lib/actions/companies";
import CompaniesClient from "@/components/companies/CompaniesClient";

const CompanyPage = async () => {
  const companies = await getCompanies();

  return <CompaniesClient companies={companies} />;
};

export default CompanyPage;
