import React, { useEffect, useRef, useState } from 'react';

class IwabayashiParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.life = Math.random() * 300 + 150;
    this.maxLife = this.life;
    this.hue = Math.random() * 60 + 120; // 绿色色调范围
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.opacity = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;

    // 边界处理 - 柔和反弹
    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx *= -0.8;
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy *= -0.8;
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    // 生命周期管理
    if (this.life <= 0) {
      this.reset();
      this.life = this.maxLife;
      this.hue = Math.random() * 60 + 120;
    }

    // 透明度和大小变化
    const lifeRatio = this.life / this.maxLife;
    this.opacity = lifeRatio * 0.6 + 0.2;
    this.currentSize = this.size * (0.5 + lifeRatio * 0.5);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // 岩林主题渐变 - 深森林绿到玉绿色
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.currentSize * 3
    );
    
    // 使用岩林主题色调
    const colors = [
      'rgba(31, 78, 61, 0.8)',   // 深森林绿
      'rgba(45, 106, 79, 0.6)',  // 玉绿色  
      'rgba(64, 145, 108, 0.4)', // 苔藓绿
      'rgba(82, 185, 136, 0.2)'  // 鼠尾草绿
    ];
    
    const colorIndex = Math.floor(Math.random() * colors.length);
    const primaryColor = colors[colorIndex];
    
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(0.5, primaryColor.replace('0.8', '0.4').replace('0.6', '0.3').replace('0.4', '0.2').replace('0.2', '0.1'));
    gradient.addColorStop(1, 'rgba(31, 78, 61, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
    ctx.fill();
    
    // 添加微妙的内核发光
    ctx.globalAlpha = this.opacity * 0.8;
    ctx.fillStyle = 'rgba(82, 185, 136, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class IwabayashiConnectionLine {
  constructor(p1, p2, distance) {
    this.p1 = p1;
    this.p2 = p2;
    this.distance = distance;
    this.maxDistance = 100;
  }

  draw(ctx) {
    const opacity = (1 - this.distance / this.maxDistance) * 0.25;
    if (opacity <= 0.05) return;

    ctx.save();
    ctx.globalAlpha = opacity;
    
    // 岩林主题连接线 - 森林绿渐变
    const gradient = ctx.createLinearGradient(
      this.p1.x, this.p1.y, this.p2.x, this.p2.y
    );
    gradient.addColorStop(0, 'rgba(31, 78, 61, 0.6)');
    gradient.addColorStop(0.5, 'rgba(64, 145, 108, 0.8)');
    gradient.addColorStop(1, 'rgba(31, 78, 61, 0.6)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.restore();
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;

    // 响应式画布设置
    const resizeCanvas = () => {
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

    // 鼠标交互
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // 滚动优化
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // 在前两个屏幕高度内保持可见
      setIsVisible(scrollY < windowHeight * 2);
    };

    // 动画循环
    const animate = () => {
      if (!canvas || !ctx) {
        animationRef.current = requestAnimationFrame(animate);
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

      animationRef.current = requestAnimationFrame(animate);
    };

    // 初始化
    resizeCanvas();
    animate();

    // 事件监听
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
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