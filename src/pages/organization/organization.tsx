/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Dropdown, Spinner } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import OrganizationHeader from "../../components/organizationHeader";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  Organization,
  OrgState,
  ReducerTypes,
} from "../../types";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import OrgTable from "../../components/orgTable";
import { setSelectedOrganization } from "../../store/features/organizationSlice";

const OrganizationPage: FC = function () {
  const dispatch = useDispatch();
  const { orgList, isIdle }: OrgState = useSelector(
    (state: ReducerTypes) => state.organization
  );

  const { isGrid }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`${page}`);
  };
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="overflow-x-auto bg-[#ffffff] ">
        <div className="col-span-full p-5">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
            Organizations
          </h1>
          <OrganizationHeader canAddOrg={true} canTransformTable={true} />
        </div>

        {!isIdle && (
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <Spinner
              aria-label="Alternate spinner button example"
              color="blue"
              size="xl"
            />
          </div>
        )}
        {(orgList && orgList.length === 0 && isIdle && (
          <div className="flex w-full flex-col items-center justify-center !bg-transparent p-20">
            <span className="text-gray-600">
              Please start by creating a new organization!
            </span>

            <Button
              onClick={() => gotoPage("/organization/new")}
              className="mt-7 w-[200px]"
            >
              <div className="flex items-center gap-x-2 text-xs">
                <HiPlus />
                Add new organization
              </div>
            </Button>
          </div>
        )) ||
          (isGrid && isIdle ? (
            <div className="grid grid-cols-3 gap-3  p-5 max-sm:grid-cols-1">
              {orgList &&
                orgList.map((org: Organization, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-full flex-col p-5 shadow"
                    >
                      <div className="flex w-full items-center justify-between">
                        <a
                          href="javascript:void(0)"
                          onClick={() => gotoPage(`/organization/${org.id}`)}
                        >
                          <span className="text-[14px] font-bold">
                            {org.name}
                          </span>
                        </a>
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <Button color="gray" className="w-[50px]">
                              <div className="flex items-center gap-x-2 text-xs">
                                <PiDotsThreeVerticalBold />
                              </div>
                            </Button>
                          )}
                        >
                          <Dropdown.Item
                            className="focus:rounded-lg"
                            onClick={() => {
                              dispatch(setSelectedOrganization(org));
                              navigate(`/organization/${org.id}/edit`);
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                      <div className="m-2 overflow-hidden rounded">
                        <a
                          href="javascript:void(0)"
                          onClick={() => gotoPage(`/organization/${org.id}`)}
                        >
                          {" "}
                          <img
                            src={org.image.url}
                            alt=""
                            className="max-h-[200px] min-h-[200px]"
                          />
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex text-[13px]">
                          <span className="mr-2">Country:</span>
                          <span className="text-gray-600">Australia</span>
                        </div>
                        <div className="flex text-[13px]">
                          <span className="mr-2">Timezone:</span>
                          <span className="text-gray-600">
                            {org.timezone.name}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col">
                        <div className="flex flex-wrap justify-start text-[13px]">
                          <div className="my-1 mr-2 flex items-center rounded-md border border-transparent bg-red-100 px-2.5 py-0.5 text-sm text-red-800 shadow-sm transition-all">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <path
                                d="M5 10C4.0111 10 3.0444 9.70675 2.22215 9.15735C1.3999 8.60794 0.759043 7.82705 0.380605 6.91342C0.00216642 5.99979 -0.0968502 4.99445 0.0960758 4.02455C0.289002 3.05465 0.765206 2.16373 1.46447 1.46447C2.16373 0.765206 3.05465 0.289002 4.02455 0.0960758C4.99445 -0.0968502 5.99979 0.00216642 6.91342 0.380605C7.82705 0.759043 8.60794 1.3999 9.15735 2.22215C9.70675 3.0444 10 4.0111 10 5C9.99854 6.32564 9.47129 7.59656 8.53393 8.53393C7.59656 9.47129 6.32564 9.99854 5 10ZM5 1C4.20888 1 3.43552 1.2346 2.77772 1.67412C2.11992 2.11365 1.60723 2.73836 1.30448 3.46927C1.00173 4.20017 0.92252 5.00444 1.07686 5.78036C1.2312 6.55629 1.61216 7.26902 2.17157 7.82843C2.73098 8.38784 3.44372 8.7688 4.21964 8.92314C4.99556 9.07748 5.79983 8.99827 6.53073 8.69552C7.26164 8.39277 7.88635 7.88008 8.32588 7.22228C8.7654 6.56449 9 5.79113 9 5C8.99881 3.9395 8.577 2.92278 7.82711 2.17289C7.07722 1.423 6.0605 1.00119 5 1Z"
                                fill="#9B1C1C"
                              />
                              <path
                                d="M5 6C4.86739 6 4.74022 5.94732 4.64645 5.85355C4.55268 5.75979 4.5 5.63261 4.5 5.5V3C4.5 2.86739 4.55268 2.74022 4.64645 2.64645C4.74022 2.55268 4.86739 2.5 5 2.5C5.13261 2.5 5.25979 2.55268 5.35355 2.64645C5.44732 2.74022 5.5 2.86739 5.5 3V5.5C5.5 5.63261 5.44732 5.75979 5.35355 5.85355C5.25979 5.94732 5.13261 6 5 6Z"
                                fill="#9B1C1C"
                              />
                              <path
                                d="M5 7.5C5.27614 7.5 5.5 7.27614 5.5 7C5.5 6.72386 5.27614 6.5 5 6.5C4.72386 6.5 4.5 6.72386 4.5 7C4.5 7.27614 4.72386 7.5 5 7.5Z"
                                fill="#9B1C1C"
                              />
                            </svg>
                            Open Defects: 0
                          </div>
                          <div className="my-1 mr-2 flex items-center rounded-md border border-transparent bg-green-100 px-2.5 py-0.5 text-sm text-green-800 shadow-sm transition-all">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <path
                                d="M9 2.34682H7.5V1.86436C7.5 1.48049 7.34196 1.11235 7.06066 0.840917C6.77936 0.569482 6.39782 0.416992 6 0.416992H4C3.60218 0.416992 3.22064 0.569482 2.93934 0.840917C2.65804 1.11235 2.5 1.48049 2.5 1.86436V2.34682H1C0.734784 2.34682 0.48043 2.44848 0.292893 2.62943C0.105357 2.81039 0 3.05582 0 3.31173V8.61875C0 8.87466 0.105357 9.12009 0.292893 9.30104C0.48043 9.482 0.734784 9.58366 1 9.58366H9C9.26522 9.58366 9.51957 9.482 9.70711 9.30104C9.89464 9.12009 10 8.87466 10 8.61875V3.31173C10 3.05582 9.89464 2.81039 9.70711 2.62943C9.51957 2.44848 9.26522 2.34682 9 2.34682ZM3.5 1.86436C3.5 1.73641 3.55268 1.61369 3.64645 1.52321C3.74021 1.43273 3.86739 1.3819 4 1.3819H6C6.13261 1.3819 6.25979 1.43273 6.35355 1.52321C6.44732 1.61369 6.5 1.73641 6.5 1.86436V2.34682H3.5V1.86436ZM9 3.31173V5.02155C7.1395 6.61076 2.8605 6.61076 1 5.02155V3.31173H9ZM1 8.61875V6.20936C2.22388 6.85903 3.60345 7.18633 5 7.15835C6.39654 7.18624 7.77609 6.85894 9 6.20936V8.61875H1Z"
                                fill="#03543F"
                              />
                              <path
                                d="M5 5.24155C5.27614 5.24155 5.5 5.02555 5.5 4.7591C5.5 4.49264 5.27614 4.27664 5 4.27664C4.72386 4.27664 4.5 4.49264 4.5 4.7591C4.5 5.02555 4.72386 5.24155 5 5.24155Z"
                                fill="#03543F"
                              />
                            </svg>
                            Projects: 0
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap justify-start text-[13px]">
                          <div className="my-1 mr-2  flex items-center rounded-md border border-transparent bg-blue-100 px-2.5 py-0.5 text-sm text-blue-800 shadow-sm transition-all">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <path
                                d="M10 3.02632C10 2.35105 9.187 0.747368 8.938 0.272105C8.89479 0.189653 8.83136 0.120913 8.75432 0.0730524C8.67728 0.0251919 8.58946 -3.57024e-05 8.5 4.31253e-08H1.5C1.41142 -3.76987e-05 1.32441 0.024698 1.24789 0.0716763C1.17137 0.118655 1.10808 0.186189 1.0645 0.267368C0.815 0.733158 0 2.30789 0 3.02632C0.000218094 3.25616 0.0446295 3.48358 0.130559 3.69487C0.216489 3.90617 0.342159 4.09697 0.5 4.25579V9.47368C0.5 9.61327 0.552678 9.74714 0.646447 9.84585C0.740215 9.94455 0.867392 10 1 10H2.5C2.63261 10 2.75979 9.94455 2.85355 9.84585C2.94732 9.74714 3 9.61327 3 9.47368V6.31579H4V9.47368C4 9.61327 4.05268 9.74714 4.14645 9.84585C4.24021 9.94455 4.36739 10 4.5 10H9C9.13261 10 9.25979 9.94455 9.35355 9.84585C9.44732 9.74714 9.5 9.61327 9.5 9.47368V4.23368C9.65518 4.07734 9.77929 3.8901 9.86513 3.68283C9.95097 3.47556 9.99681 3.2524 10 3.02632ZM1.7955 1.05263H8.2C8.54524 1.67208 8.81408 2.33532 9 3.02632C8.98974 3.19726 8.92059 3.35839 8.80553 3.47951C8.69047 3.60062 8.5374 3.67341 8.375 3.68421C8.20932 3.68393 8.0505 3.61453 7.93335 3.49121C7.8162 3.36789 7.75026 3.20071 7.75 3.02632C7.75 2.88673 7.69732 2.75286 7.60355 2.65415C7.50979 2.55545 7.38261 2.5 7.25 2.5C7.11739 2.5 6.99021 2.55545 6.89645 2.65415C6.80268 2.75286 6.75 2.88673 6.75 3.02632C6.75 3.2008 6.68415 3.36814 6.56694 3.49152C6.44973 3.6149 6.29076 3.68421 6.125 3.68421C5.95924 3.68421 5.80027 3.6149 5.68306 3.49152C5.56585 3.36814 5.5 3.2008 5.5 3.02632C5.5 2.88673 5.44732 2.75286 5.35355 2.65415C5.25979 2.55545 5.13261 2.5 5 2.5C4.86739 2.5 4.74021 2.55545 4.64645 2.65415C4.55268 2.75286 4.5 2.88673 4.5 3.02632C4.5 3.2008 4.43415 3.36814 4.31694 3.49152C4.19973 3.6149 4.04076 3.68421 3.875 3.68421C3.70924 3.68421 3.55027 3.6149 3.43306 3.49152C3.31585 3.36814 3.25 3.2008 3.25 3.02632C3.25 2.88673 3.19732 2.75286 3.10355 2.65415C3.00979 2.55545 2.88261 2.5 2.75 2.5C2.61739 2.5 2.49021 2.55545 2.39645 2.65415C2.30268 2.75286 2.25 2.88673 2.25 3.02632C2.24974 3.20071 2.1838 3.36789 2.06665 3.49121C1.9495 3.61453 1.79068 3.68393 1.625 3.68421C1.45988 3.68203 1.30212 3.61201 1.18535 3.4891C1.06859 3.36619 1.00207 3.20012 1 3.02632C1.17713 2.33284 1.44485 1.66861 1.7955 1.05263ZM8.5 8.94737H5V5.78947C5 5.64989 4.94732 5.51602 4.85355 5.41731C4.75979 5.31861 4.63261 5.26316 4.5 5.26316H2.5C2.36739 5.26316 2.24021 5.31861 2.14645 5.41731C2.05268 5.51602 2 5.64989 2 5.78947V8.94737H1.5V4.72368C1.542 4.72684 1.582 4.73684 1.625 4.73684C2.04457 4.73702 2.44785 4.5659 2.75 4.25947C3.05223 4.56578 3.45545 4.7369 3.875 4.7369C4.29455 4.7369 4.69777 4.56578 5 4.25947C5.30223 4.56578 5.70545 4.7369 6.125 4.7369C6.54455 4.7369 6.94777 4.56578 7.25 4.25947C7.55215 4.5659 7.95543 4.73702 8.375 4.73684C8.4175 4.73684 8.458 4.72632 8.5 4.72263V8.94737Z"
                                fill="#1E429F"
                              />
                              <path
                                d="M7.5 5.26316H6C5.86739 5.26316 5.74021 5.31861 5.64645 5.41731C5.55268 5.51602 5.5 5.64989 5.5 5.78947V7.36842C5.5 7.50801 5.55268 7.64188 5.64645 7.74058C5.74021 7.83929 5.86739 7.89474 6 7.89474H7.5C7.63261 7.89474 7.75979 7.83929 7.85355 7.74058C7.94732 7.64188 8 7.50801 8 7.36842V5.78947C8 5.64989 7.94732 5.51602 7.85355 5.41731C7.75979 5.31861 7.63261 5.26316 7.5 5.26316ZM7 6.84211H6.5V6.31579H7V6.84211Z"
                                fill="#1E429F"
                              />
                            </svg>
                            Properties: 0
                          </div>
                          <div className="my-1 mr-2 flex items-center rounded-md border border-transparent bg-yellow-100 px-2.5 py-0.5 text-sm text-yellow-800 shadow-sm transition-all">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <path
                                d="M5 10C4.0111 10 3.0444 9.70675 2.22215 9.15735C1.39991 8.60794 0.759043 7.82705 0.380605 6.91342C0.00216642 5.99979 -0.0968502 4.99446 0.0960758 4.02455C0.289002 3.05465 0.765206 2.16373 1.46447 1.46447C2.16373 0.765206 3.05465 0.289002 4.02455 0.0960758C4.99446 -0.0968502 5.99979 0.00216642 6.91342 0.380605C7.82705 0.759043 8.60794 1.39991 9.15735 2.22215C9.70675 3.0444 10 4.0111 10 5C9.99854 6.32564 9.47129 7.59656 8.53393 8.53393C7.59656 9.47129 6.32564 9.99854 5 10ZM5 1C4.20888 1 3.43552 1.2346 2.77772 1.67412C2.11992 2.11365 1.60723 2.73836 1.30448 3.46927C1.00173 4.20017 0.92252 5.00444 1.07686 5.78036C1.2312 6.55629 1.61216 7.26902 2.17157 7.82843C2.73098 8.38784 3.44372 8.7688 4.21964 8.92314C4.99556 9.07748 5.79983 8.99827 6.53073 8.69552C7.26164 8.39277 7.88635 7.88008 8.32588 7.22228C8.7654 6.56449 9 5.79113 9 5C8.99881 3.9395 8.577 2.92278 7.82711 2.17289C7.07722 1.423 6.0605 1.00119 5 1Z"
                                fill="#723B13"
                              />
                              <path
                                d="M5 5.5C4.86739 5.5 4.74022 5.44732 4.64645 5.35355C4.55268 5.25979 4.5 5.13261 4.5 5V3C4.5 2.86739 4.55268 2.74022 4.64645 2.64645C4.74022 2.55268 4.86739 2.5 5 2.5C5.13261 2.5 5.25979 2.55268 5.35355 2.64645C5.44732 2.74022 5.5 2.86739 5.5 3V5C5.5 5.13261 5.44732 5.25979 5.35355 5.35355C5.25979 5.44732 5.13261 5.5 5 5.5Z"
                                fill="#723B13"
                              />
                              <path
                                d="M6.6375 7.1375C6.5049 7.13747 6.37775 7.08478 6.284 6.991L4.64645 5.35355C4.55537 5.25925 4.50503 5.1329 4.50616 5.0018C4.5073 4.8707 4.55989 4.7453 4.65259 4.65259C4.7453 4.55989 4.8707 4.5073 5.0018 4.50616C5.1329 4.50503 5.2592 4.55542 5.3535 4.6465L6.991 6.284C7.06091 6.35393 7.10851 6.44301 7.12779 6.53998C7.14708 6.63696 7.13717 6.73748 7.09934 6.82883C7.0615 6.92018 6.99743 6.99826 6.91523 7.0532C6.83303 7.10814 6.73638 7.13748 6.6375 7.1375Z"
                                fill="#723B13"
                              />
                            </svg>
                            Defects In-progress: 0
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            isIdle && <OrgTable />
          ))}
      </div>
    </NavbarSidebarLayout>
  );
};

export default OrganizationPage;
