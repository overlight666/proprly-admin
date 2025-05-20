/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Key,
    useEffect,
    useState,
} from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useAppointments } from "@/_recoil/actions";
import { appointmentTimeslotAtom } from "@/_recoil/states";
import { Checkbox, Label } from "flowbite-react";
import { Button } from "@/components/ui/button";

export interface AppointmentType {
    propertyId?: number;
    commonAreaId?: number;
    type: string;
    appointmentDate: string;
    appointmentTimeslot: string;
    description: string;
    userId?: number;
    tradeCodeId?: number;
}

export const TimeSlots = function ({ setShowTimeSlots }: any) {
    const { project_id }: any = useParams();
    const [timeSlotStart, setTimeSlotStart] = useState("09:00");
    const [timeSlotEnd, setTimeSlotEnd] = useState("17:00");
    const [daySelected2, setDaySelected2] = useState<any[]>([]);
    const appointmentAction = useAppointments();
    const timeslots = useRecoilValue(appointmentTimeslotAtom);

    useEffect(() => {
        appointmentAction.getTimeSlots(project_id);
    }, []);

    const slot1 = [
        "9:00AM - 10:00AM",
        "10:00AM - 11:00AM",
        "11:00AM - 12:00PM",
        "12:00PM - 1:00PM",
        "1:00PM - 2:00PM",
        "3:00PM - 4:00PM",
        "4:00PM - 5:00PM",
    ];
    const slot2 = [
        "9:00AM - 11:00AM",
        "11:00AM - 1:00PM",
        "1:00PM - 3:00PM",
        "3:00PM - 5:00PM",
    ];
    const slot3 = [
        "9:00AM - 9:30AM",
        "9:30AM - 10:00AM",
        "10:00AM - 10:30AM",
        "10:30AM - 11:00AM",
        "11:00AM - 11:30PM",
        "11:30AM - 12:00PM",
        "12:00PM - 12:30PM",
        "12:30PM - 1:00PM",
        "1:00PM - 1:30PM",
        "1:30PM - 2:00PM",
        "2:00PM - 2:30PM",
        "2:30PM - 3:00PM",
        "3:00PM - 3:30PM",
        "3:30PM - 4:00PM",
        "4:00PM - 4:30PM",
        "4:30PM - 5:00PM",
    ];
    const capitalizeFirstLetter = (val: any) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    };

    const updateDaySelected = (
        e: boolean,
        value: any,
        sl: {
            day?: string | undefined;
            duration: any;
            startTime?: any;
            endTime?: any;
        }
    ) => {
        if (e) {
            if (daySelected2.find((e) => e.day == value)) {
                const newDays = daySelected2.filter((e) => e.day != value);
                setDaySelected2(newDays);
            } else {
                const newVal = {
                    day: value,
                    start_time: sl.startTime,
                    end_time: sl.endTime,
                    duration: sl.duration,
                };
                setDaySelected2([...daySelected2, newVal]);
            }
        } else {
            const newDays = daySelected2.filter((e) => e.day != value);
            setDaySelected2(newDays);
        }
    };

    const updateDuration = (duration: string, value: string | undefined) => {
        setDaySelected2(
            daySelected2 && daySelected2.length
                ? daySelected2.map((e) => {
                    if (e.day == value) {
                        e.duration = duration;
                    }
                    return e;
                })
                : []
        );
    };

    const updateTimeSlots = () => {
        if (daySelected2.length == 0) {
            toast.error("Please select at least 1 day");
        } else {
            const params = {
                projectId: project_id,
                configurations: daySelected2,
            };
            appointmentAction
                .updateTimeslot(params, toast)
                .catch(
                    (
                        e
                    ) => {
                        toast.error(e);
                    }
                );
        }
    };

    useEffect(() => { }, []);

    return (
        <div className="flex flex-col px-5 h-full py-5">
            <div className="flex flex-col w-full">
                {timeslots &&
                    timeslots.length &&
                    timeslots.map(
                        (
                            sl: {
                                day: string | undefined;
                                duration: string | number | readonly string[] | undefined;
                            },
                            index: Key | null | undefined
                        ) => {
                            return (
                                <div
                                    key={index}
                                    className="flex w-full flex-col gap-5 border-b-2 py-5"
                                >
                                    <div key={index} className="flex w-full gap-5 py-5">
                                        <div className="flex w-full items-center gap-5">
                                            <div className="flex w-[15%] items-center gap-x-3">
                                                <Checkbox
                                                    id={sl.day}
                                                    onChange={(e: any) => updateDaySelected(e, sl.day, sl)}
                                                />
                                                <Label htmlFor={sl.day}>
                                                    {capitalizeFirstLetter(sl.day)}
                                                </Label>
                                            </div>
                                            <div className="flex w-[25%] flex-col">
                                                <label
                                                    htmlFor="start-time"
                                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Start:
                                                </label>
                                                <div className="relative">
                                                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                                                        <svg
                                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        disabled
                                                        value={timeSlotStart}
                                                        onChange={(e) => setTimeSlotStart(e.target.value)}
                                                        type="time"
                                                        id="start-time"
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                        min="09:00"
                                                        max="18:00"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-[25%] flex-col">
                                                <label
                                                    htmlFor="end-time"
                                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    End:
                                                </label>
                                                <div className="relative">
                                                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                                                        <svg
                                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        disabled
                                                        value={timeSlotEnd}
                                                        onChange={(e) => setTimeSlotEnd(e.target.value)}
                                                        type="time"
                                                        id="end-time"
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                        min="09:00"
                                                        max="18:00"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid w-[20%] grid-cols-1 gap-y-2">
                                                <Label htmlFor="timeslot">
                                                    Select Time-Slot
                                                    <span className="text-[red]">*</span>
                                                </Label>
                                                <select
                                                    disabled={!daySelected2.find((e) => e.day == sl.day)}
                                                    id="timeslot"
                                                    name="timeslot"
                                                    value={
                                                        daySelected2 &&
                                                            daySelected2.length &&
                                                            daySelected2.find((e) => e.day == sl.day)?.duration
                                                            ? daySelected2.find((e) => e.day == sl.day)
                                                                ?.duration
                                                            : sl.duration
                                                    }
                                                    onChange={(e) =>
                                                        updateDuration(e.target.value, sl.day)
                                                    }
                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                >
                                                    <option value="" selected>
                                                        Please Select
                                                    </option>
                                                    <option value="30">30 Mins</option>
                                                    <option value="60">1 Hour</option>
                                                    <option value="120">2 Hours</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {daySelected2 &&
                                        daySelected2.length &&
                                        daySelected2.find((e) => e.day == sl.day) ? (
                                        <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                                            <Label htmlFor="timeslot">Available Time Slots</Label>
                                            <div className="flex flex-wrap gap-4">
                                                {daySelected2.find((e) => e.day == sl.day)?.duration ==
                                                    60
                                                    ? slot1.map((s, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                                                            >
                                                                <span className="text-[14px]">{s}</span>
                                                            </div>
                                                        );
                                                    })
                                                    : daySelected2.find((e) => e.day == sl.day)
                                                        ?.duration == 120
                                                        ? slot2.map((s, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                                                                >
                                                                    <span className="text-[14px]">{s}</span>
                                                                </div>
                                                            );
                                                        })
                                                        : slot3.map((s, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                                                                >
                                                                    <span className="text-[14px]">{s}</span>
                                                                </div>
                                                            );
                                                        })}
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        }
                    )}
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">
                <Button
                    onClick={() => setShowTimeSlots(false)}
                    type="button"
                    variant="outline"
                    className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto hover:!text-gray-100"
                >
                    Close
                </Button>
                <Button
                    onClick={() => updateTimeSlots()}
                    type="button"
                    className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
                >
                    Update
                </Button>
            </div>
        </div>
    );
};
