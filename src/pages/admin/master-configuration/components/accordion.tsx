
import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "./accordionItem";
import DefectCodeManagement from "../pages/DefectCodeManagement/DefectCodeManagement";
import TradeCodeManagement from "../pages/TradeCodeManagement/TradeCodeManagement";
import PropertylistManagement from "../pages/PropertylistManagement/PropertylistManagement";
import ChecklistManagement from "../pages/ChecklistManagement/ChecklistManagement";
import TemplateManagement from "../pages/ITPManagement/ITPTemplateManagement";
import ITPTaskManagement from "../pages/ITPTaskManagement/ITPTaskManagement";

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
                <AccordionItem header="ITP Template Management">
                    <TemplateManagement />
                </AccordionItem>
                <AccordionItem header="ITP Tasks Management">
                    <ITPTaskManagement />
                </AccordionItem>
            </Accordion>
        </div>
    );
};
