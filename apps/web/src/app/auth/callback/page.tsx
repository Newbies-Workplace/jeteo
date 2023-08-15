'use client';

import { useAuth } from "@/contexts/Auth.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Dialog } from "@/components/molecules/dialog/Dialog";

export default function Page() {
  const { fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser().then(() => {
      router.push('/');
    });
  }, []);

  return (
    <GalaxyBackground>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Dialog title="Jeszcze chwila ⌛" style={{ zIndex: 1 }}></Dialog>
      </div>
    </GalaxyBackground>
  );
}
