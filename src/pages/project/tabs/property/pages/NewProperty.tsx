/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronLeftIcon, FileIcon, PlusIcon } from "../../../../../icons";
import { useEffect, useState } from "react";

import * as excelJs from "exceljs";

import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import BulkTable from "../tables/bulkTable";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import OwnerTable from "../tables/ownerTable";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { activeTabIndexProjectAtom, dropZoneAtom, globalConfigAtom, isLoadingAtom, organizationPropertyOwnerAtom, selectedOrgAtom, selectedProjectAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { useProperties } from "@/_recoil/actions";
import { ExcelData, OptionType, TowerData } from "@/lib/interface";
import { Breadcrumb, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import DropzoneComponent from "@/components/ui/dropzone";
import ComponentCard from "@/components/ui/component-card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import FileUploader2 from "@/components/ui/fileupload2";
import AddOwnerModal from "@/components/modals/addOwnerModal";
import Select2 from "@/components/ui/select2";

export default function AddProperty() {
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const selectedProject = useRecoilValue(selectedProjectAtom);
    const globalConfig = useRecoilValue(globalConfigAtom);
    const [isBulk, setIsBulk] = useState(false);
    const setImage = useSetRecoilState(dropZoneAtom);
    const [excelData, setExcelData] = useState<any>(null);
    const [template, setTemplate] = useState<any>(undefined);
    const isLoading = useRecoilValue(isLoadingAtom)
    const setIsLoading = useSetRecoilState(isLoadingAtom)

    const navigate = useNavigate();
    const propertAction = useProperties();
    const { id, project_id } = useParams();
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const propertyOwners = useRecoilValue(organizationPropertyOwnerAtom);
    const [attachOwner, setAttachOwner] = useState<any>();
    const [listOwners, setListOwners] = useState<OptionType[]>([]);
    const setActiveTabIndex = useSetRecoilState(activeTabIndexProjectAtom);

    const [hasWarranties, setHasWarranties] = useState(false);
    const [appliances, setAppliances] = useState<any>([]);
    const [bathroomFixtures, setBathroomFixtures] = useState<any>([]);
    const [airConditioning, setAirConditioning] = useState<any>([]);
    const [utilities, setUtilities] = useState<any>([]);
    const [intercom, setIntercom] = useState<any>([]);
    const [builderwarranty, setBuilderwarranty] = useState<any>([]);

    const [warrantyGroup, setWarrantyGroup] = useState<any>([
        {
            group: "appliances",
            files: [],
        },
        {
            group: "bathroom_fixtures",
            files: [],
        },
        {
            group: "air_conditioning",
            files: [],
        },
        {
            group: "utilities",
            files: [],
        },
        {
            group: "intercom",
            files: [],
        },
        {
            group: "builder_warranty",
            files: [],
        },
    ]);

    const validationSchema = Yup.object().shape({
        projectTowerId: Yup.string().required("Tower is required"),
        lotNo: Yup.string().required("Lot Number is required"),
        floor: Yup.string().required("Floor is required"),
        unitNo: Yup.string().required("Unit Number is required"),
        bathroom: Yup.string().required("Bathroom is required"),
        ensuite: Yup.string().required("Ensuite is required"),
        bedroom: Yup.string().required("Bedroom is required"),
        studyRoom: Yup.string().required("Study Room is required"),
        storage: Yup.string().required("Storage is required"),
        parkingSpaces: Yup.string().required("Parking Spaces is required"),
        internalArea: Yup.string().required("Internal Area is required"),
        externalArea: Yup.string().required("External Area is required"),
        status: Yup.string().required("Status is required"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, watch } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const selectedTower = watch("projectTowerId");

    useEffect(() => {
        if (propertyOwners && propertyOwners?.length) {
            const ownerHandler = propertyOwners.map((obj: any) => {
                return {
                    value: JSON.stringify(obj),
                    label: obj.fullName,
                };
            });
            setListOwners(ownerHandler);
        }
    }, [propertyOwners]);

    useEffect(() => {
        setImage(undefined);
    }, []);

    useEffect(() => {
        if (template) {
            handleUpload(template);
        }
    }, [template]);

    const nextChar = (c: any) => {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    };

    const removeAppliances = (file: File) => {
        const newFiles: any =
            appliances &&
            appliances.length > 0 &&
            appliances.filter((e: any) => e.name !== file.name);
        setAppliances(newFiles);
    };

    const removeBathroomFixtures = (file: File) => {
        const newFiles: any =
            bathroomFixtures &&
            bathroomFixtures.length > 0 &&
            bathroomFixtures.filter((e: any) => e.name !== file.name);
        setBathroomFixtures(newFiles);
    };

    const removeAirConditioning = (file: File) => {
        const newFiles: any =
            airConditioning &&
            airConditioning.length > 0 &&
            airConditioning.filter((e: any) => e.name !== file.name);
        setAirConditioning(newFiles);
    };

    const removeUtilities = (file: File) => {
        const newFiles: any =
            utilities &&
            utilities.length > 0 &&
            utilities.filter((e: any) => e.name !== file.name);
        setUtilities(newFiles);
    };

    const removeIntercom = (file: File) => {
        const newFiles: any =
            intercom &&
            intercom.length > 0 &&
            intercom.filter((e: any) => e.name !== file.name);
        setIntercom(newFiles);
    };

    const removeBuilderwarranty = (file: File) => {
        const newFiles: any =
            builderwarranty &&
            builderwarranty.length > 0 &&
            builderwarranty.filter((e: any) => e.name !== file.name);
        setBuilderwarranty(newFiles);
    };

    const generateTemplate = async () => {
        const cols: any = selectedProject?.projectTower?.map((t: TowerData) => {
            return {
                name: t.name.replace(/ /g, "_"),
            };
        });

        const towerName: any = selectedProject?.projectTower?.map(
            (t: TowerData) => t.name
        );

        const contents: any = selectedProject?.projectTower?.map((t: TowerData) => {
            return t.floorList;
        });
        const result: any[] = [];
        let len = 0;
        contents.map((value: string | any[], _index: any) => {
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
        // const options2 = ["O3", "O4"];
        // const options3 = ["O5", "O6"];

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

        ws.columns.map((col: { width: number }, _index: any) => (col.width = 18));

        lists.addTable({
            name: "Towers",
            ref: "A1",
            headerRow: true,
            totalsRow: false,
            columns: [{ name: "Towers" }],
            rows: towerName.map((r: string) => [r.replace(/ /g, "_")]),
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
        selectedProject?.projectTower?.map((o) => {
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

        ws.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFADD8E6" },
        };

        ws.eachRow((row: { eachCell: (arg0: (cell: any) => void) => void }) => {
            row.eachCell(
                (cell: {
                    font: { name: string; size: number };
                    alignment: { horizontal: string };
                }) => {
                    cell.font = {
                        name: "Inter",
                        size: 8,
                    };
                    cell.alignment = {
                        horizontal: "center",
                    };
                }
            );
        });

        const excelBlob = await workbook.xlsx.writeBuffer();
        const excelUrl = URL.createObjectURL(
            new Blob([excelBlob], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
        );

        const link = document.createElement("a");
        link.href = excelUrl;
        link.download = `${selectedOrganization?.name}_${selectedProject?.name}_${selectedProject?.name}_template.xlsx`;
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
                const validTower = selectedProject?.projectTower?.find(
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
            validTowers.filter((e: boolean) => e == false).length > 0
        ) {
            toast.error("Towers from the template did not match, please provide a valid towers");
        } else {
            if (validFloors.filter((f: boolean) => f == false).length > 0) {
                toast.error("Floors from the template did not match, please provide a valid floors");
            } else {
                setExcelData(data);
            }
        }
    };

    const handleUpload = (event: File) => {
        const fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        const selectedFile = event;
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.onload = async (e: any) => {
                    const workbook = XLSX.read(e.target.result, { type: "buffer" });
                    const worksheetName: any = workbook.SheetNames[0];
                    const worksheet: any = workbook.Sheets[worksheetName];
                    const data: any = XLSX.utils.sheet_to_json(worksheet);
                    validateData(data.slice(0, (data.length - 1)));
                };
                reader.readAsArrayBuffer(selectedFile);
            } else {
                toast.error("Please select only excel file types");
                setTemplate(undefined);
            }
        } else {
            toast.error("Please select your file");
            setTemplate(undefined);
        }
    };

    const convertStatus = (status: any) => {
        return status.toLowerCase().replace("-", "_");
    };

    const bulkUpload = () => {
        const bulkProps: any = [];
        excelData &&
            excelData.length &&
            excelData.map((d: ExcelData) => {
                const tower = selectedProject?.projectTower?.find(
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

        propertAction.bulkUploadProperties(
            id,
            project_id,
            { properties: bulkProps },
            navigate,
            toast
        );

        // if (bulkProps.length > 0) {
        //   dispatch(registerBulkProperty({ properties: bulkProps }));
        // }
    };

    const removeUser = (email: string) => {
        const filteredBuilders = selectedUsers.filter(
            (builder: any) => builder.email !== email
        );
        setSelectedUsers(filteredBuilders);
    };

    const addUser = (email: any, fullName: any, mobileNumber: any) => {
        const temp = {
            fullName: fullName,
            mobile: mobileNumber,
            password: "test",
            email,
            roleId: 1,
        };
        if (!selectedUsers.find((o: any) => o.email === temp.email)) {
            setSelectedUsers((oldArray: any) => [...oldArray, temp]);
        } else {
            toast.warning("Owner email already exist");
        }
        closeModal();
    };

    const attachOwnerHandler = () => {
        const builderHandler = JSON.parse(attachOwner);

        if (!selectedUsers.find((o: any) => o.email === builderHandler.email)) {
            setSelectedUsers((oldArray: any) => [...oldArray, builderHandler]);
        } else {
            toast.warning("Owner already exist");
        }
    };

    function onSubmit(props: any) {
        const params = {
            projectId: project_id,
            users: selectedUsers,
            ...props,
        };

        const warranties = {
            groups: warrantyGroup,
        };
        setIsLoading(true);
        propertAction.addProperty(
            id,
            project_id,
            params,
            navigate,
            toast,
            warranties,
            hasWarranties
        ).then(() => {
            setIsLoading(false);
        });
    }

    const getUploadedFile = (f: any) => {
        const newGroup = warrantyGroup.map((w: any) => {
            if (w.group == f.group) {
                w.files.push(f.file.id);
            }
            return w;
        });
        setHasWarranties(true);
        setWarrantyGroup(newGroup);
    };

    return (
        <NavbarSidebarLayout>
            <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
                <div className="col-span-full">
                    <div className="col-span-full flex items-center justify-between">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Organizations</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/organization/view/${selectedOrganization?.id}`}>{selectedOrganization?.name}</Breadcrumb.Item>
                            <Breadcrumb.Item href={`/organization/${id}/project/view/${project_id}`} >{selectedProject?.name}</Breadcrumb.Item>
                            <Breadcrumb.Item >Add Property</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-1.5"
                                onClick={() => navigate(-1)}
                            >
                                <ChevronLeftIcon className="w-2.5 h-2.5 dark:text-gray-500" />
                                <span className="font-medium text-gray-500 text-sm">Back</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            New Property
                        </h1>
                        <div className="flex gap-5 flex-row-reverse">
                            <Button size="sm" variant="default" onClick={() => setIsBulk(!isBulk)}>
                                {!isBulk ? "Bulk Import Properties" : "Single Property Registration"}
                            </Button>
                            {isBulk && (
                                <div
                                    className="flex text-blue-600 items-center gap-1 cursor-pointer"
                                    onClick={() => generateTemplate()}
                                >
                                    <FileIcon />
                                    DOWNLOAD PROPERTY TEMPLATE
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-5 min-h-screen">
                {(isBulk &&
                    (!template ? (
                        <div>
                            <DropzoneComponent
                                isExcel={true}
                                uploadedFile={setTemplate}
                                title="Upload Template"
                                accept={{
                                    ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel":
                                        [],
                                }}
                            />
                        </div>
                    ) : (
                        <BulkTable
                            rightComponent={
                                <div className="space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setTemplate(undefined)}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => bulkUpload()}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            }
                            bulkData={excelData}
                        />
                    ))) || (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-5">
                                <ComponentCard title="Property Specifications">
                                    <div className="gap-2 grid grid-cols-1 xl:grid-cols-2">
                                        <div>
                                            <Label htmlFor="input">
                                                Lot No <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("lotNo") }}
                                                error={errors.lotNo}
                                                hint={errors.lotNo?.message}
                                                placeholder="Enter Lot Number"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">
                                                Property status <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Select2
                                                options={globalConfig?.propertyStatusList?.map(
                                                    (l: any) => {
                                                        return {
                                                            label: l.value,
                                                            value: l.key,
                                                        };
                                                    }
                                                )}
                                                placeholder="Select Status"
                                                className="dark:bg-dark-900"
                                                register={{ ...register("status") }}
                                                error={errors.status}
                                                hint={errors.status?.message}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">
                                                Tower <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Select2
                                                options={
                                                    selectedProject?.projectTower?.map((l: any) => {
                                                        return {
                                                            label: l.name,
                                                            value: l.id,
                                                        };
                                                    }) || []
                                                }
                                                placeholder="Select Tower"
                                                className="dark:bg-dark-900"
                                                register={{ ...register("projectTowerId") }}
                                                error={errors.projectTowerId}
                                                hint={errors.projectTowerId?.message}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">
                                                Floors <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Select2
                                                options={
                                                    (selectedTower &&
                                                        selectedProject?.projectTower
                                                            ?.find((t: any) => t.id == selectedTower)
                                                            ?.floorList.map((f: any) => {
                                                                return {
                                                                    label: f.value,
                                                                    value: f.key,
                                                                };
                                                            })) ||
                                                    []
                                                }
                                                placeholder="Select Floor"
                                                className="dark:bg-dark-900"
                                                register={{ ...register("floor") }}
                                                error={errors.floor}
                                                hint={errors.floor?.message}
                                            />
                                        </div>
                                    </div>
                                </ComponentCard>
                                <ComponentCard title="Basic Information">
                                    <div className="gap-2 grid grid-cols-1 xl:grid-cols-2">
                                        <div>
                                            <Label htmlFor="input">
                                                Unit No <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("unitNo") }}
                                                error={errors.unitNo}
                                                hint={errors.unitNo?.message}
                                                placeholder="Enter Unit Number"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Bedroom <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("bedroom") }}
                                                error={errors.bedroom}
                                                hint={errors.bedroom?.message}
                                                placeholder="Enter Bedroom"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Bathroom <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("bathroom") }}
                                                error={errors.bathroom}
                                                hint={errors.bathroom?.message}
                                                placeholder="Enter Bathroom"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Ensuite <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("ensuite") }}
                                                error={errors.ensuite}
                                                hint={errors.ensuite?.message}
                                                placeholder="Enter Ensuite"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Study Room <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("studyRoom") }}
                                                error={errors.studyRoom}
                                                hint={errors.studyRoom?.message}
                                                placeholder="Enter Study Room"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Storage <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("storage") }}
                                                error={errors.storage}
                                                hint={errors.storage?.message}
                                                placeholder="Enter Storage"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="input">
                                                Parking Spaces <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("parkingSpaces") }}
                                                error={errors.parkingSpaces}
                                                hint={errors.parkingSpaces?.message}
                                                placeholder="Enter Study Room"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">Split Level Property</Label>
                                            <Select disabled options={[]} placeholder="Please select" />
                                        </div>
                                        <div>
                                            <Label htmlFor="input">
                                                Internal Area(m
                                                <span className="align-super">2</span>){" "}
                                                <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("internalArea") }}
                                                error={errors.internalArea}
                                                hint={errors.internalArea?.message}
                                                placeholder="Enter Internal Area"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="input">
                                                External Area(m
                                                <span className="align-super">2</span>){" "}
                                                <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                register={{ ...register("externalArea") }}
                                                error={errors.externalArea}
                                                hint={errors.externalArea?.message}
                                                placeholder="Enter External Area"
                                            />
                                        </div>
                                    </div>
                                </ComponentCard>
                                <ComponentCard title="Owner Information">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="inputTwo">Owner list</Label>
                                            <div className="flex flex-row gap-2 w-full">
                                                <Select
                                                    options={
                                                        listOwners && listOwners.length ? listOwners : []
                                                    }
                                                    onChange={(e) => setAttachOwner(e)}
                                                    placeholder="Select an Owner"
                                                    className="dark:bg-dark-900"
                                                    containerClass="w-[85%]"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="default"
                                                    className="w-[15%]"
                                                    type="button"
                                                    onClick={() => attachOwnerHandler()}
                                                >
                                                    Attach Owner <PlusIcon />
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <OwnerTable
                                                selectedUsers={selectedUsers}
                                                removeUser={removeUser}
                                            />
                                        </div>
                                        <div
                                            className="text-blue-600 gap-1 flex flex-row items-center cursor-pointer"
                                            onClick={() => openModal()}
                                        >
                                            <span>ADD NEW OWNER</span>
                                            <PlusIcon />
                                        </div>
                                    </div>
                                </ComponentCard>

                                <ComponentCard title="Warranty Information">
                                    <div className="space-y-6">
                                        <FileUploader2
                                            title="Appliances"
                                            group="appliances"
                                            removeFile={removeAppliances}
                                            setUploadQueue={setAppliances}
                                            uploadQueue={appliances}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUploader2
                                            group="bathroom_fixtures"
                                            title="Bathroom Fixtures"
                                            removeFile={removeBathroomFixtures}
                                            setUploadQueue={setBathroomFixtures}
                                            uploadQueue={bathroomFixtures}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUploader2
                                            group="air_conditioning"
                                            title="Air Conditioning"
                                            removeFile={removeAirConditioning}
                                            setUploadQueue={setAirConditioning}
                                            uploadQueue={airConditioning}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUploader2
                                            group="utilities"
                                            title="Utilities"
                                            removeFile={removeUtilities}
                                            setUploadQueue={setUtilities}
                                            uploadQueue={utilities}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUploader2
                                            group="intercom"
                                            title="Intercom"
                                            removeFile={removeIntercom}
                                            setUploadQueue={setIntercom}
                                            uploadQueue={intercom}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUploader2
                                            group="builder_warranty"
                                            title="Builder Warranty"
                                            removeFile={removeBuilderwarranty}
                                            setUploadQueue={setBuilderwarranty}
                                            uploadQueue={builderwarranty}
                                            getUploadedFile={getUploadedFile}
                                        />
                                    </div>
                                </ComponentCard>
                            </div>
                            <div className="flex w-full flex-row gap-5 mt-10">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setActiveTabIndex(1);
                                        navigate(`/organization/${id}/project/${project_id}`);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    disabled={isSubmitting || isLoading}
                                    type="submit"
                                >
                                    {isSubmitting && (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    )}{" "}
                                    Create Property
                                </Button>
                            </div>
                        </form>
                    )}
            </div>

            <AddOwnerModal
                closeModal={closeModal}
                isOpen={isOpen}
                addUser={addUser}
            />
        </NavbarSidebarLayout>
    );
}
