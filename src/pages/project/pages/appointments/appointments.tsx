/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useModal } from "@/helpers/useModal";
import { appointmentEventsAtom, remainingTimeSlotsAtom } from "@/_recoil/states";
import { useAppointments } from "@/_recoil/actions";
import { TimeSlots } from "./components/timeslots";
import { Modal } from "@/components/ui/modal";
import Radio from "@/components/ui/radio";
import { PropertyEventRegistration } from "./components/propertyEventRegistration";
import { CommonAreaEventRegistration } from "./components/commonAreaRegistration";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string;
    };
}

const Appointments = () => {
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const appointments = useRecoilValue(appointmentEventsAtom);
    const [selectedValue, setSelectedValue] = useState<string>("property");
    const [eventHandler, setEventHandler] = useState<any>(undefined);
    const timeslotHandler = useSetRecoilState(remainingTimeSlotsAtom);
    const [isCancel, setCancel] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");
    const appointmentAction = useAppointments();
    const { project_id } = useParams();
    useEffect(() => {
        // Initialize with some events
        const myAppointments = appointments
            ?.map((ap: any) => {
                return {
                    allDay: false,
                    id: ap.id,
                    title: `${ap?.property
                        ? `Unit No ${ap?.property?.unitNo}`
                        : `CA Lot no ${ap?.commonArea}`
                            ? ap?.commonArea?.lotNo
                            : ""
                        } | ${moment(ap.startDate, "YYYY-MM-DD h:mm a").format(
                            "h:mm A"
                        )} - ${moment(ap.endDate, "YYYY-MM-DD h:mm a").format("h:mm A")}`,
                    start: moment.utc(ap.startDate).toISOString(),
                    extendedProps: {
                        calendar:
                            ap?.status == "booked"
                                ? "Primary"
                                : ap?.status == "canceled"
                                    ? "danger"
                                    : "Success",
                    },
                    end: moment.utc(ap.endDate).toISOString(),
                };
            })
            .sort(function (a: any, b: any) {
                const c: any = new Date(a.startDate);
                const d: any = new Date(b.startDate);
                return c - d;
            });
        setEvents(myAppointments);
    }, [appointments]);

    const handleDateSelect = (_selectInfo: DateSelectArg) => {
        openModal();
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        setCancel(false);
        timeslotHandler(undefined);
        const getEvent = appointments?.find(
            (appointment: any) => appointment?.id == event?.id
        );

        if (getEvent?.commonAreaId) {
            setSelectedValue("commonArea");
        } else {
            setSelectedValue("property");
        }

        setEventHandler(getEvent);
        openModal();
    };


    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
    };

    const handleEventPositioned = (info: any) => {
        info.el.setAttribute("data-tooltip-id", "tooltip");
        info.el.setAttribute("data-tooltip-content", info?.event?.title);
        info.el.classList.add("cursor-pointer");

        // info.el?.firstElementChild?.classList?.add(
        //   `!bg-[${stringToColour(moment(info.event.start).format("MMDDYYYY"))}]`
        // );
    };

    return (
        <>
            <div>
                <div className="custom-calendar">
                    {!showTimeSlots ? (
                        <FullCalendar
                            eventOrder="startDate"
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: "prev,next addEventButton timeslotButton",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            eventOverlap={true}
                            events={events}
                            selectable={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            eventDidMount={(info) => {
                                handleEventPositioned(info);
                            }}
                            eventContent={renderEventContent}
                            customButtons={{
                                addEventButton: {
                                    text: "Add New Appointment +",
                                    click: () => {
                                        timeslotHandler(undefined);
                                        setEventHandler(undefined);
                                        setCancel(false);
                                        openModal();
                                    },
                                },
                                timeslotButton: {
                                    text: "Manage Timeslots",
                                    click: () => setShowTimeSlots(!showTimeSlots),
                                },
                            }}
                        />
                    ) : (
                        <TimeSlots setShowTimeSlots={setShowTimeSlots} />
                    )}
                </div>

                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    className={`${isCancel ? "max-w-[40%]" : "max-w-[80%]"} p-6 lg:p-10`}
                >
                    {!isCancel ? (
                        <div className="flex flex-col px-2 overflow-visible custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                                    {eventHandler
                                        ? eventHandler?.status !== "cencelled"
                                            ? eventHandler?.propertyId
                                                ? "Reschedule Property Appointment"
                                                : "Reschedule Common Area Appointment"
                                            : "View Appointment"
                                        : "Add New Appointment"}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Plan your next schedule
                                </p>
                            </div>
                            <div className="mt-6">
                                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                                    <Radio
                                        disabled={eventHandler}
                                        id="radio1"
                                        name="group1"
                                        value="property"
                                        checked={selectedValue === "property"}
                                        onChange={handleRadioChange}
                                        label="Property"
                                    />
                                    <Radio
                                        disabled={eventHandler}
                                        id="radio2"
                                        name="group1"
                                        value="commonArea"
                                        checked={selectedValue === "commonArea"}
                                        onChange={handleRadioChange}
                                        label="Common Area"
                                    />
                                </div>
                            </div>
                            {selectedValue == "property" ? (
                                <PropertyEventRegistration
                                    closeModal={closeModal}
                                    event={eventHandler}
                                    setCancel={setCancel}
                                />
                            ) : (
                                <CommonAreaEventRegistration
                                    closeModal={closeModal}
                                    event={eventHandler}
                                    setCancel={setCancel}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-12 w-full gap-5">
                            <div className="col-start-3 col-span-8">
                                <h1 className="text-center text-red-400 text-[1.4rem] mb-5">
                                    CANCEL APPOINTMENT
                                </h1>
                            </div>
                            <div className="col-start-3 col-span-8 row-start-2">
                                <Input
                                    type="text"
                                    placeholder={`Type "cancel" to proceed`}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-row justify-center items-center gap-3 row-start-3 col-span-8 col-start-3">
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        if (confirmValue.toLowerCase() === "cancel") {
                                            appointmentAction
                                                .cancelAppointment(eventHandler?.id, toast)
                                                .then(() => {
                                                    appointmentAction.getAppointments(project_id);
                                                    setCancel(false);
                                                    closeModal();
                                                    setEventHandler(undefined);
                                                });
                                        } else {
                                            toast.error(`Type "cancel" to proceed!`);
                                        }
                                    }}
                                >
                                    Confirm
                                </Button>
                                <Button variant="outline" onClick={() => setCancel(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

const renderEventContent = (eventInfo: any) => {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
    return (
        <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded`}
        >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
        </div>
    );
};

export default Appointments;
