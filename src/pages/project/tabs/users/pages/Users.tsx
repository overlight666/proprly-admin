import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "../components/accordionItem";
import { AdminUser } from "../components/adminUser";
import { AuditorUser } from "../components/auditorUser";
import { SalesAgent } from "../components/salesAgent";
import { StrataUser } from "../components/strataUser";
import { SubContractorUser } from "../components/subContractorUser";

export const Users = () => {
    return (
        <div className="mx-2">
            {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
            <Accordion transition transitionTimeout={200}>
                <AccordionItem header="Project Admin" initialEntered>
                    <AdminUser />
                </AccordionItem>

                <AccordionItem header="Auditor">
                    <AuditorUser />
                </AccordionItem>

                <AccordionItem header="Sub-Contractor">
                    <SubContractorUser />
                </AccordionItem>
                <AccordionItem header="Strata">
                    <StrataUser />
                </AccordionItem>
                <AccordionItem header="Sales Agent">
                    <SalesAgent />
                </AccordionItem>
            </Accordion>
        </div>
    );
};
