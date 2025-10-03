import { Button } from './ui/button';
import { ArrowLeft, Edit3, Mic, FileText, HelpCircle } from 'lucide-react';
import cbreLogo from '../assets/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

interface EntryScreenProps {
  userName: string;
  onSelectMethod: (method: 'written' | 'vocal' | 'generated' | 'help') => void;
  onBack: () => void;
}

export function EntryScreen({ userName, onSelectMethod, onBack }: EntryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 rounded-xl hover:bg-white/80 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="text-center mb-12">
          <div className="mx-auto mb-6 bg-white rounded-2xl p-4 inline-block shadow-md">
            <img src={cbreLogo} alt="CBRE Logo" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Hello, {userName}!
          </h1>
          <p className="text-slate-600 text-xl">
            How would you like to create your incident report?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectMethod('written')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00A862] to-[#00C878] rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Edit3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Written Report</h3>
              <p className="text-slate-600 mb-6">Fill out a structured form with incident details</p>
              <Button className="w-full h-12 bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                Start Writing
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectMethod('vocal')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Vocal Report</h3>
              <p className="text-slate-600 mb-6">Speak naturally in your preferred language</p>
              <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                Start Speaking
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectMethod('generated')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Generated Reports</h3>
              <p className="text-slate-600 mb-6">View and manage your past reports</p>
              <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                View Reports
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectMethod('help')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Help & Support</h3>
              <p className="text-slate-600 mb-6">Get assistance and find answers</p>
              <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                Get Help
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Choose your preferred method to create an incident report
          </p>
        </div>
      </div>
    </div>
  );
}