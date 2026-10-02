import CompanyRegistrations from '@/components/dashboard/CompanyTable';
import { getCompanies } from '@/lib/actions/companies';
import React from 'react';

const CompaniesPage = async () => {
  const companies = await getCompanies();
  return (
    <div>
      <CompanyRegistrations companies={companies} />
    </div>
  );
};

export default CompaniesPage;