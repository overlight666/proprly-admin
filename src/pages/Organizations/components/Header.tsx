/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../../../components/form/input/InputField";
import { GridIcon, PlusIcon, SearchIcon, TableIcon } from "../../../icons";
import Button from "../../../components/ui/button/Button";
import { useRecoilValue } from "recoil";
import { organizationOutlineAtom } from "../../../_state/atoms/organizations";
import { useOrganization } from "../../../_actions/organizations.actions";
import { useNavigate } from "react-router";
import React from "react";

export default function OrganizationHeader({ setSearch }: any) {
  const selectedOutline = useRecoilValue(organizationOutlineAtom);
  const orgAction = useOrganization();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between flex-row items-center">
        <div
          className="flex space-x-2 w-full
      "
        >
          <div className="relative w-[40%]">
            <Input
              placeholder="Search"
              type="text"
              className="pl-[62px] "
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <SearchIcon className="size-6" />
            </span>
          </div>
          <Button
            onClick={() => {
              orgAction.setOrganizationHeaderOutline("grid");
            }}
            size="sm"
            variant={selectedOutline === "grid" ? "primary" : "outline"}
            startIcon={<GridIcon className="size-5" />}
          ></Button>
          <Button
            onClick={() => {
              orgAction.setOrganizationHeaderOutline("table");
            }}
            size="sm"
            variant={selectedOutline === "table" ? "primary" : "outline"}
            startIcon={<TableIcon className="size-5" />}
          ></Button>
        </div>
        <Button
          className="w-[25%]"
          onClick={() => navigate("organization/new")}
          size="sm"
          variant="primary"
          startIcon={<PlusIcon />}
        >
          Add Organization
        </Button>
      </div>
    </>
  );
}
