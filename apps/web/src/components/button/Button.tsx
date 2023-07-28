'use client';
import React from "react";
import cs from 'classnames';
import styles from "./Button.module.scss";
import Image from 'next/image'

interface ButtonProps {
    className?: string
    primary?: boolean
    style?: React.CSSProperties
    icon?: string
    iconSize?: number
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    size?: 'medium' | 'small'
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (
    {
        children,
        className,
        primary = false,
        type = 'button',
        onClick,
        size = 'medium',
        style,
        icon,
        iconSize,
    }
) => {
    return (
        <button
            type={type}
            className={
                cs(styles.button, {
                    [styles.primary]: primary,
                    [styles.medium]: size === 'medium',
                    [styles.small]: size === 'small',
                }, className)
            }
            style={style}
            onClick={onClick}>
            {icon&&
                <Image alt={"icon"} src={icon} width={iconSize} />
            }   
            {children}
        </button>
    )
}

export default Button;