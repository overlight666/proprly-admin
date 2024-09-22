/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import type { UserRegistration } from "./types";
const RegistrationStep1 = function (props: UserRegistration) {
  const {
    fullname,
    email,
    password,
    mobile,
    agreed,
    nextStep,
    handleInputChange,
  } = props;
  return (
    <>
      <h1 className="mt-10 text-center text-2xl font-bold text-blue-900 dark:text-white md:text-2xl">
        Lets get started
      </h1>
      <span className="-mt-3 mb-3 text-center text-[#6B7280]">
        Sign Up for your new account!
      </span>
      <form onSubmit={nextStep}>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="fullname">Full name*</Label>
          <TextInput
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={handleInputChange}
            placeholder="Please enter your name"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="email">Email*</Label>
          <TextInput
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Please enter your email address"
            type="email"
          />
        </div>
        <div className="mb-6 flex flex-col gap-y-3">
          <Label htmlFor="password">Password*</Label>
          <TextInput
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Minimum 8 characters"
            type="password"
          />
        </div>
        <div className="mb-6 flex flex-col gap-y-3">
          <PhoneInput
            country={"us"}
            inputClass="!w-full !h-[40px]"
            value={mobile}
            onChange={(value) => handleInputChange(value)}
            // value={this.state.phone}
            // onChange={(phone) => this.setState({ phone })}
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="agreed"
              name="agreed"
              onChange={handleInputChange}
              checked={agreed}
            />
            <Label htmlFor="agreed">
              I agree to the{" "}
              <span className="text-blue-900">Terms of Service</span> and{" "}
              <span className="text-blue-900">Private Policy</span>
            </Label>
          </div>
        </div>
        <div className="mb-1">
          <Button type="submit" className="w-full">
            Get Started
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

export default RegistrationStep1;
