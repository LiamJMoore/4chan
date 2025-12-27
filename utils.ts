import React from 'react';

// Parses a message string and wraps lines starting with ">" in a greentext span
// Also handles links/CA
export const formatMessage = (text: string) => {
  return text.split('\n').map((line, index) => {
    if (line.startsWith('>')) {
      return React.createElement('span', { key: index, className: "greentext block" }, line);
    }
    return React.createElement('span', { key: index, className: "block" }, line);
  });
};

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getCurrent4chanTime = () => {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const MM =String(now.getMonth() + 1).padStart(2, '0');
  const DD = String(now.getDate()).padStart(2, '0');
  const YY = String(now.getFullYear()).slice(-2);
  const Day = days[now.getDay()];
  const HH = String(now.getHours()).padStart(2, '0');
  const Min = String(now.getMinutes()).padStart(2, '0');
  const SS = String(now.getSeconds()).padStart(2, '0');

  return `${MM}/${DD}/${YY}(${Day})${HH}:${Min}:${SS}`;
};

export const formatCompactNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(num);
};

export const formatCurrency = (num: number) => {
    if (num < 0.000001) return `$${num.toExponential(2)}`;
    if (num < 0.01) return `$${num.toFixed(6)}`;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(num);
};