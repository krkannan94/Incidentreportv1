import { Button } from './ui/button';
import cbreLogo from 'figma:asset/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

interface EntryScreenProps {
  userName: string;
  onSelectMethod: (method: 'written' | 'vocal' | 'generated' | 'help') => void;
  onBack: () => void;
}

export function EntryScreen({ userName, onSelectMethod, onBack }: EntryScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-start mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="absolute top-4 left-4 rounded-xl border-2 border-slate-200 hover:border-slate-300"
          >
            ← Back
          </Button>
        </div>
        <div className="text-center pb-8">
          <div className="mx-auto mb-6">
            <img src={cbreLogo} alt="CBRE Logo" className="h-7 w-auto object-contain mx-auto block" />
          </div>
          <h1 className="text-3xl text-slate-800 mb-2">
            Hello, {userName}!
          </h1>
          <p className="text-slate-600 text-lg">
            Create an Incident Report
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => onSelectMethod('written')}
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-4 text-gray-900">Written Report</h3>

                <Button className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl">
                  Start Writing
                </Button>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => onSelectMethod('vocal')}
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-4 text-gray-900">Vocal Report</h3>

                <Button className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl">
                  Start Speaking
                </Button>
              </div>
            </div>

            <div 
              className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => onSelectMethod('generated')}
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-4 text-gray-900">Reports</h3>

                <Button className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl">
                  View Reports
                </Button>
              </div>
            </div>

            <div 
              className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => onSelectMethod('help')}
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-4 text-gray-900">Help & Support</h3>

                <Button className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl">
                  Get Help
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Choose your preferred method to create an incident report
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}