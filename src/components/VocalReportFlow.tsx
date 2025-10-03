import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface VocalReportFlowProps {
  userName: string;
  onBack: () => void;
  onComplete: (responses: Record<string, string>) => void;
}

interface Question {
  id: string;
  text: string;
  category: string;
}

const questions: Question[] = [
  { id: 'title', text: 'What is the title or brief description of this incident?', category: 'Basic Info' },
  { id: 'location', text: 'Where did this incident occur? Please specify the building, floor, room, or system location.', category: 'Basic Info' },
  { id: 'incident_type', text: 'What type of incident is this? For example: system outage, performance issue, security breach, hardware failure, or software bug.', category: 'Details' },
  { id: 'description', text: 'Can you describe what happened in detail? Please explain the sequence of events.', category: 'Details' },
  { id: 'impact', text: 'What was the impact of this incident? How many users were affected and what services were impacted?', category: 'Impact' },
  { id: 'actions', text: 'What immediate actions were taken to address this incident?', category: 'Response' },
  { id: 'resolution', text: 'How was the incident resolved? What steps were taken?', category: 'Resolution' },
  { id: 'prevention', text: 'What preventative measures should be taken to avoid similar incidents in the future?', category: 'Prevention' }
];

export function VocalReportFlow({ userName, onBack, onComplete }: VocalReportFlowProps) {
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

  // Mock speech recognition
  const startListening = () => {
    setIsListening(true);
    setVocalStatus('Listening... Click the mic when you are done.');
    setTranscript('');
    
    // Simulate real-time transcription
    setTimeout(() => {
      setTranscript('This is a simulated transcription of your voice input...');
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    setVocalStatus('Processing your response...');
    setShowConfirmation(true);
    
    // Mock processing delay
    setTimeout(() => {
      setVocalStatus('Please confirm if this is correct:');
      speakText('I heard: ' + transcript + '. Is this correct?');
    }, 1000);
  };

  // Mock text-to-speech
  const speakText = (text: string) => {
    setIsSpeaking(true);
    setVocalStatus('Speaking...');
    
    // Simulate speaking duration
    setTimeout(() => {
      setIsSpeaking(false);
      setVocalStatus('Click the microphone to answer.');
    }, 2000);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const confirmAnswer = () => {
    const answer = transcript || textInput;
    setResponses(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setShowConfirmation(false);
      setTranscript('');
      setTextInput('');
      setVocalStatus('Click the microphone to answer.');
      
      // Speak the next question
      setTimeout(() => {
        speakText(questions[currentQuestionIndex + 1].text);
      }, 500);
    } else {
      // Complete the flow
      onComplete({ ...responses, [currentQuestion.id]: answer });
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
      // Speak the first question
      setTimeout(() => {
        speakText(`Hello ${userName}! Let's start with the first question. ` + questions[0].text);
      }, 1000);
    }
  };

  const repeatQuestion = () => {
    speakText(currentQuestion.text);
  };

  if (currentStep === 'language') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="absolute top-4 left-4 rounded-xl border-2 border-slate-200 hover:border-slate-300"
        >
          ← Back
        </Button>
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <CardTitle className="text-2xl text-slate-800">Select Your Language</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-primary">
                <SelectValue placeholder="Choose your preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="malay">Malay</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="burmese">Burmese</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              onClick={startVocalReport}
              disabled={!selectedLanguage}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white"
            >
              Start Report
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl border-2 border-slate-200"
          >
            ← Back
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-medium text-slate-800">Vocal Report</h1>
            <p className="text-sm text-slate-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="w-20"></div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/10 text-primary">
                {currentQuestion.category}
              </Badge>
              <div className="flex space-x-2">
                {currentQuestionIndex > 0 && (
                  <Button
                    onClick={goToPreviousQuestion}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    Go Back
                  </Button>
                )}
                <Button
                  onClick={repeatQuestion}
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={isSpeaking}
                >
                  Hear Again
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-2">Current Question:</h3>
                <p className="text-slate-700">{currentQuestion.text}</p>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm text-slate-600 mb-2">Status:</p>
                <p className="text-primary font-medium">{vocalStatus}</p>
              </div>
            </div>

            {!showConfirmation && (
              <div className="space-y-6">
                {/* Microphone Controls */}
                <div className="text-center">
                  <button
                    onClick={handleMicClick}
                    disabled={isSpeaking}
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-200 transform hover:scale-105 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-primary hover:bg-primary/90'
                    } text-white shadow-lg`}
                  >
                    {isListening ? (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6" />
                      </svg>
                    ) : (
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Live Transcript */}
                {transcript && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-600 mb-2">Live Transcript:</p>
                    <p className="text-slate-800">{transcript}</p>
                  </div>
                )}

                {/* Alternative Text Input */}
                <div className="border-t pt-6">
                  <p className="text-sm text-slate-600 mb-3 text-center">Or type your answer:</p>
                  <div className="flex space-x-3">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-1 rounded-xl border-2 border-slate-200 focus:border-primary"
                    />
                    <Button
                      onClick={handleTextSubmit}
                      className="rounded-xl bg-primary hover:bg-primary/90 text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showConfirmation && (
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">Your Answer:</h3>
                  <p className="text-slate-700 mb-4">{transcript || textInput}</p>
                  <p className="text-sm text-slate-600">Is this correct?</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    onClick={confirmAnswer}
                    className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={retryAnswer}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-2 border-slate-200"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}