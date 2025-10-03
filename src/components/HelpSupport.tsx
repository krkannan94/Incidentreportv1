import { Button } from './ui/button';
import cbreLogo from 'figma:asset/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

interface HelpSupportProps {
  userName: string;
  onBack: () => void;
}

export function HelpSupport({ userName, onBack }: HelpSupportProps) {
  return (
    <div className="min-h-screen bg-white p-4 relative">
      <Button
        onClick={onBack}
        variant="outline"
        className="absolute top-4 left-4 rounded-xl border-2 border-slate-200 hover:border-slate-300"
      >
        ← Back
      </Button>
      
      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6">
            <img src={cbreLogo} alt="CBRE Logo" className="h-7 w-auto object-contain mx-auto" />
          </div>
          <h1 className="text-3xl text-slate-800 mb-4">
            Help & Support
          </h1>
          <p className="text-slate-600 text-lg">
            Get assistance with incident reporting, {userName}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900">User Guide</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Learn how to create effective incident reports using our platform.
            </p>
            <Button variant="outline" className="w-full">
              View Guide
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900">Contact Support</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get direct assistance from our CBRE support team.
            </p>
            <Button variant="outline" className="w-full">
              Contact Us
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900">FAQ</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Find answers to commonly asked questions about incident reporting.
            </p>
            <Button variant="outline" className="w-full">
              View FAQ
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900">Emergency Reporting</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              For urgent incidents requiring immediate attention.
            </p>
            <Button variant="destructive" className="w-full">
              Emergency Report
            </Button>
          </div>
        </div>
        

      </div>
    </div>
  );
}