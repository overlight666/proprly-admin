/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useDispatch } from "react-redux";
import { getDefectResolutionByIdReducer } from "../../../store/features/reducers";
import type { DefectSumissionType } from "../../../types";
import defaultImg from "../../../../public/images/default.jpg";
interface paramstype {
  def: DefectSumissionType;
  setOpen: any;
}
export const DefectItem = function ({ def, setOpen }: paramstype) {
  const dispatch = useDispatch();
  const getStatus = (value) => {
    return value
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
  };

  const textColoring = (defectSubStatus, hasBg) => {
    if (
      defectSubStatus == "Tradesman to be organised" ||
      defectSubStatus == "Materials & Tradesman to be organised"
    ) {
      return hasBg ? "text-yellow-800 bg-yellow-100" : "text-yellow-400";
    } else if (defectSubStatus == "Defect logged") {
      return hasBg ? "text-red-800 bg-red-100" : "text-red-400";
    }
  };
  return (
    <div
      className="my-2 flex w-full flex-col p-5 shadow"
      onClick={() => {
        dispatch(getDefectResolutionByIdReducer(def.id));
        setOpen(true);
      }}
    >
      <div className="m-2 flex items-center justify-center overflow-hidden rounded">
        {/* <a href="javascript:void(0)"> */}
        <div className="flex max-h-[180px] min-h-[180px] items-center justify-center overflow-hidden">
          <img
            src={
              def.images[Math.floor(Math.random() * def.images.length)]?.url ||
              defaultImg
            }
            alt=""
            className="min-h-[180px] w-full object-fill"
          />
        </div>
        {/* </a> */}
      </div>
      <div className="flex flex-row">
        <div
          className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm text-red-800 shadow-sm transition-all ${textColoring(
            def.subStatus,
            true
          )}`}
        >
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
          <span className={`text-[14px]`}>{def.subStatus}</span>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <span className="text-[14px] font-semibold">
          {`Unit ${def.property.unitNo}, ${def.checklistZone.name} - ${def.checklistElement?.name}`}
        </span>
        <span className="text-[14px] text-gray-400">
          Defect Code:{" "}
          <span className="font-semibold text-black">
            {`${def.defectCode.defectCode}, ${def.defectCode.defectName}`}
          </span>
        </span>
        <span className="text-[14px] text-gray-400">
          {/* {def.property.tower}: <span className="text-black">{org.towerA}</span> */}
        </span>
      </div>
      <br />
      <hr />
      <br />
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        <span className="text-[14px] text-gray-400">Type</span>
        <span className="text-[14px] text-gray-400">Logged by</span>
        <span className="text-[14px] text-gray-400">Date</span>
        <span className="text-[14px] font-semibold">
          {getStatus(def.propertyStatus)}
        </span>
        <span className="text-[14px] font-semibold">
          {getStatus(def.submittedBy)}
        </span>
        <span className="text-[14px] font-semibold">
          {moment(def.createdAt).format("DD MMM YYYY")}
        </span>
      </div>
    </div>
  );
};
