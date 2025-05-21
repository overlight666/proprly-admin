/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "@/components/ui/select";
import ReactPaginate from "react-paginate";

// Define the table data using the interface

export default function DefectPagination({ setItemOffset, itemOffset, pageRow, setPageRow, totalRows, handlePageClick }: any) {


    return (
        <div className="flex justify-between items-center w-full p-5 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex gap-2 items-center">
                <span className="text-gray-500">Showing <span className="text-gray-800 dark:text-white">{itemOffset + 1}-{pageRow != "all" ? parseInt(itemOffset) + parseInt(pageRow) : totalRows}</span> of <span className="text-gray-800 dark:text-white">{totalRows}</span> Rows</span>
                <Select
                    options={[
                        {
                            label: "All",
                            value: "all",
                        },
                        {
                            label: "10",
                            value: "10",
                        },
                        {
                            label: "50",
                            value: "50",
                        },
                        {
                            label: "100",
                            value: "100",
                        },
                    ]}
                    defaultValue={pageRow}

                    onChange={(e) => {
                        setPageRow(e)
                        if (e == 'all') {
                            setItemOffset(0)
                        }
                    }}

                    className="dark:bg-dark-900"
                    containerClass="max-w-[80px]"
                />
            </div>
            <ReactPaginate
                containerClassName="inline-flex -space-x-px text-base h-10"
                previousClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                nextClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                pageClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                breakClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                activeClassName="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageRow == 'all' ? 1 : Math.ceil(totalRows / pageRow)}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}
