"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Caraouselcomp from "@/components/Caraouselcomp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactMarkdown from "react-markdown";
export default function Home() {
  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 0);
  };

  // Adjust textarea height when input changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Scroll to bottom when messages or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input.trim(),
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const [textResponse, imageResponse] = await Promise.all([
        fetch(process.env.NEXT_PUBLIC_TEXT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input.trim() })
        }),
        fetch(process.env.NEXT_PUBLIC_IMAGE_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input.trim() })
        })
      ]);

      if (!textResponse.ok || !imageResponse.ok) {
        throw new Error(`HTTP error! status: ${textResponse.status}`);
      }
    
      const [textData, imageData] = await Promise.all([
        textResponse.json(),
        imageResponse.json()
      ]);
      
      if (!textData || !textData.response) {
        throw new Error('Invalid response format from server');
      }

      const botMessage = {
        content: textData.response,
        role: "assistant",
        images: imageData
      };
      setMessages((prev) => [...prev, botMessage]);
    } 
    catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        content: `Error: ${error.message}`,
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } 
    finally {
      setIsTyping(false);
    }
  };

  // Handle Enter key for submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <main className="fixed flex-1 p-2 container mx-auto max-w-7xl">
        <Card className="flex flex-col h-[85vh] border-none bg-black/30 backdrop-blur-sm shadow-xl">
          {/* Header */}
          <div className="p-2 border-b border-gray-800">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-white font-inter">
              <div className="p-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                <Bot className="w-8 h-8" />
              </div>
              LogiSearch
              <Sparkles className="w-6 h-6 text-gray-400 ml-2" />
            </h1>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-4 duration-300`}
                >
                  <div
                    className={`flex gap-2 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    } ${message.role === "assistant" ? "w-full max-w-[85%]" : "max-w-[70%]"}`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === "user" ? (
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-7 h-7 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                          <Bot className="w-7 h-7 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`rounded-[10px] p-2 shadow-lg break-words ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                          : "bg-gradient-to-r from-gray-900 to-black text-gray-100 w-full"
                      }`}
                    >
                      {/* Show assistant's carousel images */}
                      {message.role === "assistant" && index > 0 && message.images && (
                        <div className="mb-4">
                          <Caraouselcomp images={message.images} />
                          <hr className="border-gray-700 my-4"/>
                        </div>
                      )}
                      
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-black rounded-[10px] p-6 text-gray-400">
                      searching the internet...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-2 border-t border-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className={`flex-1 rounded-[10px] bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-white placeholder:text-gray-500 focus:ring-gray-700 resize-none overflow-hidden py-3 px-4 text-lg ${
                  isTyping ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ minHeight: "48px" }}
                disabled={isTyping}
              />

              <Button
                type="submit"
                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 rounded-[10px] h-[48px] flex-shrink-0 border border-gray-700"
                disabled={isTyping}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            
            {/* Footer Disclaimer */}
            <div className="mt-2 text-center text-sm text-gray-500">
              This AI assistant is currently in development stage and is for demonstration purposes only. 
              It may provide inaccurate results.
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}