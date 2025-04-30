/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Radio from "../../../components/form/input/Radio";
import { TaskIcon } from "../../../icons";
import { TradeVariables } from "../../../_types";
import { AcquisitionChart } from "./Chart";
import React from "react";
import { object } from "yup";
import { removeItemOnce, ucword } from "../../../_helpers";

export default function DefectsChart({
  title,
  keyId,
  data,
  totalTitle,
  totalValue,
}: any) {
  const [selectedValue, setSelectedValue] = useState("open");

  const sumValues = (obj: any) =>
    Object.values(obj).reduce((a: any, b: any) => a + b);

  const checkIsValid = (d: TradeVariables) => {
    try {
      const sum: any = sumValues(d);
      return sum > 0 ? true : false;
    } catch (_error: any) {
      return false;
    }
  };

  return (
    <div className=" rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-start justify-between flex-col">
        <div className="flex flex-row gap-2 items-center text-black dark:text-white">
          <TaskIcon className="size-5" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3 mb-3 flex-row w-full mt-2 flex-wrap">
          {
            data && removeItemOnce(Object.keys(data), "all")?.map((obj, index) => {
              return (
                <Radio
                  id={`${keyId}-${obj}`}
                  name={`${keyId}-${obj}`}
                  value={obj}
                  checked={selectedValue == obj}
                  onChange={(e) => setSelectedValue(e)}
                  label={ucword(obj)}
                />
              )
            })
          }

        </div>
        <div className="flex items-center justify-center mt-5 w-full flex-col">
          {(checkIsValid(data && data[selectedValue]) && (
            <AcquisitionChart data={data[selectedValue]} />
          )) || (
              <div className="mb-3 mt-5 flex h-[260px] w-[260px] items-center justify-center rounded-full bg-gray-300">
                <span className="font-black text-white">No data found</span>
              </div>
            )}
          <div className="flex items-center justify-center p-3 text-black dark:text-white">
            <span>
              {totalTitle}:{" "}
              <span className="text-blue-300 text-lg ml-3">{totalValue}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
