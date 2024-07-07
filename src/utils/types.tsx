import { ReactNode } from "react";
import { Settings } from "react-slick";


export interface ButtonTypes {
    color: string;
    variant: string;
    children: ReactNode;
    onClick?: () => void;
}

export interface CarouselProps {
    items: ReactNode[];
    settings?: Settings;
    className?: string;
}

export interface MenuItemProps {
    type: 'link' | 'button';
    label: string;
    href?: string;
    onClick?: () => void;
}