import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const user = await getCurrentUser();

  // If authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Otherwise show the homepage
  return <HomePage />;
}
