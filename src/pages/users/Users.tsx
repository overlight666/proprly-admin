/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "./components/AccordionItem";
import { AdminUser } from "./components/AdminUser";
import { AuditorUser } from "./components/AuditorUser";
import { StrataUser } from "./components/StrataUser";
import { SubContractorUser } from "./components/SubContractorUser";

export const Users = () => {
  return (
    <div className="mx-2 my-4">
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
      </Accordion>
    </div>
  );
};
