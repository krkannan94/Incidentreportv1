import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import cbreLogo from 'figma:asset/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center pb-8">
          <div className="mx-auto mb-6">
            <img src={cbreLogo} alt="CBRE Logo" className="h-7 w-auto object-contain mx-auto block" />
          </div>
          <h1 className="text-2xl text-slate-800 mb-2">Welcome!</h1>
          <p className="text-slate-600">Please enter your name to begin.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-center rounded-xl border-2 border-slate-200 focus:border-primary transition-colors bg-white"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}