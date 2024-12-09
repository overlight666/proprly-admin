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
import { clearCommonAreaResponse } from "../../store/features/projectSlice";
import { useUploadForm } from "../../apis/hooks";

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
  const { selectedProject, commonAreaIdle, commonAreaResponse }: ProjectState =
    useSelector((state: any) => state.project);
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
      dispatch(clearCommonAreaResponse());
      if (
        uploadedWarranties &&
        uploadedWarranties.groups &&
        uploadedWarranties.groups.length === 0
      ) {
        toast.info("New Common Area has been registered!");
        setTimeout(() => {
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${commonAreaId}/configure`
          );
        }, 1000);
      } else {
        setIdHandler(commonAreaId);
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
        setTimeout(() => {
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${idHandler}/configure`
          );
        }, 1000);
      } else {
        toast.warning(
          "New Common Area has been registered but warranties is not fully uploaded"
        );
        setTimeout(() => {
          navigate(
            `/organization/${selectedOrganization?.id}/project/${project_id}/common-area/${idHandler}/configure`
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
                Common Areas
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
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Add Common Areas
          </h1>
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
