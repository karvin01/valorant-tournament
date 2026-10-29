import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { account } from "@/lib/appwrite";

/**
 * @file useAuthSession.ts
 * @description Global client-side session listener hook.
 * Re-validates the user's Appwrite authentication status and admin permissions on route transitions,
 * and provides a centralized logout handler.
 */
export function useAuthSession() {
  // Current route pathname used as an effect trigger to re-check session state on navigation
  const pathname = usePathname();

  // --- HOOK STATE ---
  // Flag indicating whether a valid Appwrite session exists
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Authorization flag verifying whether user preferences grant admin role access
  const [isAdmin, setIsAdmin] = useState(false);
  // Initial loading state to prevent layout flash during asynchronous session validation
  const [loadingAuth, setLoadingAuth] = useState(true);

  // --- SESSION VERIFICATION EFFECT ---
  // Queries Appwrite Account API on mount and whenever the active route path changes
  useEffect(() => {
    async function checkSession() {
      try {
        // Query active session record from Appwrite
        const user = await account.get();
        const loggedIn = Boolean(user && user.$id);
        setIsLoggedIn(loggedIn);

        // Verify admin claim: check both native boolean and stringified value stored in user preferences
        if (loggedIn && user.prefs) {
          const adminCheck = user.prefs.isAdmin === true || user.prefs.isAdmin === "true";
          setIsAdmin(adminCheck);
        } else {
          setIsAdmin(false);
        }
      } catch {
        // Unauthenticated or expired session: reset privileges
        setIsLoggedIn(false);
        setIsAdmin(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    
    checkSession();
  }, [pathname]);

  // --- LOGOUT HANDLER ---
  // Invalidates the active Appwrite session and resets local authentication flags
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      setIsAdmin(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return { isLoggedIn, isAdmin, loadingAuth, logout };
}