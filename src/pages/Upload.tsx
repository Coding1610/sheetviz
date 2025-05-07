
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/LandingPage/Navbar';
import UploadForm from '@/components/FileUpload/UploadForm';
import { toast } from '@/components/ui/sonner';

const Upload = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error('Please sign in to upload files');
      navigate('/sign-in');
    }
  }, [isSignedIn, isLoaded, navigate]);
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
    </div>;
  }
  
  if (!isSignedIn) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload;
