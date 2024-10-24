import { HiPlus } from "react-icons/hi";
import { Button } from "flowbite-react";
import { BsList, BsThreeDotsVertical, BsX } from "react-icons/bs";

export default function CommonArea() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="flex flex-row items-center justify-between">
            <span>Common Area Categories</span>
            <Button className="w-[50px]">
              <HiPlus />
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span>Elements</span>
            <Button className="w-[50px]">
              <HiPlus />
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span>Defects</span>
            <Button className="w-[50px]">
              <HiPlus />
            </Button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="p-1 px-3 shadow-md">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Element</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Bin Room</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Swimming pool</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Lobby Area</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Pump/Mechanical Room</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Graden</span>
              </div>
              <BsX />
            </div>
            <Button className="my-5 ml-3 w-[150px]">
              <div className="flex items-center gap-x-2 text-xs">
                Save Changes
              </div>
            </Button>
          </div>
          <div className="p-1 px-3 shadow-md">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Walls</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Ceiling</span>
              </div>
              <BsThreeDotsVertical />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Painting</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Flooring</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>Fixout Carpentry</span>
              </div>
              <BsX />
            </div>
            <Button className="my-5 ml-3 w-[150px]">
              <div className="flex items-center gap-x-2 text-xs">
                Save Changes
              </div>
            </Button>
          </div>
          <div className="p-1 px-3 shadow-md">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>G2-Gyprock Poor Finish/Sanding</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>G4-Gyprock Cracks</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>R3-Render Drummy</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>MTWL-Water Leak</span>
              </div>
              <BsX />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Button color="white" className="w-[50px]">
                  <BsList />
                </Button>
                <span>ND-No Deffect</span>
              </div>
              <BsX />
            </div>
            <Button className="my-5 ml-3 w-[150px]">
              <div className="flex items-center gap-x-2 text-xs">
                Save Changes
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
