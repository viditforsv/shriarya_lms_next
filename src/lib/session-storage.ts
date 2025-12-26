import { UserProfile } from "@/types/auth";

export class SessionStorage {
  private static readonly PROFILE_KEY = "preppeo-profile";

  static saveProfile(profile: UserProfile): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  static getProfile(): UserProfile | null {
    if (typeof window === "undefined") return null;
    try {
      const profileData = localStorage.getItem(this.PROFILE_KEY);
      return profileData ? (JSON.parse(profileData) as UserProfile) : null;
    } catch (error) {
      console.error("Error parsing profile:", error);
      this.clearProfile();
      return null;
    }
  }

  static clearProfile(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(this.PROFILE_KEY);
    } catch (error) {
      console.error("Error clearing profile:", error);
    }
  }
}
