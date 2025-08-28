import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    { 
      name: "Aarav Patel", 
      role: "CEO, FashionHub",
      text: "PR Social transformed our Instagram presence! We went from 5K to 50K followers in just 3 months and saw a 200% increase in engagement.",
      avatar: "👨‍💼",
      rating: 5,
      platform: "Instagram",
      stats: "+45K followers"
    },
    { 
      name: "Sneha Desai", 
      role: "Marketing Director, TechStart",
      text: "The TikTok strategy they developed for us went viral! Our campaign reached over 2 million views and generated 5,000+ leads for our startup.",
      avatar: "👩‍💻",
      rating: 5,
      platform: "TikTok",
      stats: "2M+ views"
    },
    { 
      name: "Rohan Mehta", 
      role: "Brand Manager, FreshBites",
      text: "Their Facebook ad management exceeded our expectations. We achieved a 5x return on ad spend and significantly lowered our cost per conversion.",
      avatar: "👨‍🍳",
      rating: 5,
      platform: "Facebook",
      stats: "5x ROAS"
    },
    { 
      name: "Priya Sharma", 
      role: "Influencer, LifestyleBlog",
      text: "Working with PR Social helped me monetize my YouTube channel effectively. They secured brand partnerships that increased my revenue by 300%.",
      avatar: "👩‍🎤",
      rating: 5,
      platform: "YouTube",
      stats: "300% revenue growth"
    },
    { 
      name: "Vikram Singh", 
      role: "E-commerce Director, StyleCart",
      text: "Their Pinterest marketing strategy drove a 40% increase in website traffic and a 25% boost in sales for our online store. Absolutely phenomenal!",
      avatar: "👨‍💻",
      rating: 5,
      platform: "Pinterest",
      stats: "40% traffic increase"
    },
    { 
      name: "Ananya Reddy", 
      role: "Content Creator",
      text: "PR Social helped me build a personal brand on LinkedIn that attracted speaking opportunities and premium clients. My network grew by 10x in 6 months!",
      avatar: "👩‍🎓",
      rating: 5,
      platform: "LinkedIn",
      stats: "10x network growth"
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const platformColors = {
    Instagram: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    Facebook: "#1877F2",
    TikTok: "#000000",
    YouTube: "#FF0000",
    Pinterest: "#E60023",
    LinkedIn: "#0A66C2"
  };

  const featuredVariants = {
    enter: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.02,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 overflow-hidden relative"
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-[100px]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-amber-500">Success Stories</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover how we've transformed social media presence for brands and creators
          </motion.p>
        </motion.div>

        {/* Featured Testimonial - Modern Design */}
        <motion.div 
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={featuredVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200 relative overflow-hidden shadow-xl"
            >
              {/* Accent line */}
              <div 
                className="absolute top-0 left-0 h-full w-1"
                style={{ 
                  background: typeof platformColors[testimonials[activeIndex].platform] === 'string' 
                    ? platformColors[testimonials[activeIndex].platform] 
                    : 'linear-gradient(to bottom, #f09433, #bc1888)'
                }}
              ></div>
              
              <div className="flex flex-col md:flex-row items-start">
                <motion.div 
                  className="flex-shrink-0 mb-6 md:mb-0 md:mr-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl bg-white border border-slate-200 shadow-sm">
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div 
                      className="absolute -bottom-2 -right-2 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg"
                      style={{ 
                        background: platformColors[testimonials[activeIndex].platform] 
                      }}
                    >
                      {testimonials[activeIndex].platform}
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-6">
                    <div className="flex mr-4">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.svg 
                          key={i}
                          className="w-5 h-5 text-amber-400 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.1 }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-white text-amber-600 border border-amber-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonials[activeIndex].stats}
                    </motion.div>
                  </div>
                  
                  <motion.blockquote 
                    className="text-xl md:text-2xl font-light text-slate-800 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.blockquote>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-lg text-slate-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-slate-600 text-sm">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full mx-1 ${index === activeIndex ? 'bg-slate-800' : 'bg-slate-400'}`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2 }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200 relative overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Platform indicator */}
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ 
                  background: platformColors[testimonial.platform] 
                }}
              ></div>
              
              {/* Rating stars */}
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-4 h-4 text-amber-400 mr-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-slate-700 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">"{testimonial.text}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Platform badge */}
                <div 
                  className="px-2 py-1 rounded text-xs font-semibold text-white"
                  style={{ 
                    background: platformColors[testimonial.platform] 
                  }}
                >
                  {testimonial.platform}
                </div>
              </div>
              
              {/* Stats badge */}
              <div className="mt-3 text-xs font-medium text-amber-600">
                {testimonial.stats}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-medium mb-6 text-slate-900">Ready to achieve similar results?</h3>
          <motion.button 
            className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;