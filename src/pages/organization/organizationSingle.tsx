/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome, HiPlus } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, ProjectState, ReducerTypes } from "../../types";
import { type OrgState } from "../../types";
import { useParams } from "react-router-dom";
import { updateOrgTab, updateProjectTab } from "../../store/features/appSlice";
import ProjectFullTable from "../../components/projectFullTable";
import {
  clearProject,
  clearProjectList,
} from "../../store/features/projectSlice";
import { clear } from "../../store/features/imageSlice";
import Dashboard from "./dashboard";
import { setSelectedOrganization } from "../../store/features/organizationSlice";
import ProjectHeader from "../../components/projectHeader";
import { getProjects } from "../../store/features/reducers";

const OrganizationSingle: FC = function () {
  const { orgList, selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { orgTab }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const { projectList, loadedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const { id }: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoPage = (page) => {
    navigate(`${page}`);
  };

  useEffect(() => {
    if (!selectedOrganization) {
      const newList = orgList && orgList.find((org) => org.id == id);
      dispatch(setSelectedOrganization(newList));
    } else {
      if (selectedOrganization && selectedOrganization.id != id) {
        const newList = orgList && orgList.find((org) => org.id == id);
        dispatch(setSelectedOrganization(newList));
        dispatch(clearProjectList());
        dispatch(getProjects(id));
      }
    }
  }, []);

  useEffect(() => {
    dispatch(updateOrgTab(1));
  }, []);

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
                {selectedOrganization?.name}
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
              {selectedOrganization?.name}
            </h1>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updateOrgTab(1))}
                  className={
                    orgTab === 1
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                >
                  <svg
                    className={
                      orgTab === 1
                        ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                        : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                    }
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7034 1.25H1.29597C0.902212 1.25 0.583008 1.58579 0.583008 2V11C0.583008 11.4142 0.902212 11.75 1.29597 11.75H12.7034C13.0971 11.75 13.4163 11.4142 13.4163 11V2C13.4163 1.58579 13.0971 1.25 12.7034 1.25Z"
                      fill="white"
                    />
                    <path
                      d="M9.13856 1.25V11.75M4.86079 1.25V11.75M1.29597 1.25H12.7034C13.0971 1.25 13.4163 1.58579 13.4163 2V11C13.4163 11.4142 13.0971 11.75 12.7034 11.75H1.29597C0.902212 11.75 0.583008 11.4142 0.583008 11V2C0.583008 1.58579 0.902212 1.25 1.29597 1.25Z"
                      stroke={orgTab === 1 ? `#1A56DB` : `#6B7280`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updateOrgTab(2))}
                  className={
                    orgTab === 2
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                  aria-current="page"
                >
                  <svg
                    className={
                      orgTab === 2
                        ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                        : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                    }
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill={orgTab === 2 ? `#1A56DB` : `#6B7280`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.6 3.3H9.4101L7.7301 1.06C7.59936 0.886486 7.43019 0.745624 7.23587 0.648464C7.04155 0.551303 6.82736 0.500486 6.6101 0.5H3.5C3.1287 0.5 2.7726 0.6475 2.51005 0.91005C2.2475 1.1726 2.1 1.5287 2.1 1.9V2.6H1.4C1.0287 2.6 0.672601 2.7475 0.41005 3.01005C0.1475 3.2726 0 3.6287 0 4V13.1C0 13.4713 0.1475 13.8274 0.41005 14.0899C0.672601 14.3525 1.0287 14.5 1.4 14.5H10.5C10.8713 14.5 11.2274 14.3525 11.4899 14.0899C11.7525 13.8274 11.9 13.4713 11.9 13.1V12.4H12.6C12.9713 12.4 13.3274 12.2525 13.5899 11.9899C13.8525 11.7274 14 11.3713 14 11V4.7C14 4.3287 13.8525 3.9726 13.5899 3.71005C13.3274 3.4475 12.9713 3.3 12.6 3.3ZM1.4 4H4.5101L5.5601 5.4H1.4V4ZM1.4 13.1V6.8H10.5V13.1H1.4ZM12.6 11H11.9V6.8C11.9 6.4287 11.7525 6.0726 11.4899 5.81005C11.2274 5.5475 10.8713 5.4 10.5 5.4H7.3101L5.6301 3.16C5.49936 2.98649 5.33019 2.84562 5.13587 2.74846C4.94155 2.6513 4.72736 2.60049 4.5101 2.6H3.5V1.9H6.6101L8.5001 4.42C8.5653 4.50694 8.64985 4.5775 8.74705 4.6261C8.84425 4.6747 8.95143 4.7 9.0601 4.7H12.6V11Z" />
                  </svg>
                  Projects
                </a>
              </li>
            </ul>
          </div>
          {!projectList && (
            <div className={`w-full mt-5 h-[200px] overflow-hidden`}>
              <img
                className="object-fill h-[200px] w-full"
                src={`${selectedOrganization?.image.url}`}
                alt=""
              />
            </div>
          )}
        </div>

        {loadedProject ? (
          orgTab === 1 ? (
            projectList && projectList.length > 0 ? (
              <Dashboard />
            ) : (
              <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
                <span className="text-gray-600">
                  <b>Congratulations</b> on creating your first Organization!!
                  Please add a project before adding any properties
                </span>
                <Button
                  onClick={() => {
                    dispatch(clear());
                    dispatch(clearProject());
                    dispatch(updateProjectTab(1));
                    gotoPage(`/organization/${id}/new`);
                  }}
                  className="mt-7 w-[200px]"
                >
                  <div className="flex items-center gap-x-2 text-xs">
                    <HiPlus />
                    Add new project
                  </div>
                </Button>
              </div>
            )
          ) : (
            <div className="flex w-full flex-col">
              <ProjectHeader />
              <div className="p-5">
                <ProjectFullTable />
              </div>
            </div>
          )
        ) : (
          <div className="fixed z-50 flex h-screen w-full bg-white/30 backdrop-blur-sm">
            <div role="status" className="ml-[37%] mt-[10%]">
              <svg
                aria-hidden="true"
                className="h-20 w-20 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </NavbarSidebarLayout>
  );
};

export default OrganizationSingle;
