/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Label, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTradeCodeListByProject } from "../store/features/reducers";
import { useParams } from "react-router";
import type { ProjectState } from "../types";
import { MultiSelect } from "react-multi-select-component";

const SelectTradeCode = function ({
  setOpenModal,
  openModal,
  addUserHandler,
  title,
  setIsSuccess,
  isSuccess,
}: any) {
  const { tradeCodeList }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState<any>([]);
  const dispatch = useDispatch();

  const { project_id }: any = useParams();

  useEffect(() => {
    if (title == "Add Sub-Contractor") {
      dispatch(getTradeCodeListByProject(project_id));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
      setSelected([]);
    }
  }, [isSuccess]);

  useEffect(() => {
    const o =
      tradeCodeList &&
      tradeCodeList.length > 0 &&
      tradeCodeList.map((e) => {
        return { label: e.tradeName, value: e.id };
      });
    setOptions(o);
  }, [tradeCodeList]);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="!min-h-[100px] space-y-6">
            <div className="fixed grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Select Trade Category</Label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              addUserHandler(selected);
            }}
          >
            Submit
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SelectTradeCode;
