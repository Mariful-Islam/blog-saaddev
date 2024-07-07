import { Link } from "react-router-dom";
import { Carousel } from "../utils"

export const blogs = [
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "Bhashani university students stage anti-quota movement in Tangail",
        desc: "Several hundred students of Mawlana Bhashani Science and Technology University staged a demonstration on the university campus in Tangail today protesting the reinstatement of the quota system in government jobs.",
        author: "Saad",
        date: "23 july 2024",
        tags: ['django', 'python', 'machine learning', 'data science']
    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
    {
        title: "UK's Sunak says 'sorry' to public as he leaves office",
        desc: "I am sorry he said before leaving Downing Street to tender his resignation as prime minister to King Charles III. I have heard your anger, your disappointment, and I take responsibility.",
        author: "Mariful",
        date: "24 jun 2024",
        tags: ['django', 'python', 'machine learning', 'data science']

    },
]



const Home = () => {
    const items1 = [
        <div className="flex flex-col justify-center items-center p-4 bg-blue-600 h-[300px]">
            <strong className="text-[60px] flex flex-wrap text-white">Technology Changing the World </strong>
            <span className="text-[20px] text-white font-bold">Machine Learning LLM DevOps</span>
        </div>,
        <div className="p-4 flex flex-col justify-center items-centerbg-blue-600 text-black text-center  h-[300px]">
            <strong className="text-[60px] text-white">Sharing knowledge</strong>
            <span className="text-[20px] text-white font-bold">Scrape to the pick</span>
        </div>,
        <div className="p-4 flex flex-col justify-center items-center bg-blue-600 text-black text-center  h-[300px]">
            <strong className="text-[60px] text-white">Problem Solving</strong>
            <span className="text-[20px] text-white font-bold">Makes your brain healthy</span>
        </div>
    ];


    return (
        <div className="">
            <div className="bg-blue-600">
                <Carousel items={items1} className="h-1/2" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-8 px-[10%]">
                {blogs.map((blog, index) => (
                    <div key={index} className="border border-blue-600 max-w-[300px] p-6 rounded-md flex flex-col gap-4 shadow-lg">
                        <Link to={`/post/dfvrfv`} className="text-xl font-semibold hover:text-blue-600 cursor-pointer">{blog.title}</Link>
                        <p className="text-justify">{blog.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag) => (
                                <Link to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <Link to={`/profile/saad`} className="text-blue-600 cursor-pointer hover:underline">{blog.author}</Link> <span className="text-sm">{blog.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home