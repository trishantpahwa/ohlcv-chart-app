interface IntervalPickerProps {
    setInterval: (interval: string) => void;
    interval: string;
}

const IntervalPicker: React.FC<IntervalPickerProps> = ({ interval, setInterval }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const interval = event.target.value;
        setInterval(interval);
    };

    return (
        <div className="h-full w-9/12 flex flex-col gap-4 p-4 bg-white rounded-lg mx-10">
            <div className="flex flex-col mb-4">
                <label htmlFor="interval" className="mb-2 text-gray-700 font-semibold">
                    Interval
                </label>
                <select
                    id="interval"
                    className="p-2 border border-gray-300 rounded-md"
                    onChange={handleSelect}
                    value={interval}
                >
                    <option value="1m">1m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="30m">30m</option>
                    <option value="1h">1h</option>
                    <option value="4h">4h</option>
                    <option value="1d">1d</option>
                    <option value="1w">1w</option>
                    <option value="1M">1M</option>
                </select>
            </div>
        </div>
    );
};

export default IntervalPicker;