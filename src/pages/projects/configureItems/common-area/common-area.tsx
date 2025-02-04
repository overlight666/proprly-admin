/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BsList, BsThreeDotsVertical } from "react-icons/bs";
import type { FullCommonArea, ProjectState } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { selectCommonArea } from "../../../../store/features/projectSlice";
// import { getChecklistElementReducer } from "../../../../store/features/reducers";

export default function CommonAreaItems({ openModal, setOpenModal }: any) {
  const { allCommonArea, selectedCommonArea }: ProjectState = useSelector(
    (state: any) => state.project,
  );
  const dispatch = useDispatch();
  const [zone, setZone] = useState("");
  const addZone = () => {
    if (zone.trim() !== "") {
      toast.warning("Create common area is still in construction");
    }
  };

  return (
    <>
      <div className="relative p-1 px-3 pb-20 shadow-md">
        {(allCommonArea &&
          allCommonArea.length > 0 &&
          allCommonArea.map((ca: FullCommonArea, index: any) => {
            return (
              <div
                key={index}
                className={`flex cursor-pointer flex-row items-center justify-between rounded-md p-2 ${
                  selectedCommonArea &&
                  selectedCommonArea.id == ca.id &&
                  `bg-gray-100`
                }`}
                onClick={() => {
                  dispatch(selectCommonArea(ca));
                }}
              >
                <div className="flex flex-row items-center">
                  <Button color="white" className="w-[50px]">
                    <BsList />
                  </Button>
                  <span>{ca.name}</span>
                </div>
                <BsThreeDotsVertical />
              </div>
            );
          })) || <span>loading data</span>}

        <Button className="absolute bottom-1 my-5 ml-3 w-[150px]">
          <div className="flex items-center gap-x-2 text-xs">Save Changes</div>
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Common Area</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Common Area</Label>
              <TextInput
                value={zone}
                id="zone"
                name="zone"
                placeholder="Enter zone name"
                onChange={(e) => setZone(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addZone()}>Add</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
