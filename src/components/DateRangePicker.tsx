import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS

interface DateRangePickerProps {
    startTime: Date;
    setStartTime: (date: Date) => void;
    endTime: Date;
    setEndTime: (date: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startTime, setStartTime, endTime, setEndTime }) => {
    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setStartTime(date);
        }
    }
    return (
        <div className="h-full w-full flex flex-col gap-4 p-4 bg-white rounded-lg m-10 p-4">
            <div className="flex flex-col mb-4">
                <label className="mb-2 text-gray-700 font-semibold">
                    Start Time
                </label>
                <DatePicker
                    selected={startTime}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startTime}
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yy HH:mm" // Updated date and time format
                    placeholderText="Select start date and time"
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700 font-semibold">
                    End Time
                </label>
                <DatePicker
                    selected={endTime}
                    onChange={(date) => date && setEndTime(date)}
                    selectsEnd
                    startDate={startTime}
                    endDate={endTime}
                    minDate={startTime}
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yy HH:mm" // Updated date and time format
                    placeholderText="Select end date and time"
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;