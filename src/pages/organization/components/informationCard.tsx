import { regionOptionsAtom, regionsAtom } from "@/_recoil/states";
import ComponentCard from "@/components/ui/component-card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { OrganizationForm } from "@/lib/interface";
import { Label } from "flowbite-react";
import { FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type RoleDetailsFormProps = {
    organization: OrganizationForm;
    errors: FormikErrors<OrganizationForm>;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<OrganizationForm>> | Promise<void>;
};


export const GeneralInformationCard = function ({ organization, errors, handleChange, setFieldValue }: RoleDetailsFormProps) {
    const [timezoneOptions, setTimezoneOptions] = useState<any>([])
    const regionOptions = useRecoilValue(regionOptionsAtom);
    const regions = useRecoilValue(regionsAtom);
    useEffect(() => {
        if (regions && organization) {
            const tz = regions?.find((r: any) => r?.id == organization?.regionId);
            const tzOptions = tz?.timezone?.map((t: any) => {
                return {
                    value: t?.id,
                    label: t?.name
                }
            })
            if (tzOptions) {
                setFieldValue('currency', tz?.currency);
                setTimezoneOptions(tzOptions);
            } else {
                setFieldValue('timezoneId', null);
                setFieldValue('currency', null);
            }

        }
    }, [regions, organization?.regionId])

    return (
        <ComponentCard title="Organizational Information">
            <form action="#">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-6">
                        <Label htmlFor="first-name">Organization Name</Label>
                        <Input
                            value={organization.name}
                            name="name"
                            className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                            placeholder="Please enter organization name"
                            onChange={handleChange}
                            error={errors.name}
                            hint={errors.name}
                        />
                    </div>
                    <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-6">
                        <Label htmlFor="country">Country</Label>
                        <Select
                            options={regionOptions ?? []}
                            defaultValue={organization?.regionId}
                            className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                            placeholder="Select country"
                            onChange={(e) => setFieldValue("regionId", e)}
                            error={errors.regionId}
                            hint={errors.regionId}
                        />
                    </div>
                    <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-6">
                        <Label htmlFor="last-name">Currency</Label>
                        <Input
                            readOnly
                            value={organization.currency}
                            name="currency"
                            className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                            placeholder="Please enter organization name"
                            onChange={handleChange}
                            error={errors.currency}
                            hint={errors.currency}
                        />
                    </div>

                    <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-6">
                        <Label htmlFor="city">Timezone</Label>
                        <Select
                            options={timezoneOptions ?? []}
                            defaultValue={organization?.timezoneId}
                            className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                            placeholder="Select timezone"
                            onChange={(e) => setFieldValue("timezoneId", e)}
                            error={errors.timezoneId}
                            hint={errors.timezoneId}
                        />
                    </div>
                </div>
            </form>
        </ComponentCard>
    );
};
