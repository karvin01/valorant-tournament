import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { account } from "@/lib/appwrite";

export function useAuthSession() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await account.get();
        const loggedIn = Boolean(user && user.$id);
        setIsLoggedIn(loggedIn);

        if (loggedIn && user.prefs) {
          const adminCheck = user.prefs.isAdmin === true || user.prefs.isAdmin === "true";
          setIsAdmin(adminCheck);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    
    checkSession();
  }, [pathname]);

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