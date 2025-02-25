/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, Radio, Timeline, useTheme } from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import Chart from "react-apexcharts";
import { HiCalendar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getAllDefectResolutionByCommonAreaReducer,
  getDashboardOrganizationReducer,
  getDefectResolutionByIdReducer,
  getNotificationsByOrganizationReducer,
} from "../../store/features/reducers";
import type {
  AppState,
  DashboardData,
  ProjectState,
  PropertyState,
  ReducerTypes,
  TradeVariables,
} from "../../types";
// import { MdBrokenImage } from "react-icons/md";
import moment from "moment";
import { MdBrokenImage } from "react-icons/md";
import { CommonAreaDefectSubmittionModal } from "../../components/modals/commonAreaDefectSubmissionModal";
import { DefectFeedbackModal } from "../../components/modals/defectFeedback";
import { DefectSubmissionModal } from "../../components/modals/defectSubmissionModal";

const Dashboard: FC = function () {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { commonAreaItem }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const { defect }: PropertyState = useSelector((state: any) => state.property);
  const [showOnly2, setShowOnly2] = useState("all");
  const [actionTrigger, setActionTrigger] = useState(false);
  const [showOnly3, setShowOnly3] = useState("all");
  const [timelineFilter, setTimelineFilter] = useState("all");

  const [openCommonAreaModal, setOpenCommonAreaModal] = useState(false);
  const [openPropertyAreaModal, setOpenPropertyAreaModal] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [defectId, setDefectId] = useState<any>();

  const { orgNotifications, organizationDashboard }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );

  useEffect(() => {
    dispatch(getDashboardOrganizationReducer(id));
    dispatch(getNotificationsByOrganizationReducer(id));
  }, []);

  useEffect(() => {
    if (commonAreaItem) {
      dispatch(getAllDefectResolutionByCommonAreaReducer(commonAreaItem.id));
    }
  }, [commonAreaItem]);

  const sumValues = (obj) =>
    Object.values(obj).reduce((a: any, b: any) => a + b);

  const checkIsValid = (d: TradeVariables) => {
    try {
      const sum: any = sumValues(d);
      return sum > 0 ? true : false;
    } catch (error) {
      return false;
    }
  };

  const NeedAction = (id) => {
    dispatch(getDefectResolutionByIdReducer(id));
    setDefectId(id);
    setActionTrigger(true);
  };

  useEffect(() => {
    if (defect && actionTrigger) {
      setActionTrigger(false);
      if (defect && defect.property) {
        setOpenPropertyAreaModal(true);
      } else {
        setOpenCommonAreaModal(true);
      }
    }
  }, [defect]);

  return (
    <div className="flex flex-col">
      <div className="grid gap-2 p-5 sm:grid-cols-1 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-5">
          <div className="flex items-center">
            <div className="grid grid-rows-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.133 10.5322V8.73221C16.1327 7.25495 15.6214 5.82329 14.6858 4.68008C13.7502 3.53687 12.448 2.75251 11 2.46006V1.00002C11 0.734801 10.8946 0.480441 10.7071 0.2929C10.5196 0.10536 10.2652 0 10 0C9.73478 0 9.48043 0.10536 9.29289 0.2929C9.10536 0.480441 9 0.734801 9 1.00002V2.46006C7.55202 2.75251 6.24978 3.53687 5.3142 4.68008C4.37862 5.82329 3.86731 7.25495 3.867 8.73221V10.3182C3.86724 10.3888 3.87461 10.4592 3.889 10.5282H3.867C3.85187 11.3572 3.51222 12.1471 2.921 12.7283C2.38423 13.2545 2.05692 13.9578 2 14.7073C2 15.2504 2 16.9004 3.539 16.9004H5.746C6.03584 17.8007 6.60385 18.5859 7.36829 19.1429C8.13273 19.6999 9.05417 20 10 20C10.9458 20 11.8673 19.6999 12.6317 19.1429C13.3961 18.5859 13.9642 17.8007 14.254 16.9004H16.461C18 16.9004 18 15.2504 18 14.7073C17.9428 13.9582 17.6156 13.2552 17.079 12.7293C16.4885 12.1488 16.1489 11.3601 16.133 10.5322ZM10 18.0004C9.59332 18 9.19299 17.8994 8.83441 17.7076C8.47582 17.5157 8.17001 17.2385 7.944 16.9004H12.056C11.83 17.2385 11.5242 17.5157 11.1656 17.7076C10.807 17.8994 10.4067 18 10 18.0004ZM16 14.9003H4C4 14.8333 4 14.7643 4 14.7073C4 14.5703 4.25 14.2643 4.47 13.9953C5.35628 13.0586 5.85628 11.8218 5.87 10.5322V8.73221C5.8681 7.61372 6.2954 6.53714 7.06382 5.72442C7.83224 4.9117 8.88319 4.4248 10 4.3641C11.1173 4.42406 12.169 4.91064 12.9381 5.72343C13.7071 6.53623 14.1349 7.61323 14.133 8.73221V10.3182C14.1332 10.3888 14.1406 10.4592 14.155 10.5282H14.133C14.1467 11.8178 14.6467 13.0546 15.533 13.9913C15.753 14.2603 16.003 14.5663 16.003 14.7033C16 14.7643 16 14.8333 16 14.9003Z"
                  fill="#6B7280"
                />
                <path
                  d="M3.293 3.60708C3.4816 3.78925 3.7342 3.89004 3.9964 3.88777C4.2586 3.88549 4.50941 3.78032 4.69482 3.5949C4.88023 3.40949 4.9854 3.15867 4.98767 2.89647C4.98995 2.63427 4.88916 2.38166 4.707 2.19305L3.707 1.19303C3.5184 1.01087 3.2658 0.910069 3.0036 0.912347C2.7414 0.914626 2.49059 1.0198 2.30518 1.20521C2.11977 1.39062 2.0146 1.64144 2.01233 1.90364C2.01005 2.16585 2.11084 2.41845 2.293 2.60706L3.293 3.60708Z"
                  fill="#6B7280"
                />
                <path
                  d="M3 6.90016C3 6.63494 2.89464 6.38058 2.70711 6.19304C2.51957 6.0055 2.26522 5.90014 2 5.90014H1C0.734784 5.90014 0.48043 6.0055 0.292893 6.19304C0.105357 6.38058 0 6.63494 0 6.90016C0 7.16538 0.105357 7.41974 0.292893 7.60729C0.48043 7.79483 0.734784 7.90019 1 7.90019H2C2.26522 7.90019 2.51957 7.79483 2.70711 7.60729C2.89464 7.41974 3 7.16538 3 6.90016Z"
                  fill="#6B7280"
                />
                <path
                  d="M16 3.90009C16.2652 3.90003 16.5195 3.79464 16.707 3.60708L17.707 2.60706C17.8025 2.51481 17.8787 2.40446 17.9311 2.28246C17.9835 2.16045 18.0111 2.02923 18.0123 1.89645C18.0134 1.76366 17.9881 1.63198 17.9378 1.50908C17.8875 1.38618 17.8133 1.27453 17.7194 1.18063C17.6255 1.08674 17.5138 1.01248 17.391 0.962201C17.2681 0.911919 17.1364 0.886617 17.0036 0.887771C16.8708 0.888924 16.7396 0.916511 16.6176 0.968922C16.4956 1.02133 16.3852 1.09752 16.293 1.19303L15.293 2.19305C15.1532 2.33291 15.058 2.51107 15.0194 2.70503C14.9808 2.89899 15.0007 3.10003 15.0763 3.28273C15.152 3.46544 15.2801 3.6216 15.4445 3.73149C15.609 3.84138 15.8022 3.90005 16 3.90009Z"
                  fill="#6B7280"
                />
                <path
                  d="M19 5.90014H18C17.7348 5.90014 17.4804 6.0055 17.2929 6.19304C17.1054 6.38058 17 6.63494 17 6.90016C17 7.16538 17.1054 7.41974 17.2929 7.60729C17.4804 7.79483 17.7348 7.90019 18 7.90019H19C19.2652 7.90019 19.5196 7.79483 19.7071 7.60729C19.8946 7.41974 20 7.16538 20 6.90016C20 6.63494 19.8946 6.38058 19.7071 6.19304C19.5196 6.0055 19.2652 5.90014 19 5.90014Z"
                  fill="#6B7280"
                />
              </svg>
              <span className="text-gray-500">Alerts - Needs Attention</span>
              <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                {(organizationDashboard &&
                  organizationDashboard.needAttention) ||
                  0}
              </span>
              <div className="flex items-center">
                {/* <svg
                  width="8"
                  height="11"
                  viewBox="0 0 8 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19488 1.07086L4.19524 1.0712L7.19063 3.92456C7.23191 3.96638 7.25042 4.01682 7.24999 4.06422C7.24955 4.11249 7.22939 4.16382 7.18551 4.20563C7.14083 4.24818 7.07554 4.27626 7.00253 4.27686C6.93073 4.27745 6.86568 4.25136 6.82007 4.2105L5.10468 2.57645L4.25981 1.77165V2.93848V9.78571C4.25981 9.83449 4.2397 9.88649 4.19532 9.92876C4.15012 9.97181 4.08385 10 4.00996 10C3.93607 10 3.8698 9.97181 3.82461 9.92876C3.78023 9.88649 3.76011 9.83449 3.76011 9.78571V2.93848V1.77235L2.91541 2.5763L1.1945 4.21418L1.19445 4.21412L1.1881 4.22037C1.16619 4.24199 1.13865 4.2605 1.10645 4.27368C1.07422 4.28687 1.03872 4.29411 1.00223 4.29442C0.965733 4.29472 0.930049 4.28806 0.897472 4.27536C0.864927 4.26268 0.836922 4.24455 0.814492 4.22318C0.792114 4.20186 0.775814 4.17787 0.765257 4.15329C0.754729 4.12878 0.74978 4.10343 0.750008 4.07849C0.750235 4.05354 0.755648 4.0282 0.766676 4.00375C0.777737 3.97922 0.794564 3.95537 0.817455 3.93431L0.817506 3.93436L0.823786 3.92838L3.82319 1.0712L3.82355 1.07086C3.84531 1.05009 3.87255 1.03242 3.90426 1.02007L3.90426 1.02007L3.90596 1.01941C3.97167 0.993532 4.04676 0.993532 4.11247 1.01941L4.11247 1.01941L4.11416 1.02007C4.14588 1.03242 4.17312 1.05009 4.19488 1.07086Z"
                    fill="#0E9F6E"
                    stroke="#0E9F6E"
                  />
                </svg> */}
                {/* <span className="mr-1 text-green-500">0%</span>
                <span>vs last 24h </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-5">
          <div className="flex items-center">
            <div className="grid grid-rows-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4H13.443L11.043 0.8C10.8562 0.552123 10.6146 0.350892 10.337 0.212091C10.0594 0.0732899 9.75337 0.000694811 9.443 0H5C4.46957 0 3.96086 0.210714 3.58579 0.585786C3.21071 0.960859 3 1.46957 3 2V3H2C1.46957 3 0.960859 3.21071 0.585786 3.58579C0.210714 3.96086 0 4.46957 0 5V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17H18C18.5304 17 19.0391 16.7893 19.4142 16.4142C19.7893 16.0391 20 15.5304 20 15V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4ZM2 5H6.443L7.943 7H2V5ZM2 18V9H15V18H2ZM18 15H17V9C17 8.46957 16.7893 7.96086 16.4142 7.58579C16.0391 7.21071 15.5304 7 15 7H10.443L8.043 3.8C7.85622 3.55212 7.61456 3.35089 7.33696 3.21209C7.05935 3.07329 6.75337 3.00069 6.443 3H5V2H9.443L12.143 5.6C12.2361 5.7242 12.3569 5.825 12.4958 5.89443C12.6346 5.96386 12.7878 6 12.943 6H18V15Z"
                  fill="#6B7280"
                />
              </svg>

              <span className="text-gray-500">Total Projects</span>
              <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                {organizationDashboard && organizationDashboard?.totalProjects}
              </span>
              <div className="flex items-center">
                {/* <svg
                  width="8"
                  height="11"
                  viewBox="0 0 8 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19488 1.07086L4.19524 1.0712L7.19063 3.92456C7.23191 3.96638 7.25042 4.01682 7.24999 4.06422C7.24955 4.11249 7.22939 4.16382 7.18551 4.20563C7.14083 4.24818 7.07554 4.27626 7.00253 4.27686C6.93073 4.27745 6.86568 4.25136 6.82007 4.2105L5.10468 2.57645L4.25981 1.77165V2.93848V9.78571C4.25981 9.83449 4.2397 9.88649 4.19532 9.92876C4.15012 9.97181 4.08385 10 4.00996 10C3.93607 10 3.8698 9.97181 3.82461 9.92876C3.78023 9.88649 3.76011 9.83449 3.76011 9.78571V2.93848V1.77235L2.91541 2.5763L1.1945 4.21418L1.19445 4.21412L1.1881 4.22037C1.16619 4.24199 1.13865 4.2605 1.10645 4.27368C1.07422 4.28687 1.03872 4.29411 1.00223 4.29442C0.965733 4.29472 0.930049 4.28806 0.897472 4.27536C0.864927 4.26268 0.836922 4.24455 0.814492 4.22318C0.792114 4.20186 0.775814 4.17787 0.765257 4.15329C0.754729 4.12878 0.74978 4.10343 0.750008 4.07849C0.750235 4.05354 0.755648 4.0282 0.766676 4.00375C0.777737 3.97922 0.794564 3.95537 0.817455 3.93431L0.817506 3.93436L0.823786 3.92838L3.82319 1.0712L3.82355 1.07086C3.84531 1.05009 3.87255 1.03242 3.90426 1.02007L3.90426 1.02007L3.90596 1.01941C3.97167 0.993532 4.04676 0.993532 4.11247 1.01941L4.11247 1.01941L4.11416 1.02007C4.14588 1.03242 4.17312 1.05009 4.19488 1.07086Z"
                    fill="#0E9F6E"
                    stroke="#0E9F6E"
                  />
                </svg> */}
                {/* <span className="mr-1 text-green-500">0%</span>
                <span>vs last 24h </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-5">
          <div className="flex items-center">
            <div className="grid grid-rows-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4H13.443L11.043 0.8C10.8562 0.552123 10.6146 0.350892 10.337 0.212091C10.0594 0.0732899 9.75337 0.000694811 9.443 0H5C4.46957 0 3.96086 0.210714 3.58579 0.585786C3.21071 0.960859 3 1.46957 3 2V3H2C1.46957 3 0.960859 3.21071 0.585786 3.58579C0.210714 3.96086 0 4.46957 0 5V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17H18C18.5304 17 19.0391 16.7893 19.4142 16.4142C19.7893 16.0391 20 15.5304 20 15V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4ZM2 5H6.443L7.943 7H2V5ZM2 18V9H15V18H2ZM18 15H17V9C17 8.46957 16.7893 7.96086 16.4142 7.58579C16.0391 7.21071 15.5304 7 15 7H10.443L8.043 3.8C7.85622 3.55212 7.61456 3.35089 7.33696 3.21209C7.05935 3.07329 6.75337 3.00069 6.443 3H5V2H9.443L12.143 5.6C12.2361 5.7242 12.3569 5.825 12.4958 5.89443C12.6346 5.96386 12.7878 6 12.943 6H18V15Z"
                  fill="#6B7280"
                />
              </svg>

              <span className="text-gray-500">Total Properties</span>
              <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                {organizationDashboard?.totalProperties}
              </span>
              <div className="flex items-center">
                {/* <svg
                  width="8"
                  height="11"
                  viewBox="0 0 8 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25333 8.06089V9.22855L5.09838 8.42274L6.81583 6.78505C6.81585 6.78504 6.81586 6.78502 6.81588 6.785C6.86096 6.74206 6.92692 6.71403 7.00039 6.71403C7.07389 6.71403 7.13988 6.74209 7.18495 6.78505L7.52995 6.42315L7.18535 6.78544C7.22969 6.82761 7.24993 6.87962 7.25 6.92856C7.25007 6.9774 7.23006 7.02933 7.18606 7.07154C7.18598 7.07161 7.1859 7.07168 7.18583 7.07176L4.19031 9.92815L4.18995 9.9285C4.16825 9.94924 4.14111 9.96685 4.10953 9.97917L4.10952 9.97915L4.1052 9.98088C4.07417 9.99331 4.04005 10 4.00506 10C3.97006 10 3.93595 9.99331 3.90492 9.98088L3.90492 9.98086L3.90058 9.97917C3.869 9.96685 3.84186 9.94923 3.82016 9.9285L3.8198 9.92816L0.823718 7.07122L0.82377 7.07116L0.81739 7.06529C0.794559 7.04426 0.777748 7.02042 0.766688 6.99587C0.755658 6.97138 0.750235 6.946 0.750008 6.92098C0.74978 6.89597 0.754738 6.87057 0.765268 6.84603C0.775827 6.82142 0.792113 6.79743 0.814434 6.77615C0.836806 6.75482 0.864715 6.73673 0.897118 6.72409C0.929553 6.71144 0.965071 6.70481 1.00139 6.70511C1.0377 6.70541 1.07303 6.71263 1.10513 6.72577C1.13719 6.73891 1.16464 6.75737 1.1865 6.77895L1.18644 6.77901L1.19273 6.785L2.91024 8.42274L3.75529 9.22855V8.06089V1.21423C3.75529 1.1653 3.77545 1.11326 3.81972 1.07105C3.86479 1.02807 3.93079 1 4.00431 1C4.07782 1 4.14382 1.02807 4.18889 1.07105C4.23316 1.11326 4.25333 1.1653 4.25333 1.21423V8.06089Z"
                    fill="#E02424"
                    stroke="#E02424"
                  />
                </svg> */}

                {/* <span className="mr-1 text-red-500">0%</span>
                <span>vs last 24h </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-5">
          <div className="flex items-center">
            <div className="grid grid-rows-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4H13.443L11.043 0.8C10.8562 0.552123 10.6146 0.350892 10.337 0.212091C10.0594 0.0732899 9.75337 0.000694811 9.443 0H5C4.46957 0 3.96086 0.210714 3.58579 0.585786C3.21071 0.960859 3 1.46957 3 2V3H2C1.46957 3 0.960859 3.21071 0.585786 3.58579C0.210714 3.96086 0 4.46957 0 5V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17H18C18.5304 17 19.0391 16.7893 19.4142 16.4142C19.7893 16.0391 20 15.5304 20 15V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4ZM2 5H6.443L7.943 7H2V5ZM2 18V9H15V18H2ZM18 15H17V9C17 8.46957 16.7893 7.96086 16.4142 7.58579C16.0391 7.21071 15.5304 7 15 7H10.443L8.043 3.8C7.85622 3.55212 7.61456 3.35089 7.33696 3.21209C7.05935 3.07329 6.75337 3.00069 6.443 3H5V2H9.443L12.143 5.6C12.2361 5.7242 12.3569 5.825 12.4958 5.89443C12.6346 5.96386 12.7878 6 12.943 6H18V15Z"
                  fill="#6B7280"
                />
              </svg>

              <span className="text-gray-500">Total Open Defects</span>
              <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                {organizationDashboard &&
                  organizationDashboard.totalDefects &&
                  organizationDashboard.totalDefects.total}
              </span>
              <div className="flex items-center">
                {/* <svg
                  width="8"
                  height="11"
                  viewBox="0 0 8 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19488 1.07086L4.19524 1.0712L7.19063 3.92456C7.23191 3.96638 7.25042 4.01682 7.24999 4.06422C7.24955 4.11249 7.22939 4.16382 7.18551 4.20563C7.14083 4.24818 7.07554 4.27626 7.00253 4.27686C6.93073 4.27745 6.86568 4.25136 6.82007 4.2105L5.10468 2.57645L4.25981 1.77165V2.93848V9.78571C4.25981 9.83449 4.2397 9.88649 4.19532 9.92876C4.15012 9.97181 4.08385 10 4.00996 10C3.93607 10 3.8698 9.97181 3.82461 9.92876C3.78023 9.88649 3.76011 9.83449 3.76011 9.78571V2.93848V1.77235L2.91541 2.5763L1.1945 4.21418L1.19445 4.21412L1.1881 4.22037C1.16619 4.24199 1.13865 4.2605 1.10645 4.27368C1.07422 4.28687 1.03872 4.29411 1.00223 4.29442C0.965733 4.29472 0.930049 4.28806 0.897472 4.27536C0.864927 4.26268 0.836922 4.24455 0.814492 4.22318C0.792114 4.20186 0.775814 4.17787 0.765257 4.15329C0.754729 4.12878 0.74978 4.10343 0.750008 4.07849C0.750235 4.05354 0.755648 4.0282 0.766676 4.00375C0.777737 3.97922 0.794564 3.95537 0.817455 3.93431L0.817506 3.93436L0.823786 3.92838L3.82319 1.0712L3.82355 1.07086C3.84531 1.05009 3.87255 1.03242 3.90426 1.02007L3.90426 1.02007L3.90596 1.01941C3.97167 0.993532 4.04676 0.993532 4.11247 1.01941L4.11247 1.01941L4.11416 1.02007C4.14588 1.03242 4.17312 1.05009 4.19488 1.07086Z"
                    fill="#0E9F6E"
                    stroke="#0E9F6E"
                  />
                </svg> */}
                {/* <span className="mr-1 text-green-500">0%</span>
                <span>vs last 24h </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 w-full px-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="flex flex-col">
            <h3 className="my-5 text-xl font-bold leading-none text-gray-900 dark:text-white">
              Timeline
            </h3>
            <fieldset className="my-5 flex flex-row items-center gap-4">
              <span className="text-[14px]">Show only:</span>
              <div className="flex items-center gap-2">
                <Radio
                  id="all"
                  name="timeline"
                  value={timelineFilter}
                  onChange={(e) => setTimelineFilter(e.target.id)}
                  defaultChecked
                />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="need_action"
                  name="timeline"
                  value={timelineFilter}
                  onChange={(e) => setTimelineFilter(e.target.id)}
                />
                <Label htmlFor="need_action">Needs Action</Label>
              </div>
            </fieldset>
            <Timeline className="max-h-[500px] overflow-auto">
              {(orgNotifications &&
                orgNotifications.length > 0 &&
                orgNotifications
                  .filter((notif) =>
                    timelineFilter === "need_action"
                      ? notif.title.toLowerCase() ===
                          "pending admin feedback" ||
                        notif.title.toLowerCase() === "pending admin approval"
                      : notif
                  )
                  .map((notif, index) => {
                    return (
                      <Timeline.Item key={index}>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                          <Timeline.Time>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              <span className="text-[16px]">{notif.title}</span>
                              <div className="ml-5 inline-block rounded-md bg-blue-100 p-1 !text-[10px] font-medium text-primary-700 dark:text-primary-400">
                                {moment
                                  .utc(notif.createdAt, "YYYYMMDD hh:mm")
                                  .local()
                                  .fromNow()}
                              </div>
                            </div>
                          </Timeline.Time>
                          <Timeline.Title>
                            {/* <span
                            className=" mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                              __html: nl2br(notif.body, true, true),
                            }}
                          ></span> */}
                          </Timeline.Title>
                          <Timeline.Body>
                            <div className="flex flex-col !text-[16px] ">
                              <span className="text-black">
                                Project:{" "}
                                {notif.bodyWeb && notif.bodyWeb.Project}
                              </span>
                              <div className="flex">
                                {notif.bodyWeb && notif.bodyWeb.unitNo && (
                                  <>
                                    <span>
                                      <span className="text-blue-600">
                                        Unit no:
                                      </span>
                                      {notif.bodyWeb.unitNo}
                                    </span>{" "}
                                  </>
                                )}
                                {notif.bodyWeb && notif.bodyWeb.Zone && (
                                  <>
                                    <span>
                                      <div className="mx-[2px]">|</div>
                                      <span className="text-blue-600">
                                        Zone:{" "}
                                      </span>
                                      {notif.bodyWeb.Zone}
                                    </span>
                                  </>
                                )}
                                {notif.bodyWeb && notif.bodyWeb.Element && (
                                  <>
                                    <div className="mx-[2px]">|</div>
                                    <span>
                                      <span className="text-blue-600">
                                        Element:{" "}
                                      </span>
                                      {notif.bodyWeb.Element}
                                    </span>
                                  </>
                                )}
                                {notif.bodyWeb &&
                                  notif.bodyWeb.appointmentDate && (
                                    <>
                                      <div className="mx-[2px]">|</div>
                                      <span>
                                        <span className="text-blue-600">
                                          Appointment Date:{" "}
                                        </span>
                                        {notif.bodyWeb.appointmentDate}
                                      </span>
                                    </>
                                  )}
                              </div>
                            </div>
                            <div>
                              <span className="text-[16px] text-primary-700">
                                Date:{" "}
                                <span className="text-gray-600">
                                  {" "}
                                  {moment
                                    .utc(
                                      notif.createdAt,
                                      "YYYY-MM-DD h:mm:ss a"
                                    )
                                    .local()
                                    .format("MMM Do, YYYY h:mm:ss a")}
                                </span>
                              </span>
                            </div>
                          </Timeline.Body>
                          {((notif.title.toLowerCase() ==
                            "pending admin feedback" ||
                            notif.title.toLowerCase() ==
                              "pending admin approval") && (
                            <Button
                              color="gray"
                              onClick={() => NeedAction(notif.data.id)}
                            >
                              <MdBrokenImage className="mr-2 h-3 w-3" />
                              Needs Action
                            </Button>
                          )) || (
                            <Button
                              color="gray"
                              onClick={() => NeedAction(notif.data.id)}
                            >
                              <MdBrokenImage className="mr-2 h-3 w-3" />
                              View Details
                            </Button>
                          )}
                        </Timeline.Content>
                      </Timeline.Item>
                    );
                  })) || <span>No data available</span>}
            </Timeline>
          </div>
          <Defects organizationDashboard={organizationDashboard} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-5">
        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="flex w-full flex-col justify-between">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Property Defects by Trade
            </h3>
            <div className="flex items-center justify-between">
              {/* <Button
                // onClick={() => gotoPage("/organization/new")}
                className="mx-1"
                color="gray"
              >
                <div className="flex items-center gap-x-2 text-xs">
                  <BsListTask />
                  Filter by Project
                </div>
              </Button>
              &nbsp;&nbsp;
              <a
                href="#"
                className="inline-flex cursor-pointer items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <HiDotsHorizontal className="text-2xl" />
              </a> */}
            </div>
            <fieldset className="my-5 flex flex-row items-center gap-4">
              <span className="text-[14px]">Show only:</span>
              <div className="flex items-center gap-2">
                <Radio
                  id="all"
                  name="showOnly3"
                  value={showOnly3}
                  onChange={(e) => setShowOnly3(e.target.id)}
                  defaultChecked
                />
                <Label htmlFor="united-state">All</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="in_progress"
                  name="showOnly3"
                  value={showOnly3}
                  onChange={(e) => setShowOnly3(e.target.id)}
                />
                <Label htmlFor="in_progress">In-Progress</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="pending"
                  name="showOnly3"
                  value={showOnly3}
                  onChange={(e) => setShowOnly3(e.target.id)}
                />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="resolved"
                  name="showOnly3"
                  value={showOnly3}
                  onChange={(e) => setShowOnly3(e.target.id)}
                />
                <Label htmlFor="resolved">Resolved</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio
                  id="disputed"
                  name="showOnly3"
                  value={showOnly3}
                  onChange={(e) => setShowOnly3(e.target.id)}
                />
                <Label htmlFor="disputed">Disputed</Label>
              </div>
            </fieldset>
          </div>

          <div className="my-6">
            {(checkIsValid(
              organizationDashboard &&
                organizationDashboard.propertyDefectsByStatusAndTrade &&
                organizationDashboard.propertyDefectsByStatusAndTrade[showOnly3]
            ) && (
              <AcquisitionChart
                data={
                  organizationDashboard?.propertyDefectsByStatusAndTrade[
                    showOnly3
                  ]
                }
              />
            )) || (
              <div className="mb-3 mt-5 flex h-[260px] w-[260px] items-center justify-center rounded-full bg-gray-300">
                <span className="font-black text-white">No data found</span>
              </div>
            )}
          </div>
          <div className="flex w-[80%] items-center justify-center border-t pt-5">
            <span className="text-gray-500">
              Total property defects{" "}
              <span className="text-green-500">
                {organizationDashboard &&
                  organizationDashboard.defectsByProperty &&
                  organizationDashboard.defectsByProperty.total}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="flex w-full flex-col justify-between">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Common Area Defects by Trade
            </h3>
            <div className="flex items-center justify-between">
              {/* <Button
                // onClick={() => gotoPage("/organization/new")}
                className="mx-1"
                color="gray"
              >
                <div className="flex items-center gap-x-2 text-xs">
                  <BsListTask />
                  Filter by Project
                </div>
              </Button>
              &nbsp;&nbsp;
              <a
                href="#"
                className="inline-flex cursor-pointer items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <HiDotsHorizontal className="text-2xl" />
              </a> */}
            </div>
            <fieldset className="my-5 flex flex-row items-center gap-4">
              <span className="text-[14px]">Show only:</span>
              <div className="flex items-center gap-2">
                <Radio
                  id="all"
                  name="showOnly2"
                  value={showOnly2}
                  onChange={(e) => setShowOnly2(e.target.id)}
                  defaultChecked
                />
                <Label htmlFor="united-state">All</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="in_progress"
                  name="showOnly2"
                  value={showOnly2}
                  onChange={(e) => setShowOnly2(e.target.id)}
                />
                <Label htmlFor="in_progress">In-Progress</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="pending"
                  name="showOnly2"
                  value={showOnly2}
                  onChange={(e) => setShowOnly2(e.target.id)}
                />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="resolved"
                  name="showOnly2"
                  value={showOnly2}
                  onChange={(e) => setShowOnly2(e.target.id)}
                />
                <Label htmlFor="resolved">Resolved</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio
                  id="disputed"
                  name="showOnly2"
                  value={showOnly2}
                  onChange={(e) => setShowOnly2(e.target.id)}
                />
                <Label htmlFor="disputed">Disputed</Label>
              </div>
            </fieldset>
          </div>

          <div className="my-6">
            {(checkIsValid(
              organizationDashboard &&
                organizationDashboard.commonAreaDefectsByStatusAndTrade &&
                organizationDashboard.commonAreaDefectsByStatusAndTrade[
                  showOnly2
                ]
            ) && (
              <AcquisitionChart
                data={
                  organizationDashboard?.commonAreaDefectsByStatusAndTrade[
                    showOnly2
                  ]
                }
              />
            )) || (
              <div className="mb-3 mt-5 flex h-[260px] w-[260px] items-center justify-center rounded-full bg-gray-300">
                <span className="font-black text-white">No data found</span>
              </div>
            )}
          </div>
          <div className="flex w-[80%] items-center justify-center border-t pt-5">
            <span className="text-gray-500">
              Total common area defects{" "}
              <span className="text-green-500">
                {organizationDashboard &&
                  organizationDashboard.defectsByCommonArea &&
                  organizationDashboard.defectsByCommonArea.total}
              </span>
            </span>
          </div>
        </div>
      </div>
      <CommonAreaDefectSubmittionModal
        setFeedbackTitle={setFeedbackTitle}
        setDefectId={setDefectId}
        isOpen={openCommonAreaModal}
        setOpen={setOpenCommonAreaModal}
        setFeedbackOpen={setFeedbackOpen}
        setFeedback={setFeedback}
      />

      <DefectSubmissionModal
        setFeedbackTitle={setFeedbackTitle}
        setDefectId={setDefectId}
        isOpen={openPropertyAreaModal}
        setOpen={setOpenPropertyAreaModal}
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

interface P {
  organizationDashboard: DashboardData | undefined;
}

const Defects = function (props: P) {
  const { organizationDashboard } = props;
  const [showOnly, setShowOnly] = useState("all");

  const getPercent = (current: any, total: any) => {
    const percentage = (current * 100) / total;
    return `${percentage < 3 ? 3 : percentage}%`;
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:mb-0 xl:p-8 2xl:col-span-2">
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          Defects
        </h3>
        {/* <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center ">
            <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {organizationDashboard &&
                organizationDashboard.totalDefects &&
                organizationDashboard.totalDefects.total}
            </span>
          </div>
        </div> */}
        <fieldset className="my-5 flex flex-row items-center gap-4">
          <span className="text-[14px]">Show only:</span>
          <div className="flex items-center gap-2">
            <Radio
              id="all"
              name="showOnly0"
              value={showOnly}
              onChange={(e) => setShowOnly(e.target.id)}
              defaultChecked
            />
            <Label htmlFor="united-state">All</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="properties"
              name="showOnly0"
              value={showOnly}
              onChange={(e) => setShowOnly(e.target.id)}
            />
            <Label htmlFor="properties">Properties</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="commonArea"
              name="showOnly0"
              value={showOnly}
              onChange={(e) => setShowOnly(e.target.id)}
            />
            <Label htmlFor="commonArea">Common Areas</Label>
          </div>
        </fieldset>
      </div>
      <ul className="space-y-6">
        <li className="w-full items-center sm:flex">
          <div className="mb-3 flex items-center sm:mb-0">
            <span className="mx-5 ml-3 w-32 text-base font-medium text-gray-600 dark:text-white sm:flex-none">
              Pending
            </span>
          </div>
          <div className="flex w-full flex-col">
            {(showOnly == "all" || showOnly == "properties") && (
              <div className="my-1  h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard.defectsByProperty &&
                  organizationDashboard.defectsByProperty.pending > 0 && (
                    <div
                      className="h-5 rounded-md bg-primary-700 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard.defectsByProperty &&
                            organizationDashboard.defectsByProperty.pending,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByProperty &&
                        organizationDashboard?.defectsByProperty.pending}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
            {(showOnly == "all" || showOnly == "commonArea") && (
              <div className="my-1 h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByCommonArea &&
                  organizationDashboard?.defectsByCommonArea.pending > 0 && (
                    <div
                      className="h-5 rounded-md bg-teal-500 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByCommonArea &&
                            organizationDashboard?.defectsByCommonArea.pending,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByCommonArea &&
                        organizationDashboard?.defectsByCommonArea.pending}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </li>
        <li className="w-full items-center sm:flex">
          <div className="mb-3 flex items-center sm:mb-0">
            <span className="mx-5 ml-3 w-32 text-base font-medium text-gray-600 dark:text-white sm:flex-none">
              In Progress
            </span>
          </div>
          <div className="flex w-full flex-col">
            {(showOnly == "all" || showOnly == "properties") && (
              <div className="my-1  h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByProperty &&
                  organizationDashboard?.defectsByProperty.in_progress > 0 && (
                    <div
                      className="h-5 rounded-md bg-primary-700 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByProperty &&
                            organizationDashboard?.defectsByProperty
                              .in_progress,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByProperty &&
                        organizationDashboard?.defectsByProperty.in_progress}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
            {(showOnly == "all" || showOnly == "commonArea") && (
              <div className="my-1 h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByCommonArea &&
                  organizationDashboard?.defectsByCommonArea.in_progress >
                    0 && (
                    <div
                      className="h-5 rounded-md bg-teal-500 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByCommonArea &&
                            organizationDashboard?.defectsByCommonArea
                              .in_progress,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByCommonArea &&
                        organizationDashboard?.defectsByCommonArea.in_progress}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </li>
        <li className="w-full items-center sm:flex">
          <div className="mb-3 flex items-center sm:mb-0">
            <span className="mx-5 ml-3 w-32 text-base font-medium text-gray-600 dark:text-white sm:flex-none">
              Resolved
            </span>
          </div>
          <div className="flex w-full flex-col">
            {(showOnly == "all" || showOnly == "properties") && (
              <div className="my-1  h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByProperty &&
                  organizationDashboard?.defectsByProperty.resolved > 0 && (
                    <div
                      className="h-5 rounded-md bg-primary-700 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByProperty &&
                            organizationDashboard?.defectsByProperty.resolved,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByProperty &&
                        organizationDashboard?.defectsByProperty.resolved}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
            {(showOnly == "all" || showOnly == "commonArea") && (
              <div className="my-1 h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByCommonArea &&
                  organizationDashboard?.defectsByCommonArea.resolved > 0 && (
                    <div
                      className="h-5 rounded-md bg-teal-500 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByCommonArea &&
                            organizationDashboard?.defectsByCommonArea.resolved,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByCommonArea &&
                        organizationDashboard?.defectsByCommonArea.resolved}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </li>
        <li className="w-full items-center sm:flex">
          <div className="mb-3 flex items-center sm:mb-0">
            <span className="mx-5 ml-3 w-32 text-base font-medium text-gray-600 dark:text-white sm:flex-none">
              Disputed
            </span>
          </div>
          <div className="flex w-full flex-col">
            {(showOnly == "all" || showOnly == "properties") && (
              <div className="my-1  h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByProperty &&
                  organizationDashboard?.defectsByProperty.disputed > 0 && (
                    <div
                      className="h-5 rounded-md bg-primary-700 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByProperty &&
                            organizationDashboard?.defectsByProperty.disputed,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByProperty &&
                        organizationDashboard?.defectsByProperty.disputed}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
            {(showOnly == "all" || showOnly == "commonArea") && (
              <div className="my-1 h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
                {(organizationDashboard &&
                  organizationDashboard?.defectsByCommonArea &&
                  organizationDashboard?.defectsByCommonArea.disputed > 0 && (
                    <div
                      className="h-5 rounded-md bg-teal-500 p-1 text-center text-xs font-bold leading-none text-primary-100"
                      style={{
                        width: getPercent(
                          organizationDashboard &&
                            organizationDashboard?.defectsByCommonArea &&
                            organizationDashboard?.defectsByCommonArea.disputed,
                          organizationDashboard &&
                            organizationDashboard.totalDefects &&
                            organizationDashboard.totalDefects.total
                        ),
                      }}
                    >
                      {" "}
                      {organizationDashboard &&
                        organizationDashboard?.defectsByCommonArea &&
                        organizationDashboard?.defectsByCommonArea.disputed}
                    </div>
                  )) || (
                  <div
                    className="h-5 rounded-md bg-gray-200 p-1 text-center text-xs font-bold leading-none text-primary-100"
                    style={{
                      width: "3%",
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </li>
      </ul>

      {/* <div className="flex w-full">
        <div className="mx-5 ml-11 w-32"></div>
        <div className="my-2 flex h-5 w-full">
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute left-0">0</span>
            <span className="absolute right-0">10</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">20</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">30</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">40</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">50</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">60</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">70</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">80</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">90</span>
          </div>
          <div
            className="relative h-5 rounded-md p-1 text-center text-xs font-bold leading-none"
            style={{ width: "10%" }}
          >
            <span className="absolute right-0">100</span>
          </div>
        </div>
      </div> */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        {/* <Datepicker /> */}
        {/* <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div> */}
      </div>
      <div className="flex w-[100%] items-center justify-center">
        <span className="text-gray-500">
          Total defects{" "}
          <span className="text-green-500">
            {organizationDashboard &&
              organizationDashboard.totalDefects &&
              organizationDashboard.totalDefects.total}
          </span>
        </span>
      </div>
    </div>
  );
};

interface propss {
  data: TradeVariables;
}

const AcquisitionChart = function ({ data }: propss) {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";
  const keyValues = Object.keys(data);

  const stringToColour = (str: string) => {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  const getValues = (status: any) => {
    return data[status];
  };
  const arrayValues = keyValues.map((v) => getValues(v));
  const arrayColors = keyValues.map((v) => stringToColour(v + "- properly"));

  const options: ApexCharts.ApexOptions = {
    labels: keyValues,
    colors: arrayColors,
    chart: {
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      colors: [isDarkTheme ? "#111827" : "#fff"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "5%",
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },
    tooltip: {
      shared: true,
      followCursor: false,
      fillSeriesColor: false,
      inverseOrder: true,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
      x: {
        show: true,
        formatter: function (_, { seriesIndex, w }) {
          const label = w.config.labels[seriesIndex];
          return label;
        },
      },
      y: {
        formatter: function (value) {
          return value + "";
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };
  const series = data ? arrayValues : [];

  return <Chart height={305} options={options} series={series} type="donut" />;
};

export default Dashboard;
