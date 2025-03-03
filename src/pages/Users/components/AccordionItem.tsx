/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccordionItem as Item } from "@szhsin/react-accordion";
import { ChevronDownIcon } from "../../../icons";
import React from "react";
export const AccordionItem = ({ header, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <ChevronDownIcon
          className={`size-5 ml-auto transition-transform duration-200 ease-out ${
            isEnter && "rotate-180"
          }`}
        />
      </>
    )}
    className="dark:text-gray-400 shadow-lg border-[1px] dark:border-gray-800 rounded-md "
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left dark:hover:bg-gray-700 hover:bg-gray-200 bg-gray-100 dark:bg-gray-800 ${
          isEnter && "dark:bg-gray-700"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);
