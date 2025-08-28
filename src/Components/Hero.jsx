import React, { useState, useEffect, useRef, useCallback } from 'react';

// Sub-components for better organization
const CustomCursor = ({ isLoaded, cursorVariant }) => {
  const cursorRef = useRef(null);
  const requestRef = useRef();
  
  useEffect(() => {
    let cursorX = 0;
    let cursorY = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    const animateCursor = () => {
      const easeFactor = 0.15;
      cursorX += (mouseX - cursorX) * easeFactor;
      cursorY += (mouseY - cursorY) * easeFactor;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    requestRef.current = requestAnimationFrame(animateCursor);
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      style={{
        width: cursorVariant === 'hover' ? '60px' : '30px',
        height: cursorVariant === 'hover' ? '60px' : '30px',
        background: cursorVariant === 'hover' 
          ? 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(134, 102, 165,0.4) 70%)' 
          : 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(179, 151, 42,0.3) 70%)',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        display: isLoaded ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoaded ? 1 : 0,
        transition: 'width 0.3s, height 0.3s, background 0.3s, opacity 0.3s',
        transform: 'translate(-50%, -50%)',
        left: 0,
        top: 0
      }}
    >
      {/* {cursorVariant === 'hover' && (
        <span className="text-black text-xs font-bold">Explore</span>
      )} */}
    </div>
  );
};

const ServiceRotation = ({ services, currentIndex }) => {
  return (
    <div className="relative h-20 lg:h-24 overflow-hidden mb-3">
      <div className="absolute inset-0">
        {services.map((service, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center transition-all duration-700 ${
              index === currentIndex
                ? 'opacity-100 translate-y-0 blur-0'
                : index < currentIndex
                  ? 'opacity-0 -translate-y-full blur-sm'
                  : 'opacity-0 translate-y-full blur-sm'
            }`}
          >
            <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent font-black mr-4 text-4xl lg:text-5xl`}>
              {service.text}
            </span>
            <span className="text-4xl">{service.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({ metric, isActive, index }) => {
  return (
    <div 
      className={`bg-white/5 backdrop-blur-xl border rounded-xl p-4 transition-all duration-500 ${
        isActive 
          ? 'border-white/30 scale-105 opacity-100' 
          : 'border-white/10 scale-100 opacity-60'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl font-black text-white mb-1">
        {metric.value}
        <span className="text-lg">{metric.suffix}</span>
      </div>
      <div className="text-white/70 text-sm">{metric.label}</div>
      <div className="text-green-400 text-xs font-medium mt-1">{metric.trend}</div>
    </div>
  );
};

const PRSparkzHeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [cursorVariant, setCursorVariant] = useState('default');
  const containerRef = useRef(null);

  const services = [
    { 
      text: "Social Media Marketing", 
      gradient: "from-purple-500 to-[#8666A5]",
      icon: "📱",
      description: "Amplify your digital presence"
    },
    { 
      text: "Influencer Marketing", 
      gradient: "from-[#B3972A] to-[#DBC865]",
      icon: "🌟",
      description: "Leverage celebrity influence"
    },
    { 
      text: "PR & Offline Events", 
      gradient: "from-blue-500 to-cyan-400",
      icon: "🎪",
      description: "Create memorable experiences"
    },
    { 
      text: "Brand Storytelling", 
      gradient: "from-pink-500 to-rose-400",
      icon: "📖",
      description: "Craft compelling narratives"
    }
  ];

  const metrics = [
    { label: "Brand Visibility Increase", value: "278", suffix: "%", trend: "+32%" },
    { label: "Campaign ROI", value: "5.7", suffix: "X", trend: "+142%" },
    { label: "Media Impressions", value: "3.2", suffix: "B", trend: "+78%" },
    { label: "Client Growth", value: "120", suffix: "+", trend: "+45%" }
  ];

  const features = [
    { icon: "🎯", label: "Strategic Approach" },
    { icon: "🚀", label: "Rapid Execution" },
    { icon: "💡", label: "Creative Excellence" },
    { icon: "📊", label: "Measurable Results" }
  ];

  // Service rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  // Metric rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [metrics.length]);

  // Mouse movement handler with throttling
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: x * 40, y: y * 40 });
    }
  }, []);

  // Interactive element handlers
  const handleMouseEnter = useCallback(() => setCursorVariant('hover'), []);
  const handleMouseLeave = useCallback(() => setCursorVariant('default'), []);

  // Set up event listeners
  useEffect(() => {
    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor isLoaded={isLoaded} cursorVariant={cursorVariant} />

      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(134, 102, 165, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(179, 151, 42, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(219, 200, 101, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0c0c0c 100%)
          `,
          cursor: 'none'
        }}
      >
        
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-soft-light bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("/pr sparkz final logo_1.png")`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              
              {/* Trust Indicator */}
              <div className={`inline-flex items-center gap-4 mb-8 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-[#8666A5] to-[#B3972A] flex items-center justify-center text-white text-xs font-bold transition-all duration-500 hover:scale-110 hover:z-10 hover:border-white/50 interactive`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2">
                  <span className="text-white/90 text-sm font-medium">Trusted by 120+ growing brands</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] mb-6 transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <span className="block text-white mb-3">
                  Launch & Scale
                </span>
                
                {/* Dynamic Service Rotation */}
                <ServiceRotation services={services} currentIndex={currentIndex} />
                
                <span className="block bg-gradient-to-r from-white via-[#DBC865] to-white bg-clip-text text-transparent">
                  For Startups
                </span>
              </h1>

              {/* Dynamic Subtitle */}
              <p className={`text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed transition-all duration-1000 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                {services[currentIndex]?.description} with our strategic approach that blends 
                <span className="text-transparent bg-gradient-to-r from-[#8666A5] to-[#B3972A] bg-clip-text font-semibold"> creativity, strategy, and execution</span> to build recognizable, scalable brands.
              </p>

              {/* Metrics Grid */}
              <div className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                {metrics.map((metric, index) => (
                  <MetricCard 
                    key={index} 
                    metric={metric} 
                    isActive={index === activeMetric} 
                    index={index}
                  />
                ))}
              </div>

              {/* Feature Pills */}
              <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                {features.map((feature, index) => (
                  <div 
                    key={feature.label}
                    className="group flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 interactive"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-white/80 text-sm font-medium group-hover:text-white">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#8666A5] via-[#B3972A] to-[#DBC865] rounded-2xl text-white font-bold shadow-2xl shadow-[#B3972A]/25 hover:shadow-[#B3972A]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 interactive">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DBC865] via-[#B3972A] to-[#8666A5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-200"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Your Brand
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                
                <button className="group flex items-center gap-3 px-6 py-4 border-2 border-white/20 rounded-2xl text-white font-semibold backdrop-blur-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] interactive">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-3-6v6" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-sm md:text-base">View Case Studies</div>
                    <div className="text-white/60 text-xs">Success stories</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Visual Dashboard */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className={`relative transition-all duration-1000 delay-800 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                
                {/* Brand Image */}
                <div className="relative bg-gradient-to-br from-[#8666A5]/20 to-[#B3972A]/20 backdrop-blur-2xl rounded-3xl border-2 border-dashed border-white/30 p-6 h-80 lg:h-96 flex items-center justify-center interactive">
                  <img 
                    src="/src/components/pr sparkz final logo_1.png" 
                    alt="PR Sparkz Brand Logo" 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style={{display: 'none'}} className="text-white text-6xl">🚀</div>
                </div>
                  
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#B3972A] rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#8666A5] rounded-full"></div>

                {/* Floating Success Indicators */}
                <div 
                  className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-gradient-to-r from-[#8666A5] to-[#B3972A] rounded-2xl p-3 lg:p-4 border border-white/20 shadow-xl animate-pulse interactive"
                  style={{
                    transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
                    transition: 'transform 0.4s ease-out'
                  }}
                >
                  <div className="text-white font-bold text-sm lg:text-base">🚀 Launch Success</div>
                  <div className="text-white/80 text-xs">Brand #247</div>
                </div>
                
                <div 
                  className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-gradient-to-r from-[#B3972A] to-[#DBC865] rounded-2xl p-3 lg:p-4 border border-white/20 shadow-xl animate-bounce interactive"
                  style={{
                    transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
                    transition: 'transform 0.4s ease-out',
                    animationDelay: '1s'
                  }}
                >
                  <div className="text-white font-bold text-sm lg:text-base">📈 Growth +278%</div>
                  <div className="text-white/80 text-xs">Client case study</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PRSparkzHeroSection;