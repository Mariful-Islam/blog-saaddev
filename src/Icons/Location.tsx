import React from 'react';

interface IconProps {
    className?: string;
    stroke?: string;
    onClick?: () => void;
}

const Location: React.FC<IconProps> = ({ className, stroke = "black", onClick }) => {
    return (
        <svg className={className} onClick={onClick} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.978 10.737 19.276 11.28 19.738C11.3932 19.8333 11.5195 19.911 11.6538 19.9674C11.788 20.0238 11.9284 20.058 12.07 20.058C12.2116 20.058 12.352 20.0238 12.4862 19.9674C12.6205 19.911 12.7468 19.8333 12.86 19.738C13.403 19.276 19 13.978 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C11.0054 11.5 10.0516 11.1317 9.34835 10.4284C8.64509 9.72518 8.27679 8.77139 8.27679 7.77679C8.27679 6.78218 8.64509 5.82839 9.34835 5.12514C10.0516 4.42188 11.0054 4.05357 12 4.05357C12.9946 4.05357 13.9484 4.42188 14.6516 5.12514C15.3549 5.82839 15.7232 6.78218 15.7232 7.77679C15.7232 8.77139 15.3549 9.72518 14.6516 10.4284C13.9484 11.1317 12.9946 11.5 12 11.5Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Location;
