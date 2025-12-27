export interface PostData {
  id: number;
  no: number;
  time: string;
  name: string;
  tripcode?: string;
  subject?: string;
  message: string; // Supports greentext parsing
  imageUrl?: string;
  imageFilename?: string;
  imageSize?: string;
  replies?: number[];
  isOp?: boolean;
}

export interface TokenMetrics {
  price: number;
  marketCap: number;
  supply: number;
  change24h: number;
}

export const CA = "5q8RRQv4k4jd5tgWT9BmkZY1NMD3gv9GZ4cPUoPk3SV2";