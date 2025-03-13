/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../../../icons";
import { useChecklist } from "../../../../_actions";
import { useRecoilValue } from "recoil";
import {
  checklistElementListAtom,
  checklistZoneListAtom,
} from "../../../../_state";
import { useModal } from "../../../../hooks/useModal";
import ChecklistZoneModal from "./checklistModal";
import { toast } from "react-toastify";
import ChecklistElementModal from "./ChecklistElementModal";

export default function ChecklistManagement() {
  const checklistAction = useChecklist();
  const checklistZones = useRecoilValue(checklistZoneListAtom);
  const checklistElements = useRecoilValue(checklistElementListAtom);
  const [defaultSelectedZone, setDefaultSelectedZone] = useState(0);
  const [defaultSelectedElement, setDefaultSelectedElement] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    checklistAction.getChecklistZone();
  }, []);

  useEffect(() => {
    if (checklistZones?.length > 0) {
      checklistAction.getChecklistElement(
        checklistZones[defaultSelectedZone]?.id
      );
    }
  }, [checklistZones]);

  function onSubmitZone(props: any) {
    const params = {
      order: checklistZones.length + 1,
      ...props,
    };
    checklistAction
      .saveChecklistZone(params)
      .then(() => {
        checklistAction.getChecklistZone();
        closeModal();
      })
      .catch((e) => toast.error(e));
  }

  function onSubmitElement(props: any) {
    const params = {
      order: checklistElements.length + 1,
      checklistZoneId: checklistZones[defaultSelectedZone]?.id,
      ...props,
    };
    checklistAction
      .saveChecklistElement(params)
      .then(() => {
        checklistAction.getChecklistZone();
        closeModal();
      })
      .catch((e) => toast.error(e));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {modalType === 0 && (
        <ChecklistZoneModal
          isOpen={isOpen}
          closeModal={closeModal}
          title={modalTitle}
          onSubmit={onSubmitZone}
        />
      )}
      {modalType === 1 && (
        <ChecklistElementModal
          isOpen={isOpen}
          closeModal={closeModal}
          title={modalTitle}
          onSubmit={onSubmitElement}
        />
      )}
      <div className="border-2 border-gray-600 shadow-md">
        <div className="flex justify-between p-2 items-center border-b-2 border-gray-600">
          <span className="font-bold">Zones</span>
          <div
            className="cursor-pointer"
            onClick={() => {
              setModalType(0);
              setModalTitle("Add New Zone");
              openModal();
            }}
          >
            <PlusIcon />
          </div>
        </div>
        <div>
          {checklistZones?.map((zone: any, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between p-2 items-center ${
                  defaultSelectedZone === index &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <div
                  className="w-[80%] cursor-pointer"
                  onClick={() => {
                    setDefaultSelectedZone(index);
                  }}
                >
                  <span>{zone.name}</span>
                </div>
                <div className="flex gap-2">
                  <PencilIcon
                    className="text-green-600 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Edit"
                  />
                  <TrashBinIcon
                    className="text-red-600 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-y-2 border-gray-600 shadow-md">
        <div className="flex justify-between p-2 items-center border-b-2 border-gray-600">
          <span className="font-bold">Elements</span>
          <div
            className="cursor-pointer"
            onClick={() => {
              setModalType(1);
              setModalTitle("Add New Element");
              openModal();
            }}
          >
            <PlusIcon />
          </div>
        </div>
        <div>
          {checklistElements?.map((element: any, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between p-2 items-center ${
                  defaultSelectedElement === index &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <div
                  className="w-[80%] cursor-pointer"
                  onClick={() => setDefaultSelectedElement(index)}
                >
                  <span>{element.name}</span>
                </div>

                <div className="flex gap-2">
                  <PencilIcon
                    className="text-green-600 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Edit"
                  />
                  <TrashBinIcon
                    className="text-red-600 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-2 border-gray-600 shadow-md">
        <div className="flex justify-between p-2 items-center border-b-2 border-gray-600">
          <span className="font-bold">Defects</span>
          <div
            className="cursor-pointer"
            onClick={() => {
              setModalTitle("Add New Defect");
              openModal();
            }}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
