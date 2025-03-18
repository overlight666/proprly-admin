import React from "react";
import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "../../../Users/components/AccordionItem";
import DefectCodeManagement from "../DefectCodeManagement/DefectCodeManagement";
import TradeCodeManagement from "../TradeCodeManagement/TradeCodeManagement";
import ChecklistManagement from "../ChecklistManagement/ChecklistManagement";
import PropertylistManagement from "../PropertylistManagement/PropertylistManagement";

export const MasterAccordion = () => {
  return (
    <div className="mx-2 my-4">
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="Defect Code Management" initialEntered>
          <DefectCodeManagement />
        </AccordionItem>
        <AccordionItem header="Trade & Defect Code Mapping">
          <TradeCodeManagement />
        </AccordionItem>
        <AccordionItem header="Property List Configuration">
          <PropertylistManagement />
        </AccordionItem>
        <AccordionItem header="Common Area Checklist Configuration">
          <ChecklistManagement />
        </AccordionItem>
      </Accordion>
    </div>
  );
};
