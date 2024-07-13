import React, { useState } from 'react';

interface TagInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Select: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (e: any, index: number) => {
        e.preventDefault()
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className='flex gap-2 border border-gray-400 px-2 py-1 rounded-md active:border-blue-600'>
            <div className="flex flex-wrap items-center gap-2 ">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-blue-100 flex justify-between items-center gap-4 pl-2 py-[1px] text-sm rounded-md text-blue-600">
                        {tag}
                        <button onClick={(e) => handleRemoveTag(e, index)} className='bg-red-200 text-red-600 hover:bg-red-300 rounded-md px-2 py-[2px] flex justify-center items-center'>x</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Press enter to add tags"
                    className='relative group rounded-md text-sm border-none outline-none ring-o focus:border-none focus:outline-none focus:ring-0 focus:shadow-none'
                />
            </div>


        </div>
    );
};

export default Select;
