/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Label } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { clearAppointmentResponse } from "../../store/features/propertySlice";
import { useDispatch } from "react-redux";

export const BookAppointmentModal = function (props: any) {
  const { isOpen, setOpen } = props;
  const { id, project_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadType, setUploadType] = useState<any>("");
  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>
          <strong>Book New Appointment</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="floors">Select appointment type</Label>
              <select
                id="uploadType"
                name="uploadType"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="single">Inspection Appointment</option>
                <option value="single">Defect Appointment</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => {
                dispatch(clearAppointmentResponse());
                navigate(
                  `/organization/${id}/project/${project_id}/appointments/new`
                );
                setOpen(false);
              }}
              //   disabled={isProcess}
            >
              {/* {isProcess && (
                <Spinner
                  aria-label="Alternate spinner button example"
                  size="sm"
                  color="success"
                />
              )} */}
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
