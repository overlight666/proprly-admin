/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { dropZoneAtom, globalConfigAtom, isLoadingAtom, selectedOrgAtom, uploadResponseAtom } from "@/_recoil/states";
import { ImageType, Project, ProjectForm } from "@/lib/interface";
import { useModal } from "@/helpers/useModal";
import { useProject } from "@/_recoil/actions";
import { ucword } from "@/helpers";
import ComponentCard from "@/components/ui/component-card";
import { Breadcrumb, Label } from "flowbite-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { HiHome } from "react-icons/hi";
import DropzoneComponent from "@/components/ui/dropzone";
import AddTowerModal from "@/components/modals/addTowerModal";
import TowersTable from "../components/towers-table";
import { FormikHelpers, useFormik } from "formik";
import { projectValidation } from "@/lib/validations";
import FileUploader2 from "@/components/ui/fileupload2";

export default function NewProject() {
    const uploadResponse: any = useRecoilValue(uploadResponseAtom);
    const setUploadResponse = useSetRecoilState(uploadResponseAtom);
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const globalConfig = useRecoilValue(globalConfigAtom);
    const [projectTypeOptions, setProjectTypeOptions] = useState<any>([]);
    const [msTypeOptions, setMsTypeOptions] = useState<any>([]);
    const setImage = useSetRecoilState(dropZoneAtom);
    const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
    const uploadedImage = useRecoilValue(dropZoneAtom);
    const [page, setPage] = useState(1);
    const { isOpen, openModal, closeModal } = useModal();
    const [towers, setTowers] = useState<any[]>([]);
    const [_fieldHolder, setFieldHolder] = useState<any>({});
    const [uploadQueue, setUploadQueue] = useState<any>([]);
    const { id } = useParams();
    const projectAction = useProject();
    const navigate = useNavigate();
    const setIsLoading = useSetRecoilState(isLoadingAtom);


    const initialValues = {
        type: undefined,
        name: undefined,
        maintenanceServiceType: undefined,
        address0: undefined,
        address1: undefined,
        address2: undefined,
        address: undefined,
        imageId: undefined,
        documents: undefined,
        numBasementLevels: undefined,
        towers: undefined,
        organizationId: undefined
    }

    const formik = useFormik<ProjectForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: projectValidation,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: async (
            _values: ProjectForm,
            _formikHelpers: FormikHelpers<ProjectForm>,
        ) => {
            onSubmit2();
        },
    });

    const basementOptions: any = [
        {
            label: 1,
            value: 1,
        },
        {
            label: 2,
            value: 2,
        },
        {
            label: 3,
            value: 3,
        },
        {
            label: 4,
            value: 4,
        },
        {
            label: 5,
            value: 5,
        },
    ];

    useEffect(() => {
        setImage(undefined);
    }, []);

    useEffect(() => {
        if (globalConfig) {
            const typeHandler =
                globalConfig &&
                globalConfig?.projectTypeList.map((r) => {
                    return {
                        value: r.value,
                        label: ucword(r.value),
                        disabled: r.key !== "apartment",
                    };
                });
            setProjectTypeOptions(typeHandler);
            const msHandler =
                globalConfig &&
                globalConfig?.projectMaintenanceServiceTypeList.map((r) => {
                    return {
                        value: r.key,
                        label: ucword(r.value),
                        disabled: false,
                    };
                });
            setMsTypeOptions(msHandler);
        }
    }, [globalConfig]);

    useEffect(() => {
        if (uploadResponse) {
            if (fileContainer && fileContainer.length > 0) {
                setFileContainer((oldArray: any) => [...oldArray, uploadResponse]);
            } else {
                setFileContainer([uploadResponse]);
            }
            setUploadResponse(undefined);
        }
    }, [uploadResponse]);

    function onSubmit() {
        if (uploadedImage) {
            formik.setFieldValue("address", `${formik.values.address0}, ${formik.values.address1}, ${formik.values.address2}`)
            formik.setFieldValue("imageId", uploadedImage.id)
            if (fileContainer?.length > 0) {
                formik.setFieldValue("documents", fileContainer.map((f) => f.id))
            }

            setFieldHolder(formik.values);
            setPage(2);
        } else {
            toast.warn("Please upload project image");
        }
    }

    const removeFile = (file: File) => {
        const newFiles: any =
            fileContainer &&
            fileContainer.length > 0 &&
            fileContainer.filter((e) => e.name !== file.name);
        setFileContainer(newFiles);
    };

    const removeTower = (tower: any) => {
        const filteredTower: any =
            towers &&
            towers.length > 0 &&
            towers.filter((t) => t.name !== tower.name);
        setTowers(filteredTower);
    };

    const addTower = (name: any, floor: any) => {
        const t = {
            name: name,
            numFloors: floor,
        };
        setTowers((oldArray: any) => [...oldArray, t]);
    };

    function onSubmit2() {
        if (towers.length === 0) {
            toast.error("Please add a tower!");
        } else {
            console.log(id)
            formik.setFieldValue("organizationId", id)
            formik.setFieldValue("towers", towers)

            setIsLoading(true);
            projectAction.addProject(formik.values).then((res: Project) => {
                setIsLoading(false);
                if (res?.id) {
                    navigate(`/organization/${id}/project/view/${res?.id}`);
                }

            }).catch((error: any) => {
                setIsLoading(false)
                toast.error(error[0].message);
            });
        }
    }

    return (
        <NavbarSidebarLayout>
            <>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
                    <div className="col-span-full">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Organizations</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/">
                                <span className="dark:text-white">{selectedOrganization?.name}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Add Project</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            New Project
                        </h1>
                    </div>

                </div>
                <div className="p-5">
                    <AddTowerModal
                        isOpen={isOpen}
                        closeModal={closeModal}
                        addTower={addTower}
                    />

                    {page == 1 && (
                        <div className="grid grid-cols-1">
                            <form
                                className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2"
                                id="projectForm"
                            >
                                <ComponentCard title="Project Information">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="input">
                                                Project Name <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                onChange={formik.handleChange}
                                                error={formik.errors.name}
                                                hint={formik.errors.name}
                                                placeholder="Enter your organization name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">
                                                Project type <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Select
                                                options={projectTypeOptions}
                                                placeholder="Select type"
                                                className="dark:bg-dark-900"
                                                onChange={(e) => formik.setFieldValue("type", e)}
                                                error={formik.errors.type}
                                                hint={formik.errors.type}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="inputTwo">
                                                Maintenance and Service type{" "}
                                                <span className="text-red-500">*</span>{" "}
                                            </Label>
                                            <Select
                                                options={msTypeOptions}
                                                placeholder="Select Maintenance and Service type"
                                                className="dark:bg-dark-900"
                                                onChange={(e) => formik.setFieldValue("maintenanceServiceType", e)}
                                                error={formik.errors.maintenanceServiceType}
                                                hint={formik.errors.maintenanceServiceType}

                                            />
                                        </div>
                                    </div>
                                </ComponentCard>
                                <ComponentCard
                                    className="!mt-[0px] pt-[0px]"
                                    title="Address Information"
                                >
                                    <div>
                                        <Label htmlFor="input">
                                            House no/Unit no <span className="text-red-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            type="text"
                                            name="address0"
                                            onChange={formik.handleChange}
                                            error={formik.errors.address0}
                                            hint={formik.errors.address0}
                                            placeholder="Enter your House no/Unit no"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="input">Address line 1</Label>
                                        <Input
                                            type="text"
                                            name="address1"
                                            onChange={formik.handleChange}
                                            error={formik.errors.address1}
                                            hint={formik.errors.address1}
                                            placeholder="Address line 1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="input">Address line 2</Label>
                                        <Input
                                            type="text"
                                            name="address2"
                                            onChange={formik.handleChange}
                                            error={formik.errors.address2}
                                            hint={formik.errors.address2}
                                            placeholder="Address line 2"
                                        />
                                    </div>
                                </ComponentCard>
                            </form>
                            <div className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2 mt-5">
                                <DropzoneComponent title="Upload Image" />

                                <ComponentCard
                                    className="!mt-[0px] pt-[0px]"
                                    title="Upload Documents"
                                >
                                    <FileUploader2
                                        title="Upload file"
                                        removeFile={removeFile}
                                        setUploadQueue={setUploadQueue}
                                        uploadQueue={uploadQueue}
                                    />
                                </ComponentCard>
                            </div>
                            <div className="flex w-full flex-row gap-5 mt-10">

                                <Button variant="outline" onClick={() => {
                                    navigate(-1);
                                }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={() => onSubmit()}
                                    type="button"
                                    form="projectForm"
                                >

                                    Proceed to Tower/Basement
                                </Button>
                            </div>
                        </div>
                    )}
                    {page == 2 && (
                        <div className="grid grid-cols-1">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-1"
                                id="projectForm2"
                            >
                                <ComponentCard
                                    title="Tower Information"
                                    rightComponent={
                                        <Button
                                            size="sm"
                                            type="button"
                                            variant="default"
                                            onClick={() => openModal()}
                                        >
                                            Add Tower
                                        </Button>
                                    }
                                >
                                    <div>
                                        <TowersTable towers={towers} removeTower={removeTower} />
                                    </div>
                                </ComponentCard>
                                <ComponentCard title="Basement Information">
                                    <div>
                                        <Label htmlFor="inputTwo">
                                            Basement Levels <span className="text-red-500">*</span>{" "}
                                        </Label>
                                        <Select
                                            options={basementOptions || []}
                                            placeholder="Select type"
                                            className="dark:bg-dark-900"
                                            onChange={(e) => formik.setFieldValue("numBasementLevels", e)}
                                            error={formik.errors.numBasementLevels}
                                            hint={formik.errors.numBasementLevels}
                                        />
                                    </div>
                                </ComponentCard>
                            </form>
                            <div className="flex w-full flex-row gap-5 mt-10">
                                <Button type="button" size="sm" variant="outline" onClick={() => setPage(1)}>
                                    Project Information
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    disabled={formik.isSubmitting}
                                    type="submit"
                                    form="projectForm2"
                                >
                                    Create Project
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </>

        </NavbarSidebarLayout>

    );
}
