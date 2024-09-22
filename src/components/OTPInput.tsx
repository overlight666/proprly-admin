/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

// declare type for the props

type InputProps = {
  length?: number;
  onComplete?: (pin: string) => void;
  OTP: string[];
  setOTP: (value: string[]) => void;
};

const OTPInput = ({ length = 4, OTP, setOTP }: InputProps) => {
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // if you're not using Typescript, do useState()
  //   const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // if the user has entered all the digits, grab the digits and set as an argument to the onComplete function.

    // if (newPin.every((digit) => digit !== "")) {
    //   onComplete(newPin.join(""));
    // }
  };

  //   onComplete(OTP.join(""));

  // return the inputs component

  return (
    <div className="flex w-full items-center justify-center">
      <div className={`grid w-auto grid-cols-6 gap-6`}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={OTP[index]}
            onChange={(e) => handleTextChange(e.target.value, index)}
            ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
            className={`h-10 w-10 rounded-[10px] border border-solid p-0 text-center outline-none focus:border-blue-600`}
            style={{ marginRight: index === length - 1 ? "0" : "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
