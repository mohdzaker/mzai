import React from 'react';
import PromptHistory from './PromptHistory';
import ChatHistory from './ChatHistory';

const Chat = () => {
  return (
    <main className="flex bg-gray-100 dark:bg-gray-900 h-screen overflow-hidden">
      
      <div id="sidebar" className="hidden md:block w-1/5 bg-gray-800 text-white flex-none">
        <PromptHistory />
      </div>

      <div id="main" className="flex-1 flex flex-col">
        {/* Chat History - Make sure it can scroll independently */}
        <div className="flex-1 overflow-auto">
          <ChatHistory />
        </div>

        {/* Sticky Footer */}
        <form className="bg-gray-800 px-4 py-2 sticky bottom-0 w-full">
          <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
          <div className="relative flex items-center">
            <button
              type="button"
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"
            >
              {/* SVG icon */}
            </button>
            <textarea
              id="chat-input"
              className="block w-full resize-none rounded-xl border-none p-4 pl-10 pr-20 text-sm text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600"
              placeholder="Enter your prompt"
              rows="1"
              required
            ></textarea>
            <button
              type="submit"
              className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send <span className="sr-only">Send message</span>
            </button>
          </div>
          <div className='text-center pt-1 text-slate-400 font-serif text-sm'>MzAi can make mistakes. Check it carefully!</div>
        </form>
      </div>
    </main>
  );
}

export default Chat;
