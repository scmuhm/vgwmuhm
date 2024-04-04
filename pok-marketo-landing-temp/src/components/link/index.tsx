import React, { FunctionComponent, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";
import styles from "./link.module.css";

export const Link: FunctionComponent<
    LinkProps & {
    label?: string;
    boldLink?: boolean;
    newWindow?: boolean;
    color?: string;
    children: ReactNode;
}
> = ({ label, boldLink, newWindow, children, href, ...rest }) => {
    return (
        <NextLink
            href={href}
            aria-label={label}
            target={newWindow ? `_blank` : `_self`}
            rel={newWindow ? `noopener noreferrer` : ``}
            className={`${styles.link} ${boldLink && styles.boldLink}`}
            {...rest}
        >
            {children}
        </NextLink>
    );
};
