/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, Modal } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  OrgState,
  ProjectState,
  PropertyState,
  ReducerTypes,
} from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePropertyTab } from "../../store/features/appSlice";
import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getProperties } from "../../store/features/reducers";
import PropertyTable from "../../components/propertyTable";
import PropertyHeader from "../../components/propertyHeader";

const Properties: FC = function () {
  const { propertyData }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { propertyTab }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const [openModal, setOpenModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadProperty = () => {
    if (uploadType === "single") {
      navigate(
        `/organization/${selectedOrganization?.id}/project/${selectedProject?.id}/properties/new`
      );
    }
  };
  useEffect(() => {
    dispatch(getProperties(selectedProject?.id));
  }, []);
  console.log(propertyData);
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
            <Breadcrumb.Item href="/organization/new">
              {selectedProject?.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            {selectedProject?.name}
          </h1>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updatePropertyTab(1))}
                className={
                  propertyTab === 1
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 2 }}
                >
                  <path
                    d="M15.8335 11.6667V6.25L11.6668 3.33333L7.50016 6.25V7.5H5.8335V5.41667L11.6668 1.25L17.5002 5.41667V11.6667H15.8335ZM12.0835 6.66667H12.9168V5.83333H12.0835V6.66667ZM10.4168 6.66667H11.2502V5.83333H10.4168V6.66667ZM12.0835 8.33333H12.9168V7.5H12.0835V8.33333ZM10.4168 8.33333H11.2502V7.5H10.4168V8.33333ZM5.8335 15.4167L11.6252 17L16.5835 15.4583C16.5141 15.3333 16.4134 15.2257 16.2814 15.1354C16.1495 15.0451 16.0002 15 15.8335 15H11.6252C11.2502 15 10.9516 14.9861 10.7293 14.9583C10.5071 14.9306 10.2779 14.875 10.0418 14.7917L8.10433 14.1458L8.56266 12.5208L10.2502 13.0833C10.4863 13.1528 10.7641 13.2083 11.0835 13.25C11.4029 13.2917 11.8752 13.3194 12.5002 13.3333C12.5002 13.1806 12.455 13.0347 12.3647 12.8958C12.2745 12.7569 12.1668 12.6667 12.0418 12.625L7.16683 10.8333H5.8335V15.4167ZM0.833496 18.3333V9.16667H7.16683C7.26405 9.16667 7.36127 9.17708 7.4585 9.19792C7.55572 9.21875 7.646 9.24306 7.72933 9.27083L12.6252 11.0833C13.0835 11.25 13.455 11.5417 13.7397 11.9583C14.0245 12.375 14.1668 12.8333 14.1668 13.3333H15.8335C16.5279 13.3333 17.1182 13.5625 17.6043 14.0208C18.0904 14.4792 18.3335 15.0833 18.3335 15.8333V16.6667L11.6668 18.75L5.8335 17.125V18.3333H0.833496ZM2.50016 16.6667H4.16683V10.8333H2.50016V16.6667Z"
                    fill="#1E429F"
                  />
                </svg>
                Manage
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updatePropertyTab(2))}
                className={
                  propertyTab === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
                aria-current="page"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM4.16667 15.8333H15.8333V4.16667H4.16667V15.8333Z"
                    fill="#1E429F"
                  />
                </svg>
                Defect Resolution
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updatePropertyTab(2))}
                className={
                  propertyTab === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
                aria-current="page"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM4.16667 15.8333H15.8333V4.16667H4.16667V15.8333Z"
                    fill="#1E429F"
                  />
                </svg>
                Reports
              </a>
            </li>
          </ul>
        </div>
        {propertyTab === 1 && !propertyData && (
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
        {!propertyData ? (
          <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
            <span className="text-gray-600">
              <b>Congratulations</b> on configuring your first project!! You can
              now add properties and common areas to the project
            </span>
            <div className="mt-7 flex ">
              <Button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="mx-1 w-[200px]"
              >
                <div className="flex items-center gap-x-2 text-xs">
                  <BsSliders2Vertical />
                  Add Properties
                </div>
              </Button>
              <Button
                onClick={() => {
                  dispatch(updatePropertyTab(3));
                }}
                className=" mx-1 w-[200px]"
                color="gray"
              >
                <div className="flex items-center gap-x-2 text-xs text-[blue]">
                  <BsSliders2Vertical />
                  Add Common Areas
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col  !bg-transparent">
            <PropertyHeader />
            <PropertyTable properties={propertyData} />
          </div>
        )}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Property</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="floors">Select upload type</Label>
              <select
                id="uploadType"
                name="uploadType"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="single">Single Property</option>
                <option value="bulk">Bulk Upload</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => uploadProperty()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarSidebarLayout>
  );
};

export default Properties;
