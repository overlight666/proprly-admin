/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Spinner } from "flowbite-react";

export const ConfirmModal = function (props: any) {
  const { isOpen, setOpen, confirmHandler, isProcess, title } = props;

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Warning!</strong>
        </Modal.Header>
        <Modal.Body>
          <span className="text-gray-500">{title}</span>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => {
                confirmHandler();
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
