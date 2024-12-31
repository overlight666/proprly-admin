/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { TbFileExport } from "react-icons/tb";
import * as excelJs from "exceljs";
import { Button, Label, Modal } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { ProjectState, TowerData } from "../types";
import { getTowersReducer } from "../store/features/reducers";
const PropertyHeader = function () {
  const [openModal, setOpenModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
  const { id, project_id }: any = useParams();
  const dispatch = useDispatch();

  const { projectTowers }: ProjectState = useSelector(
    (state: any) => state.project
  );

  useEffect(() => {
    dispatch(getTowersReducer(project_id));
  }, []);
  // const { userData }: UserState = useSelector(
  //   (state: ReducerTypes) => state.user
  // );

  const navigate = useNavigate();

  const uploadProperty = () => {
    if (uploadType === "single") {
      navigate(`/organization/${id}/project/${project_id}/properties/new`);
    }
  };

  const generateTemplate = async () => {
    const cols = projectTowers.map((t: TowerData) => {
      return {
        name: t.name,
      };
    });

    const contents: any = projectTowers.map((t: TowerData) => {
      return t.floorList;
    });

    const result: any = [];

    const colValues = contents.map((value, index) => {
      result.push(contents[index]);
    });

    console.log(result);

    const workbook = new excelJs.Workbook();

    const ws: any = workbook.addWorksheet("Test Worksheet");

    const options1 = ["Pre-Settlement", "Handover", "Post-Handover"];
    const options2 = ["O3", "O4"];
    const options3 = ["O5", "O6"];

    // Add data to the worksheet
    ws.addRow([
      "Lot No",
      "Unit No",
      "Property Status",
      "Tower",
      "Floor",
      "Bedroom",
      "Bathroom",
      "Ensuite",
      "Study Room",
      "Storage",
      "Parking Spaces",
      "Internal Area(m2)",
      "External Area(m2)",
    ]);

    ws.columns.map((col, index) => (col.width = 18));

    ws.dataValidations.add("C2:C99999", {
      type: "list",
      allowBlank: false,
      formulae: [`"${options1.join(",")}"`],
    });

    ws.addTable({
      name: "Towers",
      ref: "O1",
      headerRow: true,
      totalsRow: true,
      columns: cols,
      rows: [
        [new Date("2019-07-20")],
        [new Date("2019-07-21")],
        [new Date("2019-07-22")],
      ],
    });
    // ws.getCell("B2:B99999").value = {
    //   formula: 'IF(datasheet!A1<>"",datasheet!B1,"")',
    // };

    // ws.dataValidations.add("B2:B99999", {
    //   type: "list",
    //   allowBlank: false,
    //   formulae: [`IF(A1="O1","${options2.join(",")}","${options3.join(",")}")`],
    // });

    // ws.dataValidations.add("B2:B99999", {
    //   type: "list",
    //   allowBlank: false,
    //   formulae: [`"${options2.join(",")}"`],
    // });

    // ws.dataValidations.add("C2:C99999", {
    //   type: "list",
    //   allowBlank: false,
    //   formulae: [`"${options3.join(",")}"`],
    // });

    ws.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    };

    ws.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = {
          name: "Inter",
          size: 8,
        };
        cell.alignment = {
          horizontal: "center",
        };
      });
    });

    const excelBlob = await workbook.xlsx.writeBuffer();
    const excelUrl = URL.createObjectURL(
      new Blob([excelBlob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );

    // const link = document.createElement("a");
    // link.href = excelUrl;
    // link.download = "herbert2.xlsx";
    // document.body.appendChild(link);
    // link.click();

    // URL.revokeObjectURL(excelUrl);
    // document.body.removeChild(link);
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
            <div className="space-y-2">
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
                <div>
                  <span
                    className="cursor-pointer text-blue-600"
                    onClick={() => generateTemplate()}
                  >
                    DOWNLOAD PROPERTY TEMPLATE
                    <AiOutlineRight className="ml-1 inline" />
                  </span>
                </div>
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
      </div>
      {/* <fieldset className="my-5 flex flex-row items-center gap-4">
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
      </fieldset> */}
    </>
  );
};

export default PropertyHeader;
