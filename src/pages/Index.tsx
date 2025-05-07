
import React from 'react';
import Hero from '@/components/LandingPage/Hero';
import Features from '@/components/LandingPage/Features';
import Developers from '@/components/LandingPage/Developers';
import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Developers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
