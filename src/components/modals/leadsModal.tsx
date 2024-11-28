/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerToOrg } from "../../apis";
import { useDispatch } from "react-redux";
import { getAllLeads } from "../../store/features/reducers";

export const LeadConfirmModal = function (props: any) {
  const { isOpen, setOpen, status, lead_id } = props;
  const [isProcess, setIsProcess] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (status === "convert") {
      const params = {
        id: lead_id,
      };
      setIsProcess(true);
      const res = await registerToOrg(params);
      if (res && res.data) {
        dispatch(getAllLeads());
        toast.info("Lead successfully converted!");
      } else {
        toast.error(
          "There was an error during the process, please contact admin"
        );
      }
    }
    setIsProcess(false);
    setOpen(false);
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Warning!</strong>
        </Modal.Header>
        <Modal.Body>
          <span className="text-gray-500">{`Are you sure you want to ${status} this lead?`}</span>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => onSubmit()}
              disabled={isProcess}
            >
              {isProcess && (
                <Spinner
                  aria-label="Alternate spinner button example"
                  size="sm"
                  color="success"
                />
              )}
              <div className="flex items-center gap-x-2">Yes, I’m sure</div>
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
