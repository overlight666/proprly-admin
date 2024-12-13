/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
// import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CommonAreaLocationMappingTable from "../../components/commonAreaLocationMappingTable";
import { Button } from "flowbite-react";
import type { ProjectState } from "../../types";
import { getCommonAreaReducer } from "../../store/features/reducers";
import DataTable from "datatables.net-dt";
import { reloadCommonAreaTable } from "../../store/features/projectSlice";

const CommonAreaConfigure = function ({ isConfigured }: any) {
  const { commonAreaItem, commonAreaConfig, reloadAreaTable }: ProjectState =
    useSelector((state: any) => state.project);
  const { common_area_id } = useParams();
  const [showCard1, setShowCard1] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reloadAreaTable) {
      setTimeout(() => {
        dispatch(
          getCommonAreaReducer(
            common_area_id ? common_area_id : commonAreaItem?.id
          )
        );
        dispatch(reloadCommonAreaTable(false));
      }, 5000);
    }
  }, [reloadAreaTable]);

  useEffect(() => {
    if (
      !DataTable.isDataTable("#common-area-config-table") &&
      (commonAreaConfig?.projectTowers || commonAreaConfig?.projectBasements)
    ) {
      new DataTable("#common-area-config-table", {
        columnDefs: [{ className: "dt-left", targets: "_all" }],
        paging: true,
        searching: false,
        layout: {
          topStart: null,
          topEnd: null,
          bottomStart: {
            pageLength: {
              text: "Showing _START_-_END_ of _TOTAL_ Rows _MENU_",
            },
          },
          bottomEnd: "paging",
        },
      });
    }
  });

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full items-center justify-between border-b-[1px]"
        onClick={() => setShowCard1(!showCard1)}
      >
        <h1 className="mb-5 mt-7 font-bold">Common Area Location Mapping</h1>
        {showCard1 ? (
          <FaAngleUp className="h-[50px] cursor-pointer" />
        ) : (
          <FaAngleDown className="h-[50px] cursor-pointer" />
        )}
      </div>
      {showCard1 && (
        <CommonAreaLocationMappingTable
          id={commonAreaConfig?.id}
          towers={commonAreaConfig?.projectTowers}
          basements={commonAreaConfig?.projectBasements}
        />
      )}
      <div className="my-10 flex">
        <Button className="mx-1" color="primary" disabled={!isConfigured}>
          Configure
        </Button>
        <Button
          className="mx-1"
          onClick={() => {
            navigate(-1);
          }}
          color="gray"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CommonAreaConfigure;
