import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RouteSignUp } from '@/helpers/RouteName';
import { ChevronsRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const Hero = () => {
  
  const user = useSelector((state) => state.user);

  return (
    <div className="hero-gradient min-h-[90vh] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64  rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-darkRed to-midRed animate-fade-in">
          SheetViz
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Upload and visualize Excel files with interactive charts and smart insights
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
        { user && user.isLoggedIn ?      
                <>
                </>
                :
                <>
                <Button asChild className="bg-darkRed hover:bg-white rounded-lg font-roboto text-white hover:text-darkRed">
                  <Link to={RouteSignUp}>
                      <ChevronsRight />
                      Get Started
                  </Link>
                </Button>
                </>
            }
            
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,218.7C672,235,768,245,864,224C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;