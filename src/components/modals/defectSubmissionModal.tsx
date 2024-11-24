/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import type {
  AppState,
  PropertyState,
  ReducerTypes,
  Roles,
  userData,
  UserState,
} from "../../types";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import moment from "moment";

export const DefectSubmissionModal = function (props: any) {
  const {
    isOpen,
    setOpen,
    setFeedbackOpen,
    setFeedbackTitle,
    setDefectId,
    setFeedback,
  } = props;
  const { defect }: PropertyState = useSelector((state: any) => state.property);
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);
  const { config }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const getStatus = (value) => {
    let val = "";
    try {
      val =
        value &&
        value
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
    } catch (error) {
      val = "";
    }
    return val;
  };

  const textColoring = (defectSubStatus, hasBg) => {
    if (
      defectSubStatus == "Tradesman to be organised" ||
      defectSubStatus == "Materials & Tradesman to be organised" ||
      defectSubStatus == "Materials to be organised" ||
      defectSubStatus == "Pending Auditor feedback" ||
      defectSubStatus == "Resolution Rejected by Auditor" ||
      defectSubStatus == "Defect Re-opened By Auditor" ||
      defectSubStatus == "Pending Owner feedback" ||
      defectSubStatus == "Defect Re-opened" ||
      defectSubStatus == "Owner not at home" ||
      defectSubStatus == "Defect Accepted by Admin"
    ) {
      return hasBg ? "text-yellow-800 bg-yellow-100" : "text-yellow-400";
    } else if (
      defectSubStatus == "Defect Logged" ||
      defectSubStatus == "Pending Admin feedback" ||
      defectSubStatus == "Pending Admin Approval" ||
      defectSubStatus == "Pending Admin Feedback"
    ) {
      return hasBg ? "text-red-800 bg-red-100" : "text-red-400";
    } else if (
      defectSubStatus == "Defect Resolved" ||
      defectSubStatus == "Resolution Accepted by Auditor" ||
      defectSubStatus == "Resolution Accepted By Owner" ||
      defectSubStatus == "Defect Closed" ||
      defectSubStatus == "Defect Rejected by Admin"
    ) {
      return hasBg ? "text-green-800 bg-green-100" : "text-green-400";
    } else if (
      defectSubStatus == "Defect Resolution Disputed by Owner" ||
      defectSubStatus == "Warranty Issue" ||
      defectSubStatus == "Owner Defect" ||
      defectSubStatus == "Not a Defect"
    ) {
      return hasBg ? "text-cyan-800 bg-cyan-100" : "text-cyan-400";
    }
  };

  const getIcons = (defectSubStatus) => {
    if (
      defectSubStatus == "Tradesman to be organised" ||
      defectSubStatus == "Materials & Tradesman to be organised" ||
      defectSubStatus == "Materials to be organised" ||
      defectSubStatus == "Pending Auditor feedback" ||
      defectSubStatus == "Resolution Rejected by Auditor" ||
      defectSubStatus == "Defect Re-opened By Auditor" ||
      defectSubStatus == "Pending Owner feedback" ||
      defectSubStatus == "Defect Re-opened" ||
      defectSubStatus == "Owner not at home" ||
      defectSubStatus == "Defect Accepted by Admin"
    ) {
      return (
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10.6719C4.0111 10.6719 3.0444 10.3786 2.22215 9.82922C1.39991 9.27982 0.759043 8.49892 0.380605 7.58529C0.00216642 6.67166 -0.0968502 5.66633 0.0960758 4.69643C0.289002 3.72652 0.765206 2.83561 1.46447 2.13634C2.16373 1.43708 3.05465 0.960877 4.02455 0.767951C4.99446 0.575025 5.99979 0.674041 6.91342 1.05248C7.82705 1.43092 8.60794 2.07178 9.15735 2.89403C9.70675 3.71627 10 4.68297 10 5.67188C9.99854 6.99751 9.47129 8.26844 8.53393 9.2058C7.59656 10.1432 6.32564 10.6704 5 10.6719ZM5 1.67188C4.20888 1.67188 3.43552 1.90647 2.77772 2.346C2.11992 2.78552 1.60723 3.41024 1.30448 4.14114C1.00173 4.87205 0.92252 5.67631 1.07686 6.45224C1.2312 7.22816 1.61216 7.94089 2.17157 8.5003C2.73098 9.05971 3.44372 9.44068 4.21964 9.59502C4.99556 9.74936 5.79983 9.67014 6.53073 9.36739C7.26164 9.06464 7.88635 8.55195 8.32588 7.89416C8.7654 7.23636 9 6.463 9 5.67188C8.99881 4.61138 8.577 3.59465 7.82711 2.84477C7.07722 2.09488 6.0605 1.67307 5 1.67188Z"
            fill="#723B13"
          />
          <path
            d="M5 6.17188C4.86739 6.17188 4.74022 6.1192 4.64645 6.02543C4.55268 5.93166 4.5 5.80448 4.5 5.67188V3.67188C4.5 3.53927 4.55268 3.41209 4.64645 3.31832C4.74022 3.22456 4.86739 3.17188 5 3.17188C5.13261 3.17188 5.25979 3.22456 5.35355 3.31832C5.44732 3.41209 5.5 3.53927 5.5 3.67188V5.67188C5.5 5.80448 5.44732 5.93166 5.35355 6.02543C5.25979 6.1192 5.13261 6.17188 5 6.17188Z"
            fill="#723B13"
          />
          <path
            d="M6.6375 7.80938C6.5049 7.80935 6.37775 7.75665 6.284 7.66288L4.64645 6.02543C4.55537 5.93113 4.50503 5.80477 4.50616 5.67368C4.5073 5.54258 4.55989 5.41717 4.65259 5.32447C4.7453 5.23176 4.8707 5.17918 5.0018 5.17804C5.1329 5.1769 5.2592 5.2273 5.3535 5.31838L6.991 6.95588C7.06091 7.0258 7.10851 7.11488 7.12779 7.21186C7.14708 7.30884 7.13717 7.40935 7.09934 7.5007C7.0615 7.59205 6.99743 7.67013 6.91523 7.72508C6.83303 7.78002 6.73638 7.80935 6.6375 7.80938Z"
            fill="#723B13"
          />
        </svg>
      );
    } else if (
      defectSubStatus == "Defect Logged" ||
      defectSubStatus == "Pending Admin feedback" ||
      defectSubStatus == "Pending Admin Approval" ||
      defectSubStatus == "Pending Admin Feedback"
    ) {
      return (
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
      );
    } else if (
      defectSubStatus == "Defect Resolved" ||
      defectSubStatus == "Resolution Accepted by Auditor" ||
      defectSubStatus == "Resolution Accepted By Owner" ||
      defectSubStatus == "Defect Closed" ||
      defectSubStatus == "Defect Rejected by Admin"
    ) {
      return (
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5635 4.61872L9.1175 4.17221C9.0235 4.07821 8.9715 3.95321 8.9715 3.8207V3.18919C8.9715 2.36767 8.3035 1.69965 7.482 1.69965H6.8505C6.72 1.69965 6.592 1.64665 6.4995 1.55415L6.053 1.10764C5.472 0.526621 4.5275 0.526621 3.947 1.10764L3.5005 1.55365C3.408 1.64615 3.28 1.69915 3.1495 1.69915H2.5175C1.696 1.69915 1.028 2.36717 1.028 3.18869V3.8202C1.028 3.95271 0.976 4.07771 0.8825 4.17171L0.4365 4.61822C0.155 4.89973 0 5.27374 0 5.67175C0 6.06976 0.155 6.44377 0.4365 6.72478L0.8825 7.17129C0.9765 7.26529 1.0285 7.39029 1.0285 7.5228V8.15431C1.0285 8.97583 1.6965 9.64385 2.518 9.64385H3.1495C3.28 9.64385 3.408 9.69685 3.5005 9.78935L3.947 10.2364C4.2375 10.5264 4.6185 10.6719 5 10.6719C5.381 10.6719 5.7625 10.5269 6.053 10.2364L6.4995 9.78985C6.592 9.69735 6.72 9.64435 6.8505 9.64435H7.482C8.3035 9.64435 8.9715 8.97633 8.9715 8.15481V7.5233C8.9715 7.39079 9.0235 7.26579 9.1175 7.17179L9.5635 6.72578C9.845 6.44377 10 6.06976 10 5.67175C10 5.27374 9.845 4.89973 9.5635 4.61872ZM8.8615 6.02276L8.415 6.46927C8.134 6.75078 7.9785 7.12479 7.9785 7.5223V8.15381C7.9785 8.42732 7.756 8.65033 7.482 8.65033H6.8505C6.453 8.65033 6.0785 8.80533 5.7975 9.08684L5.351 9.53335C5.157 9.72735 4.843 9.72685 4.649 9.53335L4.2025 9.08684C3.9215 8.80533 3.547 8.65033 3.1495 8.65033H2.5175C2.2435 8.65033 2.021 8.42732 2.021 8.15381V7.5223C2.021 7.12479 1.8665 6.75078 1.5845 6.46877L1.138 6.02176C1.0445 5.92876 0.993 5.80425 0.993 5.67175C0.993 5.53925 1.0445 5.41474 1.1385 5.32074L1.5855 4.87373C1.8665 4.59222 2.0215 4.21821 2.0215 3.8207V3.18919C2.0215 2.91568 2.244 2.69268 2.518 2.69268H3.1495C3.547 2.69268 3.9215 2.53767 4.2025 2.25616L4.649 1.80965C4.843 1.61615 5.157 1.61615 5.351 1.80965L5.7975 2.25616C6.0785 2.53767 6.453 2.69268 6.8505 2.69268H7.482C7.756 2.69268 7.9785 2.91568 7.9785 3.18919V3.8207C7.9785 4.21821 8.133 4.59222 8.415 4.87423L8.8615 5.32124C8.9555 5.41474 9.007 5.53925 9.007 5.67225C9.007 5.80525 8.9555 5.92876 8.8615 6.02276Z"
            fill="#03543F"
          />
          <path
            d="M6.7225 4.25571L4.0635 6.02826L3.3535 5.31824C3.158 5.12274 2.842 5.12274 2.6465 5.31824C2.451 5.51375 2.451 5.82975 2.6465 6.02526L3.6465 7.02528C3.743 7.12179 3.871 7.17179 4 7.17179C4.096 7.17179 4.193 7.14429 4.2775 7.08779L7.2775 5.08774C7.5075 4.93473 7.5695 4.62422 7.416 4.39422C7.263 4.16421 6.953 4.10221 6.7225 4.25571Z"
            fill="#03543F"
          />
        </svg>
      );
    } else if (
      defectSubStatus == "Defect Resolution Disputed by Owner" ||
      defectSubStatus == "Warranty Issue" ||
      defectSubStatus == "Owner Defect" ||
      defectSubStatus == "Not a Defect"
    ) {
      return (
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10.6719C4.0111 10.6719 3.0444 10.3786 2.22215 9.82922C1.3999 9.27982 0.759043 8.49892 0.380605 7.58529C0.00216642 6.67166 -0.0968502 5.66633 0.0960758 4.69643C0.289002 3.72652 0.765206 2.83561 1.46447 2.13634C2.16373 1.43708 3.05465 0.960877 4.02455 0.767951C4.99445 0.575025 5.99979 0.674041 6.91342 1.05248C7.82705 1.43092 8.60794 2.07178 9.15735 2.89403C9.70675 3.71627 10 4.68297 10 5.67188C9.99854 6.99751 9.47129 8.26844 8.53393 9.2058C7.59656 10.1432 6.32564 10.6704 5 10.6719ZM5 1.67188C4.20888 1.67188 3.43552 1.90647 2.77772 2.346C2.11992 2.78552 1.60723 3.41024 1.30448 4.14114C1.00173 4.87205 0.92252 5.67631 1.07686 6.45224C1.2312 7.22816 1.61216 7.94089 2.17157 8.5003C2.73098 9.05971 3.44372 9.44068 4.21964 9.59502C4.99556 9.74936 5.79983 9.67014 6.53073 9.36739C7.26164 9.06464 7.88635 8.55195 8.32588 7.89416C8.7654 7.23636 9 6.463 9 5.67188C8.99881 4.61138 8.577 3.59465 7.82711 2.84477C7.07722 2.09488 6.0605 1.67307 5 1.67188Z"
            fill="#1E429F"
          />
          <path
            d="M5 7.17188C4.86739 7.17188 4.74022 7.1192 4.64645 7.02543C4.55268 6.93166 4.5 6.80448 4.5 6.67188V5.96288C4.5 5.89555 4.51359 5.82891 4.53997 5.76696C4.56634 5.70502 4.60496 5.64904 4.6535 5.60238C4.70167 5.55543 4.75896 5.51887 4.82183 5.49496C4.8847 5.47105 4.95181 5.4603 5.019 5.46338C5.11567 5.46688 5.21204 5.45082 5.30234 5.41615C5.39265 5.38148 5.47501 5.32892 5.5445 5.26163C5.61398 5.19434 5.66916 5.1137 5.70671 5.02456C5.74425 4.93541 5.7634 4.8396 5.763 4.74288C5.77069 4.54396 5.69905 4.35014 5.56384 4.20405C5.42862 4.05796 5.24091 3.97157 5.042 3.96388C4.84309 3.95619 4.64927 4.02783 4.50318 4.16304C4.35709 4.29825 4.27069 4.48596 4.263 4.68488C4.26142 4.75076 4.24664 4.81566 4.21955 4.87574C4.19245 4.93582 4.15358 4.98985 4.10524 5.03465C4.05691 5.07944 4.00007 5.11409 3.93811 5.13655C3.87615 5.159 3.81032 5.1688 3.7445 5.16538C3.61213 5.16017 3.48723 5.10265 3.39723 5.00543C3.30724 4.90822 3.2595 4.77926 3.2645 4.64688C3.2787 4.32535 3.38128 4.01396 3.56098 3.74696C3.74068 3.47996 3.99053 3.26768 4.28305 3.13348C4.57557 2.99927 4.89944 2.94833 5.21904 2.98626C5.53864 3.02419 5.84158 3.14952 6.09457 3.34847C6.34755 3.54741 6.54078 3.81227 6.65299 4.11392C6.7652 4.41556 6.79205 4.74231 6.7306 5.05823C6.66914 5.37415 6.52175 5.667 6.30465 5.90458C6.08754 6.14216 5.80912 6.31527 5.5 6.40488V6.67188C5.5 6.80448 5.44732 6.93166 5.35355 7.02543C5.25979 7.1192 5.13261 7.17188 5 7.17188Z"
            fill="#1E429F"
          />
          <path
            d="M5 8.67188C5.27614 8.67188 5.5 8.44802 5.5 8.17188C5.5 7.89573 5.27614 7.67188 5 7.67188C4.72386 7.67188 4.5 7.89573 4.5 8.17188C4.5 8.44802 4.72386 8.67188 5 8.67188Z"
            fill="#1E429F"
          />
        </svg>
      );
    }
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="7xl">
        <Modal.Body>
          {(!defect && (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )) || (
            <div className="flex !max-h-[600px] flex-col overflow-hidden">
              <div className="relative flex w-full flex-row justify-between">
                <div
                  className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${textColoring(defect?.subStatus, true)}
                    `}
                >
                  {getIcons(defect?.subStatus)}
                  <span className="text-[12px]">{defect?.subStatus}</span>
                </div>
                <a onClick={() => setOpen(!isOpen)}>
                  <AiOutlineClose />
                </a>
              </div>
              <div className="relative grid !max-h-[550px] auto-rows-min grid-cols-3 gap-5 overflow-auto pb-10">
                <div className="col-span-2 flex flex-col">
                  <div className="col-span-2 col-start-1 row-start-1">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard1(!showCard1)}
                    >
                      <h1 className="font-bold">Defect Information</h1>
                      {showCard1 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard1 && (
                      <div className="grid auto-rows-min grid-cols-3 gap-4 pt-5">
                        <div className="flex flex-col">
                          <Label htmlFor="lotno">Lot No</Label>
                          <TextInput
                            disabled={true}
                            id="lotno"
                            name="lotno"
                            value={defect?.property.lotNo}
                            placeholder="Enter lotno"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="unitNo">Unit No</Label>
                          <TextInput
                            disabled={true}
                            id="unitNo"
                            name="unitNo"
                            value={defect?.property.unitNo}
                            placeholder="Enter unitNo"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="zone">Zone</Label>
                          <TextInput
                            disabled={true}
                            id="zone"
                            name="zone"
                            value={defect?.checklistZone.name}
                            placeholder="Enter Zone"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="element">Element</Label>
                          <TextInput
                            disabled={true}
                            id="element"
                            name="element"
                            value={defect?.checklistElement.name}
                            placeholder="Enter element"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="defectcode">Defect Code</Label>
                          <TextInput
                            disabled={true}
                            id="defectcode"
                            name="defectcode"
                            value={defect?.defectCode.defectCode}
                            placeholder="Enter defectcode"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="comment">Comment</Label>
                          <TextInput
                            disabled={true}
                            id="comment"
                            name="comment"
                            value={defect?.comment}
                            placeholder="N/A"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="logged">Logged By</Label>
                          <TextInput
                            disabled={true}
                            id="logged"
                            name="logged"
                            value={
                              config?.roles && config.roles.length > 0
                                ? config.roles.find(
                                    (k: Roles) =>
                                      k.id == defect?.submittedUserRoleId
                                  )?.roleName
                                : ""
                            }
                            placeholder="N/A"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="date">Date</Label>
                          <TextInput
                            disabled={true}
                            id="date"
                            name="date"
                            value={moment(defect?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Enter date"
                            required
                          />
                        </div>
                        <div className="col-span-3 row-start-4 flex w-full flex-col">
                          <Label htmlFor="date">Defect Evidence</Label>
                          <div className="flex w-full items-center gap-2 bg-gray-100 ">
                            {defect?.images &&
                              defect?.images.map((img, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="h-full min-w-[25%] max-w-[25%] p-3"
                                  >
                                    <img
                                      src={img.url}
                                      className="h-40 w-40 object-scale-down object-center"
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 col-start-1 row-start-2">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard2(!showCard2)}
                    >
                      <h1 className="font-bold">Property Information</h1>
                      {showCard2 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard2 && (
                      <div className="grid auto-rows-min grid-cols-3 gap-4 pt-5">
                        <div className="flex flex-col">
                          <Label htmlFor="status">Property Status</Label>
                          <TextInput
                            disabled={true}
                            id="status"
                            name="status"
                            value={getStatus(defect?.property.status)}
                            placeholder="Enter status"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="tower">Tower</Label>
                          <TextInput
                            disabled={true}
                            id="tower"
                            name="tower"
                            value={defect?.property.projectTower?.name}
                            placeholder="Enter tower"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="floor">Floor</Label>
                          <TextInput
                            disabled={true}
                            id="floor"
                            name="floor"
                            value={defect?.property.floor}
                            placeholder="Enter Zone"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="bedroom">Bedroom</Label>
                          <TextInput
                            disabled={true}
                            id="bedroom"
                            name="bedroom"
                            value={defect?.property.bedroom}
                            placeholder="Enter bedroom"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="bathroom">Bathroom</Label>
                          <TextInput
                            disabled={true}
                            id="bathroom"
                            name="bathroom"
                            value={defect?.property.bathroom}
                            placeholder="Enter bathroom"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="ensuite">Ensuite</Label>
                          <TextInput
                            disabled={true}
                            id="ensuite"
                            name="ensuite"
                            value={defect?.property.ensuite}
                            placeholder="Enter ensuite"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="study">Study Room</Label>
                          <TextInput
                            disabled={true}
                            id="study"
                            name="study"
                            value={defect?.property.studyRoom}
                            placeholder="Enter study"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="storage">Storage</Label>
                          <TextInput
                            disabled={true}
                            id="storage"
                            name="storage"
                            value={defect?.property.storage}
                            placeholder="Enter storage"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="parking">Parking Space</Label>
                          <TextInput
                            disabled={true}
                            id="parking"
                            name="parking"
                            value={defect?.property.parkingSpaces}
                            placeholder="Enter parking"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="internal">
                            Internal Area (m
                            <span className="align-super">2</span>)
                          </Label>
                          <TextInput
                            disabled={true}
                            id="internal"
                            name="internal"
                            value={defect?.property.internalArea}
                            placeholder="Enter internal"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="external">
                            External Area (m
                            <span className="align-super">2</span>)
                          </Label>
                          <TextInput
                            disabled={true}
                            id="external"
                            name="external"
                            value={defect?.property.externalArea}
                            placeholder="Enter external"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 col-start-1 row-start-3 pb-10">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard3(!showCard3)}
                    >
                      <h1 className="font-bold">Owner Information</h1>
                      {showCard3 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard3 && (
                      <Table>
                        <Table.Head>
                          <Table.HeadCell>FULLNAME</Table.HeadCell>
                          <Table.HeadCell>PHONE</Table.HeadCell>
                          <Table.HeadCell>EMAIL ADDRESS</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {defect?.property.user &&
                            defect?.property.user.map((u: userData, index) => {
                              return (
                                <Table.Row key={index}>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                    {u.fullName}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {u.mobile}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                                    {u.email}
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                        </Table.Body>
                      </Table>
                    )}
                  </div>
                </div>

                <div className="col-start-3 row-span-2 row-start-1">
                  <div className="bg-gray-100 p-4">
                    <span className="text-[14px] font-semibold">
                      Activity Log
                    </span>
                    <div className="flex flex-col">
                      {defect?.activityLogs &&
                        defect.activityLogs.map((activity, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex flex-col pr-5 ${
                                index == 0 && "pt-5"
                              }`}
                            >
                              <div
                                className={`relative flex flex-col border-l-2 border-gray-200 ${
                                  index > 0 ? "py-3" : "pb-3"
                                } pl-5`}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 12 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`absolute left-[-8px] ${
                                    index > 0 ? "top-4" : ""
                                  }`}
                                >
                                  <path
                                    d="M11.5 5.35953C11.5 7.88636 9.10776 10.053 6 10.053C2.89224 10.053 0.5 7.88636 0.5 5.35953C0.5 2.83271 2.89224 0.666046 6 0.666046C9.10776 0.666046 11.5 2.83271 11.5 5.35953Z"
                                    fill="#E5E7EB"
                                    stroke="white"
                                  />
                                </svg>

                                <span
                                  className={`text-[14px] font-bold ${
                                    index == 0 && "mt-[-4px]"
                                  }`}
                                >
                                  {config &&
                                    config?.roles &&
                                    config.roles.find(
                                      (c) => c.id == activity?.loggedUserRoleId
                                    )?.roleName}
                                </span>
                                <div className="flex">
                                  <div
                                    className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                                  ${textColoring(
                                    activity.defectSubStatus,
                                    true
                                  )}
                                  `}
                                  >
                                    {getIcons(activity.defectSubStatus)}
                                    <span className="text-[12px]">
                                      {activity.defectSubStatus}
                                    </span>
                                  </div>
                                </div>

                                {activity.images &&
                                  activity.images.length > 0 && (
                                    <div className="relative grid auto-rows-auto grid-cols-3 bg-gray-100 p-2">
                                      {activity.images.map((img, index) => {
                                        return (
                                          //   <div
                                          //     key={index}
                                          //     className="h-[50px] min-w-[25%] max-w-[25%] p-3"
                                          //   >
                                          <img
                                            key={index}
                                            src={img.url}
                                            className="h-20 w-20 object-scale-down object-center"
                                          />
                                          //   </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                {activity.comment && (
                                  <span className="text-[12px]">
                                    <span className="font-semibold">
                                      Comment
                                    </span>
                                    : {activity.comment}
                                  </span>
                                )}
                                <span className="text-[12px]">
                                  {moment(activity.createdAt).format(
                                    "MMM DD, YYYY h:mm a"
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  {defect?.activityLogs &&
                    defect?.activityLogs[defect?.activityLogs.length - 1]
                      ?.userRole.roleName == "Owner" && (
                      <div className="flex gap-3">
                        <Button
                          color="primary"
                          onClick={() => {
                            setOpen(false);
                            setDefectId(defect.id);
                            setFeedbackOpen(true);
                            setFeedback("accept");
                            setFeedbackTitle("Accept Defect");
                          }}
                        >
                          <div className="flex items-center gap-x-2">
                            Accept Defect
                          </div>
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => {
                            setOpen(false);
                            setDefectId(defect.id);
                            setFeedbackOpen(true);
                            setFeedback("reject");
                            setFeedbackTitle("Reject Defect");
                          }}
                        >
                          Reject Defect
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
