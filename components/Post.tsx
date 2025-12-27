import React from 'react';
import { PostData, CA } from '../types';
import { formatMessage } from '../utils';
import { Copy, ExternalLink } from 'lucide-react';

interface PostProps {
  post: PostData;
  onReply?: (no: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onReply }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`mb-4 flex ${post.isOp ? 'flex-col' : 'bg-[#d6daf0] border border-[#b7c5d9] p-2 inline-block max-w-full sm:max-w-[80%]'}`} style={!post.isOp ? { borderRadius: '3px', borderRight: '1px solid #b7c5d9', borderBottom: '1px solid #b7c5d9' } : {}}>
      
      {/* Header */}
      <div className="text-[12px] text-[#888] mb-1">
        <input type="checkbox" className="mr-1" />
        {post.subject && <span className="subject mr-2">{post.subject}</span>}
        <span className="name mr-2">{post.name}</span>
        <span className="mr-2">{post.time}</span>
        <span className="mr-2 cursor-pointer hover:text-red-600">No.{post.no}</span>
        {post.isOp && <span className="sticky-pin">📌</span>}
        {post.isOp && (
           <span className="ml-2 text-[10px]">[<a href="#" className="no-underline hover:underline">Reply</a>]</span>
        )}
      </div>

      {/* File Info (Only if image exists) */}
      {post.imageUrl && (
        <div className="mb-1 text-[11px] text-[#888]">
          <span>File: <a href={post.imageUrl} target="_blank" rel="noreferrer" className="no-underline hover:underline">{post.imageFilename}</a> ({post.imageSize})</span>
        </div>
      )}

      {/* Content Wrapper */}
      <div className={`flex ${post.isOp ? 'flex-col sm:flex-row' : 'flex-col'}`}>
        {/* Image */}
        {post.imageUrl && (
          <div className={`${post.isOp ? 'mr-4 mb-2' : 'mb-2'}`}>
            <a href={post.imageUrl} target="_blank" rel="noreferrer">
              <img 
                src={post.imageUrl} 
                alt="Post attachment" 
                className={`border border-black/20 hover:border-black/50 ${post.isOp ? 'max-w-[250px] sm:max-w-[300px]' : 'max-w-[125px]'}`}
              />
            </a>
          </div>
        )}

        {/* Message */}
        <div className="post-message w-full">
           {/* If it's the OP, show the CA prominently */}
           {post.isOp && (
            <div className="mb-4 bg-[#f0e0d6] border-2 border-dashed border-red-800 p-6 w-full text-center shadow-sm">
                <div className="flex flex-col items-center gap-4 mb-2">
                    <span className="font-bold text-red-800 text-3xl tracking-tighter">CONTRACT ADDRESS</span>
                    
                    {/* Big CA Box */}
                    <div className="font-mono text-xl sm:text-3xl font-bold break-all select-all bg-white p-4 border-2 border-gray-400 w-full text-center shadow-inner text-blue-900">
                        {CA}
                    </div>

                    {/* Big Copy Button */}
                    <button 
                        onClick={handleCopyCA}
                        className="flex items-center justify-center gap-2 text-xl font-bold bg-[#eeaa88] border-2 border-[#800000] px-8 py-3 hover:bg-[#dd9977] text-[#800000] shadow-[4px_4px_0px_0px_rgba(128,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(128,0,0,1)] transition-all mt-2"
                    >
                        {copied ? "COPIED TO CLIPBOARD" : "CLICK TO COPY CA"} <Copy size={24} />
                    </button>
                </div>

                {/* Big Community Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
                     <a href={`https://dexscreener.com/solana/${CA}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-blue-900 hover:text-red-600 bg-white border border-gray-400 px-3 py-1 shadow-sm">
                        [DexScreener <ExternalLink size={16}/>]
                     </a>
                     <a href="https://x.com/i/communities/2004876692997677167" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-blue-900 hover:text-red-600 bg-white border border-gray-400 px-3 py-1 shadow-sm">
                        [X Community <ExternalLink size={16}/>]
                     </a>
                     <a href="https://telegram.org" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-blue-900 hover:text-red-600 bg-white border border-gray-400 px-3 py-1 shadow-sm">
                        [Telegram <ExternalLink size={16}/>]
                     </a>
                </div>
            </div>
           )}

           {formatMessage(post.message)}
           
           {post.replies && post.replies.length > 0 && (
             <div className="mt-4 text-[11px] text-[#888]">
               {post.replies.map(r => (
                 <span key={r} className="mr-2 underline decoration-dashed cursor-pointer hover:text-red-600">&gt;&gt;{r}</span>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Post;