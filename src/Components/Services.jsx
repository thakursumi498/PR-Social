import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SocialMediaMarketing = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated services with PR Sparkz brand colors and your content
  const services = [
    { 
      id: 1, 
      title: "Content Planning & Strategy", 
      desc: "We tailor monthly calendars keeping each brand's unique tone, audience, and industry relevance in mind.",
      icon: "📅",
      color: "from-[#8666A5] to-[#5a3d80]",
      bgColor: "bg-gradient-to-br from-[#8666A5]/10 to-[#5a3d80]/10",
      stats: { metric1: "+127%", label1: "Engagement", metric2: "+89%", label2: "Consistency" },
      features: ["Audience Analysis", "Content Strategy", "Calendar Planning", "Industry Research"]
    },
    { 
      id: 2, 
      title: "Design & Creation", 
      desc: "We conceptualize and create static posts, reels, carousels, and story assets that resonate with your brand's message.",
      icon: "🎨",
      color: "from-[#B3972A] to-[#8c761f]",
      bgColor: "bg-gradient-to-br from-[#B3972A]/10 to-[#8c761f]/10",
      stats: { metric1: "+156%", label1: "Visual Appeal", metric2: "+203%", label2: "Brand Alignment" },
      features: ["Visual Design", "Video Production", "Asset Creation", "Brand Consistency"]
    },
    { 
      id: 3, 
      title: "Copywriting", 
      desc: "Every caption is crafted to match the brand's voice, maintaining clarity, tone, and relatability.",
      icon: "✍️",
      color: "from-[#8666A5] to-[#B3972A]",
      bgColor: "bg-gradient-to-br from-[#8666A5]/10 to-[#B3972A]/10",
      stats: { metric1: "+234%", label1: "Engagement", metric2: "+167%", label2: "Voice Consistency" },
      features: ["Tone Matching", "Conversational Writing", "Educational Content", "Aspirational Messaging"]
    },
    { 
      id: 4, 
      title: "Posting & Scheduling", 
      desc: "We ensure timely posting based on platform-specific insights to maximize engagement and visibility.",
      icon: "⏰",
      color: "from-[#DBC865] to-[#B3972A]",
      bgColor: "bg-gradient-to-br from-[#DBC865]/10 to-[#B3972A]/10",
      stats: { metric1: "+312%", label1: "Visibility", metric2: "+145%", label2: "Optimal Timing" },
      features: ["Platform Analytics", "Scheduling Tools", "Optimal Timing", "Cross-Platform Posting"]
    },
    { 
      id: 5, 
      title: "Community Management", 
      desc: "We actively monitor comments, DMs, and brand mentions to ensure real-time engagement.",
      icon: "👥",
      color: "from-[#8666A5] to-[#DBC865]",
      bgColor: "bg-gradient-to-br from-[#8666A5]/10 to-[#DBC865]/10",
      stats: { metric1: "+189%", label1: "Response Rate", metric2: "+124%", label2: "Community Growth" },
      features: ["Comment Management", "DM Responses", "Brand Monitoring", "Relationship Building"]
    },
    { 
      id: 6, 
      title: "Performance Monitoring", 
      desc: "Each campaign's reach, engagement, and follower growth are regularly tracked to optimize future efforts.",
      icon: "📊",
      color: "from-[#B3972A] to-[#DBC865]",
      bgColor: "bg-gradient-to-br from-[#B3972A]/10 to-[#DBC865]/10",
      stats: { metric1: "+95%", label1: "ROI", metric2: "+78%", label2: "Follower Growth" },
      features: ["Analytics Tracking", "Performance Reports", "Growth Analysis", "Strategy Optimization"]
    },
  ];

  // Mouse tracking for interactive effects - only on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Auto-rotate through services with smoother transitions
  useEffect(() => {
    if (isHovered || hoveredCard !== null || isMobile) return;
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, hoveredCard, services.length, isMobile]);

  // Custom cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "#8666A5",
      mixBlendMode: "difference",
    },
    cardHover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "#B3972A",
      mixBlendMode: "difference",
    },
    ctaHover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      backgroundColor: "#DBC865",
      mixBlendMode: "normal",
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 100 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="social-media-marketing" 
      className="min-h-screen py-16 md:py-24 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 text-slate-900 overflow-hidden relative"
      ref={ref}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Enhanced animated background with 3D effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern bg-center bg-cover animate-grid-move" />
        </div>

        {/* Gradient orbs with 3D effect using brand colors */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: `radial-gradient(circle, ${
                ['rgba(134, 102, 165, 0.1)', 'rgba(179, 151, 42, 0.08)', 'rgba(219, 200, 101, 0.09)', 'rgba(134, 102, 165, 0.07)'][i % 4]
              } 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* 3D floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: i * 0.8 }}
          >
            <div className={`w-16 h-16 ${i % 2 ? 'bg-gradient-to-br from-[#8666A5] to-[#B3972A] rounded-full' : 'bg-gradient-to-br from-[#B3972A] to-[#DBC865] rotate-45'}`} />
          </motion.div>
        ))}
      </div>

      {/* Custom animated cursor - only on desktop */}
      {!isMobile && (
        <motion.div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{ type: "spring", damping: 15, mass: 0.5 }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        {/* Enhanced header with 3D text effect */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[#8666A5]/10 to-[#B3972A]/10 text-[#8666A5] rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              Social Media Marketing
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 md:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            End-to-End{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8666A5] via-[#B3972A] to-[#DBC865] animate-gradient-x drop-shadow-2xl">
                Social Media Management
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#8666A5] to-[#DBC865] rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We have successfully handled social media marketing for a diverse range of brands across industries — from fashion and lifestyle to education and tech.
          </motion.p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8 md:gap-16 items-start">
          {/* Enhanced service cards with 3D flip effect */}
          <motion.div 
            className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ 
                  y: isMobile ? 0 : -8, 
                  scale: isMobile ? 1 : 1.03,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className={`group p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/50 ${service.bgColor} relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500`}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setActiveService(index);
                    setHoveredCard(index);
                    setCursorVariant("cardHover");
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredCard(null);
                    setCursorVariant("default");
                  }
                }}
                onClick={() => isMobile && setActiveService(index)}
              >
                {/* 3D gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 rounded-3xl`}
                  whileHover={{ opacity: isMobile ? 0 : 0.1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* 3D shine effect */}
                {!isMobile && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-y-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ transform: 'translateX(-100%) skewY(-12deg)' }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl md:text-5xl mb-4 md:mb-6 filter drop-shadow-lg"
                    whileHover={{ 
                      scale: isMobile ? 1 : 1.3,
                      rotate: isMobile ? 0 : [0, -10, 10, 0],
                      transition: { duration: 0.6 }
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {service.desc}
                  </p>

                  {/* Features list with staggered animation */}
                  <div className="space-y-2 mb-4 md:mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center space-x-2 text-xs md:text-sm text-slate-500"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick stats with 3D effect */}
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <motion.div 
                      className="p-2 md:p-3 bg-white/60 rounded-xl text-center shadow-md"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`text-base md:text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.stats.metric1}
                      </div>
                      <div className="text-xs text-slate-500">{service.stats.label1}</div>
                    </motion.div>
                    <motion.div 
                      className="p-2 md:p-3 bg-white/60 rounded-xl text-center shadow-md"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`text-base md:text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.stats.metric2}
                      </div>
                      <div className="text-xs text-slate-500">{service.stats.label2}</div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Active indicator with 3D effect */}
                {activeService === index && (
                  <motion.div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-t-3xl`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}

                {/* 3D corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${service.color} rounded-full`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced 3D preview panel - hidden on mobile, visible on desktop */}
          {!isMobile && (
            <motion.div 
              className="w-full xl:w-1/3 sticky top-32 h-[600px]"
              variants={previewVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-2xl border border-white/50 backdrop-blur-sm">
                {/* 3D floating background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {['📱', '💬', '👍', '📸', '🎥', '🔔', '💡', '🚀'].map((icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-3xl opacity-10"
                      style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, Math.random() * 20 - 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: Math.random() * 8 + 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>

                {/* 3D preview content */}
                <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 h-full">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeService}
                      className="text-center w-full"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <motion.div 
                        className="text-5xl md:text-6xl mb-6 md:mb-8 filter drop-shadow-lg"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {services[activeService].icon}
                      </motion.div>
                      
                      <h3 className={`text-2xl md:text-3xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r ${services[activeService].color}`}>
                        {services[activeService].title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                        {services[activeService].desc}
                      </p>
                      
                      {/* Enhanced 3D stats */}
                      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                        <motion.div 
                          className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-[#8666A5]/10 to-[#8666A5]/20 shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <div className="text-2xl md:text-3xl font-black text-[#8666A5]">
                            {services[activeService].stats.metric1}
                          </div>
                          <div className="text-xs md:text-sm text-slate-500 font-medium">
                            {services[activeService].stats.label1}
                          </div>
                        </motion.div>
                        <motion.div 
                          className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-[#B3972A]/10 to-[#B3972A]/20 shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <div className="text-2xl md:text-3xl font-black text-[#B3972A]">
                            {services[activeService].stats.metric2}
                          </div>
                          <div className="text-xs md:text-sm text-slate-500 font-medium">
                            {services[activeService].stats.label2}
                          </div>
                        </motion.div>
                      </div>

                      {/* 3D Progress indicator */}
                      <div className="flex justify-center space-x-2">
                        {services.map((_, idx) => (
                          <motion.div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === activeService ? 'bg-[#8666A5] w-6 md:w-8' : 'bg-slate-300'
                            }`}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results section */}
        <motion.div 
          className="mt-16 md:mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#8666A5]/5 to-[#B3972A]/5 backdrop-blur-sm border border-white/50 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">
              Proven Results Across Industries
            </h3>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Each brand saw consistent growth in visibility and engagement. Through curated content and active engagement, we have helped them build a stronger digital presence and deeper audience trust.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "127%", label: "Average Reach Increase" },
              { value: "89%", label: "Engagement Growth" },
              { value: "156%", label: "Follower Increase" },
              { value: "203%", label: "Brand Awareness" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="p-4 md:p-6 bg-white/60 rounded-2xl text-center shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#8666A5] to-[#B3972A] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced 3D CTA section */}
        <motion.div 
          className="text-center mt-16 md:mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button 
            className="group relative px-8 md:px-12 py-4 md:py-6 rounded-full bg-gradient-to-r from-[#8666A5] via-[#B3972A] to-[#DBC865] text-white font-bold text-lg md:text-xl overflow-hidden shadow-2xl hover:shadow-[#8666A5]/25"
            whileHover={{ 
              scale: isMobile ? 1 : 1.05,
              boxShadow: "0 20px 40px -10px rgba(134, 102, 165, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => !isMobile && setCursorVariant("ctaHover")}
            onMouseLeave={() => !isMobile && setCursorVariant("default")}
          >
            {/* 3D Animated background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#5a3d80] via-[#8c761f] to-[#b9a55d] opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.4 }}
            />
            
            {/* 3D Shine effect */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.8 }}
              />
            )}
            
            <span className="relative z-10 flex items-center space-x-2 md:space-x-3">
              <span>Transform Your Social Presence</span>
              <motion.svg 
                className="w-5 h-5 md:w-6 md:h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: isMobile ? 0 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>
          
          <motion.p 
            className="mt-6 md:mt-8 text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Ready to elevate your brand's social media presence?{" "}
            <span className="font-semibold text-[#8666A5]">
              Let's create something extraordinary together.
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default SocialMediaMarketing;