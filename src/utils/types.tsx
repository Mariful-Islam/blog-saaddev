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
}