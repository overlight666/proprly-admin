/* eslint-disable @typescript-eslint/no-explicit-any */
type success = {
  success: string[];
  setSuccess?: any;
};
const SuccessHandler = function (props: success) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { success, setSuccess } = props;

  const removeSuccess = (index) => {
    setSuccess((prevState) => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ]);
  };

  return (
    success.length > 0 && (
      <div className="relative mt-[20px] w-full">
        {[...new Set(success)].map((e, index) => {
          return (
            <span
              key={index}
              id="badge-dismiss-green"
              className="my-1 me-2 inline-flex w-full items-center justify-between rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              {e}
              <button
                type="button"
                className="ms-2 inline-flex items-center justify-center  rounded-sm bg-transparent p-1 text-sm text-green-400 hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                data-dismiss-target="#badge-dismiss-green"
                aria-label="Remove"
                onClick={() => removeSuccess(index)}
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

export default SuccessHandler;
