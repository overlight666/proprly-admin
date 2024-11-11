/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postTradeCode } from "../../../store/features/reducers";
import { toast } from "react-toastify";
import Select from "react-select";
import { fireTrade } from "../../../store/features/projectSlice";

export const AddTradeCodeModal = function (props: any) {
  const { isOpen, setOpen, project_id, defectCodeList } = props;
  const [tradeName, setTradeName] = useState("");
  const [tradeCode, setTradeCode] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (defectCodeList) {
      const newlist =
        defectCodeList.length &&
        defectCodeList.map((l) => {
          return {
            ...l,
            value: `${l.id}`,
            label: `${l.defectCode} - ${l.defectName}`,
          };
        });
      setList(newlist);
    }
  }, [defectCodeList]);

  const onSubmit = () => {
    if (tradeName.length === 0 || tradeCode.length === 0) {
      toast.error("All fields are required!");
    } else {
      const codes =
        selectedCodes &&
        selectedCodes.length &&
        selectedCodes.map((c) => {
          return c.id;
        });
      const params = {
        tradeName: tradeName,
        tradeCode: tradeCode,
        projectId: project_id,
        defectCodes: codes,
      };
      dispatch(postTradeCode(params));
      dispatch(fireTrade());
      toast.info("New Trade Code Registered!");
      setOpen(false);
    }
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add New Trade</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 grid grid-cols-1 gap-y-2">
            <Label htmlFor="taskName">Enter Trade Name</Label>
            <TextInput
              id="defectCode"
              name="defectCode"
              placeholder="Defect Code"
              onChange={(event) => setTradeCode(event.target.value)}
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-y-2">
            <Label htmlFor="taskName">Enter Trade Code</Label>
            <TextInput
              id="defectCodeName"
              name="defectCodeName"
              placeholder="Defect Name"
              onChange={(event) => setTradeName(event.target.value)}
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-y-2">
            <Label htmlFor="taskName">Enter Defect Codes to Map</Label>
            {list && list.length && (
              <Select
                isMulti
                name="colors"
                options={list}
                className="w-full"
                classNamePrefix="select"
                menuPosition="fixed"
                onChange={(event) => setSelectedCodes(event)}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button color="primary" onClick={() => onSubmit()}>
              <div className="flex items-center gap-x-2">Submit</div>
            </Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
