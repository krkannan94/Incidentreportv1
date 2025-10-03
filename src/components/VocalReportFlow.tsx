import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Mic, Languages } from 'lucide-react';
import { speakText, recognizeSpeech, stopSpeaking } from '../lib/gemini';
import { supabase } from '../lib/supabase';

interface VocalReportFlowProps {
  userName: string;
  onBack: () => void;
  onGenerateReport: (report: any) => void;
}

const questions = [
  { id: 'incident_type', text: 'What type of incident are you reporting?', field: 'incident_type' },
  { id: 'location', text: 'Where did this incident occur?', field: 'location' },
  { id: 'description', text: 'Please describe what happened in detail.', field: 'description' },
];

const LANGUAGES = [
  { value: 'English', label: 'English', code: 'en-US' },
  { value: 'Tamil', label: 'Tamil (தமிழ்)', code: 'ta-IN' },
  { value: 'Hindi', label: 'Hindi (हिंदी)', code: 'hi-IN' },
  { value: 'Spanish', label: 'Spanish (Español)', code: 'es-ES' },
  { value: 'Chinese', label: 'Chinese (中文)', code: 'zh-CN' },
];

export function VocalReportFlow({ userName, onBack, onGenerateReport }: VocalReportFlowProps) {
  const [currentStep, setCurrentStep] = useState<'language' | 'questions'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vocalStatus, setVocalStatus] = useState('Click the microphone to answer.');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const startListening = async () => {
    setIsListening(true);
    setVocalStatus('Listening... Speak now');
    setTranscript('');

    try {
      const result = await recognizeSpeech(selectedLanguage);
      setTranscript(result);
      setIsListening(false);
      setShowConfirmation(true);
      setVocalStatus('Please confirm if this is correct:');
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      setVocalStatus('Speech recognition failed. Please try again or type your answer.');
    }
  };

  const speak = async (text: string) => {
    setIsSpeaking(true);
    setVocalStatus('Speaking...');

    try {
      await speakText(text, selectedLanguage);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setIsSpeaking(false);
      setVocalStatus('Click the microphone to answer.');
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      startListening();
    }
  };

  const confirmAnswer = async () => {
    const answer = transcript || textInput;
    const updatedResponses = { ...responses, [currentQuestion.field]: answer };
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowConfirmation(false);
      setTranscript('');
      setTextInput('');
      setVocalStatus('Click the microphone to answer.');

      setTimeout(() => {
        speak(questions[currentQuestionIndex + 1].text);
      }, 500);
    } else {
      try {
        const now = new Date();
        const { data, error } = await supabase
          .from('reports')
          .insert({
            user_name: userName,
            report_type: 'vocal',
            incident_type: updatedResponses.incident_type || 'Not specified',
            description: updatedResponses.description || '',
            location: updatedResponses.location || '',
            incident_date: now.toISOString(),
            language: selectedLanguage,
          })
          .select()
          .single();

        if (error) throw error;
        onGenerateReport(data);
      } catch (error) {
        console.error('Error creating report:', error);
        alert('Failed to create report. Please try again.');
      }
    }
  };

  const retryAnswer = () => {
    setShowConfirmation(false);
    setTranscript('');
    setTextInput('');
    setVocalStatus('Click the microphone to answer.');
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowConfirmation(false);
      setTranscript('');
      setTextInput('');
      setVocalStatus('Click the microphone to answer.');
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setTranscript(textInput);
      setShowConfirmation(true);
      setVocalStatus('Please confirm if this is correct:');
    }
  };

  const startVocalReport = () => {
    if (selectedLanguage) {
      setCurrentStep('questions');
      setTimeout(() => {
        speak(`Hello ${userName}! Let's start with the first question. ` + questions[0].text);
      }, 1000);
    }
  };

  const repeatQuestion = () => {
    speak(currentQuestion.text);
  };

  if (currentStep === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 rounded-xl hover:bg-white/80 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Languages className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-3">Select Your Language</h1>
              <p className="text-slate-600">Choose the language you're most comfortable speaking</p>
            </div>

            <div className="space-y-6">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all text-lg">
                  <SelectValue placeholder="Choose your preferred language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-lg py-3">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={startVocalReport}
                disabled={!selectedLanguage}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Start Vocal Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <Button
          onClick={() => { stopSpeaking(); onBack(); }}
          variant="ghost"
          className="mb-6 rounded-xl hover:bg-white/80 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Vocal Report</h1>
          <p className="text-slate-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            {currentQuestionIndex > 0 && (
              <Button
                onClick={goToPreviousQuestion}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                Previous
              </Button>
            )}
            <div className="flex-1"></div>
            <Button
              onClick={repeatQuestion}
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={isSpeaking}
            >
              Repeat Question
            </Button>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Question {currentQuestionIndex + 1}:</h3>
                <p className="text-xl text-slate-700">{currentQuestion.text}</p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                <p className="text-sm text-slate-600 mb-1">Status:</p>
                <p className="text-purple-600 font-medium">{vocalStatus}</p>
              </div>
            </div>

            {!showConfirmation && (
              <div className="space-y-6">
                <div className="text-center">
                  <button
                    onClick={handleMicClick}
                    disabled={isSpeaking || isListening}
                    className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-110 shadow-2xl ${
                      isListening
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                    } text-white`}
                  >
                    <Mic className={`w-14 h-14 ${isListening ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                {transcript && (
                  <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200">
                    <p className="text-sm text-slate-600 mb-2 font-medium">Transcript:</p>
                    <p className="text-slate-800">{transcript}</p>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-6">
                  <p className="text-sm text-slate-600 mb-3 text-center font-medium">Or type your answer:</p>
                  <div className="flex space-x-3">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-1 h-12 rounded-2xl border-2 border-slate-200 focus:border-purple-500 transition-all"
                    />
                    <Button
                      onClick={handleTextSubmit}
                      className="h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-md"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showConfirmation && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Your Answer:</h3>
                  <p className="text-slate-700 text-lg mb-4">{transcript || textInput}</p>
                  <p className="text-sm text-slate-600 font-medium">Is this correct?</p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={confirmAnswer}
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={retryAnswer}
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl border-2 border-slate-300 hover:bg-slate-100 font-semibold transition-all"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
