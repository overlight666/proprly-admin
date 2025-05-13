import TimeLine from "../components/timeline";
import Defects from "../components/defects";

export const TimelineDefectsSection = ({ openModal }: any): JSX.Element => {

    return (
        <div className="grid grid-cols-2 w-full gap-6">
            {/* Timeline Section */}
            <TimeLine openModal={openModal} />

            {/* Defects Card */}
            <Defects />
        </div>
    );
};
