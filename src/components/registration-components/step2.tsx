/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, TextInput } from "flowbite-react";
import type { UserRegistration } from "./types";
const RegistrationStep2 = function (props: UserRegistration) {
  const { organization, country, nextStep, handleInputChange, loading } = props;
  return (
    <>
      <form onSubmit={nextStep}>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="organization">Select Country*</Label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={handleInputChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Select</option>
            <option value="AU">Australia</option>
          </select>
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
          <a href="#" className="text-primary-600 dark:text-primary-300">
            Click here to login
          </a>
        </p>
      </form>
    </>
  );
};

export default RegistrationStep2;
