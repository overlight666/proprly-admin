/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, Modal, TextInput, ToggleSwitch } from "flowbite-react";
import { BsList, BsThreeDotsVertical } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { selectCommonAreaElement } from "../../../../../store/features/projectSlice";
import type { ProjectState, FullElements } from "../../../../../types";

export default function CAElementItems({ openModal, setOpenModal }: any) {
  const { selectedCommonArea, selectedCommonAreaElement }: ProjectState =
    useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  const [switch1, setSwitch1] = useState(false);

  const [element, setElement] = useState("");
  const addElement = () => {
    if (element.trim() !== "") {
      toast.warning("Create element is still in construction");
    }
  };

  return (
    <>
      <div className="relative p-1 px-3 pb-20 shadow-md">
        {(selectedCommonArea?.elements &&
          selectedCommonArea?.elements.length > 0 &&
          selectedCommonArea?.elements.map(
            (element: FullElements, index: any) => {
              return (
                <>
                  <div
                    key={index}
                    className={`flex cursor-pointer flex-row items-center justify-between rounded-md p-2 ${
                      selectedCommonAreaElement &&
                      selectedCommonAreaElement.id == element.id &&
                      `bg-gray-100`
                    }`}
                    onClick={() => {
                      dispatch(selectCommonAreaElement(element));
                    }}
                  >
                    <div className="flex flex-row items-center">
                      <Button color="white" className="w-[50px]">
                        <BsList />
                      </Button>
                      <span>{element.name}</span>
                    </div>
                    <BsThreeDotsVertical />
                  </div>
                  {element.subElements && (
                    <div className="flex w-full flex-col">
                      {element.subElements && element.subElements.length ? (
                        element.subElements.map((el, index) => {
                          return (
                            <div
                              key={index}
                              className="ml-[13%] border-l-2 py-[1px]"
                            >
                              <div className="relative flex items-center gap-2">
                                <div className="absolute left-[-7px] h-[12px] w-[12px] rounded-full border-[1px] border-solid border-white bg-[black]"></div>
                                <span className="ml-3">{el.name}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              );
            }
          )) || <span>Select a common area</span>}

        <Button className="absolute bottom-1 my-5 ml-3 w-[150px]">
          <div className="flex items-center gap-x-2 text-xs">Save Changes</div>
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Common Area Element</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Element</Label>
              <TextInput
                value={element}
                id="element"
                name="element"
                placeholder="Enter element name"
                onChange={(e) => setElement(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <span>Has sub elements?</span>
              <ToggleSwitch checked={switch1} label="" onChange={setSwitch1} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addElement()}>Add</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
