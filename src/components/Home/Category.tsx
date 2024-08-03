const categories = [
    'python', 'javascripts', 'emca', 'c++', 'programming'
]
function Category() {
    return (
        <div>
            <div className="flex gap-2 py-4 justify-center items-center">
                {categories?.map((category, i) => (
                    <div className="border border-blue-600 rounded-full px-6 py-2 hover:bg-blue-600 cursor-pointer hover:text-white font-semibold" key={i}
                    >
                        {category}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Category