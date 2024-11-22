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
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
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
  getAllBuilders,
  getAllRegions,
  registerOrg,
  uploadImageFile,
} from "../../store/features/reducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { RiCloseCircleFill } from "react-icons/ri";
import { clear } from "../../store/features/imageSlice";
import { registerToOrg } from "../../apis";
import Select from "react-select";
import { confirmAlert } from "react-confirm-alert";
import { BsThreeDots } from "react-icons/bs";

type organization = {
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
  const { selectedOrganization }: OrgState = useSelector(
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
    if (selectedOrganization) {
      setFormData({
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageId: myImage.imageData.id,
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
          toast.success("Organization registerd successfully!");
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
    if (selectedBuilder) {
      setSelectedBuilderList((oldArray) => [
        ...oldArray,
        JSON.parse(selectedBuilder),
      ]);
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
    const builderToAttach = selectedBuilderList.filter((obj) => obj.id);
    builderToAttach.map(async (builder: any) => {
      const params = {
        id: builder.id,
      };
      // await registerToOrg(params);
      console.log(params);
    });
    const newBuilder = selectedBuilderList.filter((obj) => !obj.id);
    const newData = { ...formData, users: newBuilder };
    if (valid) {
      console.log(newData);
      // setIsTriggered(true);
      // dispatch(registerOrg(newData));
    }
  };
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      dispatch(uploadImageFile(event.target.files[0]));
      //   setFile(event.target.files[0]);
      //   const res = await uploadImage(event.target.files[0]);
      //   if (res[0].id && res[0].id > 0) {
      //     setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       imageId: res[0].id,
      //     }));
      //   }
    }
  };

  const addBuilderToList = () => {
    try {
      const temp = {
        fullName: name,
        mobile,
        // password,
        email,
      };
      tempBuilders && tempBuilders.length > 0
        ? setTempBuilder((oldArray) => [...oldArray, temp])
        : setTempBuilder([temp]);
      setEmail("");
      setName("");
      setMobile("");
      setPassword("");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/organization">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Organizations</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/organization/${selectedOrganization?.id}`}>
              {selectedOrganization?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Edit Organization
          </h1>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between border-b-[1px]">
            <h1 className="font-bold">Organizational Information</h1>
            {showCard1 ? (
              <FaAngleUp
                className="h-[50px] cursor-pointer"
                onClick={() => setShowCard1(!showCard1)}
              />
            ) : (
              <FaAngleDown
                className="h-[50px] cursor-pointer"
                onClick={() => setShowCard1(!showCard1)}
              />
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
                    {/* <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>Select</option>
                      <option value="Australia/Sydney">Australia/Sydney</option>
                    </select> */}
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
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
                        </label>
                      ) : (
                        <>
                          <img
                            src={formData.image && formData.image.url}
                            alt="file"
                          />
                          <Button
                            className="absolute right-0 top-1"
                            onClick={() => {
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
          <div className="flex w-full items-center justify-between border-b-[1px]">
            <h1 className="font-bold">Builder Information</h1>
            {showCard2 ? (
              <FaAngleUp
                className="h-[50px] cursor-pointer"
                onClick={() => setShowCard2(!showCard2)}
              />
            ) : (
              <FaAngleDown
                className="h-[50px] cursor-pointer"
                onClick={() => setShowCard2(!showCard2)}
              />
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
                                    confirmAlert({
                                      title: "Confirm to remove",
                                      message: "Are you sure to do this.",
                                      buttons: [
                                        {
                                          label: "Yes",
                                          onClick: () => {
                                            const newList =
                                              selectedBuilderList.filter(
                                                (o) => o.email !== obj.email
                                              );
                                            setSelectedBuilderList(newList);
                                          },
                                        },
                                        {
                                          label: "No",
                                        },
                                      ],
                                    });
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
            <Button color="white" className="border-[1px]">
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
            {/* <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="******"
                required
              />
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addBuilderToList()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarSidebarLayout>
  );
};

export default OrganizationEdit;
