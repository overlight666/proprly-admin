/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useNavigate } from "react-router";

import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { File, Plus, SearchIcon } from "lucide-react";
import Input from "@/components/ui/input";
import PropertyTable from "../../tables/properties-table";

DataTable.use(DT);

// Define the table data using the interface

export default function PropertiesPage({ setShowBulk, selected, setSelected }: any) {

    const { id, project_id } = useParams();
    const navigate = useNavigate();
    const tableRef = useRef<any>(null);
    const [canUpload, setCanUpload] = useState(false);

    useEffect(() => {
        if (selected && selected.length > 1) {
            setCanUpload(true);
        } else {
            setCanUpload(false);
        }
    }, [selected]);


    const onSearch = (value: any) => {
        // tableRef.current?.dt()?.search(value).draw();
        tableRef.current.dt().search(value).draw();
    };

    return (
        <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between pb-5 w-full">
                <div className="flex gap-2">
                    <div className="flex items-start gap-4">
                        {/* SearchIcon bar with button */}
                        <div className="flex h-[35px] w-[30vw] items-center">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="h-[35px] py-3 px-4 rounded-l-lg rounded-r-none border-r-0 bg-gray-50 text-gray-500 text-sm focus:!ring-0"
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-full w-[46px] rounded-l-none rounded-r-lg bg-[#1a56db]"
                            >
                                <SearchIcon className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </div>
                    <Button disabled={!canUpload} variant="outline" onClick={() => setShowBulk(true)}>
                        <File className="text-white size-6 dark:text-white/90" />
                        <span className="text-sm font-medium text-white">
                            Bulk Import Warranties
                        </span>
                    </Button>
                </div>
                {/* Add Organization button */}
                <Button className="flex items-center gap-2 py-2 px-3 bg-[#1a56db]" onClick={() => navigate(`/organization/${id}/project/${project_id}/property/new`)}>
                    <Plus className="text-white size-6 dark:text-white/90" />
                    <span className="text-sm font-medium text-white">
                        Add New Property
                    </span>
                </Button>
            </div>
            <PropertyTable
                tableRef={tableRef}
                setSelected={setSelected}
                selected={selected}
            />
            {/* table */}
        </div >
    );
}
