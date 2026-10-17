import { getCompanies } from "@/lib/actions/companies";
import CompaniesClient from "@/components/companies/CompaniesClient";

const CompanyPage = async () => {
  const result = await getCompanies();

  // Supports either an array or an object containing companies.
  const companies = Array.isArray(result)
    ? result
    : Array.isArray(result?.companies)
      ? result.companies
      : [];

  return <CompaniesClient companies={companies} />;
};

export default CompanyPage;
