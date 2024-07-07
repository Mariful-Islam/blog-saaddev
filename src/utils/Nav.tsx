import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { MenuItemProps } from './types'


interface DropdownMenuProps {
    buttonText: string;
    menuItems: MenuItemProps[];
    className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonText, menuItems, className }) => {
    return (
        <Menu as="div" className={`relative inline-block text-left ${className}`}>
            <div>
                <MenuButton className="flex flex-col w-full justify-center gap-2 gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-600">
                    {buttonText}
                    <span className='h-[2px] bg-white w-8'></span>
                    <span className='h-[2px] bg-white w-8'></span>
                    <span className='h-[2px] bg-white w-8'></span>
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
