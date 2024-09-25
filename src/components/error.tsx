import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type errors = {
  errors: string[];
  setErrors?: any;
};
const ErrorHandler = function (props: errors) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { errors, setErrors } = props;

  const removeError = (index) => {
    setErrors((prevState) => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ]);
  };

  useEffect(() => {
    const uniq = [...new Set(errors)];
    setErrors(uniq);
  }, [errors, setErrors]);

  return (
    errors.length > 0 && (
      <div className="relative mt-[20px] w-full">
        {errors.map((e, index) => {
          return (
            <span
              key={index}
              id="badge-dismiss-red"
              className="my-1 me-2 inline-flex w-full items-center justify-between rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
            >
              {e}
              <button
                type="button"
                className="ms-2 inline-flex items-center justify-center  rounded-sm bg-transparent p-1 text-sm text-red-400 hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
                data-dismiss-target="#badge-dismiss-red"
                aria-label="Remove"
                onClick={() => removeError(index)}
              >
                <svg
                  className="h-2 w-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </span>
          );
        })}
      </div>
    )
  );
};

export default ErrorHandler;
