/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";

const AddUserModal = function ({
  setOpenModal,
  openModal,
  addUserHandler,
  title,
}: any) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {title == "Add Sub-Contractor" && (
              <div className="grid grid-cols-1 gap-y-2">
                <Label htmlFor="name">Select Trade Category</Label>
                <select
                  id="trade_category"
                  name="trade_category"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="property">Property</option>
                  <option value="common_area">Common Area</option>
                </select>
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
              addUserHandler(name, email, mobile);
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
