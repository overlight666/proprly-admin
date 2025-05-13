/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
    HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useOrganization } from "@/_recoil/actions";
import { useNavigate, useParams } from "react-router";
import { isLoadingAtom, selectedOrgAtom } from "@/_recoil/states";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FormikHelpers, useFormik } from "formik";
import { OrganizationForm } from "@/lib/interface";
import { organizationValidation } from "@/lib/validations";
import { GeneralInformationCard } from "../components/informationCard";
import FileUploader from "@/components/ui/filteupload";
import BuilderInformation from "../components/builderInformation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const EditOrganization: FC = function () {
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const orgAction = useOrganization();
    const params = useParams();
    const navigate = useNavigate();
    const setIsLoading = useSetRecoilState(isLoadingAtom);

    const [initialValues, setInitialValues] = useState<OrganizationForm>({
        name: undefined,
        currency: undefined,
        dateFormat: "dd-mm-yyyy",
        imageId: undefined,
        regionId: undefined,
        timezoneId: undefined,
        users: []
    })
    const { id } = params;

    useEffect(() => {
        orgAction.getSelectedOrganization(id);
    }, [id])

    useEffect(() => {
        if (selectedOrganization) {
            const values: OrganizationForm = {
                name: selectedOrganization?.name,
                dateFormat: selectedOrganization?.dateFormat,
                currency: selectedOrganization?.currency,
                imageId: selectedOrganization?.imageId,
                regionId: selectedOrganization?.region?.id,
                timezoneId: selectedOrganization?.timezone?.id,
                users: selectedOrganization?.user
            }
            setInitialValues(values)
        }
    }, [selectedOrganization])

    const formik = useFormik<OrganizationForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: organizationValidation,
        onSubmit: async (
            values: OrganizationForm,
            _formikHelpers: FormikHelpers<OrganizationForm>,
        ) => {
            onSubmit(values)
        },
    });

    const updateImageId = (id: any) => {
        formik.setFieldValue("imageId", id)
    }

    function onSubmit(values: any) {
        setIsLoading(true);
        orgAction.updateOrganization(id,
            values
        ).then((res: any) => {
            if (res?.id) {
                toast.success("Organization has been updated!");
                navigate("/");
            }
            setIsLoading(false);
        });
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
                            <Breadcrumb.Item >Edit Organization</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Edit Organization
                        </h1>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-4 xl:grid-cols-2 xl:gap-4">
                    <GeneralInformationCard
                        organization={formik.values}
                        handleChange={formik.handleChange}
                        errors={formik.errors}
                        setFieldValue={formik.setFieldValue} />
                    <FileUploader isDrop={true} currentImage={selectedOrganization?.image?.url} updateImageId={updateImageId} />
                </div>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-4">
                    <BuilderInformation selectedOrganization={selectedOrganization} setFieldValue={formik.setFieldValue} values={formik.values} />
                </div>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-4">
                    <div className="col-span-6 flex gap-2">
                        <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button disabled={!formik.dirty || !formik.isValid || Object.keys(formik.errors).length > 0} type="submit" color="primary" onClick={() => formik.handleSubmit()}>Submit</Button>
                    </div>

                </div>
            </>

        </NavbarSidebarLayout>
    );
};


export default EditOrganization;
