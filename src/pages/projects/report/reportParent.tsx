import { Accordion, Button } from "flowbite-react";
import { updateProjectTabMain } from "../../../store/features/appSlice";
import { useDispatch } from "react-redux";
import PropertyHeaderReport from "../../../components/propertyHeaderReport";
import ProjectReportTableNew from "./projectReportTableNew";
import PropertyReportHeader from "../../../components/propertyReportHeader";
import PropertyReportTable from "../../../components/propertyReportTable";
import { useState } from "react";
import CommonAreaHeader from "../../../components/commonAreaHeader";
import CommonAreaReportTable from "../../../components/commonAreaReportTable";

export default function ConfigureAccordionReports() {
  const dispatch = useDispatch();
  const [headerValue, setHeaderValue] = useState("all");
  const [headerValue2, setHeaderValue2] = useState("all");

  return (
    <div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Project Reports</Accordion.Title>
          <Accordion.Content>
            <PropertyHeaderReport />
            <ProjectReportTableNew />
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Property Reports</Accordion.Title>
          <Accordion.Content>
            <PropertyReportHeader setHeaderValue={setHeaderValue} />
            <PropertyReportTable headerValue={headerValue} />
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Common Area Reports</Accordion.Title>
          <Accordion.Content>
            <CommonAreaHeader setHeaderValue={setHeaderValue2} />
            <CommonAreaReportTable headerValue={headerValue2} />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      <div className="my-5 flex flex-row gap-5">
        <Button
          className="w-[200px]"
          onClick={() => {
            dispatch(updateProjectTabMain(0));
          }}
        >
          <div className="flex items-center gap-x-2 text-xs">Submit</div>
        </Button>
        <Button
          className="w-[100px]"
          color="gray"
          onClick={() => {
            dispatch(updateProjectTabMain(0));
          }}
        >
          <div className="flex items-center gap-x-2 text-xs">Cancel</div>
        </Button>
      </div>
    </div>
  );
}
