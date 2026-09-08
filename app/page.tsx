"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "What are the key signs of a STEMI?",
    "Walk me through a stroke assessment.",
    "What should I consider for a difficult airway?",
    "What are important causes of altered mental status?",
  ];

  return (
    <main className="flex min-h-screen bg-[#f7f7f5] text-[#171717]">
      {/* Sidebar */}
      <aside className="hidden w-[260px] flex-col border-r border-[#deded9] bg-[#f1f1ee] p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-sm text-white">
            R
          </div>
          <span className="font-semibold tracking-tight">RUNSHEET</span>
        </div>

        <button className="mb-6 rounded-lg border border-[#d5d5d0] bg-white px-4 py-3 text-left text-sm font-medium shadow-sm">
          + New chat
        </button>

        <div className="px-2 text-xs font-semibold uppercase tracking-wider text-[#777]">
          Recent
        </div>

        <div className="mt-2 space-y-1">
          <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#e7e7e3]">
            Chest pain assessment
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#e7e7e3]">
            Stroke differential
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#e7e7e3]">
            Trauma question
          </button>
        </div>

        <div className="mt-auto border-t border-[#deded9] pt-4 text-xs text-[#777]">
          Study tool · Not a protocol
        </div>
      </aside>

      {/* Main area */}
      <section className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-[#deded9] bg-[#f7f7f5] px-5 md:px-8">
          <div>
            <div className="font-semibold">Paramedic AI Copilot</div>
            <div className="text-xs text-[#777]">
              Decision-support assistant
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#666]">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </div>
        </header>

        {/* Chat */}
        <div className="flex flex-1 justify-center overflow-y-auto">
          <div className="w-full max-w-3xl px-5 py-16 md:px-8">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#171717] text-xl text-white">
                R
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                How can I help?
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#707070]">
                Ask questions about assessment, pharmacology, differential
                diagnosis, trauma, airway management, or other paramedic topics.
              </p>
            </div>

            {/* Suggested questions */}
            <div className="grid gap-3 sm:grid-cols-2">
              {suggestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setMessage(question)}
                  className="rounded-xl border border-[#deded9] bg-white p-4 text-left text-sm transition hover:border-[#aaa] hover:shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message box */}
        <div className="sticky bottom-0 bg-[#f7f7f5] px-5 pb-5 pt-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end rounded-2xl border border-[#d5d5d0] bg-white p-2 shadow-sm">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a paramedic question..."
                rows={1}
                className="max-h-40 flex-1 resize-none bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#999]"
              />

              <button
                onClick={() => console.log(message)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-white hover:bg-[#333]"
              >
                ↑
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-[#888]">
              RUNSHEET AI can make mistakes. Study tool, not a protocol.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}