/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { organizationTimelineAtom } from "../../../_state/atoms/organizations";
import {
  FolderIcon,
  InfoIcon,
  ShootingStarIcon,
  TimeIcon,
} from "../../../icons";
import { useOrganization } from "../../../_actions/organizations.actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import React from "react";
import { hasViewDetails } from "../../../_helpers";

export default function TimeLine({ openModal }: any) {
  const { id }: any = useParams();
  const orgAction = useOrganization();
  const orgTimeline = useRecoilValue(organizationTimelineAtom);
  const [selectedValue, setSelectedValue] = useState("all");

  useEffect(() => {
    orgAction.getTimeline(id);
  }, []);

  const getDefect = (id: any) => {
    orgAction.getDefectSubmission(id, openModal);
  };

  return (
    <div className=" rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-start justify-between flex-col">
        <div className="flex flex-row gap-2 items-center text-black dark:text-white">
          <TimeIcon className="size-5" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Timeline
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3 flex-row-reverse w-full mt-2">
          <Radio
            id="radio2"
            name="group1"
            value="needs_action"
            checked={selectedValue === "needs_action"}
            onChange={(e) => setSelectedValue(e)}
            label="Needs Action"
          />
          <Radio
            id="radio1"
            name="group1"
            value="all"
            checked={selectedValue === "all"}
            onChange={(e) => setSelectedValue(e)}
            label="All"
          />
        </div>
        <div className="relative inline-block mt-2 overflow-auto max-h-[310px] min-h-[310px] w-full">
          <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-5 mt-3">
            {orgTimeline && orgTimeline.length > 0 ? (
              orgTimeline
                .filter((notif) =>
                  selectedValue === "needs_action"
                    ? notif.title.toLowerCase() === "pending admin feedback" ||
                      notif.title.toLowerCase() === "pending admin approval"
                    : notif
                )
                .map((timeline, index) => {
                  return (
                    <li className="mb-10 ms-6" key={index}>
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-transparent dark:bg-blue-900">
                        <ShootingStarIcon />
                      </span>
                      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {timeline.title}
                        {index == 0 ? (
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
                            Latest
                          </span>
                        ) : (
                          <></>
                        )}
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {moment(timeline?.localDateTime).calendar()}
                      </time>
                      <div className="flex flex-col">
                        {timeline.bodyWeb.Project && (
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Project:{" "}
                            <span className="text-blue-400">
                              {timeline.bodyWeb.Project}
                            </span>
                          </span>
                        )}
                        {timeline.bodyWeb.Zone && (
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Zone:{" "}
                            <span className="text-blue-400">
                              {timeline.bodyWeb.Zone}
                            </span>
                          </span>
                        )}
                        {timeline.bodyWeb.Element && (
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Element:{" "}
                            <span className="text-blue-400">
                              {timeline.bodyWeb.Element}
                            </span>
                          </span>
                        )}
                        {timeline.bodyWeb.unitNo && (
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Unit No:{" "}
                            <span className="text-blue-400">
                              {timeline.bodyWeb.unitNo}
                            </span>
                          </span>
                        )}
                        {timeline.bodyWeb.appointmentDate && (
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Appointment Date:{" "}
                            <span className="text-blue-400">
                              {timeline.bodyWeb.appointmentDate}
                            </span>
                          </span>
                        )}
                      </div>

                      {(timeline.forAdmin && timeline.isNeedAction && (
                        <Button
                          onClick={() => getDefect(timeline.data.id)}
                          variant="outline"
                          className="mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          <InfoIcon className="size-5" />
                          Needs Action
                        </Button>
                      )) ||
                        (hasViewDetails(timeline.title) && (
                          <Button
                            onClick={() => getDefect(timeline.data.id)}
                            variant="outline"
                            className="mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                          >
                            <FolderIcon className="size-5" />
                            View Details
                          </Button>
                        ))}
                    </li>
                  );
                })
            ) : (
              <li className="mb-10 ms-6">
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  No data to show
                </span>
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
