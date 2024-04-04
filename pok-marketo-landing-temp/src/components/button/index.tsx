import React from 'react';
import styles from './button.module.css';
type ButtonColor = 'black' | 'red' | 'white' | 'orange' | undefined

type ButtonType = 'default' | 'hero'

export interface ButtonProps {
    url: string,
    label: string,
    className? :string,
    color?: ButtonColor,
    type?: ButtonType,
    target?: string
}

export default function Button({ url, label, className, color, type, target }: ButtonProps) {
    function getButtonColorClass(): string {
        switch (color) {
            case ('red'): {
                return styles.redButton
            }
            case ('white'): {
                return styles.whiteButton
            }
            case ('orange'): {
                return styles.orangeButton
            }
            default: {
                return styles.blackButton
            }
        }
    }

    return (
        <a
            href={url}
            className={`
                ${className} 
                ${getButtonColorClass()} 
                ${styles.button}`
            }
            target={target ?? '_self'}
        >
            {label}
        </a>
    );
};
