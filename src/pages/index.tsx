import React from 'react';
import dynamic from 'next/dynamic';

const CandlestickChart = dynamic(() => import('@/components/CandleStickChart'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>Binance Candlestick Chart</h1>
      <CandlestickChart symbol="BTCUSDT" />
    </div>
  );
};

export default Home;
