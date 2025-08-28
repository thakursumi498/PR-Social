import React, { useState, useEffect } from 'react';

const PremiumSocialLoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const steps = [
    "Initializing AI-Powered Analytics...",
    "Connecting to 15+ social platforms...",
    "Scanning 2.4M+ audience profiles...",
    "Analyzing viral content patterns...",
    "Generating ROI predictions...",
    "Calibrating influence algorithms...",
    "Loading competitor intelligence...",
    "Finalizing premium dashboard..."
  ];

  const platforms = [
    { name: "Instagram", color: "from-pink-500 to-orange-400", delay: 0 },
    { name: "TikTok", color: "from-gray-900 to-pink-500", delay: 200 },
    { name: "YouTube", color: "from-red-500 to-red-700", delay: 400 },
    { name: "LinkedIn", color: "from-blue-600 to-blue-800", delay: 600 },
    { name: "Twitter", color: "from-blue-400 to-blue-600", delay: 800 },
    { name: "Pinterest", color: "from-red-600 to-pink-500", delay: 1000 },
    { name: "Snapchat", color: "from-yellow-400 to-yellow-500", delay: 1200 },
    { name: "Facebook", color: "from-blue-500 to-blue-700", delay: 1400 }
  ];

  const stats = [
    { label: "Total Reach", value: "47.2M", delay: 0, prefix: "" },
    { label: "Engagement Rate", value: "18.4%", delay: 150, prefix: "" },
    { label: "Conversion Rate", value: "12.8%", delay: 300, prefix: "" },
    { label: "Revenue Impact", value: "$2.4M", delay: 450, prefix: "" },
    { label: "Viral Posts", value: "847", delay: 600, prefix: "" },
    { label: "Influencer Network", value: "15.2K", delay: 750, prefix: "" }
  ];

  useEffect(() => {
    // Logo animation
    setTimeout(() => setShowLogo(true), 500);
    
    // Progress and step management
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.8;
        
        // Update current step based on progress
        const stepIndex = Math.floor(newProgress / (100 / steps.length));
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        // Show stats at 60%
        if (newProgress >= 60 && !showStats) {
          setShowStats(true);
        }
        
        // Complete at 100%
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          // Wait a moment before fading out
          setTimeout(() => setFadeOut(true), 1500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [showStats, steps.length]);

  // This useEffect will remove the component from DOM after fade out
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'} z-50`}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse-soft transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* AI Processing indicators */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium">AI Processing</span>
          </div>
        </div>

        {/* Real-time metrics counter */}
        <div className="absolute top-8 right-8">
          <div className="text-right">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Data Points</div>
            <div className="text-white text-lg font-bold tabular-nums">
              {Math.round(progress * 2847).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo section */}
        <div className={`mb-12 transition-all duration-1000 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-white/10 backdrop-blur-sm mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift" />
            <div className="relative">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-light text-white mb-2 tracking-wider">
            {/* Pr<span className="font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pulse</span> */}
            <span className="text-xs font-normal text-slate-500 ml-2">Sparkz</span>
          </h1>
          <p className="text-slate-400 text-lg"> Marketing Intelligence</p>
        </div>

        {/* Platform connections */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4 mb-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500`}
                style={{
                  background: progress > (index * 15) ? `linear-gradient(135deg, ${platform.color.split(' ')[1]}, ${platform.color.split(' ')[3]})` : '#475569',
                  boxShadow: progress > (index * 15) ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none',
                  animationDelay: `${platform.delay}ms`
                }}
              />
            ))}
          </div>
          <p className="text-slate-300 text-sm">Connecting to platforms...</p>
        </div>

        {/* Loading message */}
        <div className="mb-8 h-8">
          <p className="text-white text-lg font-medium transition-opacity duration-300">
            {steps[currentStep]}
            <span className="inline-block w-1 h-6 ml-2 bg-blue-400 animate-blink" />
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-400 text-sm">Progress</span>
            <span className="text-white font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Stats preview */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Loading spinner */}
        {!isComplete && (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-slate-700 rounded-full animate-spin">
                <div className="absolute inset-0 border-2 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: '1s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success state */}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 animate-bounce-soft">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-light text-white mb-3">Ready to Launch</h2>
            <p className="text-slate-400">Initializing your dashboard...</p>
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-20px) rotate(2deg); opacity: 0.4; }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(15px) rotate(-1deg); opacity: 0.9; }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 4s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle linear infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1.5s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PremiumSocialLoadingAnimation;