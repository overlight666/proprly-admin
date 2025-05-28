import { useOrganization } from "@/_recoil/actions";
import { globalConfigAtom, organizationSettingsAtom } from "@/_recoil/states";
import Select from "@/components/ui/select";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { Breadcrumb } from "flowbite-react";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HiHome } from "react-icons/hi";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import MultiSelect from "../../../components/ui/multiselect";

export const OptionsFromConfigApiKeyContext = createContext<any>(undefined);

const inputTypeMap = {
  string: "text",
  number: "number",
  boolean: "checkbox",
};

const OrganizationSettingForm: FC = function () {
  const config = useRecoilValue(globalConfigAtom);

  return (
    <NavbarSidebarLayout>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full mb-4 xl:mb-2">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Organizations</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Organization Settings</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Organization Settings
          </h1>
        </div>
      </div>
      <div className="p-5">
        <OptionsFromConfigApiKeyContext.Provider value={config}>
          <OrganizationSettingListing />
        </OptionsFromConfigApiKeyContext.Provider>
      </div>
    </NavbarSidebarLayout>
  );
};

const OrganizationSettingListing: FC = function () {
  const organizationSettingAction = useOrganization();
  const { id } = useParams();
  const organizationId = id ? parseInt(id, 10) : undefined;
  const config = useRecoilValue(organizationSettingsAtom);

  useEffect(() => {
    if (!organizationId) return;

    organizationSettingAction.getOrganizationSettings(organizationId);
  }, []);
  return (
    <form className="p-6 max-w-4xl mx-auto">
      {config?.map((setting) => (
        <OrganizationSettingItem key={setting.key} setting={setting} />
      ))}
    </form>
  );
};

const renderInput = ({ field, value, onChange }) => {
  const {
    inputType,
    multiple,
    options = [],
    filedKey,
    optionsFromConfigApiKey,
  } = field;
  const config = useContext(OptionsFromConfigApiKeyContext);

  const selectOptions = useMemo(() => {
    if (optionsFromConfigApiKey && config && config[optionsFromConfigApiKey]) {
      const opts = config[optionsFromConfigApiKey];
      return Array.isArray(opts) ? opts : Object.values(opts);
    }
    return options;
  }, [optionsFromConfigApiKey, config, options]);

  if (inputType === "select") {
    const selectValue = multiple
      ? Array.isArray(value)
        ? value
        : value
          ? [value]
          : []
      : value || "";
    if (!multiple) {
      return (
        <Select
          defaultValue={selectValue}
          options={selectOptions?.map((option) => ({
            label: option.roleName || option,
            value: option.roleId || option,
          }))}
          onChange={(selectedValue) => onChange(filedKey, selectedValue)}
        />
      );
    }
    return (
      <MultiSelect
        label=""
        onChange={(selectedValues) => onChange(filedKey, selectedValues)}
        options={selectOptions?.map((option) => ({
          text: option.roleName || option,
          value: option.roleId || option,
        }))}
      />
    );
  }

  if (inputType === "boolean") {
    return (
      <input
        type="checkbox"
        checked={value === "true"}
        onChange={(e) => onChange(filedKey, e.target.checked.toString())}
        className="h-5 w-5 text-blue-600"
      />
    );
  }

  return (
    <input
      type={inputTypeMap[inputType] || "text"}
      value={value || ""}
      onChange={(e) => onChange(filedKey, e.target.value)}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  );
};

const OrganizationSettingFieldGroup = ({ fieldsGroup, data, onUpdate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {fieldsGroup.map((field, idx) => (
      <div key={idx}>
        {renderInput({
          field,
          value: data[field.filedKey],
          onChange: (key, val) => onUpdate(key, val),
        })}
      </div>
    ))}
  </div>
);

const OrganizationSettingItem = ({ setting }) => {
  const { label, multipleFieldsGroups, fieldsGroup, results } = setting;
  const config = useContext(OptionsFromConfigApiKeyContext);

  const extractInitialData = () => {
    if (!results || results.length === 0) return [{}];

    const getOptionsFromConfig = (fg) => {
      if (
        fg.optionsFromConfigApiKey &&
        config &&
        config[fg.optionsFromConfigApiKey]
      ) {
        const opts = config[fg.optionsFromConfigApiKey];
        return Array.isArray(opts) ? opts : Object.values(opts);
      }
      return [];
    };

    if (multipleFieldsGroups) {
      return results.map((res) => {
        const obj = {};
        fieldsGroup.forEach((fg) => {
          const isRoleField = fg.filedKey === "role_id";
          const roleValue = res.roleId;
          const optionsFromConfig = getOptionsFromConfig(fg);

          if (isRoleField) {
            if (Array.isArray(roleValue)) {
              obj[fg.filedKey] = roleValue
                .map(
                  (rid) =>
                    optionsFromConfig?.find((c) => c.roleId === rid)?.roleName,
                )
                .filter(Boolean);
            } else {
              obj[fg.filedKey] = optionsFromConfig?.find(
                (c) => c.roleId === roleValue,
              )?.roleName;
            }
          } else {
            obj[fg.filedKey] = res.value;
          }
        });
        return obj;
      });
    }

    return [
      fieldsGroup.reduce((acc, fg) => {
        const isRoleField = fg.filedKey === "role_id";
        const roleValue = results[0]?.roleId;
        const optionsFromConfig = getOptionsFromConfig(fg);

        if (isRoleField) {
          acc[fg.filedKey] = Array.isArray(roleValue)
            ? roleValue
              .map(
                (rid) =>
                  optionsFromConfig?.find((c) => c.roleId === rid)?.roleName,
              )
              .filter(Boolean)
            : optionsFromConfig?.find((c) => c.roleId === roleValue)?.roleName;
        } else {
          acc[fg.filedKey] = results[0]?.value;
        }
        return acc;
      }, {}),
    ];
  };

  const [fieldGroups, setFieldGroups] = useState(extractInitialData());

  const updateFieldGroup = (index, key, value) => {
    setFieldGroups((prev) => {
      const updated = [...prev];
      if (!updated[index]) updated[index] = {};
      updated[index][key] = value;
      return updated;
    });
  };

  const addFieldGroup = () => setFieldGroups((prev) => [...prev, {}]);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {label}
      </h3>
      <div className="space-y-4">
        {fieldGroups.map((groupData, idx) => (
          <OrganizationSettingFieldGroup
            key={idx}
            fieldsGroup={fieldsGroup}
            data={groupData}
            onUpdate={(key, val) => updateFieldGroup(idx, key, val)}
          />
        ))}
      </div>
      {multipleFieldsGroups && (
        <div className="mt-4">
          <button
            type="button"
            onClick={addFieldGroup}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add
          </button>
        </div>
      )}
    </div>
  );
};

export default OrganizationSettingForm;
