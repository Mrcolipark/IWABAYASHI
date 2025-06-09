import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import TypingEffect from "./TypingEffect";

export default function Banner({ slogan, subtitle }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className="max-w-7xl mx-auto my-12 px-4">
      {/* 桌面版对角切分设计 */}
      <div className="hidden md:block relative h-96 overflow-hidden rounded-xl shadow-2xl">
        {/* 左侧图片部分 - 梯形 */}
        <div className="absolute inset-0 w-full h-full">
          <div className="diagonal-left absolute top-0 left-0 w-3/5 h-full overflow-hidden">
            <Carousel onSlideChange={setCurrentImage} />
          </div>
        </div>

        {/* 右侧文字部分 - 梯形 */}
        <div className="absolute inset-0 w-full h-full">
          <div className="diagonal-right absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-emerald-900 flex items-center justify-center">
            <div className="text-white text-center max-w-sm ml-auto mr-8 lg:mr-16">
              <TypingEffect text={slogan} speed={80} className="text-xl lg:text-3xl font-bold mb-4 text-emerald-400" />
              <p className="text-emerald-300 text-sm lg:text-base leading-relaxed">
                {subtitle}
              </p>
              {/* 装饰性元素 */}
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="w-12 h-0.5 bg-emerald-400"></div>
                <span className="text-emerald-400 text-xs font-medium tracking-wider">IWABAYASHI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 移动版垂直布局 */}
      <div className="md:hidden space-y-0 rounded-xl overflow-hidden shadow-xl">
        {/* 上部分 - 图片 */}
        <div className="relative h-48 overflow-hidden">
          <Carousel onSlideChange={setCurrentImage} />
        </div>
        
        {/* 下部分 - 文字 */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-emerald-900 p-6 text-white text-center">
          <TypingEffect text={slogan} speed={80} className="text-xl font-bold mb-3" />
          <p className="text-emerald-300 text-base leading-relaxed mb-4">
            {subtitle}
          </p>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-0.5 bg-emerald-400"></div>
            <span className="text-emerald-400 text-xs font-medium tracking-wider">IWABAYASHI</span>
            <div className="w-8 h-0.5 bg-emerald-400"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* 左侧图片梯形 - 上宽下窄 */
        .diagonal-left {
          clip-path: polygon(0 0, 95% 0, 65% 100%, 0 100%);
        }
        
        /* 右侧文字梯形 - 上窄下宽，与左侧完美拼接 */
        .diagonal-right {
          clip-path: polygon(60% 0, 100% 0, 100% 100%, 42.5% 100%);
        }

        /* 添加微妙的悬浮动画 */
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-5px); 
          }
        }

        .diagonal-left,
        .diagonal-right {
          transition: transform 0.3s ease;
        }

        .diagonal-left:hover {
          transform: scale(1.02);
        }

        .diagonal-right:hover {
          transform: scale(1.02);
        }

        /* 确保文字在移动端可读 */
        @media (max-width: 768px) {
          .diagonal-left,
          .diagonal-right {
            clip-path: none;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}