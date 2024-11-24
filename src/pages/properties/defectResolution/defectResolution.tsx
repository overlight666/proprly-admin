/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import type { DefectSumissionType, PropertyState } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDefectResolutionReducer } from "../../../store/features/reducers";
import { useParams } from "react-router";
import { DefectSubmissionModal } from "../../../components/modals/defectSubmissionModal";
import { DefectItem } from "./defectItems";
import { DefectFeedbackModal } from "../../../components/modals/defectFeedback";

const DefectResolution = function () {
  const { defectSubmissions }: PropertyState = useSelector(
    (state: any) => state.property
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
  const { project_id }: any = useParams();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [defectId, setDefectId] = useState<any>();
  // let isInit = false;
  let defectInit = false;
  useEffect(() => {
    // if (!isInit) {
    dispatch(
      getAllDefectResolutionReducer({
        projectId: project_id,
      })
    );
    // isInit = true;
    // }
  }, [isOpen]);

  useEffect(() => {
    if (defectSubmissions && defectSubmissions.length) {
      if (!defectInit) {
        const pendings: any = defectSubmissions.filter(
          (d) => d.status === "logged"
        );
        const disputed: any = defectSubmissions.filter(
          (d) => d.status === "disputed"
        );
        const in_progress: any = defectSubmissions.filter(
          (d) => d.status === "in_progress"
        );
        const resolved: any = defectSubmissions.filter(
          (d) => d.status === "resolved"
        );
        setDisputedDefects(disputed);
        setPendingDefects(pendings);
        setInprogressDefects(in_progress);
        setResolvedDefects(resolved);
        defectInit = true;
      }
    }
  }, [defectSubmissions]);
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
              return <DefectItem key={index} def={defects} setOpen={setOpen} />;
            })}
        </div>
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          In Progress({inprogressDefects.length})
        </span>
        {inprogressDefects &&
          inprogressDefects.map((defects, index) => {
            return <DefectItem key={index} def={defects} setOpen={setOpen} />;
          })}
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          Disputed({disputedDefects.length})
        </span>
        {disputedDefects &&
          disputedDefects.map((defects, index) => {
            return <DefectItem key={index} def={defects} setOpen={setOpen} />;
          })}
      </div>
      <div className="flex min-w-[25%] max-w-[25%] flex-col gap-0">
        <span className="text-[14px] font-bold">
          Resolved({resolvedDefects.length})
        </span>
        {resolvedDefects &&
          resolvedDefects.map((defects, index) => {
            return <DefectItem key={index} def={defects} setOpen={setOpen} />;
          })}
      </div>

      <DefectSubmissionModal
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

export default DefectResolution;
