/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, TextInput } from "flowbite-react";
import type { UserRegistration } from "./types";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../types";
import { getAllCountries } from "../../store/features/reducers";
const RegistrationStep2 = function (props: UserRegistration) {
  const { countries }: AppState = useSelector(
    (state: any) => state.application
  );
  const { organization, nextStep, handleInputChange, loading, country } = props;
  const [options, setOptions] = useState<any>([]);
  const [timezoneOption, setTimezoneOptions] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      const tz = countries.find(
        (obj) => obj.countryCode.toLowerCase() === country.toLowerCase()
      )?.timezone;
      const ntz =
        tz &&
        tz.map((t) => {
          return {
            label: t.name,
            value: t.name,
            id: t.id,
          };
        });
      setTimezoneOptions(ntz);
    }
  }, [country]);

  useEffect(() => {
    if (countries.length > 0) {
      const noptions = countries.map((c) => {
        return {
          value: c.countryName.toLowerCase(),
          code: c.countryCode,
          label: c.countryName,
          ...c,
        };
      });
      setOptions(noptions);
    }
  }, [countries]);

  return (
    <>
      <form onSubmit={nextStep}>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="organization">Select Country*</Label>
          <Select
            // className="basic-single"
            classNamePrefix="select"
            options={options}
            isSearchable={true}
            defaultValue={options[13]}
            onChange={(event) =>
              handleInputChange({
                target: {
                  name: "country",
                  value: event.code,
                },
              })
            }
            id="country"
            name="country"
            // value={country}
          />
        </div>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="organization">Select Time-Zone*</Label>
          <Select
            // className="basic-single"
            classNamePrefix="select"
            options={timezoneOption}
            isSearchable={true}
            onChange={(event: any) =>
              handleInputChange({
                target: {
                  name: "timezone",
                  value: event?.value,
                },
              })
            }
            id="timezone"
            name="timezone"
            // value={country}
          />
        </div>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="organization">Organization name*</Label>
          <TextInput
            id="organization"
            name="organization"
            value={organization}
            onChange={handleInputChange}
            placeholder="Organization name"
            type="text"
          />
        </div>
        <div className="mb-1">
          <Button type="submit" className="w-full" isProcessing={loading}>
            Next
          </Button>
        </div>
        <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-300">
          Already registered?&nbsp;
          <a href="/" className="text-primary-600 dark:text-primary-300">
            Click here to login
          </a>
        </p>
      </form>
    </>
  );
};

export default RegistrationStep2;
