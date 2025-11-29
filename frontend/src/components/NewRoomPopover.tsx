import { useState } from 'react';

const NewRoomPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRoomId = () => {
    const id = String(Math.floor(10000000 + Math.random() * 90000000));
    setRoomId(id);
    setCopied(false);
    setIsOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied" text after 2s
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Text */}
      <span
        onClick={() => {
          if (!isOpen) generateRoomId();
          else setIsOpen(false);
        }}
        className="text-[#2253c5] cursor-pointer hover:underline font-semibold transition-all"
      >
        new room
      </span>

      {/* Popover Content */}
      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-[#1e293b] border border-gray-700 rounded-lg shadow-xl p-4 z-10">
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2 border-8 border-transparent border-t-[#1e293b]"></div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold text-sm">Room Created</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-300 text-xs mb-2">Share this Room ID:</p>
          
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={roomId}
              className="w-full bg-[#334155] text-white text-sm px-2 py-1 rounded border border-gray-600 outline-none"
            />
            <button
              onClick={copyToClipboard}
              className=" text-white p-1.5 rounded transition-colors"
              title="Copy"
            >
              {/* Simple Copy Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {copied && <p className="text-[#22c55e] text-xs mt-1 text-right">Copied!</p>}
        </div>
      )}
    </div>
  );
};

export default NewRoomPopover;