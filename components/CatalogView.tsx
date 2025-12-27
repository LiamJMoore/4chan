import React, { useState } from 'react';

interface CatalogViewProps {
  onPost: (data: { name: string; subject: string; comment: string }) => void;
}

const CatalogView: React.FC<CatalogViewProps> = ({ onPost }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onPost({
      name: name || 'Anonymous', // Default to Anonymous if empty
      subject: subject,
      comment: comment
    });

    // Reset form
    setComment('');
    setSubject('');
    setName('');
  };

  return (
    <div className="text-center mb-6">
      {/* Banner / Main Logo */}
      <div className="mb-2 flex justify-center">
         <img 
            src="https://s.4cdn.org/image/fp/logo-transparent.png" 
            alt="4chan Logo" 
            className="max-h-[150px] border border-[#b7c5d9] bg-white p-4"
            title="Where memes are born"
         />
      </div>

      <div className="mb-4">
        <h1 className="text-[#800000] text-[24px] font-bold font-sans tracking-tight">
          /biz/ - Business & Finance
        </h1>
        <div className="text-[11px] mt-1 text-gray-800">
           The best place to lose money.
        </div>
      </div>

      <div className="border border-[#b7c5d9] bg-[#eeaa88] p-1 mx-auto max-w-[95%] sm:max-w-[400px] text-[10px] sm:text-[11px] font-bold text-[#800000]">
        [<a href="#" className="no-underline">Catalog</a>] 
        [<a href="#" className="no-underline">Bottom</a>] 
        [<a href="#" className="no-underline">Update</a>] 
      </div>
      
      <div className="border border-t-0 border-[#b7c5d9] bg-[#f0e0d6] mx-auto max-w-[95%] sm:max-w-[400px] p-2">
         <div className="text-center text-[18px] font-bold text-red-600 animate-pulse mb-2">
            WARNING: V4 SOLANA MAINNET DEPLOYED
         </div>
         <form className="flex flex-col gap-1 items-center" onSubmit={handleSubmit}>
            <div className="flex gap-1 w-full justify-center">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="border border-[#aaa] p-0.5 text-[11px] w-[150px]" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input type="text" placeholder="Options" className="border border-[#aaa] p-0.5 text-[11px] w-[150px]" disabled />
            </div>
            <div className="flex gap-1 w-full justify-center">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="border border-[#aaa] p-0.5 text-[11px] w-[250px]" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <button type="submit" className="bg-[#eeaa88] border border-[#b7c5d9] text-[10px] px-2 cursor-pointer hover:bg-[#dd9977]">Post</button>
            </div>
            <textarea 
              className="border border-[#aaa] w-[304px] h-[80px] text-[11px] p-1" 
              placeholder="Comment" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
         </form>
      </div>
      <hr className="border-[#b7c5d9] mt-4 max-w-[95%] mx-auto" />
    </div>
  );
};

export default CatalogView;