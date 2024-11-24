import { HiPlus } from "react-icons/hi";
import { Button } from "flowbite-react";
import CommonAreaItems from "./common-area/common-area";
import { useState } from "react";
import CAElementItems from "./common-area/elements";
import CADefectsItems from "./common-area/defects";

export default function CommonArea() {
  const [openCommonAreaModal, setOpenCommonAreaModal] = useState(false);
  const [openElementModal, setOpenElementModal] = useState(false);
  const [openDefectModal, setOpenDefectModal] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="flex flex-row items-center justify-between">
            <span>Common Area Categories</span>
            <Button
              className="w-[50px]"
              onClick={() => setOpenCommonAreaModal(true)}
            >
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
          <CommonAreaItems
            openModal={openCommonAreaModal}
            setOpenModal={setOpenCommonAreaModal}
          />
          <CAElementItems
            openModal={openElementModal}
            setOpenModal={setOpenElementModal}
          />
          <CADefectsItems
            openModal={openDefectModal}
            setOpenModal={setOpenDefectModal}
          />
        </div>
      </div>
    </div>
  );
}
