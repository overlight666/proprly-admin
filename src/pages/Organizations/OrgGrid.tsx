/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { Organization } from "../../_types";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";
import {
  BoxIcon,
  DocsIcon,
  ErrorIcon,
  PencilIcon,
  TaskIcon,
} from "../../icons";
import React from "react";
// Define the table data using the interface

export default function OrgGrid({ orglist }: any) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mt-10">
      {orglist &&
        orglist.length > 0 &&
        orglist.map((org: Organization, index: number) => {
          return (
            <div className="space-y-6" key={index}>
              <ComponentCard
                title={org.name}
                rightComponent={
                  <div
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Edit"
                    className="text-black dark:text-white cursor-pointer"
                  >
                    <PencilIcon
                      className="size-5"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                      onClick={() => {
                        navigate(`/organization/edit?id=${org.id}`);
                      }}
                    />
                  </div>
                }
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/organization/${org.id}`)}
                >
                  <div className="overflow-hidden ">
                    <img
                      src={org.image.url}
                      alt="Cover"
                      className="w-full border border-gray-200 rounded-xl dark:border-gray-800 max-h-[200px] min-h-[200px] object-scale-down"
                    />
                  </div>
                  <div className="flex flex-col mt-2 gap-0">
                    <span className="text-[0.8rem] text-gray-900 dark:text-white">
                      Country:{" "}
                      <span className="text-gray-500">
                        {org.region?.regionName}
                      </span>
                    </span>
                    <span className="text-[0.8rem] text-gray-900 dark:text-white">
                      Timezone:{" "}
                      <span className="text-gray-500">{org.timezone.name}</span>
                    </span>
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 mt-5">
                    <Badge
                      variant="light"
                      color="error"
                      startIcon={<ErrorIcon />}
                    >
                      Open Defects: {org?.defectCounts?.open}
                    </Badge>{" "}
                    <Badge
                      variant="light"
                      color="primary"
                      startIcon={<BoxIcon />}
                    >
                      Projects: {org?.totalProjects}
                    </Badge>
                    <Badge
                      variant="light"
                      color="success"
                      startIcon={<DocsIcon />}
                    >
                      Properties: {org?.totalProperties}
                    </Badge>{" "}
                    <Badge
                      variant="light"
                      color="warning"
                      startIcon={<TaskIcon />}
                    >
                      Defects in-progress: {org?.defectCounts?.in_progress}
                    </Badge>{" "}
                  </div>
                </div>
              </ComponentCard>
            </div>
          );
        })}
    </div>
  );
}
