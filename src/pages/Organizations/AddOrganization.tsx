/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useOrganization } from "../../_actions/organizations.actions";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  buildersAtom,
  regionAtom,
  selectedOrgAtom,
} from "../../_state/atoms/organizations";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import Select from "../../components/form/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { OptionType } from "../../_types";
import Button from "../../components/ui/button/Button";
import { Link, useNavigate } from "react-router";
import BuilderTable from "./components/BuildersTable";
import { PlusIcon } from "../../icons";
import AddBuilderModal from "./components/AddBuilderModal";
import { useModal } from "../../hooks/useModal";
import { toast } from "react-toastify";
import { dropZoneAtom } from "../../_state/atoms/dropzone";
import { useLocation } from "react-router";
import Select2 from "../../components/form/Select2";

export default function AddOrganization() {
  const orgAction = useOrganization();
  const builders = useRecoilValue(buildersAtom);
  const region = useRecoilValue(regionAtom);
  const [country, setCountry] = useState<any[]>([]);
  const [timezoneOption, setTimezoneOption] = useState<OptionType[]>();
  const [listBuilders, setListBuilders] = useState<OptionType[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedBuilders, setSelectedBuilders] = useState<any>([]);
  const [attachBuilder, setAttachBuilder] = useState<any>();
  const [countryChoosen, setCountryChoosen] = useState<any>("");
  const uploadedImage = useRecoilValue(dropZoneAtom);
  const selectedOrganization = useRecoilValue(selectedOrgAtom);
  const setImage = useSetRecoilState(dropZoneAtom);

  const navigate = useNavigate();
  const props: any = useLocation();
  const query = new URLSearchParams(props.search);

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    name: Yup.string().required("Organization name is required"),
    timezone: Yup.string().required("Timezone is required"),
    currency: Yup.string().optional(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, watch, setValue } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const hasCode = watch("country");

  useEffect(() => {
    orgAction.getBuilders();
    orgAction.getRegion();
    setImage(undefined);
  }, []);

  useEffect(() => {
    if (region) {
      const countryHandler = region.map((r) => {
        return {
          value: r.regionCode,
          label: r.regionName,
        };
      });
      setCountry(countryHandler);
    }
  }, [region]);

  useEffect(() => {
    if (hasCode && region) {
      const selectedCountry = region.find((c) => c.regionCode === hasCode);
      setValue("currency", selectedCountry?.currency);
      setCountryChoosen(selectedCountry?.regionName);
      const zoneHandler = selectedCountry?.timezone.map((tz) => {
        return {
          value: JSON.stringify(tz),
          label: tz.name,
        };
      });
      setTimezoneOption(zoneHandler);
    }
  }, [hasCode]);

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

  const addBuilderUser = (email: any, fullName: any, mobileNumber: any) => {
    const temp = {
      fullName: fullName,
      mobile: mobileNumber,
      password: "test",
      email,
      roleId: 1,
    };
    if (!selectedBuilders.find((o: any) => o.email === temp.email)) {
      setSelectedBuilders((oldArray: any) => [...oldArray, temp]);
    } else {
      toast.warning("Builder email already exist");
    }
    closeModal();
  };

  const removeBuilder = (email: string) => {
    const filteredBuilders = selectedBuilders.filter(
      (builder: any) => builder.email !== email
    );
    setSelectedBuilders(filteredBuilders);
  };

  const attachBuilderHandler = () => {
    const builderHandler = JSON.parse(attachBuilder);

    if (!selectedBuilders.find((o: any) => o.email === builderHandler.email)) {
      setSelectedBuilders((oldArray: any) => [...oldArray, builderHandler]);
    } else {
      toast.warning("Builder already exist");
    }
  };

  function onSubmit(props: any) {
    if (uploadedImage) {
      if (selectedBuilders.length > 0) {
        const parsedTZ = JSON.parse(props.timezone);
        const params = {
          country: countryChoosen.toLowerCase(),
          currency: props.currency,
          dateFormat: "dd-mm-yyyy",
          imageId: uploadedImage.id,
          name: props.name,
          timezone: parsedTZ.name,
          regionId: parsedTZ.regionId,
          timezoneId: parsedTZ.id,
          users: selectedBuilders,
        };
        if (location.pathname === "/organization/edit") {
          orgAction.updateOrganization(query.get("id"), params, toast);
        } else {
          orgAction.addOrganization(params, navigate).catch((error: any) => {
            toast.error(error[0].message);
          });
        }
      } else {
        toast.warning("Please select a builder");
      }
    } else {
      toast.warning("Please upload your organization image");
    }
  }

  useEffect(() => {
    if (location.pathname === "/organization/edit") {
      orgAction.getSelectedOrganization(query.get("id"));
    }
  }, []);

  useEffect(() => {
    if (
      selectedOrganization &&
      location.pathname === "/organization/edit" &&
      region
    ) {
      setValue("currency", selectedOrganization.currency);
      setValue(
        "country",
        selectedOrganization.region
          ? selectedOrganization.region?.regionCode
          : ""
      );
      setValue("name", selectedOrganization.name);
      setValue("timezone", JSON.stringify(selectedOrganization.timezone));
      setImage(selectedOrganization.image);

      const orgAdmins: any =
        selectedOrganization.user &&
        selectedOrganization.user.length > 0 &&
        selectedOrganization.user.filter((u) =>
          u.organization_role?.find((o) => o.roleKey === "organization_admin")
        );
      const mergedBuilders = [...selectedBuilders, ...orgAdmins];
      const uniqueBuilders = mergedBuilders.filter((value: any, index: any) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          mergedBuilders.findIndex((obj: any) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });
      setSelectedBuilders(uniqueBuilders);

      const builderHandler = uniqueBuilders.map((obj: any) => {
        return {
          value: JSON.stringify(obj),
          label: obj.fullName,
        };
      });
      setListBuilders(builderHandler);
    }
  }, [selectedOrganization, region]);

  return (
    <div>
      <PageMeta title="Proprly | Admin" description="New Organization" />
      <PageBreadcrumb pageTitle="New Organization" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          id="orgform"
        >
          <ComponentCard title="Organizational Information">
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">
                  Organization Name
                  <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  type="text"
                  register={{ ...register("name") }}
                  error={errors.name}
                  hint={errors.name?.message}
                  placeholder="Enter your organization name"
                />
              </div>
              <div>
                <Label htmlFor="inputTwo">
                  Country <span className="text-error-500">*</span>{" "}
                </Label>
                <Select
                  options={country && country.length ? country : []}
                  placeholder="Select country"
                  className="dark:bg-dark-900"
                  register={{ ...register("country") }}
                  error={errors.country}
                  hint={errors.country?.message}
                />
              </div>
              <div>
                <Label htmlFor="inputTwo">Currency</Label>
                <Input
                  register={{ ...register("currency") }}
                  type="text"
                  placeholder="$"
                  error={errors.currency}
                  hint={errors.currency?.message}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="inputTwo">
                  Timezone <span className="text-error-500">*</span>{" "}
                </Label>
                <Select
                  options={
                    timezoneOption && timezoneOption.length
                      ? timezoneOption
                      : []
                  }
                  placeholder="Select timezone"
                  className="dark:bg-dark-900"
                  register={{ ...register("timezone") }}
                  error={errors.timezone}
                  hint={errors.timezone?.message}
                />
              </div>
            </div>
          </ComponentCard>
        </form>
        <DropzoneComponent title="Upload Image" />
      </div>
      <div className="grid grid-cols-1 mt-5">
        <ComponentCard title="Builders Information">
          <div className="space-y-6">
            <div>
              <Label htmlFor="inputTwo">Builder list</Label>
              <div className="flex flex-row gap-2 w-full">
                <Select2
                  options={
                    listBuilders && listBuilders.length ? listBuilders : []
                  }
                  onChange={(e) => setAttachBuilder(e)}
                  placeholder="Select a builder"
                  className="dark:bg-dark-900"
                  containerClass="w-[85%]"
                />
                <Button
                  size="sm"
                  variant="primary"
                  className="w-[15%]"
                  onClick={() => attachBuilderHandler()}
                >
                  Attach Builder <PlusIcon />
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
        </ComponentCard>
      </div>
      <div className="flex w-full flex-row gap-5 mt-10">
        <Link
          to="/"
          className="flex items-center justify-center px-3 py-2 rounded-md bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
        >
          Cancel
        </Link>
        <Button
          size="sm"
          variant="primary"
          disabled={isSubmitting}
          type="submit"
          form="orgform"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}{" "}
          Submit
        </Button>
      </div>

      <AddBuilderModal
        closeModal={closeModal}
        isOpen={isOpen}
        addBuilderUser={addBuilderUser}
      />
    </div>
  );
}
