const Cross = ({ className, onClick }: { className?: string, onClick?: () => void }) => {
    return (
        <svg className={className} onClick={onClick} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4284_2628)">
                <path d="M13.5 0.5L0.5 13.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M0.5 0.5L13.5 13.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4284_2628">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default Cross