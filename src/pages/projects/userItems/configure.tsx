import { Accordion, Button } from "flowbite-react";
import ProjectAdmin from "./projectAdmin";
import Auditor from "./auditor";
import SubContractor from "./subContractor";
import Strata from "./strata";
import { updateProjectTabMain } from "../../../store/features/appSlice";
import { useDispatch } from "react-redux";

export default function ConfigureAccordionUser() {
  const dispatch = useDispatch();

  return (
    <div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Project Admin</Accordion.Title>
          <Accordion.Content>
            <ProjectAdmin />
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Auditor</Accordion.Title>
          <Accordion.Content>
            <Auditor />
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Sub-Contractor</Accordion.Title>
          <Accordion.Content>
            <SubContractor />
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Strata</Accordion.Title>
          <Accordion.Content>
            <Strata />
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
