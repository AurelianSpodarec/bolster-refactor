import ControlsContainer from '../containers/ControlsContainer';
import WeekTableContainer from '../containers/WeekTableContainer';

const TimesheetCalender = ({ startDate, onPrev, onNext, onToday }) => {
    return (
        <div className="timesheet-calender">
            <ControlsContainer
                startDate={startDate}
                onPrev={onPrev}
                onNext={onNext}
                onToday={onToday}
            />
            <WeekTableContainer startDate={startDate} />
        </div>
    );
};

export default TimesheetCalender;
