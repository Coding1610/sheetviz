import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import Logo from '@/components/LandingPage/Logo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SignUp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');
  const [adminKey, setAdminKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [adminKeyVerified, setAdminKeyVerified] = useState(false);
  
  // Admin key
  const ADMIN_KEY = 'admin*&^sheetviz$25'; 
  
  // Handle admin verification
  const handleAdminVerify = async () => {
    setIsVerifying(true);
    
    try {
      // Verify the admin key
      if (adminKey !== ADMIN_KEY) {
        toast.error('Invalid admin key');
        setIsVerifying(false);
        return;
      }
      
      // Correct admin key, show authentication UI
      toast.success('Admin key verified');
      setAdminKeyVerified(true);
    } catch (err) {
      console.error('Error during admin verification:', err);
      toast.error('Verification failed, please try again');
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
        <div className="mb-6 md:mb-8 flex justify-center">
          <Logo />
        </div>
        
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join SheetViz to visualize your data</p>
        </div>
        
        <Tabs 
          defaultValue="user" 
          className="w-full mb-6" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="user">User Account</TabsTrigger>
            <TabsTrigger value="admin">Admin Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-4 flex flex-col justify-center items-center">
            
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-brand-purple-soft/30 rounded-xl text-center">
              <p className="text-sm text-brand-purple-700">Get insights from your data through powerful visualizations</p>
            </div>
            
            <ClerkSignUp 
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/dashboard"
              // appearance={{
              //   elements: {
              //     rootBox: "w-full flex justify-center",
              //     card: "shadow-none p-0 w-full",
              //     headerTitle: "hidden",
              //     headerSubtitle: "hidden",
              //     socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50 bg-white shadow-sm transition-all duration-200",
              //     socialButtonsBlockButtonText: "font-medium",
              //     dividerLine: "bg-gray-200",
              //     dividerText: "text-gray-500 mx-2",
              //     formFieldLabel: "text-gray-700 font-medium",
              //     formFieldInput: "border-gray-300 focus:ring-brand-purple focus:border-brand-purple rounded-lg shadow-sm px-4",
              //     formButtonPrimary: "bg-brand-purple hover:bg-brand-purple-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200",
              //     footerActionText: "text-gray-600",
              //     footerActionLink: "text-brand-purple hover:text-brand-purple-600 font-medium",
              //     formFieldLabelRow: "mb-2",
              //     formFieldRow: "mb-4",
              //     form: "px-0 py-2 w-full",
              //     socialButtons: "mb-4 px-2",
              //     socialButtonsBlockButtonArrow: "mr-2",
              //     footerAction: "mt-6",
              //     formFieldInputGroup: "mt-1",
              //   },
              //   layout: {
              //     socialButtonsPlacement: "bottom",
              //     socialButtonsVariant: "blockButton",
              //   },
              // }}
            />
          </TabsContent>
          
          <TabsContent value="admin" className="mt-4 flex flex-col justify-center items-center">
            
            <div className="mb-6 md:mb-8 p-4 md:p-4 bg-purple-100 rounded-xl text-center">
              <p className="text-sm text-purple-700 flex justify-center items-center">
                <Shield className="inline-block mr-1 h-4 w-4" />
                Admin signup requires verification key
              </p>
            </div>
            
            {!adminKeyVerified ? (
              <div className="mt-4 space-y-4">
                <div className="flex justify-center">
                  <Input
                    type="password"
                    placeholder="Admin Key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-[300px] mb-2"
                  />
                </div>
                
                <Button
                  className="w-full bg-brand-purple hover:bg-brand-purple-600 text-white font-medium"
                  onClick={handleAdminVerify}
                  disabled={!adminKey || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <span className="mr-2">Verifying</span>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    'Verify Admin Key'
                  )}
                </Button>
              </div>
            ) : (
              <ClerkSignUp 
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                fallbackRedirectUrl="/admin"
                // appearance={{
                //   elements: {
                //     rootBox: "w-full flex justify-center",
                //     card: "shadow-none p-0 w-full",
                //     headerTitle: "hidden",
                //     headerSubtitle: "hidden",
                //     socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50 bg-white shadow-sm transition-all duration-200",
                //     socialButtonsBlockButtonText: "font-medium",
                //     dividerLine: "bg-gray-200",
                //     dividerText: "text-gray-500 mx-2",
                //     formFieldLabel: "text-gray-700 font-medium",
                //     formFieldInput: "border-gray-300 focus:ring-brand-purple focus:border-brand-purple rounded-lg shadow-sm px-4",
                //     formButtonPrimary: "bg-brand-purple hover:bg-brand-purple-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200",
                //     footerActionText: "text-gray-600",
                //     footerActionLink: "text-brand-purple hover:text-brand-purple-600 font-medium",
                //     formFieldLabelRow: "mb-2",
                //     formFieldRow: "mb-4",
                //     form: "px-0 py-2 w-full",
                //     socialButtons: "mb-4 px-2",
                //     socialButtonsBlockButtonArrow: "mr-2",
                //     footerAction: "mt-6",
                //     formFieldInputGroup: "mt-1",
                //   },
                //   layout: {
                //     socialButtonsPlacement: "bottom",
                //     socialButtonsVariant: "blockButton",
                //   },
                // }}
              />
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 md:mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-brand-purple text-sm flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;