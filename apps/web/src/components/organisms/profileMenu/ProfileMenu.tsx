'use client'

import UserMenu from "./menus/userMenu/UserMenu";
import GuestMenu from "./menus/guestMenu/GuestMenu";
import { useAuth } from "@/contexts/Auth.hook";
import Image from "next/image";
import burger from "@/assets/Burger.svg";
import styles from "./ProfileMenu.module.scss";
import { useState, useRef, useEffect } from 'react';




export default function ProfileMenu() {
    const { user } = useAuth();

    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.menuContainer} ref={dropdownRef}>
            <Image alt="Open menu" src={burger} onClick={() => setShowMenu(!showMenu)} /> 
            <div className={styles.menuContainer}>
                {showMenu && (
                    user ? <UserMenu /> : <GuestMenu />
                )}
            </div>
        </div>
    );
}