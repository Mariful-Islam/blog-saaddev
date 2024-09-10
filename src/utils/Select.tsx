import React, { useState } from "react";
import { PostTypes } from "../components/Home/HomeMain";

interface TagInputProps {
  formData?: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Select=({ formData, setFormData }: TagInputProps) => {
  const [value, setValue] = useState("")
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {value} = event.target as HTMLFormElement
    if (event.key === "Enter") {
      event.preventDefault();
      setFormData((prev:PostTypes)=>({...prev, tag: formData?.tag ? formData?.tag?.concat(', ' + value) : value}))
      setValue("")
    }
  };

  const handleRemoveTag = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setFormData((prev:PostTypes)=>({...prev, tag: formData?.tag?.split(",").filter((_:any, i:number) => i !== index).toString()}));
  };

  return (
    <div className="w-full flex gap-2 border border-gray-400 px-2 py-[2px] rounded-md active:border-blue-600">
      <div className="flex flex-wrap items-center gap-2 w-full">
        {formData?.tag?.split(",")?.map((value: string, index: number) => (
          <div
            key={index}
            className="bg-blue-100 flex justify-between items-center gap-4 pl-2 py-[1px] text-sm rounded-md text-blue-600"
          >
            {value}
            <button
              onClick={(e) => handleRemoveTag(e, index)}
              className="bg-red-200 text-red-600 hover:bg-red-300 rounded-md px-2 py-[2px] flex justify-center items-center"
            >
              x
            </button>
          </div>
        ))}
        <input
          type="text"
          name="tags"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Press enter to add tags"
          className="relative group rounded-md text-sm border-none outline-none ring-o focus:border-none focus:outline-none focus:ring-0 focus:shadow-none"
        />
      </div>
    </div>
  );
};

export default Select;
