/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { Dropdown } from "flowbite-react";
import type { DefectSumissionType, PropertyState } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllDefectResolutionReducer,
  getDefectResolutionByIdReducer,
} from "../../../store/features/reducers";
import { useParams } from "react-router";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DefectSubmissionModal } from "../../../components/modals/defectSubmissionModal";

const DefectResolution = function () {
  const { defectSubmissions }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const { project_id }: any = useParams();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  let isInit = false;

  useEffect(() => {
    if (!isInit) {
      dispatch(
        getAllDefectResolutionReducer({
          projectId: project_id,
        })
      );
      isInit = true;
    }
  }, [isOpen]);

  const getStatus = (value) => {
    return value
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
  };

  return (
    <div className="grid grid-cols-4 gap-3  p-5 max-sm:grid-cols-1">
      {/* {!isIdle && (
        <div className="fixed z-50 flex h-screen w-full items-center bg-white/30 backdrop-blur-sm">
          <div role="status" className="ml-[37%]">
            <svg
              aria-hidden="true"
              className="h-20 w-20 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )} */}
      {defectSubmissions &&
        defectSubmissions.map((def: DefectSumissionType, index: number) => {
          return (
            <div key={index} className="flex w-full flex-col p-5 shadow">
              <div className="flex w-full items-center justify-between">
                <a href="javascript:void(0)">
                  <span className="text-[15px] font-bold">
                    {getStatus(def.status)} (1)
                  </span>
                </a>
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <a>
                      <BsThreeDotsVertical />
                    </a>
                  )}
                >
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(getDefectResolutionByIdReducer(def.id));
                      setOpen(true);
                    }}
                  >
                    View
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className="m-2 overflow-hidden rounded">
                <a href="javascript:void(0)">
                  {" "}
                  <div className="max-h-[180px] min-h-[180px] w-full">
                    <img
                      src={
                        def.images[
                          Math.floor(Math.random() * def.images.length)
                        ]?.url
                      }
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </a>
              </div>
              <div className="flex flex-row">
                <div className="my-1 mr-2 flex items-center rounded-md border border-transparent bg-red-100 px-2.5 py-0.5 text-sm text-red-800 shadow-sm transition-all">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M5 10C4.0111 10 3.0444 9.70675 2.22215 9.15735C1.3999 8.60794 0.759043 7.82705 0.380605 6.91342C0.00216642 5.99979 -0.0968502 4.99445 0.0960758 4.02455C0.289002 3.05465 0.765206 2.16373 1.46447 1.46447C2.16373 0.765206 3.05465 0.289002 4.02455 0.0960758C4.99445 -0.0968502 5.99979 0.00216642 6.91342 0.380605C7.82705 0.759043 8.60794 1.3999 9.15735 2.22215C9.70675 3.0444 10 4.0111 10 5C9.99854 6.32564 9.47129 7.59656 8.53393 8.53393C7.59656 9.47129 6.32564 9.99854 5 10ZM5 1C4.20888 1 3.43552 1.2346 2.77772 1.67412C2.11992 2.11365 1.60723 2.73836 1.30448 3.46927C1.00173 4.20017 0.92252 5.00444 1.07686 5.78036C1.2312 6.55629 1.61216 7.26902 2.17157 7.82843C2.73098 8.38784 3.44372 8.7688 4.21964 8.92314C4.99556 9.07748 5.79983 8.99827 6.53073 8.69552C7.26164 8.39277 7.88635 7.88008 8.32588 7.22228C8.7654 6.56449 9 5.79113 9 5C8.99881 3.9395 8.577 2.92278 7.82711 2.17289C7.07722 1.423 6.0605 1.00119 5 1Z"
                      fill="#9B1C1C"
                    />
                    <path
                      d="M5 6C4.86739 6 4.74022 5.94732 4.64645 5.85355C4.55268 5.75979 4.5 5.63261 4.5 5.5V3C4.5 2.86739 4.55268 2.74022 4.64645 2.64645C4.74022 2.55268 4.86739 2.5 5 2.5C5.13261 2.5 5.25979 2.55268 5.35355 2.64645C5.44732 2.74022 5.5 2.86739 5.5 3V5.5C5.5 5.63261 5.44732 5.75979 5.35355 5.85355C5.25979 5.94732 5.13261 6 5 6Z"
                      fill="#9B1C1C"
                    />
                    <path
                      d="M5 7.5C5.27614 7.5 5.5 7.27614 5.5 7C5.5 6.72386 5.27614 6.5 5 6.5C4.72386 6.5 4.5 6.72386 4.5 7C4.5 7.27614 4.72386 7.5 5 7.5Z"
                      fill="#9B1C1C"
                    />
                  </svg>
                  <span className="text-[12px]">{def.subStatus}</span>
                </div>
              </div>
              <div className="mt-2 flex flex-col">
                <span className="text-[14px] font-semibold">
                  {def.property.project?.address}
                </span>
                <span className="text-[12px] text-gray-400">
                  Defect Code:{" "}
                  <span className="font-semibold text-black">
                    {`${def.defectCode.defectCode}, ${def.defectCode.defectName}`}
                  </span>
                </span>
                <span className="text-[12px] text-gray-400">
                  {/* {def.property.tower}: <span className="text-black">{org.towerA}</span> */}
                </span>
              </div>
              <br />
              <hr />
              <br />
              <div className="grid grid-cols-3 grid-rows-2 gap-1">
                <span className="text-[12px] text-gray-400">Type</span>
                <span className="text-[12px] text-gray-400">Logged by</span>
                <span className="text-[12px] text-gray-400">Date</span>
                <span className="text-[12px] font-semibold">
                  {getStatus(def.propertyStatus)}
                </span>
                <span className="text-[12px] font-semibold">
                  {getStatus(def.submittedBy)}
                </span>
                <span className="text-[12px] font-semibold">
                  {moment(def.createdAt).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
          );
        })}
      <DefectSubmissionModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};

export default DefectResolution;
