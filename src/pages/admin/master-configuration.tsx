/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import ErrorHandler from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  ImageState,
  OrgState,
  Project,
  ProjectState,
  ReducerTypes,
} from "../../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";
import { updateMasterTab } from "../../store/features/appSlice";
import {
  // getTowersReducer,
  getSingleProject,
  getDefectCodeListByProject,
  getTradeCodeListByProject,
  getAllChecklistReducer,
  getAllCommonAreaReducer,
  getProjects,
} from "../../store/features/reducers";

import {
  clearSelectedProject,
  clearTrigger,
  selectCommonArea,
  selectCommonAreaElement,
  selectElement,
  selectZone,
  setResponseStatus,
  updateTowers,
} from "../../store/features/projectSlice";
import { setSelectedOrganization } from "../../store/features/organizationSlice";

import ConfigureAccordion from "./items/configure";
import { Label } from "flowbite-react";

const MasterConfiguration: FC = function () {
  const { id, project_id }: any = useParams();
  const { orgList, selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization,
  );

  const {
    projectResponse,
    towerResponse,
    projectTrigger,
    selectedProject,
    isIdle,
    responseStatus,
  }: ProjectState = useSelector((state: any) => state.project);

  const [searchAddress] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const dispatch = useDispatch();
  const { masterTab }: AppState = useSelector(
    (state: ReducerTypes) => state.application,
  );

  const [isUpdate, setIsUpdate] = useState(false);

  const [unitNo, setUnitNo] = useState<any>("");
  const [line1, setLine1] = useState<any>("");
  const [line2, setLine2] = useState<any>("");
  const [line3, setLine3] = useState<any>("");
  const [firstLoad, setFirstLoad] = useState(true);
  const myImage: ImageState = useSelector((state: any) => state.uploads);
  // let didInit = false;

  useEffect(() => {
    if (towerResponse && towerResponse.id && towerResponse.id > 0) {
      // dispatch(getTowersReducer(project_id));
      dispatch(getSingleProject(project_id));
    }
  }, [towerResponse]);

  useEffect(() => {
    if (!selectedOrganization) {
      const newList = orgList && orgList.find((org) => org.id == id);
      dispatch(setSelectedOrganization(newList));
    }
  }, [id, orgList]);

  useEffect(() => {
    if (responseStatus === "project_update") {
      dispatch(getProjects(id));
      dispatch(getSingleProject(project_id));
      dispatch(setResponseStatus(""));
      toast.info("Project updated");
    }
  }, [responseStatus]);

  useEffect(() => {
    // if (!didInit) {
    if (isIdle) {
      if (!selectedProject) {
        dispatch(getSingleProject(project_id));
      }
      if (selectedProject) {
        dispatch(clearSelectedProject());
        dispatch(getSingleProject(project_id));
      }
      //   didInit = true;
      // }
    }
  }, []);
  useEffect(() => {
    // if (!didLoad) {
    dispatch(selectCommonArea(undefined));
    dispatch(selectCommonAreaElement(undefined));
    dispatch(selectZone(undefined));
    dispatch(selectElement(undefined));
    dispatch(getDefectCodeListByProject(project_id));
    dispatch(getTradeCodeListByProject(project_id));
    dispatch(getAllChecklistReducer(project_id));
    dispatch(getAllCommonAreaReducer(project_id));
    //   didLoad = true;
    // }
  }, []);

  useEffect(() => {
    if (selectedProject && selectedProject.projectTower) {
      dispatch(updateTowers(selectedProject.projectTower));
    }
  }, [selectedProject]);

  const [formData, setFormData] = useState<Project>({
    name: "",
    organizationId: id,
    type: "",
    maintenanceServiceType: "",
    address: "",
    imageId: "",
    numBasementLevels: selectedProject?.numBasementLevels || "",
  });

  useEffect(() => {
    if (myImage.imageData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageId: myImage.imageData && myImage.imageData.id.toString(),
      }));
    }
  }, [myImage.imageData]);

  useEffect(() => {
    if (!searchAddress) {
      let addressx = unitNo ? unitNo : "";
      addressx = addressx ? `${addressx} ${line1 ? `, ${line1}` : ""}` : line1;
      addressx = addressx ? `${addressx} ${line2 ? `, ${line2}` : ""}` : line2;
      addressx = addressx ? `${addressx} ${line3 ? `, ${line3}` : ""}` : line3;
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: addressx,
      }));
    }
  }, [unitNo, line1, line2, line3]);

  useEffect(() => {
    if (selectedProject?.address) {
      const ad = selectedProject.address.split(",");
      setUnitNo(ad[0]?.trim());
      setLine1(ad[1]?.trim());
      setLine2(ad[2]?.trim());
      setLine3(ad[3]?.trim());
      setFirstLoad(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (formData.address && firstLoad) {
      const ad = formData.address.split(",");
      setUnitNo(ad[0]?.trim());
      setLine1(ad[1]?.trim());
      setLine2(ad[2]?.trim());
      setLine3(ad[3]?.trim());
      setFirstLoad(false);
    }
  }, [formData]);

  useEffect(() => {
    if (projectTrigger) {
      if (projectResponse && projectResponse.errors) {
        toast.error(projectResponse.errors[0].message);
        dispatch(clearTrigger());
      }
      if (projectResponse && projectResponse.id) {
        if (!isUpdate) {
          dispatch(updateMasterTab(2));
        }
        setIsUpdate(false);
        dispatch(clearTrigger());
      }
    }
  }, [projectTrigger]);

  useEffect(() => {
    if (selectedProject) {
      setFormData(selectedProject);
    }
  }, [selectedProject]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Master Configuration
          </h1>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateMasterTab(1))}
                className={
                  masterTab === 1
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    masterTab === 1
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                >
                  <path
                    d="M3.53122 7.9968V0.7C3.53122 0.514348 3.45813 0.336301 3.32804 0.205025C3.19794 0.0737498 3.02148 0 2.8375 0C2.65351 0 2.47706 0.0737498 2.34696 0.205025C2.21686 0.336301 2.14377 0.514348 2.14377 0.7V7.9968C1.69092 8.14221 1.29566 8.42922 1.01517 8.81631C0.734678 9.20339 0.583496 9.67048 0.583496 10.15C0.583496 10.6295 0.734678 11.0966 1.01517 11.4837C1.29566 11.8708 1.69092 12.1578 2.14377 12.3032V13.3C2.14377 13.4857 2.21686 13.6637 2.34696 13.795C2.47706 13.9263 2.65351 14 2.8375 14C3.02148 14 3.19794 13.9263 3.32804 13.795C3.45813 13.6637 3.53122 13.4857 3.53122 13.3V12.3032C3.98407 12.1578 4.37933 11.8708 4.65982 11.4837C4.94032 11.0966 5.0915 10.6295 5.0915 10.15C5.0915 9.67048 4.94032 9.20339 4.65982 8.81631C4.37933 8.42922 3.98407 8.14221 3.53122 7.9968ZM2.8375 11.025C2.66599 11.025 2.49833 10.9737 2.35573 10.8775C2.21313 10.7814 2.10198 10.6447 2.03635 10.4848C1.97071 10.325 1.95354 10.149 1.987 9.9793C2.02046 9.80956 2.10305 9.65365 2.22432 9.53128C2.3456 9.40891 2.50011 9.32557 2.66832 9.29181C2.83653 9.25805 3.01089 9.27538 3.16934 9.34161C3.3278 9.40783 3.46323 9.51998 3.55851 9.66388C3.6538 9.80777 3.70466 9.97694 3.70466 10.15C3.70429 10.382 3.61281 10.6043 3.45027 10.7683C3.28772 10.9323 3.06737 11.0246 2.8375 11.025Z"
                    fill={masterTab === 1 ? `#1A56DB` : `#6B7280`}
                  />
                  <path
                    d="M13.4168 10.15C13.4152 9.6708 13.2633 9.20441 12.9829 8.81763C12.7025 8.43086 12.308 8.14353 11.8559 7.9968V0.7C11.8559 0.514348 11.7829 0.336301 11.6528 0.205025C11.5227 0.0737498 11.3462 0 11.1622 0C10.9782 0 10.8018 0.0737498 10.6717 0.205025C10.5416 0.336301 10.4685 0.514348 10.4685 0.7V7.9968C10.0156 8.14221 9.62039 8.42922 9.33989 8.81631C9.0594 9.20339 8.90822 9.67048 8.90822 10.15C8.90822 10.6295 9.0594 11.0966 9.33989 11.4837C9.62039 11.8708 10.0156 12.1578 10.4685 12.3032V13.3C10.4685 13.4857 10.5416 13.6637 10.6717 13.795C10.8018 13.9263 10.9782 14 11.1622 14C11.3462 14 11.5227 13.9263 11.6528 13.795C11.7829 13.6637 11.8559 13.4857 11.8559 13.3V12.3032C12.308 12.1565 12.7025 11.8691 12.9829 11.4824C13.2633 11.0956 13.4152 10.6292 13.4168 10.15ZM11.1622 11.025C10.9907 11.025 10.8231 10.9737 10.6805 10.8775C10.5378 10.7814 10.4267 10.6447 10.3611 10.4848C10.2954 10.325 10.2783 10.149 10.3117 9.9793C10.3452 9.80956 10.4278 9.65365 10.549 9.53128C10.6703 9.40891 10.8248 9.32557 10.993 9.29181C11.1613 9.25805 11.3356 9.27538 11.4941 9.34161C11.6525 9.40783 11.7879 9.51998 11.8832 9.66388C11.9785 9.80777 12.0294 9.97694 12.0294 10.15C12.029 10.382 11.9375 10.6043 11.775 10.7683C11.6124 10.9323 11.3921 11.0246 11.1622 11.025Z"
                    fill={masterTab === 1 ? `#1A56DB` : `#6B7280`}
                  />
                  <path
                    d="M9.25447 3.85C9.25282 3.3708 9.10093 2.90441 8.82055 2.51763C8.54017 2.13086 8.14569 1.84353 7.69358 1.6968V0.7C7.69358 0.514348 7.6205 0.336301 7.4904 0.205025C7.3603 0.0737498 7.18385 0 6.99986 0C6.81587 0 6.63942 0.0737498 6.50932 0.205025C6.37922 0.336301 6.30613 0.514348 6.30613 0.7V1.6968C5.85328 1.84221 5.45803 2.12922 5.17753 2.51631C4.89704 2.90339 4.74586 3.37048 4.74586 3.85C4.74586 4.32952 4.89704 4.79661 5.17753 5.18369C5.45803 5.57078 5.85328 5.85779 6.30613 6.0032V13.3C6.30613 13.4857 6.37922 13.6637 6.50932 13.795C6.63942 13.9263 6.81587 14 6.99986 14C7.18385 14 7.3603 13.9263 7.4904 13.795C7.6205 13.6637 7.69358 13.4857 7.69358 13.3V6.0032C8.14569 5.85647 8.54017 5.56914 8.82055 5.18237C9.10093 4.79559 9.25282 4.3292 9.25447 3.85ZM6.99986 4.725C6.82835 4.725 6.66069 4.67368 6.51809 4.57754C6.37549 4.48139 6.26434 4.34473 6.19871 4.18485C6.13307 4.02496 6.1159 3.84903 6.14936 3.6793C6.18282 3.50956 6.26541 3.35365 6.38668 3.23128C6.50796 3.10891 6.66247 3.02557 6.83068 2.99181C6.9989 2.95805 7.17325 2.97538 7.3317 3.04161C7.49016 3.10783 7.62559 3.21998 7.72087 3.36388C7.81616 3.50777 7.86702 3.67694 7.86702 3.85C7.86665 4.08195 7.77517 4.3043 7.61263 4.46831C7.45008 4.63232 7.22973 4.72463 6.99986 4.725Z"
                    fill={masterTab === 1 ? `#1A56DB` : `#6B7280`}
                  />
                </svg>
                Regions
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateMasterTab(2))}
                className={
                  masterTab === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
                aria-current="page"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    masterTab === 2
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                >
                  <path
                    d="M4.2 12.6H1.4V2.1H3.5V2.8C3.1136 2.8 2.8 3.1136 2.8 3.5C2.8 3.8864 3.1136 4.2 3.5 4.2H5.4306L6.8306 2.8H4.9V1.4H7V2.6453C7.3864 2.2974 7.8764 2.1 8.4 2.1H11.9C11.9 1.3279 11.2721 0.7 10.5 0.7H8.2054C7.9625 0.2835 7.5159 0 7 0H4.9C4.3841 0 3.9375 0.2835 3.6946 0.7H1.4C0.6279 0.7 0 1.3279 0 2.1V12.6C0 13.3721 0.6279 14 1.4 14H4.2C4.3225 14 4.4317 13.9601 4.5318 13.9048C4.3274 13.5135 4.2 13.0739 4.2 12.6Z"
                    fill={masterTab === 2 ? `#1A56DB` : `#6B7280`}
                  />
                  <path
                    d="M12.6469 3.5H8.4C8.2145 3.5 8.036 3.5735 7.9051 3.7051L5.8051 5.8051C5.6735 5.936 5.6 6.1145 5.6 6.3V12.6C5.6 13.3721 6.2069 14 6.9531 14H12.6469C13.3931 14 14 13.3721 14 12.6V4.9C14 4.1279 13.3931 3.5 12.6469 3.5ZM8.4 5.1898V6.3H7.2898L8.4 5.1898ZM7 12.6V7.7H9.1C9.4864 7.7 9.8 7.3864 9.8 7V4.8937L12.5965 4.8818C12.5965 4.8818 12.6 4.8874 12.6 4.9L12.6469 12.6H7Z"
                    fill={masterTab === 2 ? `#1A56DB` : `#6B7280`}
                  />
                </svg>
                Organizations
              </a>
            </li>
          </ul>
        </div>

        {masterTab === 1 ? (
          <>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Select Region</Label>
              <select
                id="trade_category"
                name="trade_category"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="property">Region 1</option>
                <option value="common_area">Region 2</option>
              </select>
            </div>
            <ConfigureAccordion project_id={project_id} />
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Select Region</Label>
              <select
                id="trade_category"
                name="trade_category"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="property">Region 1</option>
                <option value="common_area">Region 2</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Select Organization</Label>
              <select
                id="trade_category"
                name="trade_category"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="property">Organization 1</option>
                <option value="common_area">Organization 2</option>
              </select>
            </div>
            <ConfigureAccordion project_id={project_id} />
          </>
        )}
      </div>
    </NavbarSidebarLayout>
  );
};

export default MasterConfiguration;
