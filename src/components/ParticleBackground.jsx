// src/components/ParticleBackground.jsx - 完整修复版本

import React, { useEffect, useRef, useState } from 'react';

// ... IwabayashiParticle 和 IwabayashiConnectionLine 类保持不变 ...

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  
  // 添加清理状态标志
  const isCleanedUpRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;
    let resizeObserver; // 添加ResizeObserver引用

    // 响应式画布设置
    const resizeCanvas = () => {
      // 检查是否已清理
      if (isCleanedUpRef.current || !canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(dpr, dpr);
      
      // 根据屏幕大小调整粒子数量
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      
      let particleCount;
      if (isMobile) {
        particleCount = 25;
      } else if (isTablet) {
        particleCount = 45;
      } else {
        particleCount = Math.min(70, Math.max(35, Math.floor((rect.width * rect.height) / 15000)));
      }
      
      // 重新初始化粒子
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new IwabayashiParticle(canvas));
      }
    };

    // 鼠标交互 - 添加防护条件
    const handleMouseMove = (e) => {
      if (isCleanedUpRef.current || !canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // 滚动优化 - 添加防护条件
    const handleScroll = () => {
      if (isCleanedUpRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // 在前两个屏幕高度内保持可见
      setIsVisible(scrollY < windowHeight * 2);
    };

    // 动画循环 - 添加防护条件
    const animate = () => {
      if (isCleanedUpRef.current || !canvas || !ctx) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      
      // 清除画布 - 岩林主题背景
      ctx.fillStyle = 'rgba(26, 26, 26, 0.95)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // 更新和绘制粒子
      particles.forEach(particle => {
        if (isCleanedUpRef.current) return; // 检查清理状态
        
        particle.update();
        particle.draw(ctx);

        // 鼠标吸引效果
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.0002;
          particle.vy += Math.sin(angle) * force * 0.0002;
          
          // 限制速度
          const maxSpeed = 1;
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
        }
      });

      // 绘制连接线（性能优化版）
      for (let i = 0; i < particles.length; i++) {
        if (isCleanedUpRef.current) break; // 检查清理状态
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const line = new IwabayashiConnectionLine(particles[i], particles[j], distance);
            line.draw(ctx);
          }
        }
      }

      if (!isCleanedUpRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // 初始化
    resizeCanvas();
    animate();

    // 使用ResizeObserver替代resize事件监听器（更高效）
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        if (!isCleanedUpRef.current) {
          resizeCanvas();
        }
      });
      resizeObserver.observe(canvas);
    } else {
      // 回退到resize事件监听器
      window.addEventListener('resize', resizeCanvas, { passive: true });
    }

    // 事件监听
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 完整的清理函数
    return () => {
      // 设置清理标志
      isCleanedUpRef.current = true;

      // 清理ResizeObserver
      if (resizeObserver) {
        try {
          resizeObserver.disconnect();
        } catch (error) {
          console.warn('Failed to disconnect ResizeObserver:', error);
        }
        resizeObserver = null;
      }
      
      // 清理事件监听器
      try {
        if (window.ResizeObserver) {
          // 如果使用了ResizeObserver，则不需要移除resize监听器
        } else {
          window.removeEventListener('resize', resizeCanvas);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      } catch (error) {
        console.warn('Failed to remove event listeners:', error);
      }
      
      // 清理动画帧
      if (animationRef.current) {
        try {
          cancelAnimationFrame(animationRef.current);
        } catch (error) {
          console.warn('Failed to cancel animation frame:', error);
        }
        animationRef.current = null;
      }
      
      // 清理粒子数组
      if (particles) {
        particles.length = 0;
      }
      
      // 清理canvas上下文
      if (ctx) {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.warn('Failed to clear canvas:', error);
        }
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2f3e46 25%, #1a1a1a 50%, #2f3e46 75%, #1a1a1a 100%)',
        opacity: isVisible ? 1 : 0.3,
        transition: 'opacity 0.8s ease-in-out'
      }}
    />
  );
};

export default ParticleBackground;