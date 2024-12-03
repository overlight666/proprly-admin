/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

import { FaAngleDown, FaAngleUp, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { OrgState, ProjectState } from "../../types";
import { getCommonAreaReducer } from "../../store/features/reducers";
import CommonAreaLocationMappingTable from "../../components/commonAreaLocationMappingTable";

const CommonAreaConfigure: FC = function () {
  const { project_id, common_area_id }: any = useParams();
  const { selectedProject, commonAreaIdle, commonAreaItem }: ProjectState =
    useSelector((state: any) => state.project);
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const [showCard1, setShowCard1] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isInit = false;

  useEffect(() => {
    if (!isInit) {
      dispatch(getCommonAreaReducer(common_area_id));
      isInit = true;
    }
  }, []);

  useEffect(() => {
    console.log(commonAreaItem);
  }, [commonAreaItem]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      {!commonAreaIdle && (
        <div className="fixed z-50 flex h-screen w-full items-center bg-white/30 backdrop-blur-sm">
          <div role="status" className="ml-[37%]">
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
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <div className="flex w-full items-center justify-between">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="/organization">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Organizations</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}`}
              >
                {selectedOrganization?.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}/project/${project_id}`}
              >
                {selectedProject?.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}/project/${project_id}/common-area`}
              >
                Common Areas
              </Breadcrumb.Item>
              <Breadcrumb.Item>Configure</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="mr-1 flex cursor-pointer items-center gap-2 text-gray-500"
              onClick={() => {
                navigate(-1);
              }}
            >
              <FaChevronLeft />
              Back
            </div>
          </div>
          <div className="flex  w-full items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Configure Common Area
            </h1>
          </div>
          <div className="flex w-full flex-col">
            <div
              className="flex w-full items-center justify-between border-b-[1px]"
              onClick={() => setShowCard1(!showCard1)}
            >
              <h1 className="mb-5 mt-7 font-bold">
                Common Area Location Mapping
              </h1>
              {showCard1 ? (
                <FaAngleUp className="h-[50px] cursor-pointer" />
              ) : (
                <FaAngleDown className="h-[50px] cursor-pointer" />
              )}
            </div>
            {showCard1 && <CommonAreaLocationMappingTable />}
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default CommonAreaConfigure;
