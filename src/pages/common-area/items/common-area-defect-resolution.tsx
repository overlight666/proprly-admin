/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import type {
  DefectSumissionType,
  ProjectState,
  PropertyState,
} from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getAllDefectResolutionReducer } from "../../../store/features/reducers";
// import { useParams } from "react-router";
import { DefectFeedbackModal } from "../../../components/modals/defectFeedback";
import { CommonAreaDefectItem } from "./common-area-defect-items";
import {
  getCommonAreaByProjectReducer,
  getCommonAreaDefectResolutionReducer,
} from "../../../store/features/reducers";
import { useParams } from "react-router";
import { CommonAreaDefectSubmittionModal } from "../../../components/modals/commonAreaDefectSubmissionModal";
// import { clearSubmittion } from "../../../store/features/propertySlice";

const CommonAreaDefectResolution = function () {
  const { feedbackResponse, commonAreaDefectSubmissions }: PropertyState =
    useSelector((state: any) => state.property);
  const { commonAreaItem }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const [pendingDefects, setPendingDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [inprogressDefects, setInprogressDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [disputedDefects, setDisputedDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [resolvedDefects, setResolvedDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const { project_id, common_area_id }: any = useParams();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [defectId, setDefectId] = useState<any>();
  // let isInit = false;
  let defectInit = false;

  useEffect(() => {
    if (common_area_id) {
      dispatch(getCommonAreaDefectResolutionReducer(common_area_id));
    } else {
      dispatch(getCommonAreaByProjectReducer(project_id));
    }
  }, []);

  useEffect(() => {
    if (commonAreaItem && !common_area_id) {
      dispatch(getCommonAreaDefectResolutionReducer(commonAreaItem.id));
    }
  }, [commonAreaItem]);

  useEffect(() => {
    // if (feedbackResponse) {
    //   dispatch(
    //     getAllDefectResolutionReducer({
    //       projectId: project_id,
    //     })
    //   );
    //   dispatch(clearSubmittion());
    // }
  }, [feedbackResponse]);

  useEffect(() => {
    if (commonAreaDefectSubmissions && commonAreaDefectSubmissions.length) {
      if (!defectInit) {
        const pendings: any = commonAreaDefectSubmissions.filter(
          (d) => d.status === "logged"
        );
        const disputed: any = commonAreaDefectSubmissions.filter(
          (d) => d.status === "disputed"
        );
        const in_progress: any = commonAreaDefectSubmissions.filter(
          (d) => d.status === "in_progress"
        );
        const resolved: any = commonAreaDefectSubmissions.filter(
          (d) => d.status === "resolved"
        );
        setDisputedDefects(disputed);
        setPendingDefects(pendings);
        setInprogressDefects(in_progress);
        setResolvedDefects(resolved);
        defectInit = true;
      }
    }
  }, [commonAreaDefectSubmissions]);
  return (
    <div className="flex flex-row gap-2 px-5">
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          Pending({pendingDefects.length})
        </span>
        <div className="flex flex-col gap-0">
          {pendingDefects &&
            pendingDefects.length > 0 &&
            pendingDefects.map((defects, index) => {
              return (
                <CommonAreaDefectItem
                  key={index}
                  def={defects}
                  setOpen={setOpen}
                />
              );
            })}
        </div>
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          In Progress({inprogressDefects.length})
        </span>
        {inprogressDefects &&
          inprogressDefects.map((defects, index) => {
            return (
              <CommonAreaDefectItem
                key={index}
                def={defects}
                setOpen={setOpen}
              />
            );
          })}
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          Disputed({disputedDefects.length})
        </span>
        {disputedDefects &&
          disputedDefects.map((defects, index) => {
            return (
              <CommonAreaDefectItem
                key={index}
                def={defects}
                setOpen={setOpen}
              />
            );
          })}
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          Resolved({resolvedDefects.length})
        </span>
        {resolvedDefects &&
          resolvedDefects.map((defects, index) => {
            return (
              <CommonAreaDefectItem
                key={index}
                def={defects}
                setOpen={setOpen}
              />
            );
          })}
      </div>

      <CommonAreaDefectSubmittionModal
        setFeedbackTitle={setFeedbackTitle}
        setDefectId={setDefectId}
        isOpen={isOpen}
        setOpen={setOpen}
        setFeedbackOpen={setFeedbackOpen}
        setFeedback={setFeedback}
      />
      <DefectFeedbackModal
        feedback={feedback}
        defectId={defectId}
        title={feedbackTitle}
        isOpen={isFeedbackOpen}
        setOpen={setFeedbackOpen}
      />
    </div>
  );
};

export default CommonAreaDefectResolution;
