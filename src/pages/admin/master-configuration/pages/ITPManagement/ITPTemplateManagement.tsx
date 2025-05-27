/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TemplateTable from "./TemplateTable";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AddITP from "./AddITP";
import { useCountriesAction, useITPAction, useOrganization, useProject } from "@/_recoil/actions";
import { allProjectsAtom, isLoadingAtom, ItpManagementListAtom, organizationsAtom, regionsAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { Label } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Project } from "@/lib/interface";

export default function TemplateManagement() {

    const orgAction = useOrganization();
    const projectAction = useProject();
    const regionAction = useCountriesAction();
    const regionList: any[] = useRecoilValue(regionsAtom);
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedId, setSelectedId] = useState<any>();
    const itpAction = useITPAction();
    const ItpTemplatesList = useRecoilValue(ItpManagementListAtom);
    const [isType, setIsType] = useState("");
    const [currentParams, setCurrentParams] = useState("");
    const projectList: Project[] = useRecoilValue(allProjectsAtom);
    const orglist: any = useRecoilValue(organizationsAtom);
    const setIsLoading = useSetRecoilState(isLoadingAtom);

    const [initialValues, setInitialValues] = useState({
        name: "",
        isDefault: true,
        tradeCodes: [],
        locations: []
    });
    const [isEdit, setIsEdit] = useState(false);

    const getChecklist = () => {
        const params =
            isType === "project"
                ? `?projectId=${selectedId}`
                : isType === "organization"
                    ? `?organizationId=${selectedId}`
                    : isType === "region"
                        ? `?regionId=${selectedId}`
                        : "";
        if (selectedId || isType === "default") {
            setCurrentParams(params);
            setIsLoading(true);
            Promise.all([
                itpAction.getItpTemplates(params),
                itpAction.getTradeCode(params)]).then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000);

                })
        }
    };


    useEffect(() => {
        orgAction.getOrganizations();
        projectAction.getAllProjects();
        regionAction.getRegions();
        itpAction.getLocations()
    }, []);


    useEffect(() => {
        if (isType) {
            getChecklist();
        }
    }, [isType, selectedId]);

    return (
        <div>
            <div className="flex items-end justify-between flex-wrap gap-1">
                <div className="flex flex-row items-center gap-5 w-[80%] flex-wrap">

                    <div className="w-[45%]">
                        <Label>
                            Select Type<span className="text-error-500">*</span>
                        </Label>
                        <select
                            id="timeslot"
                            name="timeslot"
                            value={isType}
                            onChange={(e) => {
                                setSelectedId(undefined);
                                setIsType(e.target.value);
                            }}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected>
                                Please Select
                            </option>
                            <option value="default">Default</option>
                            <option value="project">Project</option>
                            <option value="organization">Organization</option>
                            <option value="region">Region</option>
                        </select>
                    </div>
                    <div className="w-[45%]">
                        {isType === "project" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Project<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="project"
                                    name="project"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {projectList?.map((project) => {
                                        return <option value={project?.id}>{project.name}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType === "organization" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Organization<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="organization"
                                    name="organization"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {orglist?.map(
                                        (organization: any) => {
                                            return (
                                                <option value={organization?.id}>
                                                    {organization?.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        )}

                        {isType === "region" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Region<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="region"
                                    name="region"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {regionList?.map((region) => {
                                        return (
                                            <option value={region?.id}>{region.regionName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}

                    </div>

                </div>
                <Button
                    onClick={() => {
                        openModal();
                        setIsEdit(false);
                    }}
                    disabled={!isType}
                    type="button"
                >
                    <div className="flex items-center">
                        <PlusIcon />
                        Add
                    </div>
                </Button>
            </div>

            <TemplateTable
                tableData={ItpTemplatesList}
                openModal={openModal}
                setInitialValues={setInitialValues}
                setIsEdit={setIsEdit}
                currentParams={currentParams}
            />

            <AddITP
                isEdit={isEdit}
                initialValues={initialValues}
                currentParams={currentParams}
                selectedId={selectedId}
                isType={isType}
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </div>
    );
}
