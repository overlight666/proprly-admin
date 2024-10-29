/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import OrganizationHeader from "../../components/organizationHeader";
import LeadTable from "../../components/leadTable";
import { useDispatch, useSelector } from "react-redux";
import type { LeadState, ReducerTypes } from "../../types";
import { getAllLeads } from "../../store/features/reducers";

const SignupLeads: FC = function () {
  const { leadList }: LeadState = useSelector(
    (state: ReducerTypes) => state.lead
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (leadList === undefined) {
      dispatch(getAllLeads());
    }
  }, [dispatch, leadList]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="overflow-x-auto bg-[#ffffff] ">
        <div className="col-span-full p-5">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
            Sign-Up Leads
          </h1>
          <OrganizationHeader canAddOrg={false} canTransformTable={false} />
        </div>

        <LeadTable />
      </div>
    </NavbarSidebarLayout>
  );
};

export default SignupLeads;
