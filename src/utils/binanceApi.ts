// utils/binanceApi.ts

import axios from "axios";

export interface OHLCVData {
    openTime: string | number | Date;
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export const fetchOHLCVData = async (
    symbol: string,
    interval: string = "1d"
): Promise<OHLCVData[]> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BINANCE_API_URL}/klines`,
            {
                params: {
                    symbol,
                    interval,
                },
            }
        );

        return response.data.map((entry: any) => ({
            date: new Date(entry[0]),
            open: parseFloat(entry[1]),
            high: parseFloat(entry[2]),
            low: parseFloat(entry[3]),
            close: parseFloat(entry[4]),
            volume: parseFloat(entry[5]),
        }));
    } catch (error) {
        console.error("Error fetching OHLCV data:", error);
        return [];
    }
};
