import { requireAuth } from "@/lib/auth";
import SpaceDetails from "./SpaceDetails";

interface SpacePageProps {
  params: {
    id: string;
  };
}

export default async function SpacePage({ params }: SpacePageProps) {
  // Require authentication
  const user = await requireAuth();
  const { id } = params;
  // Pass the authenticated user to the client component
  console.log(id);
  return <SpaceDetails id={id} user={user} />;
}
