"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";


export const IsFullyRegistered: React.FC = () => {
    const { user } = useAuth();


    {/* TODO: dodac tu komponent z karteckzami eventu */}
    return (
        <div>Dokoncz rejestracje</div>
    );
};