import { useEffect, useState } from "react";

interface SymbolPickerProps {
    setSymbol: (symbol: string) => void;
    symbol: string;
}

const SymbolPicker: React.FC<SymbolPickerProps> = ({ symbol, setSymbol }) => {
    const [symbols, setSymbols] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let url = `/api/symbols`;
            const response = await fetch(url);
            const data = await response.json();
            if (data) setSymbols(data.sort());
        };
        fetchData();
    }, []);

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const symbol = event.target.value;
        setSymbol(symbol);
    };

    return (
        <div className="h-full w-9/12 flex flex-col gap-4 p-4 bg-white rounded-lg mx-10">
            <div className="flex flex-col mb-4">
                <label htmlFor="symbol" className="mb-2 text-gray-700 font-semibold">
                    Symbol
                </label>
                <input
                    list="symbols"
                    name="symbol"
                    id="symbol"
                    placeholder="Select a symbol"
                    value={symbol}
                    onChange={handleSelect}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <datalist id="symbols">
                    <option value="" />
                    {symbols.map((symbol, index) => (
                        <option key={index} value={symbol} />
                    ))}
                </datalist>
            </div>
        </div>
    );
};

export default SymbolPicker;