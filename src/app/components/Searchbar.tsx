'use client';
import { useState } from 'react';
import Image from 'next/image';
import sendbutton from '@/app/assets/icons/send-button.png';
import axios from 'axios';

type Message = {
  text: string;
  type: 'user' | 'agent';
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const userMessage: Message = { text: query, type: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setQuery('');
      setLoading(true);

      try {
        const response = await axios.post('https://backend.thehameeds.com/chat/', {
          prompt: query,
        });
        const agentMessage: Message = { text: response.data.response, type: 'agent' };
        setMessages((prev) => [...prev, agentMessage]);
        setLoading(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[300vh] bg-[#802930] flex flex-col justify-end items-center p-4">
      <div className="2xl:w-[80%] w-full no-scrollbar rounded-lg overflow-y-auto h-full 2xl:max-h-[100vh] flex flex-col p-4 absolute top-10 left-1/2 transform -translate-x-1/2 pb-20">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 2xl:mb-4 mb-2 rounded-lg ${
              message.type === 'user' ? 'bg-[#f0f2f3] w-fit' : 'bg-[#c9e4d8]'
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 animate-gradient-x">
              Building...
            </p>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <form
          onSubmit={handleSearch}
          className="2xl:w-[40%] xl:w-[40%] w-full bg-[#f0f2f3] rounded-full p-2 flex items-center"
        >
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch(e);
              }
            }}
            placeholder="Ask about any esports player or ask help with building a team"
            className="flex-grow resize-none no-scrollbar bg-[#f0f2f3] border-none outline-none rounded-full p-3 h-auto max-h-[200px]"
            rows={1}
          />
          <button type="submit" className="flex items-center justify-center mr-3">
            <Image src={sendbutton} alt="Send" width={24} height={24} className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
