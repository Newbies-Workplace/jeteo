"use client"; //todo change to server component

import { useAuth } from "@/contexts/Auth.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser().then(() => {
      router.push("/");
    });
  }, []);

  return (
    <div>
      callback, pobieramy swoje dane i robimy eluwine tam gdzie byliśmy
      wcześniej
    </div>
  );
}
