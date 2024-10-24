// components/CandlestickChart.tsx

import React, { useEffect, useState } from 'react';
import { ChartCanvas, Chart, CandlestickSeries, XAxis, YAxis, CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-financial-charts';
import { timeFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { format } from 'd3-format';
import { OHLCVData } from '@/types/OHLCVData';

interface CandlestickChartProps {
    symbol: string;
    interval: string;
    startTime?: Date;
    endTime?: Date;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ symbol, interval, startTime, endTime }) => {
    const [ohlcvData, setOhlcvData] = useState<OHLCVData[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Fetch the OHLCV data
    useEffect(() => {
        const fetchData = async () => {
            let url = `/api/chart?symbol=${symbol}&interval=${interval}`;
            if (startTime && endTime) url += `&startTime=${startTime.getTime()}&endTime=${endTime.getTime()}`;
            const response = await fetch(url);
            const data = (await response.json()).map((entry: any) => ({
                ...entry,
                date: new Date(entry.date),
            }));
            setOhlcvData(data);
        };
        fetchData();
    }, [symbol, interval, startTime, endTime]);

    // Set the chart to full screen
    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth * 0.75, height: window.innerHeight * 0.9 });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (ohlcvData.length === 0) return <div>Loading data...</div>;

    const xAccessor = (d: OHLCVData) => d.date;
    const xExtents = [ohlcvData[0].date, ohlcvData[ohlcvData.length - 1].date];

    return (
        <div className="p-4">
            <ChartCanvas
                height={dimensions.height}
                width={dimensions.width}
                ratio={3}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                seriesName={symbol}
                data={ohlcvData}
                xAccessor={xAccessor}
                xScale={scaleTime()}
                xExtents={xExtents}
            >
                <Chart id={1} yExtents={(d: OHLCVData) => [d.high, d.low]}>
                    <XAxis />
                    <YAxis />
                    <CandlestickSeries />
                    <MouseCoordinateX displayFormat={timeFormat('%Y-%m-%d')} />
                    <MouseCoordinateY displayFormat={format('.2f')} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        </div>
    );
};

export default CandlestickChart;
