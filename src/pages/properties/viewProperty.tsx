/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ChangeEvent } from "react";
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type {
  ImageState,
  OrgState,
  ProjectState,
  Property,
  PropertyState,
  TowerData,
  WarrantyInterface,
} from "../../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Select from "react-select";
import Owner from "./propertyItems/owner";
import Warranty from "./propertyItems/warranty";
// import Reports from "./propertyItems/reports";
import { useNavigate, useParams } from "react-router";
import {
  attachPropertyUserReducer,
  // getProperties,
  getSingleProperty,
  getTowersReducer,
  patchProperty,
  postWarranties,
  postWarrantyFiles,
  putWarrantyFiles,
} from "../../store/features/reducers";
import ErrorHandler from "../../components/error";
import {
  clearAttachedUsers,
  selectProperty,
} from "../../store/features/propertySlice";
import { clearWarranty } from "../../store/features/imageSlice";

const ViewProperty: FC = function () {
  const { id, project_id, property_id }: any = useParams();
  const { warrantyData }: ImageState = useSelector(
    (state: any) => state.uploads
  );
  const [ownerList, setOwnerList] = useState<any>([]);
  const [existingGroups, setExistingGroups] = useState<any>([]);
  const [attachedOwner, setAttachedOwner] = useState<any>([]);
  const [uploadedWarranties, setUploadedWarranties] = useState<any>({
    groups: [],
  });
  const { selectedProperty, attachedUser }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [errors, setErrors] = useState<any>([]);
  const [numFloors, setNumFloors] = useState<any>(0);
  const [selectedTower, setSelectedTower] = useState<any>(undefined);
  const [selectedFloor, setSelectedFloor] = useState<any>(undefined);
  const { projectTowers }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const addOwner = (name, email, mobile) => {
    if (name.trim() !== "" && mobile.trim() !== "" && email.trim() !== "") {
      const params = {
        fullName: name,
        mobile,
        email,
        roleId: 6,
      };
      setOwnerList((oldArray) => [params, ...oldArray]);
    } else {
      toast.error("all fields are required!");
    }
  };

  const attachOwner = (value) => {
    try {
      if (value && value !== "Please select") {
        const user = {
          roleId: 6,
          id: JSON.parse(value).id,
          propertyId: property_id,
          password: "admin",
          // ...JSON.parse(value),
        };
        dispatch(attachPropertyUserReducer(user));
        // setAttachedOwner((oldArray) => [JSON.parse(value), ...oldArray]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (attachedUser && attachedUser.id) {
      setAttachedOwner(attachedUser?.user);
      dispatch(selectProperty(attachedUser));
      dispatch(clearAttachedUsers());
    }
  }, [attachedUser]);
  const [towerOptions, setTowerOptions] = useState<any>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );

  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );

  let isInit = false;
  let towerInit = false;
  let isWarrantyInit = false;
  useEffect(() => {
    if (!towerInit) {
      dispatch(getTowersReducer(project_id));
      towerInit = true;
    }
  }, []);

  useEffect(() => {
    if (!isInit) {
      dispatch(getSingleProperty(property_id));
      isInit = true;
    }
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      setFormData(selectedProperty);
      if (selectedProperty.user) {
        setAttachedOwner(selectedProperty.user);
      }
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (projectTowers) {
      const n = projectTowers.map((t: TowerData) => {
        return {
          ...t,
          label: t.name,
          value: t.id,
        };
      });
      setTowerOptions(n);
    }
  }, []);

  useEffect(() => {
    if (towerOptions) {
      setSelectedTower(
        towerOptions.find((t) => t.value === formData.projectTowerId)
      );
    }
  }, [towerOptions]);

  useEffect(() => {
    if (numFloors) {
      setSelectedFloor(numFloors.find((t) => t.value == formData.floor));
    }
  }, [numFloors]);

  useEffect(() => {
    if (selectedTower) {
      const selTower: any =
        projectTowers.length &&
        projectTowers.find((t: TowerData) => t.id === selectedTower.id);
      const floors = selTower.floorList.map((f) => {
        return {
          value: f.key,
          label: f.value,
        };
      });
      setNumFloors(floors);
    }
  }, [selectedTower]);
  const [formData, setFormData] = useState<Property>({
    name: "",
    projectId: project_id,
    projectTowerId: undefined,
    lotNo: undefined,
    floor: undefined,
    unitNo: undefined,
    tower: undefined,
    bedroom: undefined,
    bathroom: undefined,
    ensuite: undefined,
    studyRoom: undefined,
    storage: undefined,
    parkingSpaces: undefined,
    internalArea: undefined,
    externalArea: undefined,
    status: "pre_settlement",
  });

  const options: any = [
    { value: "pre_settlement", label: "Pre-Settlement" },
    { value: "handover", label: "Handover" },
    { value: "post_handover", label: "Post-Handover" },
  ];

  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [showCard3, setShowCard3] = useState(true);
  const [showCard4, setShowCard4] = useState(true);
  // const [showCard5, setShowCard5] = useState(true);

  useEffect(() => {
    if (formData.user && formData.user.length > 0) {
      setOwnerList((oldArray) => [formData.user, ...oldArray]);
    }
  }, [formData]);

  useEffect(() => {
    if (warrantyData) {
      const warrant =
        uploadedWarranties &&
        uploadedWarranties.groups &&
        uploadedWarranties.groups.find(
          (obj) => obj.group === warrantyData.group
        );
      if (!warrant) {
        uploadedWarranties.groups.push({
          group: warrantyData.group,
          files: [warrantyData.id],
          data: [warrantyData],
        });
      } else {
        uploadedWarranties &&
          uploadedWarranties.groups &&
          uploadedWarranties.groups.map((obj) => {
            if (obj.group === warrantyData.group) {
              const arr1 = [...new Set(obj.data)];
              const arr = [...new Set(obj.files)];
              arr1.push(warrantyData);
              arr.push(warrantyData.id);
              obj.files = arr;
              obj.data = arr1;
            }
          });
      }
      setUploadedWarranties(uploadedWarranties);
      dispatch(clearWarranty());
    }
  }, [warrantyData]);

  useEffect(() => {
    if (
      selectedProperty?.warranty &&
      selectedProperty?.warranty.length > 0 &&
      !isWarrantyInit
    ) {
      setUploadedWarranties([]);
      const warrantyG: any = [];
      selectedProperty?.warranty.map((warranty: WarrantyInterface) => {
        warrantyG.push(warranty.group);
        const warrant =
          uploadedWarranties &&
          uploadedWarranties.groups &&
          uploadedWarranties.groups.find(
            (obj) => obj.group === warranty?.group
          );
        if (!warrant) {
          uploadedWarranties.groups.push({
            warrantyId: warranty.id,
            group: warranty?.group,
            files: warranty.files.map((w) => w.id),
            data: [...warranty.files],
          });
        } else {
          uploadedWarranties &&
            uploadedWarranties.groups &&
            uploadedWarranties.groups.map((obj) => {
              if (obj.group === warranty?.group) {
                const arr1 = [...new Set(obj.data)];
                const arr = [...new Set(obj.files)];
                arr1.push(...warranty.files);
                arr.push(...warranty.files.map((w) => w.id));
                obj.warrantyId = warranty?.id;
                obj.files = [...new Set(arr)];
                obj.data = [
                  ...new Map(
                    arr1.map((item: any) => [item["id"], item])
                  ).values(),
                ];
              }
            });
        }
        setUploadedWarranties(uploadedWarranties);
      });
      const newg = [...new Set(warrantyG)];
      setExistingGroups(newg);
      isWarrantyInit = true;
    }
  }, [selectedProperty]);

  const handleInputChange = (event: any) => {
    try {
      const { name, value } = event.target;
      if (name === "projectTowerId") {
        const fo: any = [];
        for (let i = 1; i <= parseInt(value.numFloors); i++) {
          fo.push({
            label: i,
            value: i,
          });
        }

        setNumFloors(fo);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value.id,
        }));
      } else if (name === "status") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value.value,
        }));
      } else if (name === "floor") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value.value,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitProperty = () => {
    setErrors([]);
    // if (formData.name !== "" && formData.name !== undefined) {
    if (formData.lotNo !== "" && formData.lotNo !== undefined) {
      if (formData.unitNo !== "" && formData.unitNo !== undefined) {
        if (formData.bathroom !== "" && formData.bathroom !== undefined) {
          if (formData.bedroom !== "" && formData.bedroom !== undefined) {
            if (formData.ensuite !== "" && formData.ensuite !== undefined) {
              if (formData.floor !== undefined) {
                if (
                  formData.externalArea !== "" &&
                  formData.externalArea !== undefined
                ) {
                  if (
                    formData.internalArea !== "" &&
                    formData.internalArea !== undefined
                  ) {
                    if (
                      formData.parkingSpaces !== "" &&
                      formData.parkingSpaces !== undefined
                    ) {
                      dispatch(patchProperty({ ...formData, id: property_id }));
                      const newGroups =
                        uploadedWarranties &&
                        uploadedWarranties.groups &&
                        uploadedWarranties.groups.length &&
                        uploadedWarranties.groups.filter(
                          (uploaded) => !existingGroups.includes(uploaded.group)
                        );

                      const oldGroups =
                        uploadedWarranties &&
                        uploadedWarranties.groups &&
                        uploadedWarranties.groups.length &&
                        uploadedWarranties.groups.filter((uploaded) =>
                          existingGroups.includes(uploaded.group)
                        );
                      dispatch(
                        postWarrantyFiles({
                          propertyId: property_id,
                          groups: newGroups,
                        })
                      );
                      oldGroups &&
                        oldGroups.map((p) => {
                          const params = {
                            warrantyId: p.warrantyId,
                            files: p.files,
                          };
                          dispatch(putWarrantyFiles(params));
                        });
                      dispatch(clearWarranty());
                      dispatch(getSingleProperty(property_id));
                      toast.info("Property has been updated!");
                      setTimeout(() => {
                        navigate(
                          `/organization/${id}/project/${project_id}/properties`
                        );
                      }, 2000);
                    } else {
                      setErrors((oldArray) => [
                        ...[...new Set(oldArray)],
                        "Parking spaces is required!",
                      ]);
                    }
                  } else {
                    setErrors((oldArray) => [
                      ...[...new Set(oldArray)],
                      "Internal area is required!",
                    ]);
                  }
                } else {
                  setErrors((oldArray) => [
                    ...[...new Set(oldArray)],
                    "External area is required!",
                  ]);
                }
              } else {
                setErrors((oldArray) => [
                  ...[...new Set(oldArray)],
                  "Floor is required!",
                ]);
              }
            } else {
              setErrors((oldArray) => [
                ...[...new Set(oldArray)],
                "Ensuite is required!",
              ]);
            }
          } else {
            setErrors((oldArray) => [
              ...[...new Set(oldArray)],
              "Bedroom is required!",
            ]);
          }
        } else {
          setErrors((oldArray) => [
            ...[...new Set(oldArray)],
            "Bathroom is required!",
          ]);
        }
      } else {
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],
          "Unit is required!",
        ]);
      }
    } else {
      setErrors((oldArray) => [
        ...[...new Set(oldArray)],
        "Lot no is required!",
      ]);
    }
    // } else {
    //   setErrors((oldArray) => [
    //     ...[...new Set(oldArray)],
    //     "Property name is required!",
    //   ]);
    // }
  };

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    group: string
  ) => {
    if (!event.target.files) {
      return;
    } else {
      const params = {
        group: group,
        file: event.target.files[0],
      };
      dispatch(postWarranties(params));
    }
  };

  const removeUploadedWarranty = (group, data) => {
    const newUploads =
      uploadedWarranties &&
      uploadedWarranties.groups &&
      uploadedWarranties.groups.map((obj) => {
        if (obj.group == group) {
          console.log(data.map((o) => o.id));
          obj.files = data.map((o) => o.id);
          obj.data = data;
        }
        return obj;
      });
    setUploadedWarranties({ groups: newUploads });
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      {!selectedProperty && (
        <div className="fixed z-50 flex h-screen w-full items-center bg-white/30 backdrop-blur-sm">
          <div role="status" className="ml-[37%]">
            <svg
              aria-hidden="true"
              className="h-20 w-20 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/organization">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Organizations</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/organization/${selectedOrganization?.id}`}>
              {selectedOrganization?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/organization/new">
              {selectedProject?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/organization/${selectedOrganization?.id}/project/${selectedProject?.id}/properties`}
            >
              Properties
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {formData && `Unit ${formData.unitNo} Lot ${formData.lotNo}`}
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Property{" "}
            {formData && `Unit ${formData.unitNo} Lot ${formData.lotNo}`}
          </h1>
        </div>
        <div className="flex w-full flex-col">
          <ErrorHandler errors={errors} setErrors={setErrors} />
          <div
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px]"
            onClick={() => setShowCard1(!showCard1)}
          >
            <h1 className="font-bold">Basic Information</h1>
            {showCard1 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard1 && (
            <>
              {/* <div className="grid w-[50%] grid-cols-1 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Property Name <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                  />
                </div>
              </div> */}
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Lot No <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="lotNo"
                    name="lotNo"
                    value={formData.lotNo}
                    onChange={handleInputChange}
                    placeholder="Lot no"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="organization">
                    Property status <span className="text-[red]">*</span>
                  </Label>
                  <Select
                    // className="basic-single"
                    // menuPosition="fixed"
                    classNamePrefix="select"
                    options={options}
                    // isSearchable={true}
                    defaultValue={options.find(
                      (s) => s.value === formData.status
                    )}
                    onChange={(event) =>
                      handleInputChange({
                        target: {
                          name: "status",
                          value: event,
                        },
                      })
                    }
                    id="status"
                    name="status"
                    // value={country}
                  />
                </div>
              </div>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                {selectedTower && (
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Tower <span className="text-[red]">*</span>
                    </Label>

                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={towerOptions}
                      // isSearchable={true}
                      defaultValue={selectedTower}
                      onChange={(event) =>
                        handleInputChange({
                          target: {
                            name: "projectTowerId",
                            value: event,
                          },
                        })
                      }
                      id="projectTowerId"
                      name="projectTowerId"
                    />
                  </div>
                )}
                {selectedFloor && (
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Floor <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={numFloors}
                      // isSearchable={true}
                      defaultValue={selectedFloor}
                      onChange={(event) =>
                        handleInputChange({
                          target: {
                            name: "floor",
                            value: event,
                          },
                        })
                      }
                      id="floor"
                      name="floor"
                      // value={country}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <div
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px]"
            onClick={() => setShowCard2(!showCard2)}
          >
            <h1 className="font-bold">Property Specification</h1>
            {showCard2 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard2 && (
            <>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Unit No <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="unitNo"
                    name="unitNo"
                    value={formData.unitNo}
                    onChange={handleInputChange}
                    placeholder="Unit no"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Bedroom<span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="bedroom"
                    name="bedroom"
                    value={formData.bedroom}
                    onChange={handleInputChange}
                    placeholder="Bedroom"
                    required
                  />
                </div>
              </div>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Bathroom <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="bathroom"
                    name="bathroom"
                    value={formData.bathroom}
                    onChange={handleInputChange}
                    placeholder="Bathroom"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Ensuite<span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="ensuite"
                    name="ensuite"
                    value={formData.ensuite}
                    onChange={handleInputChange}
                    placeholder="Ensuite"
                    required
                  />
                </div>
              </div>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Study Room <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="studyRoom"
                    name="studyRoom"
                    value={formData.studyRoom}
                    onChange={handleInputChange}
                    placeholder="Study Room"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Storage<span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="storage"
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    placeholder="Storage"
                    required
                  />
                </div>
              </div>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Parking Spaces <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="parkingSpaces"
                    name="parkingSpaces"
                    value={formData.parkingSpaces}
                    onChange={handleInputChange}
                    placeholder="Parking Spaces"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">Split Level Property</Label>
                  <Select
                    isDisabled={true}
                    // menuPosition="fixed"
                    classNamePrefix="select"
                    options={[]}
                    // isSearchable={false}
                    id="split"
                    name="split"
                  />
                </div>
              </div>
              <div className="grid w-[50%] grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    Internal Area (m<span className="align-super">2</span>)
                    <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="internalArea"
                    name="internalArea"
                    value={formData.internalArea}
                    onChange={handleInputChange}
                    placeholder="Internal Area"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="name">
                    External Area (m<span className="align-super">2</span>)
                    <span className="text-[red]">*</span>
                  </Label>
                  <TextInput
                    id="externalArea"
                    name="externalArea"
                    value={formData.externalArea}
                    onChange={handleInputChange}
                    placeholder="External Area"
                    required
                  />
                </div>
              </div>
            </>
          )}
          <div
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px]"
            onClick={() => setShowCard3(!showCard3)}
          >
            <h1 className="font-bold">Owner Information</h1>
            {showCard3 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard3 && (
            <Owner
              addOwner={addOwner}
              ownerList={ownerList}
              attachedOwner={attachedOwner}
              attachOwner={attachOwner}
            />
          )}
          <div
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px]"
            onClick={() => setShowCard4(!showCard4)}
          >
            <h1 className="font-bold">Warranty Information</h1>
            {showCard4 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard4 && (
            <Warranty
              setUploadedWarranties={removeUploadedWarranty}
              handleUpload={handleUpload}
              uploadedWarranties={uploadedWarranties}
            />
          )}
          {/* <div
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px]"
            onClick={() => setShowCard5(!showCard5)}
          >
            <h1 className="font-bold">Upload Reports</h1>
            {showCard5 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard5 && <Reports />} */}
        </div>
      </div>
      <div className="m-3 grid grid-cols-1 gap-y-2">
        <div className="flex">
          <Button
            className="mx-1"
            onClick={() => {
              submitProperty();
            }}
            color="primary"
          >
            Update Property
          </Button>
          <Button
            className="mx-1"
            onClick={() => {
              navigate(`/organization/${id}/project/${project_id}/properties`);
            }}
            color="gray"
          >
            Cancel
          </Button>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ViewProperty;
