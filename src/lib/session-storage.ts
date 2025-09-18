import { Session, User } from "@supabase/supabase-js";

export class SessionStorage {
  private static readonly SESSION_KEY = "shriarya-session";
  private static readonly USER_KEY = "shriarya-user";
  private static readonly PROFILE_KEY = "shriarya-profile";

  static saveSession(session: Session): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      console.log("Session saved to localStorage");
    } catch (error) {
      console.error("Error saving session:", error);
    }
  }

  static getSession(): Session | null {
    if (typeof window === "undefined") return null;
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;
      return JSON.parse(sessionData) as Session;
    } catch (error) {
      console.error("Error parsing session:", error);
      this.clearSession();
      return null;
    }
  }

  static saveUser(user: User): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      console.log("User saved to localStorage");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null;
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      if (!userData) return null;
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("Error parsing user:", error);
      this.clearSession();
      return null;
    }
  }

  static clearSession(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(this.SESSION_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.PROFILE_KEY);
      console.log("Session cleared from localStorage");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  }

  static isSessionExpired(maxAge: number = 30 * 24 * 60 * 60 * 1000): boolean {
    const session = this.getSession();
    if (!session) return true;

    const now = Date.now();
    const sessionTime = new Date(session.expires_at!).getTime();
    return now > sessionTime || now > sessionTime + maxAge;
  }
}
