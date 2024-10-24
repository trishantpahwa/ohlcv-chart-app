// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { OHLCVData } from "@/types/OHLCVData";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse<OHLCVData[]>
) {
    const symbol = request.query.symbol ?? "BTCUSDT";
    const interval = request.query.interval ?? "1d";
    const startTime = request.query.startTime ?? null;
    const endTime = request.query.endTime ?? null;
    fetchOHLCVData(
        symbol as string,
        interval as string,
        startTime as string,
        endTime as string
    ).then((data) => {
        response.status(200).json(data);
    });
}

async function fetchOHLCVData(
    symbol: string,
    interval: string,
    startTime: string = "",
    endTime: string = ""
): Promise<OHLCVData[]> {
    try {
        var params = new URLSearchParams();
        params.append("symbol", symbol);
        params.append("interval", interval);
        if (startTime && endTime) {
            params.append("startTime", startTime);
            params.append("endTime", endTime);
        }
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_BINANCE_API_URL}/klines`,
            {
                params,
            }
        );

        return result.data.map((entry: any) => ({
            date: new Date(entry[0]),
            open: parseFloat(entry[1]),
            high: parseFloat(entry[2]),
            low: parseFloat(entry[3]),
            close: parseFloat(entry[4]),
            volume: parseFloat(entry[5]),
        }));
    } catch (error) {
        // console.error("Error fetching OHLCV data:", error.response);
        return [];
    }
}

