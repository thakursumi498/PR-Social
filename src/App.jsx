import React, { useState, useEffect } from "react";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Services from "./components/Services.jsx";
import Testimonials from "./components/Testimonials.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Loading from "./components/Loading.jsx";
// import Portfolio from "./components/Portfolio.jsx";

// Enhanced AboutUs component
const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [counterValues, setCounterValues] = useState({
    clients: 0,
    roi: 0,
    audience: 0,
    retention: 0
  });

  useEffect(() => {
    // Counter animation when component is in view
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate counters
          const targetValues = {
            clients: 250,
            roi: 347,
            audience: 50,
            retention: 98
          };
          
          const duration = 2000; // ms
          const frameRate = 30; // fps
          const totalFrames = duration / (1000 / frameRate);
          let currentFrame = 0;
          
          const timer = setInterval(() => {
            currentFrame++;
            
            setCounterValues({
              clients: Math.round((targetValues.clients / totalFrames) * currentFrame),
              roi: Math.round((targetValues.roi / totalFrames) * currentFrame),
              audience: Math.round((targetValues.audience / totalFrames) * currentFrame),
              retention: Math.round((targetValues.retention / totalFrames) * currentFrame)
            });
            
            if (currentFrame === totalFrames) clearInterval(timer);
          }, 1000 / frameRate);
          
          // Disconnect after triggering
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    if (counters.length) {
      observer.observe(counters[0]);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-lg mb-2 block">WHO WE ARE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Agency</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of passionate digital marketers, designers, and developers 
            dedicated to helping brands thrive in the digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Enhanced Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl h-80 w-full flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="15" fill="white" />
                  <circle cx="60" cy="40" r="10" fill="white" />
                  <circle cx="80" cy="70" r="12" fill="white" />
                  <circle cx="30" cy="80" r="8" fill="white" />
                </svg>
              </div>
              <div className="text-white text-center p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-4">5+ Years of Excellence</h3>
                <p className="opacity-90">Helping brands grow their digital presence</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-gray-900 counter">{counterValues.clients}+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            
            {/* Additional floating element */}
            <div className="absolute -top-4 -left-4 bg-blue-100 rounded-lg p-4 shadow-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Right Column - Content with Tabs */}
          <div>
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
              <button 
                className={`pb-3 px-4 font-medium ${activeTab === "mission" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("mission")}
              >
                Our Mission
              </button>
              <button 
                className={`pb-3 px-4 font-medium ${activeTab === "story" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("story")}
              >
                Our Story
              </button>
              <button 
                className={`pb-3 px-4 font-medium ${activeTab === "values" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("values")}
              >
                Our Values
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === "mission" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Driving Digital Transformation</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our mission is to empower businesses with cutting-edge digital solutions that drive growth, 
                    enhance brand visibility, and create meaningful connections with their audience. We combine 
                    creativity with data-driven strategies to deliver exceptional results.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
                    <p className="text-blue-800 italic">
                      "We don't just create campaigns; we build digital experiences that resonate with your audience and drive measurable results."
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === "story" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">From Startup to Industry Leader</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Founded in 2018, our agency started with a simple mission: to deliver 
                    measurable results through innovative digital marketing strategies. What began as a small 
                    team of three has grown into a full-service digital agency with specialists in every 
                    discipline.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Over the years, we've helped over 250 clients across various industries achieve their 
                    digital goals, from startups looking to establish their presence to established brands 
                    seeking transformation.
                  </p>
                </div>
              )}
              
              {activeTab === "values" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">The Principles That Guide Us</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our success is built on a foundation of core values that define how we work with clients 
                    and approach every project:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    <li>Transparency in all our processes and communications</li>
                    <li>Innovation that pushes boundaries and challenges conventions</li>
                    <li>Excellence in every deliverable, no matter how small</li>
                    <li>Collaboration with our clients as true partners</li>
                    <li>Results that matter and impact our clients' bottom line</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Data-Driven Approach</h4>
                  <p className="text-gray-600 text-sm">We use analytics to inform every decision</p>
                </div>
              </div>
              
              <div className="flex items-start transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-purple-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Results</h4>
                  <p className="text-gray-600 text-sm">See measurable growth in 30 days or less</p>
                </div>
              </div>
              
              <div className="flex items-start transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-green-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dedicated Teams</h4>
                  <p className="text-gray-600 text-sm">Your success is our top priority</p>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Meet Our Team
            </button>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200">
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="text-3xl font-bold text-gray-900 mb-2 counter">{counterValues.retention}%</div>
            <div className="text-gray-600">Client Retention</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="text-3xl font-bold text-gray-900 mb-2 counter">{counterValues.roi}%</div>
            <div className="text-gray-600">Average ROI</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="text-3xl font-bold text-gray-900 mb-2 counter">{counterValues.audience}M+</div>
            <div className="text-gray-600">Audience Reached</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Client Logos Section */}
        {/* <div className="mt-20 pt-10 border-t border-gray-200"> */}
          {/* <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Trusted By Industry Leaders</h3> */}
          {/* <div className="flex flex-wrap justify-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center">CLIENT 1</div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center">CLIENT 2</div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center">CLIENT 3</div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center">CLIENT 4</div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center">CLIENT 5</div>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress with increasing intervals
    const intervals = [300, 500, 700, 900, 1200];
    let currentProgress = 0;
    
    intervals.forEach((interval, index) => {
      setTimeout(() => {
        currentProgress = ((index + 1) / intervals.length) * 100;
        setProgress(currentProgress);
      }, interval);
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 6300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading progress={progress} />;
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      <NavBar />
      <Hero />
      {/* <AboutUs /> */}
      <Services />
      {/* <Portfolio /> */}
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;