
import React, { useState, useRef, useEffect } from 'react';
import WindowWrapper from "../hoc/WindowWrapper";
import { generateResponse } from "../utils/gemini.js";
import WindowControls from "../components/WindowControls";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'model', text: "Hey! I'm Joseph's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const responseText = await generateResponse(input, messages);
      const botMessage = { sender: 'model', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { sender: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 rounded-b-xl">
      {/* Header */}
      <div className="w-full bg-gray-100 border-b p-3 flex items-center justify-between rounded-t-xl" id="window-header">
         <WindowControls target="chat" />
         <span className="font-semibold text-gray-700">Chat with AI</span>
         <div className="w-14"></div> {/* Spacer for centering title */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
             <div className="bg-white text-gray-500 border border-gray-200 p-3 rounded-2xl rounded-bl-none text-sm animate-pulse">
                Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-full px-4 py-2 text-sm outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isThinking}
            className="bg-blue-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WindowWrapper(Chat, "chat");
