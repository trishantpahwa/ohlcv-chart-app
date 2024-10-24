import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { DateRangePicker, SymbolPicker } from '@/components';
const CandlestickChart = dynamic(() => import('@/components/CandleStickChart'), { ssr: false });

interface HomeProps {
  symbol: string;
  data: any;
}

const Home: React.FC<HomeProps> = ({ }) => {

  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1d");
  const [startTime, setStartTime] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endTime, setEndTime] = useState<Date>(new Date());

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="w-full text-3xl font-bold text-center mb-4">Candlestick Chart</h1>
      <div className="flex flexg items-start justify-center w-full">
        <div className="flex flex-col">
          <div>
            <SymbolPicker symbol={symbol} setSymbol={setSymbol} />
          </div>
          <div>
            <DateRangePicker startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
          </div>
        </div>
        <div className="h-[85vh] w-full md:w-[90vw] flex items-center justify-center">
          <CandlestickChart symbol={symbol} interval={interval} startTime={startTime} endTime={endTime} />
        </div>
      </div>
    </div>
  );
};


export default Home;
