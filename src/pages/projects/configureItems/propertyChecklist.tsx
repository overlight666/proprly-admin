/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiPlus } from "react-icons/hi";
import { Button } from "flowbite-react";
import ZoneItems from "./checklists/zones";
import { useState } from "react";
import ElementItems from "./checklists/elements";
import DefectsItems from "./checklists/defects";

export default function PropertyChecklist() {
  const [openZoneModal, setOpenZoneModal] = useState(false);
  const [openElementModal, setOpenElementModal] = useState(false);
  const [openDefectModal, setOpenDefectModal] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="flex flex-row items-center justify-between">
            <span>Zones</span>
            <Button className="w-[50px]" onClick={() => setOpenZoneModal(true)}>
              <HiPlus />
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span>Elements</span>
            <Button
              className="w-[50px]"
              onClick={() => setOpenElementModal(true)}
            >
              <HiPlus />
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span>Defects</span>
            <Button
              className="w-[50px]"
              onClick={() => setOpenDefectModal(true)}
            >
              <HiPlus />
            </Button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <ZoneItems
            openModal={openZoneModal}
            setOpenModal={setOpenZoneModal}
          />
          <ElementItems
            openModal={openElementModal}
            setOpenModal={setOpenElementModal}
          />
          <DefectsItems
            openModal={openDefectModal}
            setOpenModal={setOpenDefectModal}
          />
        </div>
      </div>
    </div>
  );
}
