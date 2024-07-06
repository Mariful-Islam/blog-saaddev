const Search = ({ className, stroke = "black", onClick }: { className?: string, stroke?: string, onClick?: () => void }) => {
    return (
        <svg className={className} onClick={onClick} width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4287_3461)">
                <path d="M6 11.5C9.03757 11.5 11.5 9.03757 11.5 6C11.5 2.96243 9.03757 0.5 6 0.5C2.96243 0.5 0.5 2.96243 0.5 6C0.5 9.03757 2.96243 11.5 6 11.5Z" stroke={stroke} stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5 13.5L10 10" stroke={stroke} stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4287_3461">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default Search