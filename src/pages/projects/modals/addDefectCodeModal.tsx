/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postDefectCode } from "../../../store/features/reducers";
import { toast } from "react-toastify";

export const AddDefectCodeModal = function (props: any) {
  const { isOpen, setOpen, project_id } = props;
  const [defectName, setDefectName] = useState("");
  const [defectCode, setDefectCode] = useState("");
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (defectName.length === 0 || defectCode.length === 0) {
      toast.error("All fields are required!");
    } else {
      const params = {
        defectName: defectName,
        defectCode: defectCode,
        projectId: project_id,
      };
      dispatch(postDefectCode(params));
      toast.info("New Defect Code Registered!");
      setOpen(false);
    }
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add New Defect Code</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Enter Defect Code</Label>
              <TextInput
                id="defectCode"
                name="defectCode"
                placeholder="Defect Code"
                onChange={(event) => setDefectCode(event.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Enter Defect Name</Label>
              <TextInput
                id="defectCodeName"
                name="defectCodeName"
                placeholder="Defect Name"
                onChange={(event) => setDefectName(event.target.value)}
              />
            </div>
          </form>
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
