/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { TbFileExport } from "react-icons/tb";
import * as excelJs from "exceljs";
import { Button, FileInput, Label, Modal, Table } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type {
  ExcelData,
  OrgState,
  ProjectState,
  PropertyState,
  TowerData,
} from "../types";
import {
  getTowersReducer,
  registerBulkProperty,
} from "../store/features/reducers";
import { toast } from "react-toastify";
import { resetBulkResponse } from "../store/features/propertySlice";

const PropertyHeader = function () {
  const [openModal, setOpenModal] = useState(false);
  const [excelModal, setOpenExcelModal] = useState(false);
  const [uploadType, setUploadType] = useState("single");
  const { id, project_id }: any = useParams();
  const dispatch = useDispatch();
  const [isValidTemplate, setIsValidTemplate] = useState(true);
  // submit state
  const [excelData, setExcelData] = useState<any>(null);

  const { projectTowers, selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const { selectedProperty, bulkPropertyResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
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
    const nextChar = (c) => {
      return String.fromCharCode(c.charCodeAt(0) + 1);
    };
    const cols: any = projectTowers.map((t: TowerData) => {
      return {
        name: t.name.replace(/ /g, "_"),
      };
    });

    const towerName = projectTowers.map((t: TowerData) => t.name);

    const contents: any = projectTowers.map((t: TowerData) => {
      return t.floorList;
    });

    const result: any[] = [];
    let len = 0;
    contents.map((value, index) => {
      if (len < value.length) {
        len = value.length;
      }
    });

    for (let i = 0; i < len; i++) {
      const arr: any = [];
      for (let x = 0; x < contents.length; x++) {
        if (contents[x][i]) {
          arr.push(contents[x][i]["value"]);
        } else {
          arr.push("");
        }
      }
      result.push(arr);
    }

    const workbook = new excelJs.Workbook();

    const ws: any = workbook.addWorksheet("Template");
    const lists = workbook.addWorksheet("List");
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

    lists.addTable({
      name: "Towers",
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      columns: [{ name: "Towers" }],
      rows: towerName.map((r) => [r.replace(/ /g, "_")]),
    });

    lists.addTable({
      name: "Floors",
      ref: "B1",
      headerRow: true,
      totalsRow: false,
      columns: cols,
      rows: result,
    });

    workbook.definedNames.add("List!$A$2:$A$100", "Towers");

    let ncar = "A";
    projectTowers.map((o) => {
      ncar = nextChar(ncar);
      workbook.definedNames.add(
        `List!$${ncar}2:$${ncar}$100`,
        o.name.replace(/ /g, "_")
      );
    });

    ws.dataValidations.add("C2:C99999", {
      type: "list",
      allowBlank: false,
      formulae: [`"${options1.join(",")}"`],
    });

    ws.dataValidations.add("D2:D99999", {
      type: "list",
      allowBlank: false,
      formulae: ["Towers"],
    });

    ws.dataValidations.add("E2:E99999", {
      type: "list",
      allowBlank: false,
      formulae: ["INDIRECT(D2)"],
    });
    // ws.dataValidations.add("B2:B99999", {
    //   type: "list",
    //   allowBlank: false,
    //   source: "INDIRECT(02)",
    // });

    // ws.getCell("D1").value = {
    //   formula: "$D$1:$E$1",
    // };

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

    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = `${selectedOrganization?.name}_${selectedProject?.name}_unit_${selectedProperty?.unitNo}_lot_${selectedProperty?.lotNo}_template.xlsx`;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
  };

  const validateData = (data: ExcelData[]) => {
    const validTowers: any = [];
    const validFloors: any = [];
    data &&
      data.map((e: ExcelData) => {
        const validTower = projectTowers.find(
          (t) => t.name == e.Tower.replace(/_/g, " ")
        );

        if (validTower) {
          validTowers.push(true);
          const validFloor =
            validTower &&
            validTower.floorList &&
            validTower.floorList.find((f) => f.value == e.Floor);
          if (validFloor) {
            validFloors.push(true);
          } else {
            validFloors.push(false);
          }
        } else {
          validTowers.push(false);
        }
      });
    if (
      validTowers.filter((e) => e == false).length > 0 ||
      validFloors.filter((f) => f == false).length > 0
    ) {
      setIsValidTemplate(false);
      toast.error("The template you uploaded did not match for this property.");
    } else {
      setExcelData(data);
      setOpenExcelModal(true);
    }
  };

  const handleUpload = (event) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const workbook = XLSX.read(e.target.result, { type: "buffer" });
          const worksheetName: any = workbook.SheetNames[0];
          const worksheet: any = workbook.Sheets[worksheetName];
          const data: any = XLSX.utils.sheet_to_json(worksheet);
          validateData(data.slice(0, 10));
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        toast.error("Please select only excel file types");
      }
    } else {
      toast.error("Please select your file");
    }
  };

  const convertStatus = (status) => {
    return status.toLowerCase().replace("-", "_");
  };

  const uploadBulkProperties = () => {
    const bulkProps: any = [];
    excelData &&
      excelData.length &&
      excelData.map((d: ExcelData) => {
        const tower = projectTowers.find(
          (t) => t.name == d.Tower.replace(/_/g, " ")
        );
        const floor =
          tower &&
          tower.floorList &&
          tower.floorList.find((f) => f.value == d.Floor);

        const params = {
          projectId: selectedProject?.id,
          projectTowerId: tower?.id,
          lotNo: d["Lot No"] ? d["Lot No"] : 0,
          floor: floor?.key,
          unitNo: d["Unit No"],
          bedroom: d.Bedroom ? d.Bedroom : 0,
          bathroom: d.Bathroom ? d.Bathroom : 0,
          ensuite: d.Ensuite ? d.Ensuite : 0,
          studyRoom: d["Study Room"] ? d["Study Room"] : 0,
          storage: d.Storage ? d.Storage : 0,
          parkingSpaces: d["Parking Spaces"] ? d["Parking Spaces"] : 0,
          internalArea: d["Internal Area(m2)"] ? d["Internal Area(m2)"] : 0,
          externalArea: d["External Area(m2)"] ? d["External Area(m2)"] : 0,
          status: convertStatus(d["Property Status"]),
        };
        bulkProps.push(params);
        // dispatch(registerProperty(params));
      });
    if (bulkProps.length > 0) {
      dispatch(registerBulkProperty({ properties: bulkProps }));
    }
  };

  useEffect(() => {
    console.log(bulkPropertyResponse);
    if (bulkPropertyResponse) {
      if (bulkPropertyResponse && bulkPropertyResponse.error) {
        toast.error(bulkPropertyResponse.error);
      } else {
        setExcelData([]);
        setOpenExcelModal(false);
        toast.info("New properties has been added");
        dispatch(resetBulkResponse());
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  }, [bulkPropertyResponse]);

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
          {/* <Button
            // onClick={() => gotoPage("/organization/new")}
            className="mx-1 "
            color="gray"
          >
            <div className="flex items-center gap-x-2 text-xs text-[blue]">
              Bulk Import
            </div>
          </Button> */}
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
            {uploadType != "bulk" ? (
              <Button onClick={() => uploadProperty()}>Submit</Button>
            ) : (
              <div>
                <Label
                  htmlFor="dropzone-file"
                  className="flex cursor-pointer rounded-md bg-blue-600 p-2.5 text-white"
                >
                  Upload & Preview
                  <FileInput
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                    id="dropzone-file"
                    className="hidden"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </Label>
              </div>
            )}

            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={excelModal}
          onClose={() => setOpenExcelModal(false)}
          size="7xl"
        >
          <Modal.Header>Preview</Modal.Header>
          <Modal.Body>
            {excelData && excelData.length > 0 ? (
              <div className="flex overflow-auto">
                <Table>
                  <Table.Head>
                    {Object.keys(excelData[0]).map((key) => (
                      <Table.HeadCell key={key} className="whitespace-nowrap">
                        {key}
                      </Table.HeadCell>
                    ))}
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {excelData.map((individualExcelData, index) => (
                      <Table.Row
                        key={index}
                        className="whitespace-nowrap bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        {Object.keys(individualExcelData).map((key) => (
                          <Table.Cell key={key} className="whitespace-nowrap">
                            {individualExcelData[key]}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ) : (
              <div>
                {isValidTemplate
                  ? "No File is uploaded yet or no data is present from the file"
                  : "Please upload a valid template"}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => uploadBulkProperties()}>Upload</Button>
            <Button color="gray" onClick={() => setOpenExcelModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default PropertyHeader;
