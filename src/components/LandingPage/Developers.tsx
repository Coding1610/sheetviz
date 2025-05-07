
import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

interface DeveloperCardProps {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  delay?: string;
}

const DeveloperCard = ({ name, role, image, github, linkedin, instagram, delay = "0s" }: DeveloperCardProps) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 card-hover animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="h-56 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-brand-purple mb-4">{role}</p>
        <div className="flex gap-4">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          )}
          {instagram && (
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Developers = () => {
  return (
    <section className="py-20 px-6 bg-gray-50" id="developers">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Developers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The talented team behind SheetViz's powerful visualization tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <DeveloperCard
            name="Yash Prajapati"
            role="Frontend Developer"
            image="../public/github-profile.jpg"
            github="https://github.com/Coding1610"
            linkedin="https://linkedin.com/in/yash-prajapati-512451298"
            instagram="https://instagram.com/_yashu_016"
            delay="0.1s"
          />
          <DeveloperCard
            name="Daniel Ahmed"
            role="Backend Developer"
            image="../public/Daniel-pic.jpg"
            github="https://github.com/danielahmeed"
            linkedin="https://www.linkedin.com/in/danielcse?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            instagram="https://www.instagram.com/daniel__.exe"
            delay="0.2s"
          />
        </div>
      </div>
    </section>
  );
};

export default Developers;
