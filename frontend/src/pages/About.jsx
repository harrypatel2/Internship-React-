import React from "react";

const AboutUs = () => {
  const stats = [
    { label: "Happy Customers", value: "10k+" },
    { label: "Countries Served", value: "50+" },
    { label: "Years of Excellence", value: "15+" },
    { label: "Products Available", value: "500+" },
  ];

  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Design",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Michael Chen",
      role: "Lead Optician",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1483181954854-3b790e863133?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Crafting Vision, <br />
            Defining Style.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
            We believe that eyewear is more than just a necessity—it's a statement of who you are.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-blue-200 rounded-2xl md:hidden lg:block"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000"
                alt="Our Workshop"
                className="relative rounded-2xl shadow-xl z-10 w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Our Story</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Born from a Passion for Clarity</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              It started in a small studio with a simple idea: eyewear shouldn't be complicated or overpriced.
              We wanted to create a brand that combined artisanal craftsmanship with modern technology.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we are proud to serve customers around the globe, ensuring that every pair of glasses
              we ship meets our rigorous standards for quality, durability, and style.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Innovation</h3>
              <p className="text-gray-400">Pushing boundaries with new materials and lens technologies.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Sustainability</h3>
              <p className="text-gray-400">Committed to eco-friendly practices and recyclable packaging.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Happiness</h3>
              <p className="text-gray-400">We're not happy until you love your new look.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet The Team</h2>
          <p className="text-xl text-gray-600">The visionaries behind the vision.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6 inline-block">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transform transition-transform duration-300 group-hover:scale-110">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
