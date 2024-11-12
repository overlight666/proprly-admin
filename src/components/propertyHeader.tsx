/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { TbFileExport } from "react-icons/tb";

import { Button, Label, Modal, Radio } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
const PropertyHeader = function () {
  const [openModal, setOpenModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
  const { id, project_id }: any = useParams();
  // const { userData }: UserState = useSelector(
  //   (state: ReducerTypes) => state.user
  // );

  const navigate = useNavigate();

  const uploadProperty = () => {
    if (uploadType === "single") {
      navigate(`/organization/${id}/project/${project_id}/properties/new`);
    }
  };

  return (
    <>
      <div className="mb-10 mt-5 grid w-full grid-cols-9 gap-2">
        <div className="relative col-span-3 w-full">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full rounded-[5px] rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        <div className="col-span-4 flex items-center">
          <Button
            // onClick={() => gotoPage("/organization/new")}
            color="gray"
            className="mx-1"
          >
            <div className="flex items-center gap-x-2 text-xs ">
              <TbFileExport />
              Export CSV
            </div>
          </Button>
          <Button
            // onClick={() => gotoPage("/organization/new")}
            className="mx-1 "
            color="gray"
          >
            <div className="flex items-center gap-x-2 text-xs text-[blue]">
              Bulk Upload Warranty
            </div>
          </Button>
          <Button
            // onClick={() => gotoPage("/organization/new")}
            className="mx-1 "
            color="gray"
          >
            <div className="flex items-center gap-x-2 text-xs text-[blue]">
              Bulk Import
            </div>
          </Button>
        </div>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          className="col-span-2 w-[200px]"
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Add new property
          </div>
        </Button>

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
      </div>
      <fieldset className="my-5 flex flex-row items-center gap-4">
        <span className="text-[14px]">Show only:</span>
        <div className="flex items-center gap-2">
          <Radio
            id="united-state"
            name="countries"
            value="USA"
            defaultChecked
          />
          <Label htmlFor="united-state">All</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="germany" name="countries" value="Germany" />
          <Label htmlFor="germany">Under Construction</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="spain" name="countries" value="Spain" />
          <Label htmlFor="spain">Pre-Settlement</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="spain" name="countries" value="Spain" />
          <Label htmlFor="spain">Handover</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="spain" name="countries" value="Spain" />
          <Label htmlFor="spain">Post-Pandover</Label>
        </div>
      </fieldset>
    </>
  );
};

export default PropertyHeader;
