import { requireAuth } from "@/lib/auth";
import SpaceDetails from "./SpaceDetails";

export default async function SpacePage({ params }) {
  // Require authentication
  const user = await requireAuth();
  const { id } = params;
  // Pass the authenticated user to the client component
  console.log(id);
  return <SpaceDetails id={id} user={user} />;
}
