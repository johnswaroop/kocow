import { getCurrentUser } from "@/lib/auth";
import OnboardingForm from "./OnboardingForm";
import { redirect } from "next/navigation";
import { findOrCreateUser } from "@/models/User";

export default async function OnboardingPage() {
  try {
    // This will redirect to /auth/signin if not authenticated
    const user = await getCurrentUser();

    if (!user) {
      console.log(
        "[Onboarding] No authenticated user found, redirecting to signin"
      );
      return redirect("/auth/signin");
    }

    console.log("[Onboarding] User authenticated:", user.email);

    // Ensure user exists in the database
    try {
      console.log(
        "[Onboarding] Ensuring user exists in database for ID:",
        user.id
      );
      const dbUser = await findOrCreateUser({
        id: user.id,
        email: user.email || "",
        name: user.name || "",
        image: user.image || undefined,
      });

      console.log(
        "[Onboarding] Database user:",
        dbUser ? "Found/Created" : "Failed"
      );

      // If user has already completed onboarding, redirect to dashboard
      if (dbUser?.onboardingCompleted) {
        console.log(
          "[Onboarding] User already completed onboarding, redirecting to dashboard"
        );
        return redirect("/dashboard");
      }
    } catch (error) {
      console.error("[Onboarding] Error ensuring user exists:", error);
      // Continue to show the form anyway, the form submission will handle the error
    }

    return <OnboardingForm initialName={user.name || ""} />;
  } catch (error) {
    console.error("[Onboarding] Unexpected error:", error);
    return <div>Something went wrong. Please try again.</div>;
  }
}
