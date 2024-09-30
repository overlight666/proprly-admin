/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTable } from "simple-datatables";
const OrgTableData = (dt: any[]) => {
  const newData = dt.map((o: any) => {
    return {
      cells: [
        {
          data: [
            {
              nodeName: "#text",
              data: o.name,
            },
          ],
          text: o.name,
          order: "1",
          attributes: {
            class:
              "whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white",
          },
        },
        {
          data: [
            {
              nodeName: "#text",
              data: "0",
            },
          ],
          text: "0",
          order: "0",
          attributes: {
            class: "px-6 py-4",
          },
        },
        {
          data: [
            {
              nodeName: "#text",
              data: "0",
            },
          ],
          text: "0",
          order: "0",
          attributes: {
            class: "px-6 py-4",
          },
        },
        {
          data: [
            {
              nodeName: "#text",
              data: "0",
            },
          ],
          text: "0",
          order: "0",
          attributes: {
            class: "px-6 py-4",
          },
        },
        {
          data: [
            {
              nodeName: "#text",
              data: "0",
            },
          ],
          text: "0",
          order: "0",
          attributes: {
            class: "px-6 py-4",
          },
        },
      ],
    };
  });

  const data = {
    headings: [
      {
        data: "Organization Name",
      },
      {
        data: "Projects",
        attributes: {
          class: "red",
        },
      },
      {
        data: "Properties",
      },
      {
        data: "Open Defects",
      },
      {
        data: "Defects In-progress",
      },
    ],
    data: newData,
  };
  const datatable = new DataTable("#organization-project-table", {
    data,
    searchable: false,
    fixedHeight: true,
    paging: true,
    perPage: 5,
    perPageSelect: [5, 10, 15, 20, 25],
    sortable: false,
    firstLast: true,
    nextPrev: true,
    classes: {
      selector:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
      active: "[&>button]:text-white [&>button]:bg-blue-600",
      paginationListItemLink:
        "flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
      pagination: "datatable-pagination-test",
      paginationList: "inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse",
      bottom:
        "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
      top: "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
      table: "p-20",
    },
    type: "string",

    rowRender: (rowValue: any, tr: any, _index) => {
      if (!tr.attributes.class) {
        tr.attributes.class = "";
      }
      tr.attributes.class +=
        "border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600";
      return tr;
    },
  });
};

export default OrgTableData;
