/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";

import "react-toastify/dist/ReactToastify.css";
// import { BsSliders2Vertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getCommonAreaReducer } from "../../store/features/reducers";
import CommonAreaLocationMappingTable from "../../components/commonAreaLocationMappingTable";
import { Button } from "flowbite-react";

const CommonAreaConfigure: FC = function () {
  const { common_area_id }: any = useParams();

  const [showCard1, setShowCard1] = useState(true);
  const dispatch = useDispatch();
  let isInit = false;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInit) {
      dispatch(getCommonAreaReducer(common_area_id));
      isInit = true;
    }
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full items-center justify-between border-b-[1px]"
        onClick={() => setShowCard1(!showCard1)}
      >
        <h1 className="mb-5 mt-7 font-bold">Common Area Location Mapping</h1>
        {showCard1 ? (
          <FaAngleUp className="h-[50px] cursor-pointer" />
        ) : (
          <FaAngleDown className="h-[50px] cursor-pointer" />
        )}
      </div>
      {showCard1 && <CommonAreaLocationMappingTable />}
      <div className="my-10 flex">
        <Button className="mx-1" color="primary">
          Configure
        </Button>
        <Button
          className="mx-1"
          onClick={() => {
            navigate(-1);
          }}
          color="gray"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CommonAreaConfigure;
