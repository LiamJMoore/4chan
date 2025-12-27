import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Post from './components/Post';
import TokenAnalytics from './components/TokenAnalytics';
import { PostData, CA, TokenMetrics } from './types';
import { getCurrent4chanTime } from './utils';

// Single OP Post Generation
const generatePosts = (): PostData[] => {
  const op: PostData = {
    id: 1,
    no: 88888888,
    time: getCurrent4chanTime(),
    name: "Anonymous",
    subject: "V4: $4CHAN ON SOLANA",
    isOp: true,
    message: "", // Text removed as requested, UI handled in Post component via isOp check
    replies: [] // No replies
  };

  return [op];
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [metrics, setMetrics] = useState<TokenMetrics | null>(null);

  // Initial Posts
  useEffect(() => {
    setPosts(generatePosts());
  }, []);

  // Live Market Data Fetcher
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`);
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          const price = parseFloat(pair.priceUsd);
          const marketCap = pair.marketCap || pair.fdv || 0;
          
          // Calculate approximate supply if MC and Price exist
          const supply = (price > 0 && marketCap > 0) ? (marketCap / price) : 1000000000;

          setMetrics({
            price: price,
            marketCap: marketCap,
            supply: supply,
            change24h: pair.priceChange?.h24 || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch market data", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-[#f0e0d6]">
      <Navbar metrics={metrics} />
      
      {/* Static Header */}
      <div className="text-center mb-6 mt-6">
          <div className="mb-4">
            <h1 className="text-[#800000] text-[24px] font-bold font-sans tracking-tight">
              4chan on Solana
            </h1>
          </div>
          <hr className="border-[#b7c5d9] mt-4 max-w-[95%] mx-auto" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-[95%] sm:max-w-[960px] mx-auto px-1 sm:px-4">
        {/* Render OP Only */}
        {posts.length > 0 && <Post post={posts[0]} />}
      </div>

      {/* Analytics Section - Passed Live Metrics */}
      <TokenAnalytics ca={CA} metrics={metrics} />

      {/* Floating Action / Disclaimer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#d6daf0] border-t border-[#b7c5d9] p-2 text-center text-[11px] font-sans opacity-95">
         <span className="font-bold">Disclaimer:</span> This is a tribute site. $4CHAN is a memecoin with no intrinsic value. Do not risk money you cannot afford to lose.
      </div>
    </div>
  );
};

export default App;