import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { MenuItemProps } from './types'


interface DropdownMenuProps {
    buttonText?: string;
    menuItems: MenuItemProps[];
    className?: string;
    menuStyle?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonText, menuItems, className, menuStyle = "three_line" }) => {
    return (
        <Menu as="div" className={`relative inline-block text-left ${className}`}>
            <div>
                <MenuButton className="flex flex-col w-full justify-center gap-2 gap-x-1.5 rounded-md text-sm font-semibold text-white shadow-sm ring-0 ">
                    {buttonText}
                    {menuStyle === "three_line" ?
                        <div className={`flex flex-col gap-2`}>
                            <span className='h-[2px] bg-white w-6'></span>
                            <span className='h-[2px] bg-white w-6'></span>
                            <span className='h-[2px] bg-white w-6'></span>
                        </div> :
                        <div className={`flex gap-1 py-2 ${menuStyle === "three_dot" ? '' : 'hidden'}`}>
                            <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                            <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                            <span className='h-1 w-1 rounded-full bg-gray-400'></span>

                        </div>
                    }
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {menuItems.map((item, index) => (
                        item.type === 'link' ? (
                            <MenuItem key={index}>
                                <a
                                    href={item.href}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    {item.label}
                                </a>
                            </MenuItem>
                        ) : (
                            <MenuItem key={index}>
                                <button
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    onClick={item.onClick}
                                >
                                    {item.label}
                                </button>
                            </MenuItem>
                        )
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}

export default DropdownMenu
