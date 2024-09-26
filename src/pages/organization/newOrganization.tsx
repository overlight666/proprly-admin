/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ChangeEvent } from "react";
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import ErrorHandler from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import type { OrgState } from "../../types";
import { registerOrg } from "../../store/features/reducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../../apis";
import { useNavigate } from "react-router";

type organization = {
  name: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  country: string;
  imageId: number;
};
const OrganizationNewPage: FC = function () {
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [errors, setErrors] = useState<any>([]);
  const { isIdle, loading, orgData }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState<any>(undefined);
  const [formData, setFormData] = useState<organization>({
    name: "",
    timezone: "",
    currency: "",
    dateFormat: "dd-mm-yyyy",
    country: "",
    imageId: 0,
  });

  useEffect(() => {
    if (!isIdle && loading) {
      setIsTriggered(true);
    }
    if (isTriggered && isIdle && !loading) {
      if (orgData.id !== undefined && orgData.id > 0) {
        toast.success("Organization registerd successfuly!");
        setFormData((prevFormData) => ({
          ...prevFormData,
          country: "",
          timezone: "",
          currency: "",
          name: "",
          imageId: 0,
        }));
        navigate("/organization");
      }
    }
  }, [isIdle, isTriggered, orgData.id, loading]);

  const handleInputChange = (event: any) => {
    try {
      const { name, value } = event.target;
      if (name === "country") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          ["currency"]: "AUD",
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
      dispatch(registerOrg(formData));
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      setFile(event.target.files[0]);
      const res = await uploadImage(event.target.files[0]);
      console.log(res[0].id);
      if (res[0].id && res[0].id > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageId: res[0].id,
        }));
      }
    }
  };

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
            <Breadcrumb.Item href="/organization/new">
              Add Organization
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            New Organization
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
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>Select</option>
                      <option value="AU">Australia</option>
                    </select>
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
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>Select</option>
                      <option value="Australia/Sydney">Australia/Sydney</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <Label htmlFor="timezone">Upload Image</Label>

                    <div className="flex w-full items-center justify-center">
                      {(file === undefined && (
                        <label
                          htmlFor="dropzone-file"
                          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
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
                      )) || <img src={URL.createObjectURL(file)} alt="file" />}
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
                  <select
                    id="builder"
                    name="builder"
                    // value={country}
                    // onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected>Select</option>
                  </select>
                </div>
                <div className="ml-3 mt-14 flex items-center">
                  <Button color="primary">
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        John Doe
                      </th>
                      <td className="px-6 py-4">09998345342</td>
                      <td className="px-6 py-4">test@admin.com</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-5 flex items-center text-[14px] text-[blue]">
                  <a href="">ADD NEW BUILDER</a>
                  <GoPlus />
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-12 gap-5 pt-10">
            <Button color="primary" onClick={() => handleSubmit()}>
              Submit
            </Button>
            <Button color="white" className="border-[1px]">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default OrganizationNewPage;
