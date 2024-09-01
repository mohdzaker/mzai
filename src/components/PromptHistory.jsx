"use client"

export default function PromptHistory() {
  return (
    <>   
    <div className="hidden md:flex flex-col w-full min-h-screen  py-5 pb-10 border-slate-200/10 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2 border-slate-200 ">
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">
          Chats
        </h2>
        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200">
          24
        </span>
      </div>

      {/* Search Form */}
      <form className="mx-2 mt-4">
        <label htmlFor="search-chats" className="sr-only">Search chats</label>
        <div className="relative">
          <input
            id="search-chats"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            placeholder="Search chats"
            required
          />
          <button
            type="button"
            className="absolute bottom-2 right-2.5 rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 9h8"></path>
              <path d="M8 13h5"></path>
              <path d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M20.2 20.2l1.8 1.8"></path>
            </svg>
            <span className="sr-only">Search chats</span>
          </button>
        </div>
      </form>

      {/* Scrollable Container */}
      <div className="flex-1 my-4 mx-2 h-80 space-y-4 overflow-y-auto">
        {[
          { title: 'Tailwind Classes', date: '12 Mar' },
          { title: 'Explain quantum computing', date: '10 Feb' },
          { title: 'How to create ERP Diagram', date: '22 Jan' },
          { title: 'API Scaling Strategies', date: '1 Jan' },
          { title: 'What is GPT UI?', date: '1 Jan' },
          { title: 'How to use Tailwind components?', date: '1 Jan' },
        ].map((chat, index) => (
          <button
            key={index}
            className={`flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 focus:outline-none ${
              index === 1
                ? 'bg-slate-200 dark:bg-slate-800'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              {chat.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {chat.date}
            </p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mx-2 mt-auto mb-8">
        <button
          className="flex w-full flex-row-reverse justify-between rounded-lg bg-slate-600 p-4 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-blue-600 focus:outline-none dark:bg-slate-800 dark:hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          <span>New Chat</span>
        </button>
      </div>
    </div>
    </>
  );
}
