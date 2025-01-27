/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTradeCodeListByProject } from "../store/features/reducers";
import { useParams } from "react-router";
import type { ProjectState } from "../types";
import { MultiSelect } from "react-multi-select-component";

const AddUserModal = function ({
  setOpenModal,
  openModal,
  addUserHandler,
  title,
}: any) {
  const { tradeCodeList }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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
          <div className="space-y-6">
            {title == "Add Sub-Contractor" && (
              <div className="grid grid-cols-1 gap-y-2">
                <Label htmlFor="name">Select Trade Category</Label>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="name">Full Name</Label>
              <TextInput
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="mobile">Mobile number</Label>
              <TextInput
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="email">Email address</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              if (title == "Add Sub-Contractor") {
                addUserHandler(name, email, mobile, selected);
              } else {
                addUserHandler(name, email, mobile);
              }
              setName("");
              setMobile("");
              setEmail("");
              setSelected([]);
              setOpenModal(false);
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

export default AddUserModal;
