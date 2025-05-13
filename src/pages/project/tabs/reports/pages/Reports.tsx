/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@szhsin/react-accordion";
import { useRef, useState } from "react";
import { AccordionItem } from "../components/accordionItem";
import ProjectReportsHeader from "../headers/projectReportsHeader";
import ProjectReportsTable from "../tables/projectReportsTable";
import PropertyReportsHeader from "../headers/propertyReportsHeader";
import PropertyReportsTable from "../tables/propertyReportsTable";
import CommonAreaReportsHeader from "../headers/commonAreaReportsHeader";
import CommonAreaReportsTable from "../tables/commonAreaReportsTable";


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
        <div className="mx-2">
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
