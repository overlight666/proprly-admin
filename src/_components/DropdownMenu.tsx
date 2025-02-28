/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MoreDotIcon } from "../icons";
import { Dropdown } from "../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../components/ui/dropdown/DropdownItem";

export default function DropdownMenu({ items }: any) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative inline-block">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
      </button>
      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
        {items &&
          items.length > 0 &&
          items.map((i: any, index: any) => {
            return (
              <DropdownItem
                key={index}
                onItemClick={() => {
                  i.action();
                  closeDropdown();
                }}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {i.label}
              </DropdownItem>
            );
          })}
      </Dropdown>
    </div>
  );
}
