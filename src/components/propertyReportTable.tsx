/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import type { ProjectState } from "../types";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyReportsReducer } from "../store/features/reducers";
import { useParams } from "react-router";
import type { Report } from "../types";
import { type PropertyState } from "../types";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
DataTable.use(DT);
const PropertyReportTable = function ({ headerValue }: any) {
  const { project_id }: any = useParams();
  const { propertyReports }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [reports, setReports] = useState<any[] | undefined>(undefined);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const rp =
      reports &&
      reports.length > 0 &&
      reports.map((r: Report) => {
        return [
          r.lotNo,
          r.unitNo,
          r.owners &&
            r.owners.length > 0 &&
            r.owners.map((o) => o.fullName).join(", "),
        ];
      });
    setTableData(rp);
  }, [reports]);

  useEffect(() => {
    dispatch(getPropertyReportsReducer(project_id));
  }, []);

  useEffect(() => {
    setReports([]);
    if (propertyReports) {
      const rep =
        propertyReports && propertyReports.find((o) => o.key == headerValue);
      setReports(rep && rep.reports ? rep.reports : []);
    }
  }, [propertyReports, headerValue]);

  return (
    <>
      <DataTable
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        slots={{
          3: (data: any, row: any) => (
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <Button color="gray" className="w-[50px]">
                  <div className="flex items-center gap-x-2 text-xs">
                    <BsThreeDots />
                  </div>
                </Button>
              )}
            >
              <Dropdown.Item>View</Dropdown.Item>
            </Dropdown>
          ),
        }}
        data={tableData}
        options={{
          destroy: true,
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
        }}
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              LOT NO.
            </th>
            <th scope="col" className="px-6 py-3">
              UNIT NO.
            </th>
            <th scope="col" className="px-6 py-3">
              OWNER NAME
            </th>
            <th></th>
          </tr>
        </thead>
      </DataTable>
    </>
  );
};

export default PropertyReportTable;
