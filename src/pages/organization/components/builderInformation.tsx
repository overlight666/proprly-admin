/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { buildersAtom } from "@/_recoil/states";
import { useOrganization } from "@/_recoil/actions";
import { OptionType } from "@/lib/interface";
import { Label } from "flowbite-react";
import ComponentCard from "@/components/ui/component-card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useModal } from "@/helpers/useModal";
import BuilderTable from "../tables/builderTable";
import AddBuilderModal from "@/components/modals/addBuilderModal";
import Select from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

DataTable.use(DT);

// Define the table data using the interface

export default function BuilderInformation({ selectedOrganization, setFieldValue, values }: any) {
    const builders = useRecoilValue(buildersAtom);
    const [listBuilders, setListBuilders] = useState<OptionType[]>([]);
    const [attachBuilder, setAttachBuilder] = useState<any>();
    const [selectedBuilders, setSelectedBuilders] = useState<any>([]);
    const { openModal, closeModal, isOpen } = useModal();
    const orgAction = useOrganization();
    const params = useParams();
    const { id } = params;


    useEffect(() => {
        if (
            selectedOrganization
        ) {

            const orgAdmins: any =
                selectedOrganization.user &&
                selectedOrganization.user.length > 0 &&
                selectedOrganization.user.filter((u: any) =>
                    u.organization_role?.find((o: any) => o.roleKey === "organization_admin")
                );
            try {
                const mergedBuilders = [...selectedBuilders, ...orgAdmins];
                const uniqueBuilders = mergedBuilders.filter(
                    (value: any, index: any) => {
                        const _value = JSON.stringify(value);
                        return (
                            index ===
                            mergedBuilders.findIndex((obj: any) => {
                                return JSON.stringify(obj) === _value;
                            })
                        );
                    }
                );
                setFieldValue("users", uniqueBuilders);
                setSelectedBuilders(uniqueBuilders);
            } catch (error) {
                console.log(error);
            }

            const builderHandler = builders?.map((obj: any) => {
                return {
                    value: JSON.stringify(obj),
                    label: obj.fullName,
                };
            });
            setListBuilders(builderHandler);
        }
    }, [selectedOrganization]);


    useEffect(() => {
        if (builders && builders.length) {
            const builderHandler = builders.map((obj: any) => {
                return {
                    value: JSON.stringify(obj),
                    label: obj.fullName,
                };
            });

            setListBuilders(builderHandler);
        }
    }, [builders]);


    const removeBuilder = (email: string) => {
        const filteredBuilders = selectedBuilders.filter(
            (builder: any) => builder.email !== email
        );
        setFieldValue("users", filteredBuilders);
        setSelectedBuilders(filteredBuilders);
    };

    const attachBuilderHandler = () => {
        const builderHandler = JSON.parse(attachBuilder);
        if (!selectedBuilders.find((o: any) => o.email === builderHandler.email)) {
            if (id) {
                const params = {
                    id: builderHandler?.id,
                    roleId: 1,
                };
                orgAction.attachBuilder(id, params).then(() => {
                    orgAction.getSelectedOrganization(id);
                });
            } else {
                const temp = {
                    fullName: builderHandler?.fullName,
                    mobile: builderHandler?.mobile,
                    password: "test",
                    email: builderHandler?.email,
                    id: builderHandler?.id,
                    roleId: 1,
                };
                setFieldValue("users", [...values.users, temp]);
                setSelectedBuilders((oldArray: any) => [...oldArray, temp]);
            }

            // setSelectedBuilders((oldArray: any) => [...oldArray, builderHandler]);
        } else {
            toast.warning("Builder already exist");
        }
    };


    const addBuilderUser = (email: any, fullName: any, mobileNumber: any) => {
        const temp = {
            fullName: fullName,
            mobile: mobileNumber,
            password: "test",
            email,
            roleId: 1,
        };
        if (!selectedBuilders.find((o: any) => o.email === temp.email)) {
            setFieldValue("users", [...values.users, temp]);
            setSelectedBuilders((oldArray: any) => [...oldArray, temp]);
        } else {
            toast.warning("Builder email already exist");
        }
        closeModal();
    };

    return (
        <ComponentCard title="Builders Information">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="inputTwo">Builder list</Label>
                    <div className="flex flex-row gap-2 items-center">
                        <Select
                            options={
                                listBuilders ?? []
                            }
                            onChange={(e) => setAttachBuilder(e)}
                            placeholder="Select a builder"
                            className="dark:bg-dark-900"
                            containerClass="w-[39%]"
                        />
                        <Button
                            size="lg"
                            variant="default"
                            className="w-[15%]"
                            onClick={() => attachBuilderHandler()}
                        >
                            Attach Builder <PlusIcon className="size-5" />
                        </Button>
                    </div>
                </div>
                <div>
                    <BuilderTable
                        selectedBuilders={selectedBuilders}
                        removeBuilder={removeBuilder}
                    />
                </div>
                <div
                    className="text-blue-600 gap-1 flex flex-row items-center cursor-pointer"
                    onClick={() => openModal()}
                >
                    <span>ADD NEW BUILDER</span>
                    <PlusIcon />
                </div>
            </div>
            <AddBuilderModal
                closeModal={closeModal}
                isOpen={isOpen}
                addBuilderUser={addBuilderUser}
            />
        </ComponentCard>
    );
}
