import { requireAuth } from "@/lib/auth";
import DashboardContent from "./DashboardContent";

export default async function Dashboard() {
  // This will redirect to /auth/signin if not authenticated
  const user = await requireAuth();

  return <DashboardContent user={user} />;
}
