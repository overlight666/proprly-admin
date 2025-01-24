/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ChangeEvent } from "react";
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  TextInput,
  Select as Select2,
  Dropdown,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FaAngleDown, FaAngleUp, FaChevronLeft } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import ErrorHandler from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  ImageState,
  LeadState,
  OrgState,
  ProjectState,
  Timezone,
  UserState,
} from "../../types";
import {
  createCommonAreaReducer,
  getAllBuilders,
  getAllRegions,
  postWarranties,
  postWarrantyFiles,
  registerOrg,
  uploadImageFile,
} from "../../store/features/reducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  clear,
  clearWarranty,
  resetWarranty,
} from "../../store/features/imageSlice";
import Select from "react-select";
import { BsThreeDots } from "react-icons/bs";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ConfirmModal } from "../../components/modals/confirmModal";
import CommonAreaInformation from "./items/common-area-information";
import StrataInformation from "./items/strata-information";
import StrataWarrantyInformation from "./items/warranty-information";
import StrataUploads from "./items/strata-uploads";
import {
  clearCommonAreaConfig,
  clearCommonAreaResponse,
  reloadCommonAreaTable,
  updateCommonAreaTab,
} from "../../store/features/projectSlice";
import { useUploadForm } from "../../apis/hooks";
import { MdBugReport } from "react-icons/md";

const CommonAreaNewPage: FC = function () {
  const { uploadForm, progress } = useUploadForm();
  const { project_id }: any = useParams();
  const [uploadedWarranties, setUploadedWarranties] = useState<any>({
    groups: [],
  });
  const [status, setStatus] = useState<any>("");
  const [lotNo, setLotNo] = useState<any>("");
  const [idHandler, setIdHandler] = useState<any>();
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const {
    selectedProject,
    commonAreaIdle,
    commonAreaResponse,
    commonAreaItem,
    commonAreaTab,
  }: ProjectState = useSelector((state: any) => state.project);
  const {
    warrantyData,
    warrantyResponse,
    uploadDone,
    warrantyResponseStatus,
  }: ImageState = useSelector((state: any) => state.uploads);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [showCard3, setShowCard3] = useState(true);
  const [showCard4, setShowCard4] = useState(true);

  const createCommonArea = () => {
    const params = {
      projectId: project_id,
      lotNo,
      status,
    };
    dispatch(createCommonAreaReducer(params));
  };

  useEffect(() => {
    if (commonAreaResponse && commonAreaResponse.id) {
      const commonAreaId = commonAreaResponse.id;
      setIdHandler(commonAreaId);
      dispatch(clearCommonAreaResponse());
      if (
        uploadedWarranties &&
        uploadedWarranties.groups &&
        uploadedWarranties.groups.length === 0
      ) {
        toast.info("New Common Area has been registered!");
        dispatch(updateCommonAreaTab(2));
        dispatch(clearCommonAreaConfig());
        dispatch(reloadCommonAreaTable(true));
        setTimeout(() => {
          dispatch(reloadCommonAreaTable(true));
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${commonAreaId}`
          );
        }, 1000);
      } else {
        dispatch(
          postWarrantyFiles({
            commonAreaId: commonAreaId,
            ...uploadedWarranties,
          })
        );
      }
    }
  }, [commonAreaResponse]);

  useEffect(() => {
    if (warrantyResponse && warrantyResponse.data) {
      if (warrantyResponseStatus) {
        toast.info("New Common Area has been registered!");
        dispatch(updateCommonAreaTab(2));
        setTimeout(() => {
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${idHandler}`
          );
        }, 1000);
      } else {
        toast.warning(
          "New Common Area has been registered but warranties is not fully uploaded"
        );
        dispatch(updateCommonAreaTab(2));
        setTimeout(() => {
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${idHandler}`
          );
        }, 1000);
      }
      dispatch(resetWarranty());
    }
  }, [warrantyResponse]);

  useEffect(() => {
    if (warrantyData) {
      const warrant =
        uploadedWarranties &&
        uploadedWarranties.groups &&
        uploadedWarranties.groups.find(
          (obj) => obj.group === warrantyData.group
        );
      if (!warrant) {
        uploadedWarranties.groups.push({
          group: warrantyData.group,
          files: [warrantyData.id],
          data: [warrantyData],
        });
      } else {
        uploadedWarranties &&
          uploadedWarranties.groups &&
          uploadedWarranties.groups.map((obj) => {
            if (obj.group === warrantyData.group) {
              const arr1 = [...new Set(obj.data)];
              const arr = [...new Set(obj.files)];
              arr1.push(warrantyData);
              arr.push(warrantyData.id);
              obj.files = arr;
              obj.data = arr1;
            }
          });
      }
      setUploadedWarranties(uploadedWarranties);
      dispatch(clearWarranty());
    }
  }, [warrantyData]);

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    group: string
  ) => {
    if (!event.target.files) {
      return;
    } else {
      // const params = {
      //   group: group,
      //   file: event.target.files[0],
      // };
      uploadForm(event.target.files[0], group);
      // dispatch(postWarranties(params));
    }
  };

  // const handleUpload = async (
  //   event: ChangeEvent<HTMLInputElement>,
  //   group: string
  // ) => {
  //   if (!event.target.files) {
  //     return;
  //   } else {
  //     const params = {
  //       group: group,
  //       file: event.target.files[0],
  //     };
  //     dispatch(postWarranties(params));
  //   }
  // };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
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
                Common Area
              </Breadcrumb.Item>
              <Breadcrumb.Item>Add</Breadcrumb.Item>
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
          <h1 className=" text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Add Common Area
          </h1>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateCommonAreaTab(1))}
                className={
                  commonAreaTab === 1
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  className="mr-[5px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 2 }}
                >
                  <path
                    d="M15.8335 11.6667V6.25L11.6668 3.33333L7.50016 6.25V7.5H5.8335V5.41667L11.6668 1.25L17.5002 5.41667V11.6667H15.8335ZM12.0835 6.66667H12.9168V5.83333H12.0835V6.66667ZM10.4168 6.66667H11.2502V5.83333H10.4168V6.66667ZM12.0835 8.33333H12.9168V7.5H12.0835V8.33333ZM10.4168 8.33333H11.2502V7.5H10.4168V8.33333ZM5.8335 15.4167L11.6252 17L16.5835 15.4583C16.5141 15.3333 16.4134 15.2257 16.2814 15.1354C16.1495 15.0451 16.0002 15 15.8335 15H11.6252C11.2502 15 10.9516 14.9861 10.7293 14.9583C10.5071 14.9306 10.2779 14.875 10.0418 14.7917L8.10433 14.1458L8.56266 12.5208L10.2502 13.0833C10.4863 13.1528 10.7641 13.2083 11.0835 13.25C11.4029 13.2917 11.8752 13.3194 12.5002 13.3333C12.5002 13.1806 12.455 13.0347 12.3647 12.8958C12.2745 12.7569 12.1668 12.6667 12.0418 12.625L7.16683 10.8333H5.8335V15.4167ZM0.833496 18.3333V9.16667H7.16683C7.26405 9.16667 7.36127 9.17708 7.4585 9.19792C7.55572 9.21875 7.646 9.24306 7.72933 9.27083L12.6252 11.0833C13.0835 11.25 13.455 11.5417 13.7397 11.9583C14.0245 12.375 14.1668 12.8333 14.1668 13.3333H15.8335C16.5279 13.3333 17.1182 13.5625 17.6043 14.0208C18.0904 14.4792 18.3335 15.0833 18.3335 15.8333V16.6667L11.6668 18.75L5.8335 17.125V18.3333H0.833496ZM2.50016 16.6667H4.16683V10.8333H2.50016V16.6667Z"
                    fill={commonAreaTab === 1 ? "#1C64F2" : "#6B7280"}
                  />
                </svg>
                Manage
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  if (commonAreaIdle && commonAreaItem) {
                    dispatch(updateCommonAreaTab(2));
                  }
                }}
                className={
                  commonAreaTab === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                        commonAreaIdle &&
                        !commonAreaItem &&
                        "cursor-not-allowed"
                      }`
                }
              >
                <svg
                  className={
                    commonAreaTab === 2
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill={commonAreaTab === 2 ? `#1A56DB` : `#6B7280`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.53122 8.4968V1.2C3.53122 1.01435 3.45813 0.836301 3.32804 0.705025C3.19794 0.57375 3.02148 0.5 2.8375 0.5C2.65351 0.5 2.47706 0.57375 2.34696 0.705025C2.21686 0.836301 2.14377 1.01435 2.14377 1.2V8.4968C1.69092 8.64221 1.29566 8.92922 1.01517 9.31631C0.734678 9.70339 0.583496 10.1705 0.583496 10.65C0.583496 11.1295 0.734678 11.5966 1.01517 11.9837C1.29566 12.3708 1.69092 12.6578 2.14377 12.8032V13.8C2.14377 13.9857 2.21686 14.1637 2.34696 14.295C2.47706 14.4263 2.65351 14.5 2.8375 14.5C3.02148 14.5 3.19794 14.4263 3.32804 14.295C3.45813 14.1637 3.53122 13.9857 3.53122 13.8V12.8032C3.98407 12.6578 4.37933 12.3708 4.65982 11.9837C4.94032 11.5966 5.0915 11.1295 5.0915 10.65C5.0915 10.1705 4.94032 9.70339 4.65982 9.31631C4.37933 8.92922 3.98407 8.64221 3.53122 8.4968ZM2.8375 11.525C2.66599 11.525 2.49833 11.4737 2.35573 11.3775C2.21313 11.2814 2.10198 11.1447 2.03635 10.9848C1.97071 10.825 1.95354 10.649 1.987 10.4793C2.02046 10.3096 2.10305 10.1537 2.22432 10.0313C2.3456 9.90891 2.50011 9.82557 2.66832 9.79181C2.83653 9.75805 3.01089 9.77538 3.16934 9.84161C3.3278 9.90783 3.46323 10.02 3.55851 10.1639C3.6538 10.3078 3.70466 10.4769 3.70466 10.65C3.70429 10.882 3.61281 11.1043 3.45027 11.2683C3.28772 11.4323 3.06737 11.5246 2.8375 11.525Z" />
                  <path d="M13.4168 10.65C13.4152 10.1708 13.2633 9.70441 12.9829 9.31763C12.7025 8.93086 12.308 8.64353 11.8559 8.4968V1.2C11.8559 1.01435 11.7829 0.836301 11.6528 0.705025C11.5227 0.57375 11.3462 0.5 11.1622 0.5C10.9782 0.5 10.8018 0.57375 10.6717 0.705025C10.5416 0.836301 10.4685 1.01435 10.4685 1.2V8.4968C10.0156 8.64221 9.62039 8.92922 9.33989 9.31631C9.0594 9.70339 8.90822 10.1705 8.90822 10.65C8.90822 11.1295 9.0594 11.5966 9.33989 11.9837C9.62039 12.3708 10.0156 12.6578 10.4685 12.8032V13.8C10.4685 13.9857 10.5416 14.1637 10.6717 14.295C10.8018 14.4263 10.9782 14.5 11.1622 14.5C11.3462 14.5 11.5227 14.4263 11.6528 14.295C11.7829 14.1637 11.8559 13.9857 11.8559 13.8V12.8032C12.308 12.6565 12.7025 12.3691 12.9829 11.9824C13.2633 11.5956 13.4152 11.1292 13.4168 10.65ZM11.1622 11.525C10.9907 11.525 10.8231 11.4737 10.6805 11.3775C10.5378 11.2814 10.4267 11.1447 10.3611 10.9848C10.2954 10.825 10.2783 10.649 10.3117 10.4793C10.3452 10.3096 10.4278 10.1537 10.549 10.0313C10.6703 9.90891 10.8248 9.82557 10.993 9.79181C11.1613 9.75805 11.3356 9.77538 11.4941 9.84161C11.6525 9.90783 11.7879 10.02 11.8832 10.1639C11.9785 10.3078 12.0294 10.4769 12.0294 10.65C12.029 10.882 11.9375 11.1043 11.775 11.2683C11.6124 11.4323 11.3921 11.5246 11.1622 11.525Z" />
                  <path d="M9.25447 4.35C9.25282 3.8708 9.10093 3.40441 8.82055 3.01763C8.54017 2.63086 8.14569 2.34353 7.69358 2.1968V1.2C7.69358 1.01435 7.6205 0.836301 7.4904 0.705025C7.3603 0.57375 7.18385 0.5 6.99986 0.5C6.81587 0.5 6.63942 0.57375 6.50932 0.705025C6.37922 0.836301 6.30613 1.01435 6.30613 1.2V2.1968C5.85328 2.34221 5.45803 2.62922 5.17753 3.01631C4.89704 3.40339 4.74586 3.87048 4.74586 4.35C4.74586 4.82952 4.89704 5.29661 5.17753 5.68369C5.45803 6.07078 5.85328 6.35779 6.30613 6.5032V13.8C6.30613 13.9857 6.37922 14.1637 6.50932 14.295C6.63942 14.4263 6.81587 14.5 6.99986 14.5C7.18385 14.5 7.3603 14.4263 7.4904 14.295C7.6205 14.1637 7.69358 13.9857 7.69358 13.8V6.5032C8.14569 6.35647 8.54017 6.06914 8.82055 5.68237C9.10093 5.29559 9.25282 4.8292 9.25447 4.35ZM6.99986 5.225C6.82835 5.225 6.66069 5.17368 6.51809 5.07754C6.37549 4.98139 6.26434 4.84473 6.19871 4.68485C6.13307 4.52496 6.1159 4.34903 6.14936 4.1793C6.18282 4.00956 6.26541 3.85365 6.38668 3.73128C6.50796 3.60891 6.66247 3.52557 6.83068 3.49181C6.9989 3.45805 7.17325 3.47538 7.3317 3.54161C7.49016 3.60783 7.62559 3.71998 7.72087 3.86388C7.81616 4.00777 7.86702 4.17694 7.86702 4.35C7.86665 4.58195 7.77517 4.8043 7.61263 4.96831C7.45008 5.13232 7.22973 5.22463 6.99986 5.225Z" />
                </svg>
                Configure
              </a>
            </li>
            {commonAreaIdle && commonAreaItem && (
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updateCommonAreaTab(3))}
                  className={
                    commonAreaTab === 3
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                  aria-current="page"
                >
                  <MdBugReport className="mr-[5px]" size={20} />
                  Defect Resolution
                </a>
              </li>
            )}
            {commonAreaIdle && commonAreaItem && (
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updateCommonAreaTab(4))}
                  className={
                    commonAreaTab === 4
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                  aria-current="page"
                >
                  <svg
                    className={
                      commonAreaTab === 3
                        ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                        : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                    }
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.2 13.1H1.4V2.6H3.5V3.3C3.1136 3.3 2.8 3.6136 2.8 4C2.8 4.3864 3.1136 4.7 3.5 4.7H5.4306L6.8306 3.3H4.9V1.9H7V3.1453C7.3864 2.7974 7.8764 2.6 8.4 2.6H11.9C11.9 1.8279 11.2721 1.2 10.5 1.2H8.2054C7.9625 0.7835 7.5159 0.5 7 0.5H4.9C4.3841 0.5 3.9375 0.7835 3.6946 1.2H1.4C0.6279 1.2 0 1.8279 0 2.6V13.1C0 13.8721 0.6279 14.5 1.4 14.5H4.2C4.3225 14.5 4.4317 14.4601 4.5318 14.4048C4.3274 14.0135 4.2 13.5739 4.2 13.1Z"
                      fill={commonAreaTab === 3 ? `#1A56DB` : `#6B7280`}
                    />
                    <path
                      d="M12.6469 4H8.4C8.2145 4 8.036 4.0735 7.9051 4.2051L5.8051 6.3051C5.6735 6.436 5.6 6.6145 5.6 6.8V13.1C5.6 13.8721 6.2069 14.5 6.9531 14.5H12.6469C13.3931 14.5 14 13.8721 14 13.1V5.4C14 4.6279 13.3931 4 12.6469 4ZM8.4 5.6898V6.8H7.2898L8.4 5.6898ZM7 13.1V8.2H9.1C9.4864 8.2 9.8 7.8864 9.8 7.5V5.3937L12.5965 5.3818C12.5965 5.3818 12.6 5.3874 12.6 5.4L12.6469 13.1H7Z"
                      fill={commonAreaTab === 3 ? `#1A56DB` : `#6B7280`}
                    />
                  </svg>
                  Reports
                </a>
              </li>
            )}
          </ul>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />
        <div className="flex w-full flex-col">
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard1(!showCard1)}
          >
            <h1 className="font-bold">Common Area Information</h1>
            {showCard1 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard1 && (
            <CommonAreaInformation
              status={status}
              lotNo={lotNo}
              setLotNo={setLotNo}
              setStatus={setStatus}
            />
          )}
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard2(!showCard2)}
          >
            <h1 className="font-bold">Strata Information</h1>
            {showCard2 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard2 && <StrataInformation />}
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard3(!showCard3)}
          >
            <h1 className="font-bold">Warranty Information</h1>
            {showCard3 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard3 && (
            <StrataWarrantyInformation
              setUploadedWarranties={setUploadedWarranties}
              handleUpload={handleUpload}
              uploadedWarranties={uploadedWarranties}
              progressBar={progress}
            />
          )}
          {/* <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard4(!showCard4)}
          >
            <h1 className="font-bold">Upload Reports</h1>
            {showCard4 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard4 && <StrataUploads />} */}
        </div>
        <div className="my-10 flex">
          <Button
            className="mx-1"
            onClick={() => createCommonArea()}
            disabled={
              lotNo.trim().length === 0 ||
              status.trim().length === 0 ||
              !commonAreaIdle
            }
            color="primary"
          >
            Proceed to Configure
          </Button>
          <Button
            className="mx-1"
            onClick={() => {
              navigate(-1);
            }}
            color="gray"
          >
            Cancel
          </Button>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default CommonAreaNewPage;
