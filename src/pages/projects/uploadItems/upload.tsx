/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FileInput } from "flowbite-react";
import type { ImageType } from "../../../types";

export default function Upload({ handleUpload, uploadedFiles }: any) {
  const getFileSizeFromUrl = () => {
    return `${Math.floor(Math.random() * 100)}mb`;
  };
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[100%]">
          <FileInput
            id="file-upload"
            accept="application/pdf"
            onChange={handleUpload}
          />
        </div>
        {uploadedFiles &&
          uploadedFiles.map((files: ImageType, index: number) => {
            return (
              <div
                className="flex w-full items-center justify-start gap-5"
                key={index}
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-none"
                >
                  <g clipPath="url(#clip0_1195_10047)">
                    <path
                      d="M4.5 11.5H4V12.5H4.5C4.776 12.5 5 12.276 5 12C5 11.724 4.776 11.5 4.5 11.5Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M7 5.5V0.63C6.518 0.768 6.071 1.014 5.707 1.379L2.879 4.207C2.514 4.571 2.268 5.018 2.13 5.5H7Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M10.375 11.5H10V14.5H10.375C10.72 14.5 11 14.22 11 13.875V12.125C11 11.78 10.72 11.5 10.375 11.5Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M19 7.5H18V2.5C18 1.397 17.133 0.5 16.067 0.5H9V5.5C9 6.603 8.103 7.5 7 7.5H1C0.448 7.5 0 7.948 0 8.5V17.5C0 18.052 0.448 18.5 1 18.5H2C2 19.603 2.867 20.5 3.933 20.5H16.067C17.163 20.5 17.764 19.264 17.923 18.886C17.975 18.762 17.993 18.631 17.993 18.5H19C19.552 18.5 20 18.052 20 17.5V8.5C20 7.948 19.552 7.5 19 7.5ZM4.5 14.5H4V15.5C4 16.052 3.552 16.5 3 16.5C2.448 16.5 2 16.052 2 15.5V10.5C2 9.948 2.448 9.5 3 9.5H4.5C5.878 9.5 7 10.622 7 12C7 13.378 5.878 14.5 4.5 14.5ZM13 13.875C13 15.322 11.822 16.5 10.375 16.5H9C8.448 16.5 8 16.052 8 15.5V10.5C8 9.948 8.448 9.5 9 9.5H10.375C11.822 9.5 13 10.678 13 12.125V13.875ZM17 12.5C17.552 12.5 18 12.948 18 13.5C18 14.052 17.552 14.5 17 14.5H16V15.5C16 16.052 15.552 16.5 15 16.5C14.448 16.5 14 16.052 14 15.5V10.5C14 9.948 14.448 9.5 15 9.5H17C17.552 9.5 18 9.948 18 10.5C18 11.052 17.552 11.5 17 11.5H16V12.5H17Z"
                      fill="#9CA3AF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1195_10047">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <span>{files.name}</span>
                    <span className="text-gray-400">
                      {getFileSizeFromUrl()}
                    </span>
                  </div>
                </div>

                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-none"
                >
                  <g clipPath="url(#clip0_1195_10053)">
                    <path
                      d="M8 0.5C6.41775 0.5 4.87103 0.969192 3.55544 1.84824C2.23985 2.72729 1.21447 3.97672 0.608967 5.43853C0.00346627 6.90034 -0.15496 8.50887 0.153721 10.0607C0.462403 11.6126 1.22433 13.038 2.34315 14.1569C3.46197 15.2757 4.88743 16.0376 6.43928 16.3463C7.99113 16.655 9.59966 16.4965 11.0615 15.891C12.5233 15.2855 13.7727 14.2602 14.6518 12.9446C15.5308 11.629 16 10.0822 16 8.5C15.9977 6.37898 15.1541 4.3455 13.6543 2.84572C12.1545 1.34593 10.121 0.502329 8 0.5ZM10.9656 7.4656L7.7656 10.6656C7.61558 10.8156 7.41213 10.8998 7.2 10.8998C6.98787 10.8998 6.78442 10.8156 6.6344 10.6656L5.0344 9.0656C4.88868 8.91472 4.80804 8.71263 4.80986 8.50288C4.81169 8.29312 4.89582 8.09247 5.04415 7.94414C5.19247 7.79582 5.39312 7.71168 5.60288 7.70986C5.81264 7.70804 6.01472 7.78867 6.1656 7.9344L7.2 8.9688L9.8344 6.3344C9.98528 6.18867 10.1874 6.10804 10.3971 6.10986C10.6069 6.11168 10.8075 6.19582 10.9559 6.34414C11.1042 6.49247 11.1883 6.69312 11.1901 6.90288C11.192 7.11263 11.1113 7.31472 10.9656 7.4656Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1195_10053">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            );
          })}
      </div>
    </div>
  );
}
