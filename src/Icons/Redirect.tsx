import React from 'react';

interface IconProps {
    className?: string;
    onClick?: () => void;
}

const Redirect: React.FC<IconProps> = ({ className, onClick }) => {
    return (
        <svg className={className} onClick={onClick} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.537 7.294a.75.75 0 0 1 1.06-.017l3.587 3.5a.75.75 0 0 1 .016 1.061l-3.5 3.587a.75.75 0 0 1-1.076-1.043l2.092-2.13H7.75c-2.69 0-4.526 1.1-5.875 2.663C.525 16.58-.002 18.528-.002 20.5a.75.75 0 0 1-1.5 0c0-2.5.57-5.068 2.297-7.186C2.618 11.092 5.434 9.5 8.75 9.5h5.647l-2.092-2.13a.75.75 0 0 1-.017-1.076z" fill="black" />
        </svg>
    );
};

export default Redirect;