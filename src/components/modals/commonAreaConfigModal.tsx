/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Dropdown, Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addCommonAreaBasementReducer,
  addCommonAreaTowerReducer,
  getAllCommonAreaReducer,
} from "../../store/features/reducers";
import type { ProjectState } from "../../types";
import { reloadCommonAreaTable } from "../../store/features/projectSlice";

interface commonAreaType {
  commonAreaId: number;
  commonAreaCategories: number[];
  projectTowerId?: number;
  floor?: number;
  basement?: number;
}

export const CommonAreaConfigModal = function (props: any) {
  const { allCommonArea }: ProjectState = useSelector(
    (state: any) => state.project,
  );

  const { isOpen, setOpen, data, id } = props;

  const { project_id } = useParams();
  const [selectedCommonArea, setSelectedCommonArea] = useState<commonAreaType>({
    commonAreaId: id,
    commonAreaCategories: [],
  });
  const [storedItem, setStoredItem] = useState<any>([]);
  const dispatch = useDispatch();

  const getElementId = (name) => {
    return allCommonArea && allCommonArea.find((o) => o.name == name)?.id;
  };
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllCommonAreaReducer(project_id));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!storedItem) {
      if (selectedCommonArea.floor !== undefined) {
        setStoredItem([
          {
            key: selectedCommonArea.floor,
            commonAreaCategories: selectedCommonArea.commonAreaCategories,
          },
        ]);
      } else {
        if (selectedCommonArea.basement !== undefined) {
          setStoredItem([
            {
              key: selectedCommonArea.basement,
              commonAreaCategories: selectedCommonArea.commonAreaCategories,
            },
          ]);
        }
      }
    } else {
      if (selectedCommonArea.floor !== undefined) {
        const hasOldItems =
          storedItem &&
          storedItem.length > 0 &&
          storedItem.filter((o) => o.key != selectedCommonArea.floor);
        if (hasOldItems) {
          setStoredItem([
            ...hasOldItems,
            {
              key: selectedCommonArea.floor,
              commonAreaCategories: selectedCommonArea.commonAreaCategories,
            },
          ]);
        } else {
          setStoredItem([
            ...storedItem,
            {
              key: selectedCommonArea.floor,
              commonAreaCategories: selectedCommonArea.commonAreaCategories,
            },
          ]);
        }
      } else {
        if (selectedCommonArea.basement !== undefined) {
          const hasOldItems =
            storedItem &&
            storedItem.length > 0 &&
            storedItem.filter((o) => o.key != selectedCommonArea.basement);
          if (hasOldItems) {
            setStoredItem([
              ...hasOldItems,
              {
                key: selectedCommonArea.basement,
                commonAreaCategories: selectedCommonArea.commonAreaCategories,
              },
            ]);
          } else {
            setStoredItem([
              ...storedItem,
              {
                key: selectedCommonArea.basement,
                commonAreaCategories: selectedCommonArea.commonAreaCategories,
              },
            ]);
          }
        }
      }
    }
  }, [selectedCommonArea]);

  const addRemoveItem = (e) => {
    const isPresent =
      selectedCommonArea.commonAreaCategories &&
      selectedCommonArea.commonAreaCategories.find((o) => o == e.target.id);
    if (isPresent) {
      const newItems =
        selectedCommonArea.commonAreaCategories &&
        selectedCommonArea.commonAreaCategories.filter((o) => o != e.target.id);
      selectedCommonArea.commonAreaCategories = newItems;

      setSelectedCommonArea((prevState: any) => {
        return {
          ...prevState,
          commonAreaCategories: [...prevState.commonAreaCategories, newItems],
        };
      });
    } else {
      setSelectedCommonArea((prevState: any) => {
        return {
          ...prevState,
          commonAreaCategories: [
            ...prevState.commonAreaCategories,
            parseInt(e.target.id),
          ],
        };
      });
    }
  };

  useEffect(() => {
    if (allCommonArea && data && data.floors && data.floors.length) {
      setSelectedCommonArea((prevState: any) => {
        return {
          ...prevState,
          projectTowerId: data.id,
          floor: data.floors && data.floors.length && data.floors[0].key,
          commonAreaCategories:
            (data.floors &&
              data.floors[0].configuration &&
              data.floors[0].configuration.commonAreaCategory &&
              data.floors[0].configuration.commonAreaCategory.map((keys) => {
                return getElementId(keys.name);
              })) ||
            [],
        };
      });
      setStoredItem([
        {
          key: data.floors && data.floors.length && data.floors[0].key,
          commonAreaCategories: selectedCommonArea.commonAreaCategories,
        },
      ]);
    } else {
      if (allCommonArea && data && data.length) {
        setSelectedCommonArea((prevState: any) => {
          return {
            ...prevState,
            basement: data[0].key,
            commonAreaCategories:
              (data &&
                data.length &&
                data[0].configuration &&
                data[0].configuration.commonAreaCategory &&
                data[0].configuration.commonAreaCategory.map((keys) => {
                  return getElementId(keys.name);
                })) ||
              [],
          };
        });
        setStoredItem([
          {
            key: data[0].key,
            commonAreaCategories: selectedCommonArea.commonAreaCategories,
          },
        ]);
      }
    }
  }, [data, allCommonArea]);

  const selectTower = (key) => {
    if (selectedCommonArea.floor != key) {
      const oldI = storedItem && storedItem.find((o) => o.key == key);
      const dataConfig =
        data.floors && data.floors.find((k) => k.key == key).configuration;
      setSelectedCommonArea((prevState: any) => {
        return {
          ...prevState,
          floor: key,
          commonAreaCategories:
            oldI && oldI.commonAreaCategories
              ? oldI.commonAreaCategories
              : (dataConfig &&
                  dataConfig.commonAreaCategory &&
                  dataConfig.commonAreaCategory.map((keys) => {
                    return getElementId(keys.name);
                  })) ||
                [],
        };
      });
    }
  };

  const selectBasement = (key) => {
    if (selectedCommonArea.basement != key) {
      const oldI = storedItem && storedItem.find((o) => o.key == key);
      const dataConfig =
        data && data.length && data.find((k) => k.key == key).configuration;
      setSelectedCommonArea((prevState: any) => {
        return {
          ...prevState,
          basement: key,
          commonAreaCategories:
            oldI && oldI.commonAreaCategories
              ? oldI.commonAreaCategories
              : (dataConfig &&
                  dataConfig.commonAreaCategory &&
                  dataConfig.commonAreaCategory.map((keys) => {
                    return getElementId(keys.name);
                  })) ||
                [],
        };
      });
    }
  };
  const addCommonArea = () => {
    let hasAdded = false;
    if (data && data.floors) {
      storedItem &&
        storedItem.map((params) => {
          if (
            params.commonAreaCategories &&
            params.commonAreaCategories.length > 0
          ) {
            hasAdded = true;
            const newParams = {
              commonAreaId: selectedCommonArea.commonAreaId,
              projectTowerId: selectedCommonArea.projectTowerId,
              floor: params.key,
              commonAreaCategories: params.commonAreaCategories,
            };
            dispatch(addCommonAreaTowerReducer(newParams));
          }
        });
    } else {
      storedItem &&
        storedItem.map((params) => {
          if (
            params.commonAreaCategories &&
            params.commonAreaCategories.length > 0
          ) {
            hasAdded = true;
            const newParams = {
              commonAreaId: selectedCommonArea.commonAreaId,
              basement: params.key,
              commonAreaCategories: params.commonAreaCategories,
            };
            dispatch(addCommonAreaBasementReducer(newParams));
          }
        });
    }
    setOpen(false);
    setSelectedCommonArea({
      commonAreaId: id,
      commonAreaCategories: [],
    });
    if (hasAdded) {
      dispatch(reloadCommonAreaTable(true));
    }
  };

  const getName = (si) => {
    const n = allCommonArea.find((ca) => ca.id == si);
    return n && n.name ? n.name : "loading";
  };
  return (
    <>
      <Modal
        onClose={() => {
          setSelectedCommonArea({
            commonAreaId: id,
            commonAreaCategories: [],
          });
          setOpen(false);
        }}
        show={isOpen}
        size="4xl"
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{`${
            data && data.floors ? data.name : "Basement"
          } Common Area Configuration`}</strong>
        </Modal.Header>
        <Modal.Body>
          {(allCommonArea &&
            allCommonArea.length > 0 &&
            selectedCommonArea.commonAreaId && (
              <div className="flex gap-2">
                <div className="flex w-[50%] flex-col">
                  <span className="font-medium">
                    {data && data.floors ? "Floors" : "Levels"}
                  </span>
                  <div className="mt-9 flex flex-col shadow">
                    {(data &&
                      data.floors &&
                      data.floors.map((f, index) => {
                        return (
                          <div
                            onClick={() => selectTower(f.key)}
                            key={index}
                            className={`cursor-pointer p-3 hover:bg-gray-100 ${
                              selectedCommonArea?.floor == f.key &&
                              "bg-gray-100"
                            }`}
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
                              onClick={() => selectBasement(f.key)}
                              key={index}
                              className={`cursor-pointer p-3 hover:bg-gray-100 ${
                                selectedCommonArea?.basement == f.key &&
                                "bg-gray-100"
                              }`}
                            >
                              <span>{f.value}</span>
                            </div>
                          );
                        }))}
                  </div>
                </div>
                <div className="flex w-[50%] flex-col">
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
                      {allCommonArea &&
                        allCommonArea.length > 0 &&
                        allCommonArea.map((ca, index) => {
                          return (
                            <Dropdown.Item key={index}>
                              <div className="flex items-center gap-2 ">
                                <Checkbox
                                  id={ca.id.toString()}
                                  //   onClick={(e) => addRemoveItem(e)}
                                  onChange={(e) => addRemoveItem(e)}
                                  checked={
                                    selectedCommonArea.commonAreaCategories &&
                                    selectedCommonArea.commonAreaCategories
                                      .length > 0 &&
                                    selectedCommonArea.commonAreaCategories.find(
                                      (o) => o == ca.id,
                                    )
                                      ? true
                                      : false
                                  }
                                />
                                <Label htmlFor={ca.id.toString()}>
                                  {ca.name}
                                </Label>
                              </div>
                            </Dropdown.Item>
                          );
                        })}
                    </Dropdown>
                  </div>
                  <div className="mt-5 flex flex-col shadow">
                    {selectedCommonArea &&
                    selectedCommonArea.commonAreaCategories &&
                    selectedCommonArea.commonAreaCategories.length ? (
                      selectedCommonArea.commonAreaCategories.map(
                        (si, index) => {
                          return (
                            <div
                              key={index}
                              className="flex cursor-pointer items-center gap-2 p-3 hover:bg-gray-100"
                            >
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.0588 3.26223H0.941176C0.691561 3.26223 0.452169 3.15186 0.275664 2.95539C0.0991596 2.75892 0 2.49246 0 2.21461C0 1.93677 0.0991596 1.6703 0.275664 1.47383C0.452169 1.27737 0.691561 1.16699 0.941176 1.16699H15.0588C15.3084 1.16699 15.5478 1.27737 15.7243 1.47383C15.9008 1.6703 16 1.93677 16 2.21461C16 2.49246 15.9008 2.75892 15.7243 2.95539C15.5478 3.15186 15.3084 3.26223 15.0588 3.26223Z"
                                  fill="#1F2A37"
                                />
                                <path
                                  d="M15.0588 9.54795H0.941176C0.691561 9.54795 0.452169 9.43757 0.275664 9.2411C0.0991596 9.04464 0 8.77817 0 8.50033C0 8.22248 0.0991596 7.95601 0.275664 7.75955C0.452169 7.56308 0.691561 7.45271 0.941176 7.45271H15.0588C15.3084 7.45271 15.5478 7.56308 15.7243 7.75955C15.9008 7.95601 16 8.22248 16 8.50033C16 8.77817 15.9008 9.04464 15.7243 9.2411C15.5478 9.43757 15.3084 9.54795 15.0588 9.54795Z"
                                  fill="#1F2A37"
                                />
                                <path
                                  d="M15.0588 15.8337H0.941176C0.691561 15.8337 0.452169 15.7233 0.275664 15.5268C0.0991596 15.3304 0 15.0639 0 14.786C0 14.5082 0.0991596 14.2417 0.275664 14.0453C0.452169 13.8488 0.691561 13.7384 0.941176 13.7384H15.0588C15.3084 13.7384 15.5478 13.8488 15.7243 14.0453C15.9008 14.2417 16 14.5082 16 14.786C16 15.0639 15.9008 15.3304 15.7243 15.5268C15.5478 15.7233 15.3084 15.8337 15.0588 15.8337Z"
                                  fill="#1F2A37"
                                />
                              </svg>

                              <span>
                                {allCommonArea && allCommonArea.length ? (
                                  getName(si)
                                ) : (
                                  <div className="flex w-full items-center">
                                    <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                  </div>
                                )}
                              </span>
                            </div>
                          );
                        },
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )) || (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => {
                addCommonArea();
              }}
              //   disabled={isProcess}
            >
              <div className="flex items-center gap-x-2">Submit</div>
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setSelectedCommonArea({
                  commonAreaId: id,
                  commonAreaCategories: [],
                });
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
