import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import cbreLogo from '../assets/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center pb-6">
            <div className="mx-auto mb-8 bg-white rounded-2xl p-4 inline-block shadow-md">
              <img src={cbreLogo} alt="CBRE Logo" className="h-12 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">AI Incident Reporter</h1>
            <p className="text-slate-600 text-lg">Please enter your name to begin</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-center text-lg rounded-2xl border-2 border-slate-200 focus:border-[#00A862] focus:ring-2 focus:ring-[#00A862]/20 transition-all bg-white shadow-sm"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}