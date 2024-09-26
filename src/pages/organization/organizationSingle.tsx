/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome, HiPlus } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Organization } from "../../types";
import { type OrgState } from "../../types";
import { useParams } from "react-router-dom";

const OrganizationSingle: FC = function () {
  const { orgList }: OrgState = useSelector((state: any) => state.organization);
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<Organization>();
  const gotoPage = (page) => {
    navigate(`${page}`);
  };

  useEffect(() => {
    const newList = orgList.find((org) => org.id == id);
    setSelectedOrg(newList);
  }, [id, orgList]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="overflow-x-auto bg-[#ffffff] ">
        <div className="col-span-full p-5">
          <div className="col-span-full">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="/organization">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Organizations</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/organization/new">
                {selectedOrg?.name}
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
              {selectedOrg?.name}
            </h1>
          </div>
          <div className={`w-full mt-5 h-[200px] overflow-hidden`}>
            <img src={`${selectedOrg?.image.url}`} alt="" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
          <span className="text-gray-600">
            Please start by creating a new organization!
          </span>
          <Button
            onClick={() => gotoPage("/organization/new")}
            className="mt-7 w-[200px]"
          >
            <div className="flex items-center gap-x-2 text-xs">
              <HiPlus />
              Add new project
            </div>
          </Button>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default OrganizationSingle;
