import React, { useState, useEffect } from "react";

const SimpleMultiLanguageTypingEffect = ({ 
  chineseText = "搭建中日优质商品流通桥梁，促进两国经贸繁荣",
  japaneseText = "上質な製品で\nユーザーとつながる",
  englishText = "Connecting users with\nhigh-quality products",
  typingSpeed = 100,
  pauseDuration = 2000,
  erasingSpeed = 50
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  // 三语言文本数组
  const texts = [chineseText, japaneseText, englishText];
  const currentText = texts[currentLanguage] || "";

  useEffect(() => {
    let timer;

    if (isTyping) {
      // 打字阶段
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        // 打字完成，暂停一段时间后开始删除
        timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      // 删除阶段
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        }, erasingSpeed);
      } else {
        // 删除完成，切换到下一种语言
        setCurrentLanguage(prev => (prev + 1) % texts.length);
        setIsTyping(true);
        setCharIndex(0);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, currentText, typingSpeed, pauseDuration, erasingSpeed, texts.length]);

  // 光标闪烁效果
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="relative">
      {/* 打字机文本 */}
      <div className="text-center min-h-[100px] flex items-center justify-center mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight select-none max-w-lg">
          <span 
            style={{
              color: '#40916c'
            }}
          >
            {displayText}
          </span>
          {showCursor && (
            <span 
              className="animate-pulse ml-1"
              style={{
                color: '#40916c'
              }}
            >
              |
            </span>
          )}
        </h1>
      </div>

      {/* 响应式样式 */}
      <style jsx>{`
        /* 响应式字体大小 */
        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem;
            line-height: 1.3;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.25rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleMultiLanguageTypingEffect;