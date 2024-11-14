/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type {
  OrgState,
  ProjectState,
  Property,
  PropertyState,
  TowerData,
} from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Select from "react-select";
import Owner from "./propertyItems/owner";
import Warranty from "./propertyItems/warranty";
import Reports from "./propertyItems/reports";
import { useNavigate, useParams } from "react-router";
import {
  getSingleProperty,
  getTowersReducer,
  registerProperty,
} from "../../store/features/reducers";
import ErrorHandler from "../../components/error";

const ViewProperty: FC = function () {
  const { selectedProperty }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [errors, setErrors] = useState<any>([]);
  const [numFloors, setNumFloors] = useState<any>(0);
  const [selectedTower, setSelectedTower] = useState<any>(undefined);
  const [selectedFloor, setSelectedFloor] = useState<any>(undefined);
  const { projectTowers }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const [towerOptions, setTowerOptions] = useState<any>([]);
  const { project_id, property_id }: any = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );

  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );

  useEffect(() => {
    dispatch(getTowersReducer(project_id));
  }, []);

  useEffect(() => {
    if (!selectedProperty) {
      dispatch(getSingleProperty(property_id));
    } else {
      setFormData(selectedProperty);
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
      const fo: any = [];
      for (let i = 1; i <= parseInt(selectedTower.numFloors); i++) {
        fo.push({
          label: i,
          value: i,
        });
      }

      setNumFloors(fo);
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
  const [showCard5, setShowCard5] = useState(true);

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
                      dispatch(registerProperty(formData));
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
  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
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
                    menuPosition="fixed"
                    classNamePrefix="select"
                    options={options}
                    isSearchable={true}
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
                      menuPosition="fixed"
                      classNamePrefix="select"
                      options={towerOptions}
                      isSearchable={true}
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
                      menuPosition="fixed"
                      classNamePrefix="select"
                      options={numFloors}
                      isSearchable={true}
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
            <h1 className="font-bold">Propert Specification</h1>
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
                    menuPosition="fixed"
                    classNamePrefix="select"
                    options={[]}
                    isSearchable={false}
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
          {showCard3 && <Owner />}
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
          {showCard4 && <Warranty />}
          <div
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
          {showCard5 && <Reports />}
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
              navigate(`/organization/${selectedOrganization?.id}`);
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
