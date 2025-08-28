import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch(name) {
      case "name":
        if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!validateEmail(value)) error = "Please enter a valid email address";
        break;
      case "message":
        if (value.trim().length < 10) error = "Message must be at least 10 characters";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate field in real-time
    if (formErrors[name]) {
      const error = validateField(name, value);
      setFormErrors({ ...formErrors, [name]: error });
    }
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    
    // Validate field on blur
    const error = validateField(field, form[field]);
    setFormErrors({ ...formErrors, [field]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message)
    };
    
    setFormErrors(errors);
    
    // Check if form is valid
    const isValid = Object.values(errors).every(error => error === "");
    
    if (!isValid) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    // Reset form after submission
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {["📧", "💬", "📱", "✉️", "🔔", "📨", "👥", "🚀", "🌟", "💡", "📞", "📣", "🌐", "👋", "🎯"][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Connect</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to elevate your digital presence? Reach out and let's create something amazing together.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full border border-slate-100">
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">Get In Touch</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email Us</h4>
                    <p className="text-slate-600">hello@prsocial.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="bg-violet-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Call Us</h4>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Social Media</h4>
                    <div className="flex space-x-4 mt-2">
                      {[
                        { name: 'Instagram', color: '#E1306C', icon: '📸' },
                        { name: 'Twitter', color: '#1DA1F2', icon: '🐦' },
                        { name: 'LinkedIn', color: '#0077B5', icon: '💼' }
                      ].map((platform) => (
                        <motion.a
                          key={platform.name}
                          href="#"
                          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 relative overflow-hidden group"
                          whileHover={{ 
                            y: -3,
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.2 }}
                          aria-label={`Follow us on ${platform.name}`}
                        >
                          <motion.span 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: platform.color }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 group-hover:text-white transition-colors">
                            {platform.icon}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-slate-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-semibold text-slate-800 mb-2">Response Time</h4>
                <p className="text-slate-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden border border-slate-100">
              {/* Success message overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 flex flex-col items-center justify-center p-8 z-20 border-2 border-green-200 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <motion.span 
                        className="text-3xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        ✅
                      </motion.span>
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-semibold text-green-800 mb-2 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p 
                      className="text-green-600 text-center max-w-md"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      We'll get back to you soon. Thank you for reaching out!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                    placeholder="Enter your full name"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isFocused.name ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                    placeholder="your.email@example.com"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isFocused.email ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[120px] bg-slate-50 focus:bg-white"
                    placeholder="Tell us about your project or inquiry..."
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isFocused.message ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl relative overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: isLoading ? 1 : 1.02,
                    boxShadow: isLoading ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 10px 25px -10px rgba(109, 40, 217, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Send message"
                >
                  <span className="relative z-10">
                    {isLoading ? "Sending..." : "Send Message"}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Loading animation */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div 
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Animated send icon */}
                  {!isLoading && (
                    <motion.span 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      📨
                    </motion.span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;