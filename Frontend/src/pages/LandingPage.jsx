import React from 'react'
import Hero from '@/components/LandingSection/Hero';
import Features from '@/components/LandingSection/Features';
import Developers from '@/components/LandingSection/Developers';
import Footer from '@/components/LandingSection/Footer';
import Navbar from '@/components/LandingSection/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-roboto">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Developers />
      </main>
      <Footer />
    </div>
  )
}
