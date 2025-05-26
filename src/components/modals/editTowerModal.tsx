/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Modal } from "../ui/modal";
import { Label } from "flowbite-react";
import Input from "../ui/input";
import Select from "../ui/select";
import { Button } from "../ui/button";
import { globalConfigAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import { useProject } from "@/_recoil/actions";
import { useParams } from "react-router";


export default function EditTowerModal({ isOpen, closeModal, currentTower }: any) {
    const [name, setName] = useState<any>("");
    const [floor, setFloor] = useState<any>("");
    const [status, setStatus] = useState<any>("");
    const globalConfig = useRecoilValue(globalConfigAtom);
    const [nameError, setNameError] = useState<any>("");
    const projectAction = useProject();
    const params = useParams();
    const { project_id } = params;
    useEffect(() => {
        if (currentTower) {
            setName(currentTower.name);
            setFloor(currentTower.numFloors);
            setStatus(currentTower.status);
        }
    }, [currentTower])
    const towerOptions: any = [
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
        {
            label: 6,
            value: 6,
        },
        {
            label: 7,
            value: 7,
        },
        {
            label: 8,
            value: 8,
        },
        {
            label: 9,
            value: 9,
        },
        {
            label: 10,
            value: 10,
        },
    ];

    function onSubmit() {
        setNameError("");

        if (name.trim().length === 0) {
            setNameError("Name is required");
        }
        if (!floor) {
            toast.error("Floor must be selected");
        }

        if (name.trim().length > 0 && floor.trim().length > 0) {
            projectAction.updateProjectTower({ name, floor, status }, currentTower.id).then((res: any) => {
                if (res) {
                    toast.success("Tower updated successfully");
                    projectAction.getSelectedProject(project_id);
                }
            })
            closeModal();
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            Edit Tower
                        </h5>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="input">Tower Name</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                error={nameError !== ""}
                                hint={nameError}
                            />
                        </div>
                        <div>
                            <Label htmlFor="inputTwo">
                                Floors <span className="text-red-500">*</span>{" "}
                            </Label>
                            <Select
                                defaultValue={floor}
                                options={towerOptions}
                                placeholder="Select floors"
                                className="dark:bg-dark-900"
                                onChange={(e) => setFloor(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="inputTwo">
                                Status <span className="text-red-500">*</span>{" "}
                            </Label>
                            <Select
                                defaultValue={status}
                                options={globalConfig?.towerStatusOptions ?? [
                                    {
                                        label: "Under Construction",
                                        value: "under_construction",
                                    },
                                ]}
                                placeholder="Select status"
                                className="dark:bg-dark-900"
                                onChange={(e) => setStatus(e)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <Button
                            onClick={closeModal}
                            variant="outline"
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => onSubmit()}
                            type="button"
                            variant="default"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
