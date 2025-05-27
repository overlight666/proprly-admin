/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronLeftIcon, PlusIcon } from "../../../../../icons";
import { useEffect, useState } from "react";


import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import OwnerTable from "../tables/ownerTable";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { bulkResponseAtom, dropZoneAtom, globalConfigAtom, isLoadingAtom, organizationPropertyOwnerAtom, projectMenuAtom, selectedOrgAtom, selectedProjectAtom, selectedPropertyAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { useProperties } from "@/_recoil/actions";
import { ExcelData, OptionType } from "@/lib/interface";
import { Breadcrumb, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import ComponentCard from "@/components/ui/component-card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import FileUploader2 from "@/components/ui/fileupload2";
import AddOwnerModal from "@/components/modals/addOwnerModal";
import Select2 from "@/components/ui/select2";


export default function EditProperty() {
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const selectedProject = useRecoilValue(selectedProjectAtom);
    const globalConfig = useRecoilValue(globalConfigAtom);
    const selectedProperty = useRecoilValue(selectedPropertyAtom);
    const setImage = useSetRecoilState(dropZoneAtom);
    const [setExcelData] = useState<any>(null);
    const [template, setTemplate] = useState<any>(undefined);
    const [filesToDelete, setFilesToDelete] = useState<any>([]);
    const navigate = useNavigate();
    const propertAction = useProperties();
    const { id, project_id, property_id } = useParams();
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const propertyOwners = useRecoilValue(organizationPropertyOwnerAtom);
    const [attachOwner, setAttachOwner] = useState<any>();
    const [listOwners, setListOwners] = useState<OptionType[]>([]);
    const setDashboardMenu = useSetRecoilState(projectMenuAtom);

    const [hasWarranties, setHasWarranties] = useState(false);
    const [appliances, setAppliances] = useState<any>([]);
    const [bathroomFixtures, setBathroomFixtures] = useState<any>([]);
    const [airConditioning, setAirConditioning] = useState<any>([]);
    const [utilities, setUtilities] = useState<any>([]);
    const [intercom, setIntercom] = useState<any>([]);
    const [builderwarranty, setBuilderwarranty] = useState<any>([]);
    const setBulkResponse = useSetRecoilState(bulkResponseAtom);
    const isLoading = useRecoilValue(isLoadingAtom)
    const setIsLoading = useSetRecoilState(isLoadingAtom)

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

    const { register, handleSubmit, formState, watch, setValue } =
        useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const selectedTower = watch("projectTowerId");

    useEffect(() => {
        if (selectedProperty) {
            setValue("lotNo", selectedProperty?.lotNo);
            setValue("unitNo", selectedProperty?.unitNo);
            setValue("floor", selectedProperty?.floor);
            setValue("bathroom", selectedProperty?.bathroom);
            setValue("ensuite", selectedProperty?.ensuite);
            setValue("bedroom", selectedProperty?.bedroom);
            setValue("studyRoom", selectedProperty?.studyRoom);
            setValue("storage", selectedProperty?.storage);
            setValue("parkingSpaces", selectedProperty?.parkingSpaces);
            setValue("projectTowerId", selectedProperty?.projectTowerId);
            setValue("internalArea", selectedProperty?.internalArea);
            setValue("externalArea", selectedProperty?.externalArea);
            setValue("status", selectedProperty?.status);
            setSelectedUsers(selectedProperty.user);
            setAppliances([]);
            setBathroomFixtures([]);
            setAirConditioning([]);
            setBuilderwarranty([]);
            setIntercom([]);
            setUtilities([]);
            if (
                selectedProperty &&
                selectedProperty?.warranty &&
                selectedProperty?.warranty.length > 0
            ) {
                selectedProperty?.warranty.map((war) => {
                    getOldWarranties(war);
                });
                setHasWarranties(true);
                assignIdToWarranties(selectedProperty?.warranty);
            }
        }
    }, [selectedProperty]);

    useEffect(() => {
        if (propertyOwners && propertyOwners.length) {
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

    const removeAppliances = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "appliances") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            appliances &&
            appliances.length > 0 &&
            appliances.filter((e: any) => e.id !== file.id);
        setAppliances(newFiles);
    };

    const removeBathroomFixtures = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "bathroom_fixtures") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            bathroomFixtures &&
            bathroomFixtures.length > 0 &&
            bathroomFixtures.filter((e: any) => e.id !== file.id);
        setBathroomFixtures(newFiles);
    };

    const removeAirConditioning = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "air_conditioning") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            airConditioning &&
            airConditioning.length > 0 &&
            airConditioning.filter((e: any) => e.id !== file.id);
        setAirConditioning(newFiles);
    };

    const removeUtilities = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "utilities") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            utilities &&
            utilities.length > 0 &&
            utilities.filter((e: any) => e.id !== file.id);
        setUtilities(newFiles);
    };

    const removeIntercom = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "intercom") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            intercom &&
            intercom.length > 0 &&
            intercom.filter((e: any) => e.id !== file.id);
        setIntercom(newFiles);
    };

    const removeBuilderwarranty = (file: any) => {
        // setHasWarranties(true);
        setFilesToDelete((oldArray: any) => [...oldArray, file.id]);
        const newG = warrantyGroup?.map((war: any) => {
            if (war.group == "builder_warranty") {
                war.files = war.files.filter((f: any) => f !== file?.id);
            }
            return war;
        });
        setWarrantyGroup(newG);
        const newFiles: any =
            builderwarranty &&
            builderwarranty.length > 0 &&
            builderwarranty.filter((e: any) => e.id !== file.id);
        setBuilderwarranty(newFiles);
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
            validTowers.filter((e: boolean) => e == false).length > 0 ||
            validFloors.filter((f: boolean) => f == false).length > 0
        ) {
            toast.error("The template you uploaded did not match for this property.");
        } else {
            setExcelData(data);
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
                    validateData(data.slice(0, 10));
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
        propertAction
            .updateProperty(
                id,
                project_id,
                property_id,
                params,
                navigate,
                toast,
                warranties,
                hasWarranties,
                filesToDelete
            )
            .then(() => {
                setIsLoading(false);
                navigate(-1);
            });
    }

    const getUploadedFile = (f: any) => {
        const newGroup = warrantyGroup.map((w: any) => {
            if (w.group == f.group) {
                w.files.push(f.file.id);
            }
            return w;
        });
        // setHasWarranties(true);
        setWarrantyGroup(newGroup);
    };

    const getOldWarranties = (f: any) => {
        const newGroup = warrantyGroup.map((w: any) => {
            if (w.group == f.group && f?.files.length > 0) {
                w.files.push(...f.files.map((fs: any) => fs.id));
                w.files = [...new Set(w.files)];
                w.warrantyId = f.id;
                if (f.group == "appliances") {
                    setAppliances((oldArray: any) => [...oldArray, ...f.files]);
                }
                if (f.group == "bathroom_fixtures") {
                    setBathroomFixtures((oldArray: any) => [...oldArray, ...f.files]);
                }
                if (f.group == "air_conditioning") {
                    setAirConditioning((oldArray: any) => [...oldArray, ...f.files]);
                }
                if (f.group == "builder_warranty") {
                    setBuilderwarranty((oldArray: any) => [...oldArray, ...f.files]);
                }
                if (f.group == "intercom") {
                    setIntercom((oldArray: any) => [...oldArray, ...f.files]);
                }
                if (f.group == "utilities") {
                    setUtilities((oldArray: any) => [...oldArray, ...f.files]);
                }
            }
            return w;
        });
        setWarrantyGroup(newGroup);
    };

    const assignIdToWarranties = (warrantyWithId: any) => {
        const assignId = warrantyGroup.map((wg: any) => {
            wg.warrantyId =
                warrantyWithId &&
                warrantyWithId?.find((wi: any) => wi.group == wg.group)?.id;
            return wg;
        });

        setWarrantyGroup(assignId);
    };

    return (
        <NavbarSidebarLayout>
            <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-2 xl:gap-3">
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
                            <Breadcrumb.Item >Edit Property</Breadcrumb.Item>
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
                            {`Property Unit no. ${selectedProperty?.unitNo} Lot no. ${selectedProperty?.lotNo}`}
                        </h1>
                    </div>
                </div>

            </div>
            <div className="p-5 min-h-screen">
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
                                        options={globalConfig?.propertyStatusList?.map((l: any) => {
                                            return {
                                                label: l.value,
                                                value: l.key,
                                            };
                                        })}
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
                                    <Select options={[]} placeholder="Split Level Property" />
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
                                setBulkResponse({ stay: 1 });
                                setDashboardMenu("properties");
                                navigate(-1);
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
                            Update Property
                        </Button>
                    </div>
                </form>
            </div>

            <AddOwnerModal
                closeModal={closeModal}
                isOpen={isOpen}
                addUser={addUser}
            />
        </NavbarSidebarLayout>
    );
}
