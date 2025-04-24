/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  organizationOutlineAtom,
  organizationsAtom,
} from "../../_state/atoms/organizations";
import { useOrganization } from "../../_actions/organizations.actions";
import { useRecoilValue } from "recoil";
import { PlusIcon } from "../../icons";
import { useNavigate } from "react-router";
import OrgTable from "./OrgTable";
import OrganizationHeader from "./components/Header";
import OrgGrid from "./OrgGrid";
import React from "react";

export default function Organization() {
  const orglist: any = useRecoilValue(organizationsAtom);
  const orgAction = useOrganization();
  const navigate = useNavigate();
  const selectedOutline = useRecoilValue(organizationOutlineAtom);
  const [search, setSearch] = useState("");

  const [orglistFiltered, setOrglistFiltered] = useState<any[]>([]);
  useEffect(() => {
    orgAction.getOrganizations();
  }, []);

  useEffect(() => {
    if (orglist && search?.trim()?.length > 0) {
      const newList = orglist.filter((list) =>
        list?.name?.toLowerCase().includes(search?.toLowerCase())
      );
      setOrglistFiltered(newList);
    } else {
      setOrglistFiltered(orglist);
    }
  }, [search, orglist]);

  return (
    <>
      <PageMeta title="Proprly | Admin" description="Admin Website" />
      <PageBreadcrumb pageTitle="Organizations" hasNav={false} />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-5">
        {(orglist && orglist.length === 0 && (
          <div className="mx-auto w-full max-w-[630px] text-center">
            <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
              Please start by creating a new organization!
            </h3>

            <div className="flex flex-col justify-center items-center mt-10">
              <div>
                <button
                  onClick={() => navigate("organization/new")}
                  className={`flex items-center justify-center px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 `}
                >
                  <PlusIcon />
                  Add New Organization
                </button>
              </div>
            </div>
          </div>
        )) || (
            <>
              <OrganizationHeader setSearch={setSearch} />
              {selectedOutline === "table" ? (
                <OrgTable orglist={orglistFiltered} />
              ) : (
                <OrgGrid orglist={orglistFiltered} />
              )}
            </>
          )}
      </div>
    </>
  );
}
