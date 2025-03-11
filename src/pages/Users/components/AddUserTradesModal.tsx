/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../../../components/ui/modal";
import { Label } from "flowbite-react/components/Label";
import Input from "../../../components/form/input/InputField";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import MultiSelect from "../../../components/form/MultiSelect";
import { appointmentTradeCodesAtom } from "../../../_state";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import React from "react";

export default function AddUserTradesModal({
  isOpen,
  closeModal,
  addUser,
  title,
}: any) {
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const [fullName, setFullName] = useState<any>("");
  const [email, setEmail] = useState<any>("");

  const [emailError, setEmailError] = useState<any>("");
  const [nameError, setNameError] = useState<any>("");
  const [mobileError, setMobileError] = useState<any>("");
  const [tradeCodes, setTradeCodes] = useState([]);
  const [tradesList, setTradeList] = useState([]);
  const tradeCodeList = useRecoilValue(appointmentTradeCodesAtom);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    const tradesl = tradeCodeList?.map((trades: any) => {
      return {
        text: `${trades.tradeCode} - ${trades.tradeName}`,
        value: trades.id,
        selected: false,
      };
    });
    setTradeList(tradesl);
  }, [tradeCodeList]);

  function onSubmit() {
    setEmailError("");
    setNameError("");
    setMobileError("");

    if (email.trim().length === 0) {
      setEmailError("Email is required");
    }
    if (fullName.trim().length === 0) {
      setNameError("Name is required");
    }
    if (!mobileNumber) {
      setMobileError("Mobile number is required");
    }
    if (tradeCodes.length == 0) {
      toast.error("Trade codes are required");
    }
    if (validateEmail(email)) {
      if (
        email.trim().length > 0 &&
        fullName.trim().length > 0 &&
        mobileNumber &&
        tradeCodes.length > 0
      ) {
        addUser(email, fullName, `+${mobileNumber.phone}`, tradeCodes);
        closeModal();
        setEmail("");
        setMobileNumber("");
        setFullName("");
        setTradeCodes([]);
      }
    } else {
      if (emailError.length === 0) setEmailError("Invalid email format");
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10 overflow-y-inherit"
      >
        <div className="flex flex-col px-2 overflow-y-inherit custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {title}
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Full Name</Label>
              <Input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Phone<span className="text-error-500">*</span>
              </Label>
              <PhoneInput
                country={"au"}
                containerClass="w-full"
                inputClass="!h-11 !w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:!bg-gray-900 dark:!text-white/90 dark:!placeholder:text-white/30 dark:!border-gray-700"
                onChange={(phone) => setMobileNumber({ phone })}
                inputProps={{
                  name: "mobileNumber",
                  required: true,
                }}
              />
              {mobileError && (
                <p className={`mt-1.5 text-xs text-error-500`}>{mobileError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>
                Email<span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={emailError !== ""}
                hint={emailError}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Trade Codes<span className="text-error-500">*</span>
              </Label>
              <MultiSelect
                label=""
                hasLabel={false}
                options={tradesList}
                onChange={(values: any) => setTradeCodes(values)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => onSubmit()}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
