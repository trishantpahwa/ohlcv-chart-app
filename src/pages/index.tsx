import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { DateRangePicker } from '@/components';
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
    <div className="h-[100vh] w-[100vw] flex items-center gap-100">
      <DateRangePicker startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
      <CandlestickChart symbol={symbol} interval={interval} startTime={startTime} endTime={endTime} />
    </div>
  );
};


export default Home;
