import React, { FunctionComponent, ReactNode } from "react";
import styles from "./image-banner.module.css";
import NextImage from "next/legacy/image"

export const ImageBanner: FunctionComponent<{
    imageSrc: string;
    alt?: string;
}> = ({imageSrc, alt}) => (
    <div className={styles.imageWrap}>
        {imageSrc ? (
            <NextImage
                src={imageSrc}
                alt={alt ?? ``}
                layout="fill"
                className={`${styles.image}`}
                priority={true}
            />
        ) : undefined}
    </div>
)
