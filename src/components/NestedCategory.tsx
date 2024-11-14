import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import { Link } from 'react-router-dom';


// Define the type for the Category structure
interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

// Utility hook to detect clicks outside of the dropdown
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return ref;
};

// Reusable CategoryComponent to handle categories and subcategories
const CategoryComponent: React.FC<{ category: Category }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subIsOpen, setSubIsOpen] = useState<number | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubToggle = (id: number) => {
    setSubIsOpen(subIsOpen === id ? null : id);
  };

  const ref = useClickOutside(() => {
    setIsOpen(false)
    setSubIsOpen(null)
  })

  return (
    <li className="relative">
      <button onClick={handleToggle} className={`cursor-pointer px-4 py-2 ${ isOpen ? 'text-blue-400': ''} hover:text-blue-400 group flex flex-nowrap items-center gap-2`}>
        {category.name} {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
      </button>

      {isOpen && category.subcategories && category.subcategories.length > 0 && (
        <ul ref={ref} className="absolute left-0 bg-white shadow-lg mt-1 w-fit z-10 list-none">
          {category?.subcategories.map((subcategory) => (
            <li key={subcategory.id} className="relative">
              <button
                onClick={() => handleSubToggle(subcategory.id)}
                className={`cursor-pointer block px-4 py-2 hover:bg-blue-100 text-black ${ subIsOpen === subcategory.id ? 'text-blue-600 bg-blue-100' : '' } hover:text-blue-600 w-full text-left text-nowrap`}
              >
                {subcategory.name} 
              </button>

              {subIsOpen === subcategory.id &&
                subcategory.subcategories &&
                subcategory.subcategories.length > 0 && (
                  <ul className="list-none absolute top-0 left-full bg-white shadow-lg w-fit text-nowrap z-10">
                    {subcategory?.subcategories?.map((subSubcategory, index) => (
                      <Link key={index} to={`/category/${subSubcategory.name.toLowerCase().split(' ').join('-')}`} className='no-underline'>
                        <li key={subSubcategory.id}>
                          <span className="cursor-pointer block px-4 py-2 hover:bg-blue-100 text-black hover:text-blue-600">
                            {subSubcategory.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Parent Component to render the main list of categories
const Categories: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex space-x-4 px-4 list-none">
        {categories?.map((category) => (
          <CategoryComponent key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
};

export default Categories