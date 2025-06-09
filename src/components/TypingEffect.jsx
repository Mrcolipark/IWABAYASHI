import React, { useState, useEffect } from "react";

export default function TypingEffect({ text, speed = 100, showCursor = true, loop = false }) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;
    let idx = 0;
    setDisplayed("");
    setIsTyping(true);

    const timer = setInterval(() => {
      if (idx < text.length) {
        setDisplayed(text.slice(0, idx + 1));
        idx++;
      } else {
        setIsTyping(false);
        if (loop) {
          setTimeout(() => { idx = 0; setDisplayed(""); setIsTyping(true); }, 2000);
        } else {
          clearInterval(timer);
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, loop]);

  return (
    <div className="relative">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2 leading-tight select-none">
        {displayed}
        {showCursor && (
          <span className={`inline-block ml-1 ${isTyping ? 'animate-pulse' : 'blinking-cursor'}`}>
            |
          </span>
        )}
      </h1>
    </div>
  );
}
