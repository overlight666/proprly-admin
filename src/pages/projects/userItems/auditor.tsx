/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, Select } from "flowbite-react";
import { BsChevronRight, BsThreeDots } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";

export default function Auditor() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-end gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Auditor List" />
          </div>
          <Select id="countries" required>
            <option>John</option>
          </Select>
        </div>
        <Button className="mx-2 mb-1 w-[200px]">
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Attach Auditor
          </div>
        </Button>
      </div>
      <div className="relative my-5 overflow-x-auto p-5 px-2 shadow-md sm:rounded-lg">
        <table
          id="organization-project-table"
          className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                FULLNAME
              </th>
              <th scope="col" className="px-6 py-3">
                PHONE
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL ADDRESS
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                John Doe
              </th>
              <td className="px-6 py-4">+639887734545</td>
              <td className="px-6 py-4">jd@techbubble.com.au</td>
              <td className="px-6 py-4">
                <Button color="gray" className="w-[50px]">
                  <div className="flex items-center gap-x-2 text-xs">
                    <BsThreeDots />
                  </div>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-1 flex items-center text-[14px] text-[blue]">
        <a href="javascript:void(0)">ADD NEW AUDITOR</a>
        <BsChevronRight />
      </div>
      <div className="my-5 flex flex-row gap-5">
        <Button className="w-[100px]">
          <div className="flex items-center gap-x-2 text-xs">Submit</div>
        </Button>
        <Button className="w-[100px]" color="gray">
          <div className="flex items-center gap-x-2 text-xs">Cancel</div>
        </Button>
      </div>
    </div>
  );
}
