/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  Country,
  ImageState,
  ImageType,
  LeadState,
  OrgState,
  Regions,
  Timezone,
  UserState,
} from "../../types";
import {
  addOrgUser,
  getAllBuilders,
  getAllRegions,
  getOneOrg,
  registerOrg,
  updateOrg,
  uploadImageFile,
} from "../../store/features/reducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { RiCloseCircleFill } from "react-icons/ri";
import { clear } from "../../store/features/imageSlice";
import Select from "react-select";
import { BsThreeDots } from "react-icons/bs";
import { clearOrgUpdates } from "../../store/features/organizationSlice";
import { ConfirmModal } from "../../components/modals/confirmModal";

type organization = {
  id?: number;
  name: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  country: string;
  imageId: number;
  regionId: number;
  timezoneId: number;
  region?: Regions;
  image?: ImageType;
};
const OrganizationEdit: FC = function () {
  const { builderList, loadingBuilders }: LeadState = useSelector(
    (state: any) => state.lead
  );
  const { selectedOrganization, isUpdated }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);
  const [selectedBuilder, setSelectedBuilder] = useState("");
  const [tempBuilders, setTempBuilder] = useState<any>([]);
  const [selectedBuilderList, setSelectedBuilderList] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [timezoneOption, setTimezoneOptions] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const { isIdle, loading, orgData }: OrgState = useSelector(
    (state: any) => state.organization
  );

  const { regions }: AppState = useSelector((state: any) => state.application);

  const myImage: ImageState = useSelector((state: any) => state.uploads);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const [file, setFile] = useState<any>(undefined);
  const [formData, setFormData] = useState<organization>({
    id: undefined,
    name: "",
    timezone: "",
    currency: "",
    dateFormat: "dd-mm-yyyy",
    country: "",
    imageId: 0,
    regionId: 0,
    timezoneId: 0,
  });

  useEffect(() => {
    if (isUpdated) {
      dispatch(getOneOrg(selectedOrganization && selectedOrganization.id));
      dispatch(clearOrgUpdates());
      toast.success("Organization is updated!");
      setTimeout(() => {
        navigate(`/organization`);
      }, 5000);
    }
  }, [isUpdated]);

  useEffect(() => {
    if (selectedOrganization) {
      setFormData({
        id: selectedOrganization.id,
        name: selectedOrganization.name,
        timezone: selectedOrganization.timezone.name,
        currency: selectedOrganization.currency,
        dateFormat: selectedOrganization.dateFormat,
        country: selectedOrganization.region
          ? selectedOrganization.region?.regionName
          : "",
        imageId: selectedOrganization.image.id,
        regionId: selectedOrganization.region
          ? selectedOrganization.region.id
          : 0,
        timezoneId: selectedOrganization.timezone.id,
        image: selectedOrganization.image,
      });
      setSelectedBuilderList(selectedOrganization.user);
    }
  }, [selectedOrganization]);

  useEffect(() => {
    dispatch(getAllBuilders());
    dispatch(getAllRegions());
  }, []);

  useEffect(() => {
    if (regions && regions.length > 0) {
      const noptions = regions.map((c) => {
        return {
          value: c.regionName.toLowerCase(),
          code: c.regionCode,
          label: c.regionName,
          ...c,
        };
      });
      setOptions(noptions);
    }
  }, [regions]);

  useEffect(() => {
    if (options) {
      setSelectedCountry(
        options.find((options: Regions) => options.id === formData.regionId)
      );
    }
  }, [options]);

  useEffect(() => {
    if (selectedCountry) {
      const tz = selectedCountry.timezone.map((t: Timezone) => {
        return {
          label: t.name,
          value: t.name,
          id: t.id,
        };
      });
      setTimezoneOptions(tz);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!loadingBuilders && builderList) {
      setTempBuilder(builderList.data);
    }
  }, [loadingBuilders]);

  useEffect(() => {
    if (myImage.imageData !== undefined && myImage.imageData.id > 0) {
      const imgdt: any = {
        id: myImage.imageData.id,
        url: myImage.imageData.url,
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageId: myImage.imageData.id,
        image: imgdt,
      }));
    }
  }, [myImage.imageData.id, myImage.imageData]);

  useEffect(() => {
    if (orgData && orgData.name === "error") {
      toast.error(
        "We encountered some errors during the process, please contact admin"
      );
      dispatch(clear());
      setTimeout(() => {
        navigate(`/organization`);
      }, 5000);
    } else {
      if (isTriggered && isIdle && !loading) {
        if (orgData.id !== undefined && orgData?.id > 0) {
          toast.success("Organization registered successfully!");
          setFormData((prevFormData) => ({
            ...prevFormData,
            country: "",
            timezone: "",
            currency: "",
            name: "",
            imageId: 0,
          }));
          dispatch(clear());
          navigate(`/organization`);
        }
      }
    }
  }, [isIdle, isTriggered, orgData, loading]);

  const addSelectedBuilder = () => {
    const params = JSON.parse(selectedBuilder);
    params.roleId = 1;
    if (selectedBuilder) {
      const params = JSON.parse(selectedBuilder);
      params.roleId = 1;
      if (!selectedBuilderList.find((o) => o.id === params.id)) {
        if (!selectedBuilderList.find((o) => o.email === params.email)) {
          // setSelectedBuilderList((oldArray) => [...oldArray, params]);
          params.req = "update";
          dispatch(addOrgUser(params));
        } else {
          toast.warning("Builder email already exist");
        }
      } else {
        toast.warning("Builder already exist");
      }
    }
  };

  const handleInputChange = (event: any) => {
    try {
      const { name, value, currency, id, timezone } = event.target;
      if (name === "country") {
        setFormData((prevFormData): any => ({
          ...prevFormData,
          [name]: value,
          ["currency"]: currency,
          regionId: id,
        }));
        const tz = timezone.map((t: Timezone) => {
          return {
            label: t.name,
            value: t.name,
            id: t.id,
          };
        });
        setTimezoneOptions(tz);
      } else if (name === "timezone") {
        setFormData((prevFormData): any => ({
          ...prevFormData,
          [name]: value,
          timezoneId: id,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    let valid = true;
    setErrors([]);
    if (formData.name === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Organization name is required!",
      ]);
      valid = false;
    }
    if (formData.timezone === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Timezone is required!",
      ]);
      valid = false;
    }
    if (formData.country === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Country is required!",
      ]);
      valid = false;
    }
    if (formData.currency === "") {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Currency is required!",
      ]);
      valid = false;
    }
    if (formData.imageId === 0) {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Your uploaded images has encounter an error please re-upload",
      ]);
      valid = false;
    }

    if (valid) {
      // setIsTriggered(true);
      dispatch(updateOrg(formData));
    }
  };
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      dispatch(uploadImageFile(event.target.files[0]));
    }
  };

  const addBuilderToList = () => {
    try {
      const temp = {
        id: selectedOrganization && selectedOrganization.id,
        fullName: name,
        mobile,
        email,
        roleId: 1,
        req: "new",
      };
      if (!selectedBuilderList.find((o) => o.mobile === temp.mobile)) {
        if (!selectedBuilderList.find((o) => o.email === temp.email)) {
          // setSelectedBuilderList((oldArray) => [...oldArray, temp]);
          dispatch(addOrgUser(temp));
          setEmail("");
          setName("");
          setMobile("");
          setPassword("");
          setOpenModal(false);
        } else {
          toast.warning("Builder email already exist");
        }
      } else {
        toast.warning("Builder mobile already used");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [openModal, setOpenModal] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedObj, setSelectedObj] = useState<any>(undefined);

  const [isProcess, setIsProcess] = useState(false);

  const handleConfirm = () => {
    setIsProcess(true);
    const newList = selectedBuilderList.filter(
      (o) => o.email !== selectedObj.email
    );
    setSelectedBuilderList(newList);
    setSelectedObj(false);
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
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
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
            Edit Organization
          </h1>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />
        <div className="flex w-full flex-col">
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard1(!showCard1)}
          >
            <h1 className="font-bold">Organizational Information</h1>
            {showCard1 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard1 && (
            <div className="grid w-full grid-cols-2">
              <form>
                <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1">
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="name">Organization Name</Label>
                    <TextInput
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter organization name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <Label htmlFor="organization">Select Country</Label>
                    <Select
                      // className="basic-single"
                      classNamePrefix="select"
                      options={options}
                      isSearchable={true}
                      defaultValue={selectedCountry}
                      onChange={(event) =>
                        handleInputChange({
                          target: {
                            name: "country",
                            ...event,
                          },
                        })
                      }
                      id="country"
                      name="country"
                      value={selectedCountry}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="currency">Currency</Label>
                    <TextInput
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      placeholder="Auto populate based on the country"
                      readOnly
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <Label htmlFor="timezone">Select Timezone</Label>
                    <Select
                      // className="basic-single"
                      classNamePrefix="select"
                      options={timezoneOption}
                      isSearchable={true}
                      defaultValue={timezoneOption.find(
                        (tz: Timezone) => tz.id === formData.timezoneId
                      )}
                      onChange={(event: any) =>
                        handleInputChange({
                          target: {
                            name: "timezone",
                            ...event,
                          },
                        })
                      }
                      id="timezone"
                      name="timezone"
                      value={timezoneOption.find(
                        (tz: Timezone) => tz.id === formData.timezoneId
                      )}
                    />
                  </div>
                  <div className="grid w-[80%] grid-cols-1 gap-y-2">
                    <Label htmlFor="timezone">Upload Image</Label>

                    <div className="relative flex w-full items-center justify-center">
                      {formData.image === undefined ||
                      (formData.imageId && formData.imageId === 0) ? (
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
                              (formData.image && formData.image.url) ||
                              (myImage && myImage.imageData.url)
                            }
                            alt="file"
                          />
                          <Button
                            className="absolute right-0 top-1"
                            onClick={() => {
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                imageId: 0,
                                image: undefined,
                              }));
                              dispatch(clear());
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
                </div>
              </form>
            </div>
          )}
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard2(!showCard2)}
          >
            <h1 className="font-bold">Builder Information</h1>
            {showCard2 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard2 && (
            <div>
              <div className="grid w-full grid-cols-2  max-md:grid-cols-1">
                <div className="grid grid-cols-1 gap-y-2 pt-8">
                  <Label htmlFor="builder">Builder list</Label>
                  <Select2
                    id="builder"
                    name="builder"
                    // value={country}
                    onChange={(event) => setSelectedBuilder(event.target.value)}

                    // className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    {/* {(!loadingBuilders &&
                      builderList &&
                      builderList.data.map((obj: any) => {
                        return (
                          <option key={obj.id} value={JSON.stringify(obj)}>
                            {obj.fullName}
                          </option>
                        );
                      })) || <option selected>Select</option>} */}
                    <option selected>Select</option>
                    {tempBuilders &&
                      tempBuilders.length &&
                      tempBuilders.map((obj: any, index: any) => {
                        return (
                          <option key={index} value={JSON.stringify(obj)}>
                            {obj.fullName}
                          </option>
                        );
                      })}
                  </Select2>
                </div>
                <div className="ml-3 mt-14 flex items-center">
                  <Button color="primary" onClick={() => addSelectedBuilder()}>
                    <GoPlus />
                    Attach Builder
                  </Button>
                </div>
              </div>

              <div className="relative mt-10 w-full overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        FULL NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                          PHONE
                          <a href="#">
                            <svg
                              className="ms-1.5 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                          EMAIL ADDRESS
                          <a href="#">
                            <svg
                              className="ms-1.5 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBuilderList && selectedBuilderList.length ? (
                      selectedBuilderList.map((obj: any, index: any) => {
                        return (
                          <tr
                            key={index}
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {obj.fullName}
                            </th>
                            <td className="px-6 py-4">
                              {obj.mobile ? obj.mobile : obj.mobileNumber}
                            </td>
                            <td className="px-6 py-4">{obj.email}</td>
                            <td>
                              <Dropdown
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                  <Button color="gray" className="w-[50px]">
                                    <div className="flex items-center gap-x-2 text-xs">
                                      <BsThreeDots />
                                    </div>
                                  </Button>
                                )}
                              >
                                <Dropdown.Item
                                  onClick={() => {
                                    setOpenConfirm(true);
                                    setSelectedObj(obj);
                                  }}
                                >
                                  Remove
                                </Dropdown.Item>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          style={{ textAlign: "center", padding: "10px" }}
                        >
                          <span>NO RECORD</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="mt-5 flex items-center text-[14px] text-[blue]">
                  <a
                    href="javascript:void(0)"
                    onClick={() => setOpenModal(true)}
                  >
                    ADD NEW BUILDER
                  </a>
                  <GoPlus />
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-12 gap-5 pt-10">
            <Button
              color="primary"
              onClick={() => handleSubmit()}
              disabled={!myImage.isIdle || !isIdle}
            >
              Update
            </Button>
            <Button
              color="white"
              className="border-[1px]"
              onClick={() => {
                navigate(`/organization`);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add new Builder</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Full Name</Label>
              <TextInput
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="mobile">Mobile number</Label>
              <TextInput
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="email">Email address</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addBuilderToList()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmModal
        isOpen={openConfirm}
        setOpen={setOpenConfirm}
        confirmHandler={handleConfirm}
        isProcess={isProcess}
        title={"Are you sure you want to remove this builder?"}
      />
    </NavbarSidebarLayout>
  );
};

export default OrganizationEdit;
