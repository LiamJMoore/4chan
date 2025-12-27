import React from 'react';
import { TokenMetrics } from '../types';
import { formatCompactNumber, formatCurrency } from '../utils';

const boards = [
  "a", "b", "c", "d", "e", "f", "g", "gif", "h", "hr", "k", "m", "o", "p", "r", "s", "t", "u", "v", "vg", "vr", "w", "wg"
];

interface NavbarProps {
  metrics: TokenMetrics | null;
}

const Navbar: React.FC<NavbarProps> = ({ metrics }) => {
  return (
    <div className="border-b border-[#b7c5d9] bg-[#f0e0d6] p-1 text-[10px] sm:text-[12px] mb-2 sticky top-0 z-50 shadow-sm">
      <div className="flex flex-wrap gap-1 px-2 items-center">
        <span className="hidden sm:inline">[</span>
        <div className="hidden sm:flex flex-wrap gap-1">
            {boards.map((b, i) => (
                <React.Fragment key={b}>
                    <a href="#" className="hover:text-red-600 no-underline hover:underline decoration-red-600">{b}</a>
                    {i < boards.length - 1 && <span> / </span>}
                </React.Fragment>
            ))}
        </div>
        <span className="hidden sm:inline">]</span>
        
        {/* Mobile: Just show a few popular boards */}
        <div className="sm:hidden flex gap-2">
            <a href="#">biz</a> / <a href="#">g</a> / <a href="#">pol</a> / <a href="#">b</a>
        </div>
        
        {/* Stats / Right Side */}
        <div className="ml-auto flex gap-2 sm:gap-4 items-center font-mono">
            {/* Network Indicator */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-1 font-bold rounded text-[9px] sm:text-[10px]">
                SOLANA
            </div>

            {metrics ? (
                <>
                    <div className="flex flex-col sm:flex-row sm:gap-3 text-right sm:items-center">
                        <span className="text-blue-800 font-bold" title="Market Cap">
                            MC: <span className="text-black">{formatCompactNumber(metrics.marketCap)}</span>
                        </span>
                        <span className="text-green-800 font-bold" title="Price">
                            Px: <span className="text-black">{formatCurrency(metrics.price)}</span>
                        </span>
                        <span className="hidden sm:inline text-[#800000] font-bold" title="Circulating Supply">
                           Sup: <span className="text-black">{formatCompactNumber(metrics.supply)}</span>
                        </span>
                         <span className={`font-bold ${metrics.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                           {metrics.change24h > 0 ? '+' : ''}{metrics.change24h.toFixed(2)}%
                        </span>
                    </div>
                </>
            ) : (
                <span className="text-gray-500 italic">Loading...</span>
            )}
            
             <div className="hidden md:flex gap-1 items-center">
                 <span>[</span>
                 <a href="#" className="ml-1">Settings</a>
                 <span>]</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;