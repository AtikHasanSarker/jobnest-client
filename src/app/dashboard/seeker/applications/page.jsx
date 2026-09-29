import ApplicationsContent from "@/components/dashboard/seeker/ApplicationsContent";
import { getApplicationsByApplicant } from "@/lib/actions/applications";
import { getUserSession } from "@/lib/api/core/session";


const ApplicationsPage = async () => {
  const user = await getUserSession();
  console.log('user:', user.id);

  const applications = await getApplicationsByApplicant(user?.id);
  console.log('applications:', applications);

  return <ApplicationsContent applications={applications || []} />;
};

export default ApplicationsPage;
