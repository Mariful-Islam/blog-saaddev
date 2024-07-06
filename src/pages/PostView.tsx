const PostView = () => {
    const post = "<h1>iojcidfovjcdf</h1> <div class='text-xl font-medium text-black'>Title</div> <p class='text-gray-500'>This is a paragraph styled using Tailwind CSS.</p>"
    return (
        <div>
            <div className="px-[12%]">
                <strong className="font-bold text-xl">heloo</strong>
                <div className="flex justify-between">
                    <span>Saad</span> <span>12 jun 2024</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post }} />
            </div>
        </div>
    )
}

export default PostView