/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { Label } from "flowbite-react";
import Input from "../ui/input";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

export default function AddBuilderModal({
    isOpen,
    closeModal,
    addBuilderUser,
}: any) {
    const [mobileNumber, setMobileNumber] = useState<any>("");
    const [fullName, setFullName] = useState<any>("");
    const [email, setEmail] = useState<any>("");

    const [emailError, setEmailError] = useState<any>("");
    const [nameError, setNameError] = useState<any>("");
    const [mobileError, setMobileError] = useState<any>("");

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

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
        if (validateEmail(email)) {
            if (
                email.trim().length > 0 &&
                fullName.trim().length > 0 &&
                mobileNumber
            ) {
                addBuilderUser(email, fullName, `+${mobileNumber.phone}`);
                closeModal();
                setEmail("");
                setMobileNumber("");
                setFullName("");
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
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            Add New Builder
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
                                Phone<span className="text-red-500">*</span>
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
                                <p className={`mt-1.5 text-xs text-red-500`}>{mobileError}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                error={emailError !== ""}
                                hint={emailError}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <Button
                            onClick={closeModal}
                            type="button"
                            variant="outline"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => onSubmit()}
                            type="button"
                            variant="default"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
