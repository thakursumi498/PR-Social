import React, { useState } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Sample project data with your categories
  const projects = [
    {
      id: 1,
      title: "Celebrity Brand Campaign",
      category: "Celebs",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Social media campaign for a major celebrity endorsement"
    },
    {
      id: 2,
      title: "Lenskart Eyewear Launch",
      category: "Lenskart",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Product launch campaign for new eyewear collection"
    },
    {
      id: 3,
      title: "Cannes Festival Coverage",
      category: "Cannesfestival",
      image: "https://images.unsplash.com/photo-1586899028174-e08c1cfe6a0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Live social media coverage of the Cannes Film Festival"
    },
    {
      id: 4,
      title: "L'Oreal Paris Makeup Line",
      category: "Lorealparis",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Influencer marketing for new makeup product line"
    },
    {
      id: 5,
      title: "Fashion Week Digital",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1539109136881-4be9436ae045?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Digital coverage of New York Fashion Week"
    },
    {
      id: 6,
      title: "Culinary Art Exhibition",
      category: "Food&Art",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Food photography exhibition for local artists"
    },
    {
      id: 7,
      title: "Social Media Strategy",
      category: "SocialMedia",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Comprehensive social media strategy for tech startup"
    },
    {
      id: 8,
      title: "Global Brand Launch",
      category: "InternationalProjects",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "International product launch across 12 countries"
    },
    {
      id: 9,
      title: "Brand Identity Design",
      category: "LogoDesign",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      description: "Complete logo and brand identity package"
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wide uppercase mb-2 block">
            Creative Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our work across different industries and creative disciplines
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200/60 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-3">
                      {project.category}
                    </span>
                    <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2.5 py-1.5 rounded-full shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  {project.title}
                  {hoveredProject === project.id && (
                    <span className="ml-2 text-blue-500 animate-pulse">→</span>
                  )}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <button className="group relative inline-flex items-center overflow-hidden rounded-md bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-blue-600 font-medium hover:text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
                  <span className="relative">View Project</span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-12 border-t border-gray-200/50">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to start your project?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let's collaborate to bring your vision to life with our creative expertise and strategic approach.
          </p>
          <button className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center">
            <span>Get in Touch</span>
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;