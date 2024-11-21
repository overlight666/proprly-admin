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
    const newList = orgList && orgList.find((org) => org.id == id);
    dispatch(setSelectedOrganization(newList));
  }, [id, orgList]);

  useEffect(() => {
    dispatch(updateOrgTab(1));
  }, []);

  useEffect(() => {
    dispatch(clearProjectList());
    dispatch(getProjects(id));
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
              {/* <div className="w-full border-b-2 py-5">
                <div className="flex">
                  <div className="flex mx-5 w-[80%]">
                    <div className="relative col-span-3 w-[40%]">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="z-20 w-full block rounded-[5px] rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <Button color="gray" className="mx-5">
                      <div className="flex items-center gap-x-2 text-xs">
                        <svg
                          width="10"
                          height="13"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.94485 10.1516L8.9449 10.1517L8.95116 10.1457L9.49984 9.61893V11.3C9.49984 11.4789 9.426 11.6548 9.28747 11.7878C9.14824 11.9215 8.95522 12 8.74988 12H1.21312C1.01473 11.9956 0.830095 11.9162 0.698099 11.7851C0.56594 11.6538 0.497209 11.482 0.500087 11.3083L0.500156 11.3083V11.3V5.2H3.12506C3.58275 5.2 4.02559 5.02564 4.35519 4.70922C4.68548 4.39212 4.87502 3.9576 4.87502 3.5V1H8.78686C8.98526 1.00443 9.1699 1.0838 9.3019 1.21492C9.43406 1.34619 9.50279 1.51802 9.49991 1.69172L9.49984 1.69171V1.7V5.78107L8.95382 5.25687C8.84983 5.15443 8.72693 5.07368 8.59265 5.0183C8.45686 4.96231 8.31152 4.93309 8.16495 4.93187C8.01838 4.93064 7.87258 4.95743 7.73589 5.01112C7.59918 5.06482 7.47365 5.14463 7.36715 5.24687C7.2606 5.34917 7.17518 5.47194 7.11693 5.6086C7.05867 5.74532 7.02906 5.89258 7.03041 6.04157C7.03176 6.19055 7.06402 6.33723 7.12471 6.47286C7.14438 6.51682 7.16688 6.55928 7.192 6.6H4.37502C4.08309 6.6 3.79921 6.71114 3.58682 6.91505C3.37373 7.11962 3.25004 7.40153 3.25004 7.7C3.25004 7.99847 3.37373 8.28038 3.58682 8.48495C3.79921 8.68886 4.08309 8.8 4.37502 8.8H7.19844C7.09823 8.96834 7.04395 9.16231 7.04577 9.36317C7.04844 9.6582 7.17185 9.93614 7.38251 10.1384C7.5925 10.34 7.87246 10.451 8.1611 10.4534C8.44973 10.4558 8.73146 10.3495 8.94485 10.1516ZM0.984208 3L2.62506 1.42473V3H0.984208Z"
                            fill="#1F2A37"
                            stroke="#111928"
                          />
                        </svg>
                        Export CSV
                      </div>
                    </Button>
                  </div>
                  <Button
                    color="primary"
                    className="mx-5 "
                    onClick={() => {
                      dispatch(clear());
                      dispatch(clearProject());
                      dispatch(updateProjectTab(1));
                      gotoPage(`/organization/${id}/new`);
                    }}
                  >
                    <div className="flex items-center gap-x-2 text-xs">
                      <HiPlus />
                      Add new project
                    </div>
                  </Button>
                </div>
              </div> */}
              <ProjectHeader />
              <div className="p-5">
                {/* <div className="flex items-center">
                  <div className="flex items-center me-4">
                    <span>Show only:</span>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-radio"
                      type="radio"
                      value=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      All
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      value=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Properties
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      checked
                      id="inline-checked-radio"
                      type="radio"
                      value=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-checked-radio"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Common Areas
                    </label>
                  </div>
                </div> */}
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
