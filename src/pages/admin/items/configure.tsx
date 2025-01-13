/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, Button } from "flowbite-react";
import DefectCodeManagement from "./configureItems/codeManagement";
import TradeMapping from "./configureItems/tradeMapping";
import PropertyChecklist from "./configureItems/propertyChecklist";
import CommonArea from "./configureItems/commonArea";

import { useDispatch } from "react-redux";
import { updateProjectTabMain } from "../../../store/features/appSlice";

export default function ConfigureAccordion({ project_id }: any) {
  const dispatch = useDispatch();
  return (
    <div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Defect Code Management</Accordion.Title>
          <Accordion.Content>
            {/* <DefectCodeManagement project_id={project_id} /> */}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Trade & Defect Code Mapping</Accordion.Title>
          <Accordion.Content>
            {/* <TradeMapping project_id={project_id} /> */}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Property Checklist Configuration</Accordion.Title>
          <Accordion.Content>{/* <PropertyChecklist /> */}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Common Area Checklist Configuration</Accordion.Title>
          <Accordion.Content>{/* <CommonArea /> */}</Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      <div className="my-5 flex flex-row gap-5">
        <Button
          className="w-[200px]"
          onClick={() => {
            dispatch(updateProjectTabMain(0));
          }}
        >
          <div className="flex items-center gap-x-2 text-xs">
            Configure Project
          </div>
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
