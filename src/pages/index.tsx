import React from 'react';
import dynamic from 'next/dynamic';

import { DateRangePicker } from '@/components';
const CandlestickChart = dynamic(() => import('@/components/CandleStickChart'), { ssr: false });

interface HomeProps {
  symbol: string;
  data: any;
}

const Home: React.FC<HomeProps> = ({ symbol, data }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex justift-center items-center">
      <DateRangePicker />
      <CandlestickChart symbol={"BTCUSDT"} interval="1d" />
    </div>
  );
};


export default Home;
