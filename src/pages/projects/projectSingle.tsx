/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  Spinner,
  TextInput,
} from "flowbite-react";
import { HiHome, HiPlus, HiSearch } from "react-icons/hi";
import ErrorHandler from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  ImageState,
  OrgState,
  Project,
  ProjectState,
  ReducerTypes,
  UserState,
  ValueList,
} from "../../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { updateProjectTabMain } from "../../store/features/appSlice";
import {
  postTower,
  // getTowersReducer,
  getSingleProject,
  uploadImageFile,
  uploadDocument,
  patchProject,
  getDefectCodeListByProject,
  getTradeCodeListByProject,
  getAllChecklistReducer,
  getAllCommonAreaReducer,
  getProjects,
} from "../../store/features/reducers";
import ProjectTable from "../../components/projectTable";
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
import { BsSliders2Vertical } from "react-icons/bs";
import ConfigureAccordion from "./configure";
import ConfigureAccordionUser from "./userItems/configure";
import {
  FaAngleDown,
  FaAngleRight,
  FaAngleUp,
  FaChevronLeft,
} from "react-icons/fa6";
import { clear, clearFile } from "../../store/features/imageSlice";
import { RiCloseCircleFill } from "react-icons/ri";
import Upload from "./uploadItems/upload";
import Dashboard from "./dashboard";

type towerType = {
  levels?: string;
  name: string;
  projectId: number;
  numFloors: string;
};

const ProjectSingle: FC = function () {
  const { id, project_id }: any = useParams();
  const { orgList, selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const navigate = useNavigate();
  const { userData }: UserState = useSelector((state: any) => state.user);
  const {
    projectResponse,
    towerResponse,
    projectTrigger,
    selectedProject,
    gettingTowers,
    projectTowers,
    isIdle,
    responseStatus,
  }: ProjectState = useSelector((state: any) => state.project);

  const [searchAddress, setSearchAddress] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const dispatch = useDispatch();
  const { projectTabMain, config }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [towers, setTowers] = useState<any>([]);
  const [unitNo, setUnitNo] = useState<any>("");
  const [line1, setLine1] = useState<any>("");
  const [line2, setLine2] = useState<any>("");
  const [line3, setLine3] = useState<any>("");
  const [firstLoad, setFirstLoad] = useState(true);
  const myImage: ImageState = useSelector((state: any) => state.uploads);
  let didInit = false;
  let didLoad = false;
  const { fileData }: ImageState = useSelector(
    (state: ReducerTypes) => state.uploads
  );

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
    if (projectTowers) {
      setTowers(projectTowers);
    }
  }, [projectTowers]);

  useEffect(() => {
    if (responseStatus === "project_update") {
      dispatch(getProjects(id));
      dispatch(getSingleProject(project_id));
      dispatch(setResponseStatus(""));
      toast.info("Project updated");
      dispatch(updateProjectTabMain(0));
    }
  }, [responseStatus]);

  useEffect(() => {
    if (!didInit) {
      if (isIdle) {
        if (!selectedProject) {
          dispatch(getSingleProject(project_id));
        }
        if (selectedProject) {
          dispatch(clearSelectedProject());
          dispatch(getSingleProject(project_id));
        }
        didInit = true;
      }
    }
  }, []);
  useEffect(() => {
    if (!didLoad) {
      dispatch(selectCommonArea(undefined));
      dispatch(selectCommonAreaElement(undefined));
      dispatch(selectZone(undefined));
      dispatch(selectElement(undefined));
      dispatch(getDefectCodeListByProject(project_id));
      dispatch(getTradeCodeListByProject(project_id));
      dispatch(getAllChecklistReducer(project_id));
      dispatch(getAllCommonAreaReducer(project_id));
      didLoad = true;
    }
  }, []);

  useEffect(() => {
    if (selectedProject && selectedProject.projectTower) {
      dispatch(updateTowers(selectedProject.projectTower));
    }
  }, [selectedProject]);

  useEffect(() => {
    if (fileData) {
      setUploadedFiles((oldArray) => [fileData, ...oldArray]);
      dispatch(clearFile());
    }
  }, [fileData]);

  const [formData, setFormData] = useState<Project>({
    name: "",
    organizationId: id,
    type: "",
    maintenanceServiceType: "",
    address: "",
    imageId: "",
    numBasementLevels: selectedProject?.numBasementLevels || "",
  });

  const [towerFormData, setTowerData] = useState<towerType>({
    levels: "0",
    projectId: project_id || 0,
    name: "",
    numFloors: "0",
  });

  useEffect(() => {
    if (myImage.imageData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageId: myImage.imageData && myImage.imageData.id.toString(),
      }));
    }
  }, [myImage.imageData]);

  const handleInputChangeTower = (event: any) => {
    try {
      const { name, value } = event.target;

      setTowerData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } catch (error) {
      console.log(error);
    }
  };

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
          dispatch(updateProjectTabMain(2));
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
    if (selectedProject?.documents) {
      setUploadedFiles(selectedProject?.documents);
    }
  }, [selectedProject]);

  const saveTower = () => {
    let valid = true;
    if (towerFormData.name === "") {
      toast.error("Tower name is required");
      valid = false;
    }
    if (!selectedProject) {
      toast.error(
        "There was an error in adding your tower!, create a project first!"
      );
      valid = false;
    }
    if (towerFormData.numFloors === "0") {
      toast.error("Please select floors");
      valid = false;
    }
    const newTowerData = {
      ...towerFormData,
      projectId: project_id,
    };
    if (valid) {
      dispatch(postTower(newTowerData));
      setOpenModal(false);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (event: any) => {
    try {
      const { name, value } = event.target;
      if (name === "country") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          ["currency"]: "AUD",
        }));
      } else if (name === "levels") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          ["numBasementLevels"]: value,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
      console.log(name, value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      dispatch(uploadImageFile(event.target.files[0]));
    }
  };

  const handleUpload2 = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      dispatch(uploadDocument(event.target.files[0]));
    }
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const updateProject = () => {
    let valid = true;
    setErrors([]);
    if (formData.name === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Project name is required!",
      ]);
      valid = false;
    }
    if (formData.address === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Address is required!",
      ]);
      valid = false;
    }
    if (formData.maintenanceServiceType === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Service type is required!",
      ]);
      valid = false;
    }
    if (formData.imageId === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Image is required!",
      ]);
      valid = false;
    }
    if (formData.type === "") {
      setErrors((oldArray) => [...[...new Set(oldArray)], "Type is required!"]);
      valid = false;
    }

    if (valid) {
      const docs: any = [];
      uploadedFiles &&
        uploadedFiles.map((obj: any) => {
          docs.push(obj.id);
        });
      setIsUpdate(true);
      dispatch(patchProject({ ...formData, towers, documents: docs }));
    }
  };

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
                {selectedProject && selectedProject?.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {projectTabMain == 0
                  ? "Dashboard"
                  : projectTabMain == 1
                  ? "Project Information"
                  : projectTabMain == 2
                  ? "Tower/Basement"
                  : projectTabMain == 3
                  ? "Configure"
                  : projectTabMain == 4
                  ? "Users"
                  : "Reports"}
              </Breadcrumb.Item>
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
            {selectedProject && selectedProject?.name}
          </h1>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />
        {!selectedProject && (
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
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateProjectTabMain(0))}
                className={
                  projectTabMain === 0
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  className={
                    projectTabMain === 0
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
                    stroke={projectTabMain === 0 ? `#1A56DB` : `#6B7280`}
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
                onClick={() => dispatch(updateProjectTabMain(1))}
                className={
                  projectTabMain === 1
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  className={
                    projectTabMain === 1
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill={projectTabMain === 1 ? `#1A56DB` : `#6B7280`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                    d="M13.8868 6.39864C13.8233 6.29909 13.7364 6.21729 13.6341 6.16064C13.5317 6.10399 13.4171 6.07429 13.3006 6.07424H12.59V5.36127C12.59 4.98309 12.4426 4.62041 12.1803 4.35299C11.9179 4.08558 11.5621 3.93535 11.1911 3.93535H8.00374L6.32507 1.65387C6.19443 1.47714 6.0254 1.33367 5.83123 1.23471C5.63707 1.13575 5.42305 1.08399 5.20596 1.0835H1.39889C1.02788 1.0835 0.672067 1.23373 0.409725 1.50114C0.147382 1.76855 0 2.13124 0 2.50942V12.4909C0 12.8691 0.147382 13.2318 0.409725 13.4992C0.672067 13.7666 1.02788 13.9168 1.39889 13.9168H10.5029C10.6382 13.9168 10.7706 13.8768 10.8841 13.8017C10.9976 13.7265 11.0872 13.6194 11.1421 13.4933L13.9399 7.07666C13.9872 6.96808 14.0071 6.84918 13.9978 6.73077C13.9885 6.61236 13.9503 6.49819 13.8868 6.39864ZM5.20596 2.50942L7.09446 5.07609C7.15961 5.16464 7.24409 5.23651 7.34121 5.286C7.43834 5.3355 7.54543 5.36127 7.65402 5.36127H11.1911V6.07424H3.49722C3.36189 6.07422 3.22946 6.11422 3.11599 6.18939C3.00251 6.26456 2.91287 6.37167 2.85793 6.49774L1.39889 9.84367V2.50942H5.20596ZM10.0482 12.4909H1.77589L3.95116 7.50016H12.2242L10.0482 12.4909Z"
                  />
                </svg>
                Project Information
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateProjectTabMain(2))}
                className={
                  projectTabMain === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
                aria-current="page"
              >
                <svg
                  className={
                    projectTabMain === 2
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                  width="9"
                  height="19"
                  viewBox="0 0 9 19"
                  fill={projectTabMain === 2 ? `#1A56DB` : `#6B7280`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.01783 16.7832C6.82783 16.7832 6.70117 16.9099 6.70117 17.0999C6.70117 17.2899 6.82783 17.4165 7.01783 17.4165C7.20783 17.4165 7.33448 17.2899 7.33448 17.0999C7.33448 16.9099 7.20783 16.7832 7.01783 16.7832Z" />
                  <path d="M8.82263 4.81335L4.80098 1.41038V0.316654C4.80098 0.126654 4.67432 0 4.48433 0C4.29433 0 4.16767 0.126654 4.16767 0.316654V1.43717L0.17767 4.81331C0.0826705 4.90831 0.0510163 5.03496 0.0826706 5.16165C0.114325 5.28835 0.241017 5.38331 0.367671 5.38331H0.684325V6.33331C0.684325 6.52331 0.810979 6.64996 1.00098 6.64996H1.31763V15.2H1.00098C0.842634 15.2 0.715979 15.3266 0.684325 15.485L0.367671 18.6516C0.367671 18.7466 0.399325 18.8416 0.462671 18.905C0.494325 18.9683 0.589325 19 0.684325 19H8.28432C8.37932 19 8.47432 18.9683 8.50598 18.905C8.56932 18.8416 8.60098 18.7466 8.60098 18.6516L8.28432 15.485C8.25267 15.3266 8.12598 15.2 7.96767 15.2H7.65102V6.65H7.96767C8.15767 6.65 8.28432 6.52335 8.28432 6.33335V5.38335H8.60098C8.72763 5.38335 8.85433 5.28835 8.91763 5.16169C8.94929 5.035 8.91763 4.90835 8.82263 4.81335ZM4.48429 1.995L7.71429 4.75H1.22263L4.48429 1.995ZM7.93598 18.3667H1.03263L1.28598 15.8333H1.63432H7.33432H7.68267L7.93598 18.3667ZM7.01763 10.7667H6.38429C6.19429 10.7667 6.06763 10.8933 6.06763 11.0833C6.06763 11.2733 6.19429 11.4 6.38429 11.4H7.01763V15.2H1.95098V14.25H2.58432C2.77432 14.25 2.90098 14.1233 2.90098 13.9333C2.90098 13.7433 2.77432 13.6167 2.58432 13.6167H1.95098V8.23335H2.58432C2.77432 8.23335 2.90098 8.10669 2.90098 7.91669C2.90098 7.72669 2.77432 7.60004 2.58432 7.60004H1.95098V6.65004H7.01763V10.7667ZM7.65098 6.01665H7.33432H1.63432H1.31767V5.38331H7.65102L7.65098 6.01665Z" />
                  <path d="M5.75083 16.7832H3.85083C3.66083 16.7832 3.53418 16.9099 3.53418 17.0999C3.53418 17.2899 3.66083 17.4165 3.85083 17.4165H5.75083C5.94083 17.4165 6.06749 17.2899 6.06749 17.0999C6.06749 16.9099 5.94083 16.7832 5.75083 16.7832Z" />
                  <path d="M2.58428 16.7832H1.95093C1.76093 16.7832 1.63428 16.9099 1.63428 17.0999C1.63428 17.2899 1.76093 17.4165 1.95093 17.4165H2.58428C2.77428 17.4165 2.90093 17.2899 2.90093 17.0999C2.90097 16.9099 2.77428 16.7832 2.58428 16.7832Z" />
                  <path d="M3.85087 10.4501H5.11753C5.30753 10.4501 5.43418 10.3234 5.43418 10.1334V8.5501C5.43418 8.01175 5.02253 7.6001 4.48418 7.6001C3.94583 7.6001 3.53418 8.01175 3.53418 8.5501V10.1334C3.53418 10.3234 3.66087 10.4501 3.85087 10.4501ZM4.16752 8.5501C4.16752 8.3601 4.29418 8.23344 4.48418 8.23344C4.67418 8.23344 4.80083 8.3601 4.80083 8.5501V9.81675H4.16752V8.5501Z" />
                  <path d="M3.85087 14.2499H5.11753C5.30753 14.2499 5.43418 14.1232 5.43418 13.9332V12.3499C5.43418 11.8116 5.02253 11.3999 4.48418 11.3999C3.94583 11.3999 3.53418 11.8116 3.53418 12.3499V13.9332C3.53418 14.1232 3.66087 14.2499 3.85087 14.2499ZM4.16752 12.3499C4.16752 12.1599 4.29418 12.0332 4.48418 12.0332C4.67418 12.0332 4.80083 12.1599 4.80083 12.3499V13.6166H4.16752V12.3499Z" />
                </svg>
                Tower/Basement
              </a>
            </li>
            {userData.user?.userType === "admin" && (
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updateProjectTabMain(3))}
                  className={
                    projectTabMain === 3
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                >
                  <svg
                    className={
                      projectTabMain === 3
                        ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                        : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                    }
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill={projectTabMain === 3 ? `#1A56DB` : `#6B7280`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.53122 8.4968V1.2C3.53122 1.01435 3.45813 0.836301 3.32804 0.705025C3.19794 0.57375 3.02148 0.5 2.8375 0.5C2.65351 0.5 2.47706 0.57375 2.34696 0.705025C2.21686 0.836301 2.14377 1.01435 2.14377 1.2V8.4968C1.69092 8.64221 1.29566 8.92922 1.01517 9.31631C0.734678 9.70339 0.583496 10.1705 0.583496 10.65C0.583496 11.1295 0.734678 11.5966 1.01517 11.9837C1.29566 12.3708 1.69092 12.6578 2.14377 12.8032V13.8C2.14377 13.9857 2.21686 14.1637 2.34696 14.295C2.47706 14.4263 2.65351 14.5 2.8375 14.5C3.02148 14.5 3.19794 14.4263 3.32804 14.295C3.45813 14.1637 3.53122 13.9857 3.53122 13.8V12.8032C3.98407 12.6578 4.37933 12.3708 4.65982 11.9837C4.94032 11.5966 5.0915 11.1295 5.0915 10.65C5.0915 10.1705 4.94032 9.70339 4.65982 9.31631C4.37933 8.92922 3.98407 8.64221 3.53122 8.4968ZM2.8375 11.525C2.66599 11.525 2.49833 11.4737 2.35573 11.3775C2.21313 11.2814 2.10198 11.1447 2.03635 10.9848C1.97071 10.825 1.95354 10.649 1.987 10.4793C2.02046 10.3096 2.10305 10.1537 2.22432 10.0313C2.3456 9.90891 2.50011 9.82557 2.66832 9.79181C2.83653 9.75805 3.01089 9.77538 3.16934 9.84161C3.3278 9.90783 3.46323 10.02 3.55851 10.1639C3.6538 10.3078 3.70466 10.4769 3.70466 10.65C3.70429 10.882 3.61281 11.1043 3.45027 11.2683C3.28772 11.4323 3.06737 11.5246 2.8375 11.525Z" />
                    <path d="M13.4168 10.65C13.4152 10.1708 13.2633 9.70441 12.9829 9.31763C12.7025 8.93086 12.308 8.64353 11.8559 8.4968V1.2C11.8559 1.01435 11.7829 0.836301 11.6528 0.705025C11.5227 0.57375 11.3462 0.5 11.1622 0.5C10.9782 0.5 10.8018 0.57375 10.6717 0.705025C10.5416 0.836301 10.4685 1.01435 10.4685 1.2V8.4968C10.0156 8.64221 9.62039 8.92922 9.33989 9.31631C9.0594 9.70339 8.90822 10.1705 8.90822 10.65C8.90822 11.1295 9.0594 11.5966 9.33989 11.9837C9.62039 12.3708 10.0156 12.6578 10.4685 12.8032V13.8C10.4685 13.9857 10.5416 14.1637 10.6717 14.295C10.8018 14.4263 10.9782 14.5 11.1622 14.5C11.3462 14.5 11.5227 14.4263 11.6528 14.295C11.7829 14.1637 11.8559 13.9857 11.8559 13.8V12.8032C12.308 12.6565 12.7025 12.3691 12.9829 11.9824C13.2633 11.5956 13.4152 11.1292 13.4168 10.65ZM11.1622 11.525C10.9907 11.525 10.8231 11.4737 10.6805 11.3775C10.5378 11.2814 10.4267 11.1447 10.3611 10.9848C10.2954 10.825 10.2783 10.649 10.3117 10.4793C10.3452 10.3096 10.4278 10.1537 10.549 10.0313C10.6703 9.90891 10.8248 9.82557 10.993 9.79181C11.1613 9.75805 11.3356 9.77538 11.4941 9.84161C11.6525 9.90783 11.7879 10.02 11.8832 10.1639C11.9785 10.3078 12.0294 10.4769 12.0294 10.65C12.029 10.882 11.9375 11.1043 11.775 11.2683C11.6124 11.4323 11.3921 11.5246 11.1622 11.525Z" />
                    <path d="M9.25447 4.35C9.25282 3.8708 9.10093 3.40441 8.82055 3.01763C8.54017 2.63086 8.14569 2.34353 7.69358 2.1968V1.2C7.69358 1.01435 7.6205 0.836301 7.4904 0.705025C7.3603 0.57375 7.18385 0.5 6.99986 0.5C6.81587 0.5 6.63942 0.57375 6.50932 0.705025C6.37922 0.836301 6.30613 1.01435 6.30613 1.2V2.1968C5.85328 2.34221 5.45803 2.62922 5.17753 3.01631C4.89704 3.40339 4.74586 3.87048 4.74586 4.35C4.74586 4.82952 4.89704 5.29661 5.17753 5.68369C5.45803 6.07078 5.85328 6.35779 6.30613 6.5032V13.8C6.30613 13.9857 6.37922 14.1637 6.50932 14.295C6.63942 14.4263 6.81587 14.5 6.99986 14.5C7.18385 14.5 7.3603 14.4263 7.4904 14.295C7.6205 14.1637 7.69358 13.9857 7.69358 13.8V6.5032C8.14569 6.35647 8.54017 6.06914 8.82055 5.68237C9.10093 5.29559 9.25282 4.8292 9.25447 4.35ZM6.99986 5.225C6.82835 5.225 6.66069 5.17368 6.51809 5.07754C6.37549 4.98139 6.26434 4.84473 6.19871 4.68485C6.13307 4.52496 6.1159 4.34903 6.14936 4.1793C6.18282 4.00956 6.26541 3.85365 6.38668 3.73128C6.50796 3.60891 6.66247 3.52557 6.83068 3.49181C6.9989 3.45805 7.17325 3.47538 7.3317 3.54161C7.49016 3.60783 7.62559 3.71998 7.72087 3.86388C7.81616 4.00777 7.86702 4.17694 7.86702 4.35C7.86665 4.58195 7.77517 4.8043 7.61263 4.96831C7.45008 5.13232 7.22973 5.22463 6.99986 5.225Z" />
                  </svg>
                  Configure
                </a>
              </li>
            )}
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateProjectTabMain(4))}
                className={
                  projectTabMain === 4
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  className={
                    projectTabMain === 4
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill={projectTabMain === 4 ? `#1A56DB` : `#6B7280`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.593 13.9879C5.36294 13.7471 5.20174 13.444 5.12754 13.1126C5.05334 12.7813 5.06909 12.4348 5.173 12.1123C4.88127 11.9613 4.63565 11.7282 4.46376 11.4392C4.29187 11.1502 4.20053 10.8169 4.2 10.4767V9.74516C4.20001 9.4047 4.29096 9.07101 4.46262 8.78164C4.63427 8.49228 4.87981 8.25873 5.1716 8.1073C5.157 8.04432 5.14556 7.98059 5.1373 7.91637H3.5C2.57208 7.91753 1.68249 8.30326 1.02635 8.98893C0.370217 9.67461 0.0011115 10.6043 0 11.5739V13.7685C0 13.9625 0.0737498 14.1486 0.205025 14.2857C0.336301 14.4229 0.514348 14.5 0.7 14.5H6.0809L5.593 13.9879Z" />
                  <path d="M13.65 9.3794H12.866C12.787 9.0196 12.65 8.67649 12.4607 8.36479L13.0207 7.78324C13.0863 7.71465 13.1232 7.62163 13.1232 7.52465C13.1232 7.42766 13.0863 7.33464 13.0207 7.26606L12.5258 6.74887C12.4602 6.68031 12.3712 6.64179 12.2784 6.64179C12.1855 6.64179 12.0965 6.68031 12.0309 6.74887L11.4744 7.33409C11.1753 7.13464 10.8457 6.99016 10.5 6.90688V6.08759C10.5 5.99058 10.4631 5.89755 10.3975 5.82896C10.3318 5.76036 10.2428 5.72183 10.15 5.72183H9.45C9.35717 5.72183 9.26815 5.76036 9.20251 5.82896C9.13687 5.89755 9.1 5.99058 9.1 6.08759V6.90688C8.7557 6.98942 8.42737 7.13265 8.1291 7.33043L7.5726 6.74887C7.50697 6.68031 7.41796 6.64179 7.32515 6.64179C7.23234 6.64179 7.14333 6.68031 7.0777 6.74887L6.5828 7.26606C6.51719 7.33464 6.48032 7.42766 6.48032 7.52465C6.48032 7.62163 6.51719 7.71465 6.5828 7.78324L7.1428 8.36845C6.95268 8.67878 6.81444 9.02064 6.734 9.3794H5.95C5.85717 9.3794 5.76815 9.41794 5.70251 9.48653C5.63687 9.55512 5.6 9.64815 5.6 9.74516V10.4767C5.6 10.5737 5.63687 10.6667 5.70251 10.7353C5.76815 10.8039 5.85717 10.8424 5.95 10.8424H6.734C6.81298 11.2022 6.95004 11.5453 7.1393 11.857L6.5828 12.4386C6.51719 12.5072 6.48032 12.6002 6.48032 12.6972C6.48032 12.7942 6.51719 12.8872 6.5828 12.9558L7.0777 13.473C7.14333 13.5415 7.23234 13.58 7.32515 13.58C7.41796 13.58 7.50697 13.5415 7.5726 13.473L8.1326 12.8877C8.42956 13.0864 8.75669 13.2309 9.1 13.3149V14.1342C9.1 14.2312 9.13687 14.3243 9.20251 14.3929C9.26815 14.4615 9.35717 14.5 9.45 14.5H10.15C10.2428 14.5 10.3318 14.4615 10.3975 14.3929C10.4631 14.3243 10.5 14.2312 10.5 14.1342V13.3149C10.8443 13.2324 11.1726 13.0892 11.4709 12.8914L12.0274 13.4766C12.093 13.5452 12.182 13.5837 12.2748 13.5837C12.3677 13.5837 12.4567 13.5452 12.5223 13.4766L13.0172 12.9594C13.0828 12.8908 13.1197 12.7978 13.1197 12.7008C13.1197 12.6039 13.0828 12.5108 13.0172 12.4423L12.4572 11.8607C12.648 11.5481 12.7863 11.2037 12.866 10.8424H13.65C13.7428 10.8424 13.8318 10.8039 13.8975 10.7353C13.9631 10.6667 14 10.5737 14 10.4767V9.74516C14 9.64815 13.9631 9.55512 13.8975 9.48653C13.8318 9.41794 13.7428 9.3794 13.65 9.3794ZM9.8 11.9397C9.45388 11.9397 9.11554 11.8324 8.82775 11.6315C8.53997 11.4305 8.31566 11.1449 8.18321 10.8108C8.05076 10.4766 8.0161 10.1089 8.08363 9.75414C8.15115 9.39939 8.31782 9.07353 8.56256 8.81777C8.8073 8.56201 9.11912 8.38783 9.45859 8.31727C9.79806 8.2467 10.1499 8.28292 10.4697 8.42134C10.7895 8.55975 11.0628 8.79415 11.2551 9.0949C11.4474 9.39564 11.55 9.74922 11.55 10.1109C11.55 10.5959 11.3656 11.0611 11.0374 11.4041C10.7092 11.747 10.2641 11.9397 9.8 11.9397Z" />
                  <path d="M9.8 10.8424C10.1866 10.8424 10.5 10.5149 10.5 10.1109C10.5 9.70691 10.1866 9.3794 9.8 9.3794C9.4134 9.3794 9.1 9.70691 9.1 10.1109C9.1 10.5149 9.4134 10.8424 9.8 10.8424Z" />
                  <path d="M5.124 7.12414C5.19608 6.78616 5.35876 6.47661 5.593 6.23169L6.09 5.71451C6.25217 5.54418 6.44505 5.40916 6.65748 5.31724C6.86991 5.22533 7.09768 5.17836 7.3276 5.17904C7.3675 5.17904 7.4067 5.18636 7.4459 5.18855C7.73398 4.50446 7.79434 3.7392 7.61732 3.01505C7.4403 2.2909 7.03612 1.64965 6.46937 1.19376C5.90262 0.737867 5.206 0.493649 4.49082 0.500126C3.77564 0.506602 3.08317 0.763398 2.52406 1.22948C1.96496 1.69557 1.57147 2.34404 1.40649 3.07129C1.24151 3.79854 1.31454 4.56259 1.61392 5.24136C1.91331 5.92014 2.42176 6.47446 3.05805 6.81576C3.69433 7.15705 4.42172 7.26563 5.124 7.12414Z" />
                </svg>
                Users
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateProjectTabMain(5))}
                className={
                  projectTabMain === 5
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  className={
                    projectTabMain === 5
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
                    fill={projectTabMain === 5 ? `#1A56DB` : `#6B7280`}
                  />
                  <path
                    d="M12.6469 4H8.4C8.2145 4 8.036 4.0735 7.9051 4.2051L5.8051 6.3051C5.6735 6.436 5.6 6.6145 5.6 6.8V13.1C5.6 13.8721 6.2069 14.5 6.9531 14.5H12.6469C13.3931 14.5 14 13.8721 14 13.1V5.4C14 4.6279 13.3931 4 12.6469 4ZM8.4 5.6898V6.8H7.2898L8.4 5.6898ZM7 13.1V8.2H9.1C9.4864 8.2 9.8 7.8864 9.8 7.5V5.3937L12.5965 5.3818C12.5965 5.3818 12.6 5.3874 12.6 5.4L12.6469 13.1H7Z"
                    fill={projectTabMain === 5 ? `#1A56DB` : `#6B7280`}
                  />
                </svg>
                Reports
              </a>
            </li>
          </ul>
        </div>
        {projectTabMain === 1 && !selectedProject && (
          <div className="col-span-full p-5">
            <div className={`mt-5 h-[200px] w-full overflow-hidden`}>
              <img
                className="h-[200px] w-full object-fill"
                src={`${selectedOrganization?.image.url}`}
                alt=""
              />
            </div>
          </div>
        )}
        {projectTabMain === 0 && <Dashboard />}

        {projectTabMain === 1 ? (
          !selectedProject ? (
            <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
              <span className="text-gray-600">
                <b>Congratulations</b> on creating your first Project!! Please
                configure the project before adding any properties
              </span>
              <Button
                onClick={() => {
                  dispatch(updateProjectTabMain(3));
                }}
                className="mt-7 w-[200px]"
              >
                <div className="flex items-center gap-x-2 text-xs">
                  <BsSliders2Vertical />
                  Configure Project
                </div>
              </Button>
            </div>
          ) : (
            <div className="flex w-full flex-col">
              <div
                className="flex w-full items-center justify-between border-b-[1px]"
                onClick={() => setShowCard1(!showCard1)}
              >
                <h1 className="font-bold">Basic Information</h1>
                {showCard1 ? (
                  <FaAngleUp className="h-[50px] cursor-pointer" />
                ) : (
                  <FaAngleDown className="h-[50px] cursor-pointer" />
                )}
              </div>
              <div className="grid w-full grid-cols-2">
                <form>
                  <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1">
                    {showCard1 && (
                      <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                        <Label htmlFor="name">Project Name</Label>
                        <TextInput
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Project name"
                          required
                        />
                      </div>
                    )}
                    {showCard1 && (
                      <div className="grid grid-cols-1 gap-y-2">
                        <Label htmlFor="organization">Project type</Label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                          <option selected>Please Select</option>
                          {config &&
                            config.projectTypeList &&
                            config.projectTypeList.map(
                              (pt: ValueList, index: number) => {
                                return (
                                  <option
                                    key={index}
                                    value={pt.key}
                                    disabled={pt.value !== "apartment"}
                                  >
                                    {capitalizeFirstLetter(pt.value)}
                                  </option>
                                );
                              }
                            )}
                        </select>
                      </div>
                    )}
                    {showCard1 && (
                      <div className="grid grid-cols-1 gap-y-2">
                        <Label htmlFor="maintenanceServiceType">
                          Maintenance and Service type
                        </Label>
                        <select
                          id="maintenanceServiceType"
                          name="maintenanceServiceType"
                          value={formData.maintenanceServiceType}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                          <option selected>Please Select</option>
                          {config &&
                            config.projectMaintenanceServiceTypeList &&
                            config.projectMaintenanceServiceTypeList.map(
                              (pt: ValueList, index: number) => {
                                return (
                                  <option
                                    key={index}
                                    value={pt.key}
                                    disabled={pt.key !== "before_7_year"}
                                  >
                                    {capitalizeFirstLetter(pt.value)}
                                  </option>
                                );
                              }
                            )}
                        </select>
                      </div>
                    )}
                    {showCard1 && (
                      <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                        <Label htmlFor="address">Address</Label>
                        <form className="hidden md:block">
                          <Label htmlFor="search" className="sr-only">
                            Search
                          </Label>
                          <TextInput
                            disabled={!searchAddress}
                            icon={HiSearch}
                            id="search"
                            name="search"
                            placeholder="Search"
                            required
                            size={32}
                            type="search"
                          />
                        </form>
                        <span
                          onClick={() => setSearchAddress(!searchAddress)}
                          className="flex cursor-pointer items-center text-[14px] font-bold text-blue-400"
                        >
                          {searchAddress
                            ? "ENTER AN ADDRESS MANUALLY"
                            : "ENTER AN ADDRESS AUTOMATICALLY"}
                          <FaAngleRight className="mx-1" />
                        </span>
                      </div>
                    )}
                    {showCard1 && (
                      <>
                        {!searchAddress && (
                          <div>
                            <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                              <Label htmlFor="name">House no/Unit no</Label>
                              <TextInput
                                id="house"
                                name="house"
                                value={unitNo}
                                onChange={(event) =>
                                  setUnitNo(event.target.value)
                                }
                                placeholder="Add house no or unit no"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                              <Label htmlFor="line1">Address line 1</Label>
                              <TextInput
                                id="line1"
                                name="line1"
                                value={line1}
                                onChange={(event) =>
                                  setLine1(event.target.value)
                                }
                                placeholder="Address line 1"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                              <Label htmlFor="line1">Address line 2</Label>
                              <TextInput
                                id="line2"
                                name="line2"
                                value={line2}
                                onChange={(event) =>
                                  setLine2(event.target.value)
                                }
                                placeholder="Address line 2"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                              <Label htmlFor="line3">Address line 3</Label>
                              <TextInput
                                id="line3"
                                name="line3"
                                value={line3}
                                onChange={(event) =>
                                  setLine3(event.target.value)
                                }
                                placeholder="Address line 3"
                                required
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {showCard1 && (
                      <div className="grid w-[80%] grid-cols-1 gap-y-2">
                        <Label htmlFor="timezone">Upload Image</Label>

                        <div className="relative flex items-center justify-center">
                          {myImage.imageData === undefined ||
                          (myImage.imageData &&
                            myImage.imageData.id === 0 &&
                            !formData.image) ? (
                            <label
                              htmlFor="dropzone-file"
                              className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                            >
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                              />
                              {!myImage.isIdle && (
                                <div
                                  role="status"
                                  className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                                  <span className="sr-only">Loading...</span>
                                </div>
                              )}
                            </label>
                          ) : (
                            <>
                              <img
                                src={
                                  myImage.imageData.url || formData.image?.url
                                }
                                alt="file"
                                className="object-fill"
                              />
                              <Button
                                className="absolute right-0 top-1"
                                onClick={() => {
                                  dispatch(clear());
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    imageId: "",
                                    image: undefined,
                                  }));
                                }}
                                color="white"
                              >
                                <div className="flex items-center gap-x-2 text-xs">
                                  <RiCloseCircleFill
                                    color="red"
                                    className="h-6 w-6"
                                  />
                                </div>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div
                className="flex !w-full items-center justify-between border-b-[1px]"
                onClick={() => setShowCard2(!showCard2)}
              >
                <h1 className="font-bold">Upload Documents</h1>
                {showCard2 ? (
                  <FaAngleUp className="h-[50px] cursor-pointer" />
                ) : (
                  <FaAngleDown className="h-[50px] cursor-pointer" />
                )}
              </div>
              {showCard2 && (
                <div className="grid w-full grid-cols-2">
                  <Upload
                    handleUpload={handleUpload2}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                  />
                </div>
              )}
              <div className="my-10 flex">
                <Button
                  className="mx-1"
                  onClick={() => {
                    updateProject();
                  }}
                  disabled={!myImage.isIdle}
                  color="primary"
                >
                  Update Project
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => {
                    dispatch(updateProjectTabMain(0));
                  }}
                  color="gray"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )
        ) : projectTabMain === 2 ? (
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between border-b-[1px]">
              <h1 className="font-bold">Tower/Basement Information</h1>
            </div>
            <div className="grid w-full grid-cols-2">
              <form>
                <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1">
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                      }}
                      className="mt-7 w-[200px]"
                      disabled={gettingTowers}
                    >
                      {!gettingTowers ? (
                        <div className="flex items-center gap-x-2 text-xs">
                          <HiPlus />
                          Add new tower
                        </div>
                      ) : (
                        <>
                          <Spinner
                            aria-label="Alternate spinner button example"
                            size="sm"
                            color="success"
                            className="mr-2"
                          />
                          Add new tower
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full">
              <ProjectTable towers={towers} />
            </div>
            <div className="mt-10 grid w-full grid-cols-2">
              <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1">
                <div className="grid grid-cols-1 gap-y-2">
                  <Label htmlFor="organization">Basement Levels</Label>
                  <select
                    id="levels"
                    name="levels"
                    value={formData.numBasementLevels}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected>Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-y-2">
                  <div className="flex">
                    <Button
                      className="mx-1"
                      onClick={() => {
                        // dispatch(updateProjectTabMain(3));
                        // toast.info("Project Updated");
                        updateProject();
                      }}
                      color="primary"
                    >
                      Update Project
                    </Button>
                    <Button
                      className="mx-1"
                      onClick={() => {
                        dispatch(updateProjectTabMain(0));
                      }}
                      color="gray"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : projectTabMain === 3 ? (
          <ConfigureAccordion project_id={project_id} />
        ) : projectTabMain === 4 ? (
          <ConfigureAccordionUser />
        ) : (
          <></>
        )}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add new Tower</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Tower Name</Label>
              <TextInput
                id="name"
                name="name"
                value={towerFormData.name}
                onChange={handleInputChangeTower}
                placeholder="Enter your tower name"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="floors">Floors</Label>
              <select
                id="numFloors"
                name="numFloors"
                value={towerFormData.numFloors}
                onChange={handleInputChangeTower}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option selected>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => saveTower()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarSidebarLayout>
  );
};

export default ProjectSingle;
