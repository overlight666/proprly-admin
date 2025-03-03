/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "./components/AccordionItem";
import ProjectReportsHeader from "./ProjectReports/ProjectReportsHeader";
import { useRef, useState } from "react";
import ProjectReportsTable from "./ProjectReports/ProjectReportsTable";
import CommonAreaReportsHeader from "./CommonAreaReports/CommonAreaReportsHeader";
import CommonAreaReportsTable from "./CommonAreaReports/CommonAreaReportsTable";
import PropertyReportsHeader from "./PropertyReports/PropertyReportsHeader";
import PropertyReportsTable from "./PropertyReports/PropertyReportsTable";
import React from "react";

export const Reports = () => {
  const tableRefProject = useRef<any>(null);
  const tableRefCommonArea = useRef<any>(null);
  const [selectedCommonAreaValue, setSelectedCommonAreaValue] = useState("all");
  const tableRefProperty = useRef<any>(null);
  const [selectedPropertyValue, setSelectedPropertyValue] = useState("all");

  const onSearchProject = (value: any) => {
    tableRefProject?.current?.dt().search(value).draw();
  };

  const onSearchCommonArea = (value: any) => {
    tableRefCommonArea?.current?.dt().search(value).draw();
  };

  const onSearchProperty = (value: any) => {
    tableRefProperty?.current?.dt().search(value).draw();
  };

  return (
    <div className="mx-2 my-4">
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="Project Reports" initialEntered>
          <ProjectReportsHeader onSearch={onSearchProject} />
          <ProjectReportsTable tableRef={tableRefProject} />
        </AccordionItem>

        <AccordionItem header="Property Inspection Reports">
          <PropertyReportsHeader
            onSearch={onSearchProperty}
            setSelectedValue={setSelectedPropertyValue}
            selectedValue={selectedPropertyValue}
          />
          <PropertyReportsTable
            tableRef={tableRefProperty}
            headerValue={selectedPropertyValue}
          />
        </AccordionItem>

        <AccordionItem header="Common Area Inspection Reports">
          <CommonAreaReportsHeader
            onSearch={onSearchCommonArea}
            setSelectedValue={setSelectedCommonAreaValue}
            selectedValue={selectedCommonAreaValue}
          />
          <CommonAreaReportsTable
            tableRef={tableRefCommonArea}
            headerValue={selectedCommonAreaValue}
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
};
