import React from 'react';
import Logo from '@/assets/file.png' ;
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src={Logo} alt="sheetviz-logo" className='w-7' />
            <p className="mt-4 text-gray-600 max-w-xs">
              Transform your Excel data into beautiful visualizations and gain valuable insights with SheetViz.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-darkRed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-darkRed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-darkRed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 hover:text-darkRed transition-colors">Features</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">How it Works</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">Pricing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">Examples</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-darkRed transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SheetViz. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-gray-500 text-sm hover:text-darkRed transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 text-sm hover:text-darkRed transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;