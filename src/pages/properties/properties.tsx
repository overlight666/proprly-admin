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
import type { OrgState, PropertyState } from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePropertyTab } from "../../store/features/appSlice";
// import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { getProperties } from "../../store/features/reducers";
import PropertyTable from "../../components/propertyTable";
import PropertyHeader from "../../components/propertyHeader";

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

  const [selected, setSelected] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
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
        {!propertyData ? (
          <></>
        ) : (
          <div className="flex w-full flex-col  !bg-transparent">
            <PropertyHeader selected={selected} />
            <PropertyTable
              properties={propertyData}
              selected={selected}
              setSelected={setSelected}
            />
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
