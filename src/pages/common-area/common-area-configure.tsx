/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import CommonAreaLocationMappingTable from "../../components/commonAreaLocationMappingTable";
import type { ProjectState } from "../../types";
import { getCommonAreaReducer } from "../../store/features/reducers";
import DataTable from "datatables.net-dt";
import { reloadCommonAreaTable } from "../../store/features/projectSlice";
import { toast } from "react-toastify";

const CommonAreaConfigure = function ({}: any) {
  const {
    commonAreaItem,
    commonAreaConfig,
    reloadAreaTable,
    commonAreaTowerResponse,
    commonAreaTowerProcess,
    commonAreaBasementResponse,
    commonAreaBasementProcess,
  }: ProjectState = useSelector((state: any) => state.project);
  const { common_area_id } = useParams();
  const [showCard1, _setShowCard1] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCommonAreaReducer(
        common_area_id ? common_area_id : commonAreaItem?.id,
      ),
    );
    dispatch(reloadCommonAreaTable(false));
    // }
  }, []);

  useEffect(() => {
    if (
      reloadAreaTable &&
      ((commonAreaTowerResponse &&
        !commonAreaTowerProcess &&
        !commonAreaBasementProcess) ||
        (commonAreaBasementResponse &&
          !commonAreaTowerProcess &&
          !commonAreaBasementProcess))
    ) {
      dispatch(
        getCommonAreaReducer(
          common_area_id ? common_area_id : commonAreaItem?.id,
        ),
      );
      dispatch(reloadCommonAreaTable(false));
      setTimeout(() => {
        toast.info("Common Area has been updated!");
      }, 100);
    }
  }, [
    reloadAreaTable,
    commonAreaTowerResponse,
    commonAreaTowerProcess,
    commonAreaBasementProcess,
    commonAreaBasementResponse,
  ]);

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
        // onClick={() => setShowCard1(!showCard1)}
      >
        <h1 className="mb-5 mt-7 font-bold">Common Area Location Mapping</h1>
        {/* {showCard1 ? (
          <FaAngleUp className="h-[50px] cursor-pointer" />
        ) : (
          <FaAngleDown className="h-[50px] cursor-pointer" />
        )} */}
      </div>
      {showCard1 && (
        <CommonAreaLocationMappingTable
          id={commonAreaConfig?.id}
          towers={commonAreaConfig?.projectTowers}
          basements={commonAreaConfig?.projectBasements}
        />
      )}
      {/* <div className="my-10 flex">
        <Button
          className="mx-1"
          color="primary"
          disabled={!isConfigured}
          onClick={() => {
            dispatch(updateCommonAreaTab(1));
          }}
        >
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
      </div> */}
    </div>
  );
};

export default CommonAreaConfigure;
