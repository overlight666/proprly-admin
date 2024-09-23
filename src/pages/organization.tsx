/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

const OrganizationPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="overflow-x-auto bg-[#ffffff] ">
        <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
          <span className="text-gray-600">
            Please start by creating a new organization!
          </span>
          <Button type="submit" className="mt-7 w-[200px]">
            <div className="flex items-center gap-x-2 text-xs">
              <HiPlus />
              Add new organization
            </div>
          </Button>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default OrganizationPage;
