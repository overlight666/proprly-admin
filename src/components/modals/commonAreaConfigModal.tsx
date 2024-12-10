/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Dropdown, Checkbox, Label } from "flowbite-react";

export const CommonAreaConfigModal = function (props: any) {
  const { isOpen, setOpen, data } = props;
  console.log(data);
  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="4xl">
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{`${
            data && data.floors ? data.name : "Basement"
          } Common Area Configuration`}</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="flex">
            <div className="flex w-[50%] flex-col">
              <span className="font-medium">
                {data && data.floors ? "Floors" : "Levels"}
              </span>
              <div className="mt-5 flex flex-col shadow">
                {(data &&
                  data.floors &&
                  data.floors.map((f, index) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer p-3 hover:bg-gray-100"
                      >
                        <span>{f.value}</span>
                      </div>
                    );
                  })) ||
                  (data &&
                    data.length &&
                    data.map((f, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer p-3 hover:bg-gray-100"
                        >
                          <span>{f.value}</span>
                        </div>
                      );
                    }))}
              </div>
            </div>
            <div className="flex w-[50%]">
              <div className="flex w-full justify-between">
                <span className="font-medium">Common Area Categories</span>
                <Dropdown
                  inline
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <Button color="white" className="p-0">
                      <div className="flex items-center p-0 text-xs">
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="20"
                            height="20"
                            rx="3"
                            fill="#1A56DB"
                          />
                          <path
                            d="M14.2666 9.96686H10.5333V6.23353C10.5333 6.09208 10.4771 5.95642 10.3771 5.85641C10.2771 5.75639 10.1414 5.7002 9.99995 5.7002C9.8585 5.7002 9.72285 5.75639 9.62283 5.85641C9.52281 5.95642 9.46662 6.09208 9.46662 6.23353V9.96686H5.73328C5.59184 9.96686 5.45618 10.0231 5.35616 10.1231C5.25614 10.2231 5.19995 10.3587 5.19995 10.5002C5.19995 10.6416 5.25614 10.7773 5.35616 10.8773C5.45618 10.9773 5.59184 11.0335 5.73328 11.0335H9.46662V14.7669C9.46662 14.9083 9.52281 15.044 9.62283 15.144C9.72285 15.244 9.8585 15.3002 9.99995 15.3002C10.1414 15.3002 10.2771 15.244 10.3771 15.144C10.4771 15.044 10.5333 14.9083 10.5333 14.7669V11.0335H14.2666C14.4081 11.0335 14.5437 10.9773 14.6437 10.8773C14.7438 10.7773 14.8 10.6416 14.8 10.5002C14.8 10.3587 14.7438 10.2231 14.6437 10.1231C14.5437 10.0231 14.4081 9.96686 14.2666 9.96686Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </Button>
                  )}
                >
                  <Dropdown.Item>
                    <div className="flex items-center gap-2 ">
                      <Checkbox id="promotion" />
                      <Label htmlFor="promotion">Swimming Pool</Label>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div className="flex items-center gap-2">
                      <Checkbox id="promotion" />
                      <Label htmlFor="promotion">Garden</Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => {
                setOpen(false);
              }}
              //   disabled={isProcess}
            >
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
