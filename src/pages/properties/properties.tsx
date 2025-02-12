/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import { Button, Label, Modal } from "flowbite-react";

import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  OrgState,
  PropertyState,
  ReducerTypes,
} from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePropertyTab } from "../../store/features/appSlice";
// import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { getProperties } from "../../store/features/reducers";
import PropertyTable from "../../components/propertyTable";
import PropertyHeader from "../../components/propertyHeader";
import DefectHeader from "../../components/defectHeader";
import DefectResolution from "./defectResolution/defectResolution";
import { MdBugReport } from "react-icons/md";
import PropertyReportHeader from "../../components/propertyReportHeader";
import PropertyReportTable from "../../components/propertyReportTable";

import { BsCaretRightFill } from "react-icons/bs";

const Properties: FC = function () {
  const { project_id }: any = useParams();
  // const didInit = false;
  const { propertyData, isIdle }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { propertyTab }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );

  const [selected, setSelected] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
  const [headerValue, setHeaderValue] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadProperty = () => {
    if (uploadType === "single") {
      navigate(
        `/organization/${selectedOrganization?.id}/project/${project_id}/properties/new`
      );
    }
  };
  useEffect(() => {
    // if (!didInit) {
    dispatch(getProperties(project_id));
    dispatch(updatePropertyTab(1));
    // didInit = true;
    // }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" />
      {!isIdle && (
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

      <div className="mb-6 grid grid-flow-row-dense grid-cols-1 gap-y-6 bg-[#ffffff] px-4 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="flex w-full flex-row">
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
                      fill={propertyTab === 1 ? "#1C64F2" : "#6B7280"}
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
                  <MdBugReport className="mr-[5px]" size={20} />
                  Defect Resolution
                </a>
              </li>
              <li className="me-2">
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(updatePropertyTab(3))}
                  className={
                    propertyTab === 3
                      ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                      : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                  }
                  aria-current="page"
                >
                  <svg
                    className={
                      propertyTab === 3
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
                      fill={propertyTab === 3 ? `#1A56DB` : `#6B7280`}
                    />
                    <path
                      d="M12.6469 4H8.4C8.2145 4 8.036 4.0735 7.9051 4.2051L5.8051 6.3051C5.6735 6.436 5.6 6.6145 5.6 6.8V13.1C5.6 13.8721 6.2069 14.5 6.9531 14.5H12.6469C13.3931 14.5 14 13.8721 14 13.1V5.4C14 4.6279 13.3931 4 12.6469 4ZM8.4 5.6898V6.8H7.2898L8.4 5.6898ZM7 13.1V8.2H9.1C9.4864 8.2 9.8 7.8864 9.8 7.5V5.3937L12.5965 5.3818C12.5965 5.3818 12.6 5.3874 12.6 5.4L12.6469 13.1H7Z"
                      fill={propertyTab === 3 ? `#1A56DB` : `#6B7280`}
                    />
                  </svg>
                  Inspection Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
        {!propertyData ? (
          <></>
        ) : (
          <>
            {propertyTab === 1 && (
              <div className="flex w-full flex-col  !bg-transparent">
                <PropertyHeader selected={selected} />
                <PropertyTable
                  properties={propertyData}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}
            {propertyTab === 2 && (
              <div className="flex w-full flex-col  !bg-transparent">
                <DefectHeader />
                <DefectResolution />
              </div>
            )}
            {propertyTab === 3 && (
              <div className="flex w-full flex-col  !bg-transparent">
                <PropertyReportHeader setHeaderValue={setHeaderValue} />
                <PropertyReportTable headerValue={headerValue} />
              </div>
            )}
          </>
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
            {uploadType == "bulk" && (
              <span className="text-blue-600">
                DOWNLOAD PROPERTY TEMPLATE <BsCaretRightFill className="ml-2" />
              </span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => uploadProperty()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Properties;
