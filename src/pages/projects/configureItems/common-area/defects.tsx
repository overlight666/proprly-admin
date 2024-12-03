/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "flowbite-react";
import { BsList, BsX } from "react-icons/bs";
import type { FullDefectCode, ProjectState } from "../../../../types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CADefectsItems({ openModal, setOpenModal }: any) {
  const { selectedCommonAreaElement }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const addDefect = () => {
    toast.warning("Create zone is still in construction");
  };

  return (
    <>
      <div className="relative p-1 px-3 pb-20 shadow-md">
        {selectedCommonAreaElement?.defectCode &&
        selectedCommonAreaElement?.defectCode.length > 0 ? (
          selectedCommonAreaElement?.defectCode.map(
            (defect: FullDefectCode, index: any) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between  py-2"
                >
                  <div className="flex flex-row items-center">
                    <Button color="white" className="w-[50px]">
                      <BsList />
                    </Button>
                    <span>{`${defect.defectCode} - ${defect.defectName}`}</span>
                  </div>
                  <BsX />
                </div>
              );
            }
          )
        ) : selectedCommonAreaElement?.defectCode &&
          selectedCommonAreaElement?.defectCode.length === 0 ? (
          <span>No data to show</span>
        ) : (
          <span>Select an element</span>
        )}

        <Button className="absolute bottom-1 my-5 ml-3 w-[150px]">
          <div className="flex items-center gap-x-2 text-xs">Save Changes</div>
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Select Defects</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <select
                id="country"
                name="country"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option selected>Select</option>
                <option value="AU">Defect 2</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addDefect()}>Add</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
