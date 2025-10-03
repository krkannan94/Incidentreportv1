import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface WrittenReportFormProps {
  userName: string;
  onBack: () => void;
  onGenerateReport: (formData: FormData) => void;
}

interface FormData {
  title: string;
  reportedBy: string;
  date: string;
  time: string;
  location: string;
  incidentType: string;
  equipment: string;
  description: string;
  errorMessages: string;
  servicesAffected: string;
  impactLevel: string;
  usersAffected: string;
  businessImpact: string;
  immediateActions: string;
  resolutionSteps: string;
  resolutionDateTime: string;
  teamInvolved: string;
  rootCause: string;
  preventativeMeasures: string;
  followUpTasks: string;
  imageDescription?: string;
}

export function WrittenReportForm({ userName, onBack, onGenerateReport }: WrittenReportFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    reportedBy: userName,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    location: '',
    incidentType: '',
    equipment: '',
    description: '',
    errorMessages: '',
    servicesAffected: '',
    impactLevel: '',
    usersAffected: '',
    businessImpact: '',
    immediateActions: '',
    resolutionSteps: '',
    resolutionDateTime: '',
    teamInvolved: '',
    rootCause: '',
    preventativeMeasures: '',
    followUpTasks: ''
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageAnalyzing, setImageAnalyzing] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setImageAnalyzing(true);
    // Simulate AI image analysis
    setTimeout(() => {
      const mockAnalysis = "Image shows server error screen with HTTP 500 internal server error. Database connection appears to be failing based on the error message displayed on monitor.";
      setFormData(prev => ({ 
        ...prev, 
        description: prev.description + (prev.description ? '\n\n' : '') + `AI Image Analysis: ${mockAnalysis}`,
        imageDescription: mockAnalysis
      }));
      setImageAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport(formData);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl border-2 border-slate-200 hover:border-slate-300"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-medium text-slate-800">Incident Report Form</h1>
          <div className="w-20"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge className="bg-primary/10 text-primary">1</Badge>
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Incident Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief description of the incident"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Reported By</label>
                  <Input
                    value={formData.reportedBy}
                    onChange={(e) => handleInputChange('reportedBy', e.target.value)}
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-600 mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Building, floor, room, or system location"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Details */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge className="bg-primary/10 text-primary">2</Badge>
                <span>Incident Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Incident Type</label>
                  <Select value={formData.incidentType} onValueChange={(value) => handleInputChange('incidentType', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-primary">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-outage">System Outage</SelectItem>
                      <SelectItem value="performance-issue">Performance Issue</SelectItem>
                      <SelectItem value="security-breach">Security Breach</SelectItem>
                      <SelectItem value="data-loss">Data Loss</SelectItem>
                      <SelectItem value="hardware-failure">Hardware Failure</SelectItem>
                      <SelectItem value="software-bug">Software Bug</SelectItem>
                      <SelectItem value="network-issue">Network Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Equipment/System</label>
                  <Input
                    value={formData.equipment}
                    onChange={(e) => handleInputChange('equipment', e.target.value)}
                    placeholder="Affected equipment or system"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-slate-600 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of what happened"
                  className="min-h-24 rounded-xl border-2 border-slate-200 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-2">Error Messages</label>
                <Textarea
                  value={formData.errorMessages}
                  onChange={(e) => handleInputChange('errorMessages', e.target.value)}
                  placeholder="Any error messages or codes observed"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm text-slate-600">Incident Image</label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1 rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                  {selectedImage && (
                    <Button
                      type="button"
                      onClick={analyzeImage}
                      disabled={imageAnalyzing}
                      className="rounded-xl bg-primary hover:bg-primary/90 text-white"
                    >
                      {imageAnalyzing ? 'Analyzing...' : 'Analyze Image ✨'}
                    </Button>
                  )}
                </div>
                {selectedImage && (
                  <p className="text-sm text-slate-600">
                    Selected: {selectedImage.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Impact Analysis */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge className="bg-primary/10 text-primary">3</Badge>
                <span>Impact Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Services Affected</label>
                  <Input
                    value={formData.servicesAffected}
                    onChange={(e) => handleInputChange('servicesAffected', e.target.value)}
                    placeholder="List affected services"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Impact Level</label>
                  <Select value={formData.impactLevel} onValueChange={(value) => handleInputChange('impactLevel', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-primary">
                      <SelectValue placeholder="Select impact level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Users Affected</label>
                  <Input
                    value={formData.usersAffected}
                    onChange={(e) => handleInputChange('usersAffected', e.target.value)}
                    placeholder="Number or description of affected users"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Business Impact</label>
                  <Input
                    value={formData.businessImpact}
                    onChange={(e) => handleInputChange('businessImpact', e.target.value)}
                    placeholder="Description of business impact"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response & Resolution */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge className="bg-primary/10 text-primary">4</Badge>
                <span>Response & Resolution</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Immediate Actions Taken</label>
                <Textarea
                  value={formData.immediateActions}
                  onChange={(e) => handleInputChange('immediateActions', e.target.value)}
                  placeholder="What was done immediately to address the incident"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Resolution Steps</label>
                <Textarea
                  value={formData.resolutionSteps}
                  onChange={(e) => handleInputChange('resolutionSteps', e.target.value)}
                  placeholder="Steps taken to resolve the incident"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Resolution Date/Time</label>
                  <Input
                    type="datetime-local"
                    value={formData.resolutionDateTime}
                    onChange={(e) => handleInputChange('resolutionDateTime', e.target.value)}
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Team Involved</label>
                  <Input
                    value={formData.teamInvolved}
                    onChange={(e) => handleInputChange('teamInvolved', e.target.value)}
                    placeholder="Teams or individuals involved"
                    className="rounded-xl border-2 border-slate-200 focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prevention & Follow-Up */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Badge className="bg-primary/10 text-primary">5</Badge>
                <span>Prevention & Follow-Up</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Root Cause</label>
                <Textarea
                  value={formData.rootCause}
                  onChange={(e) => handleInputChange('rootCause', e.target.value)}
                  placeholder="Identified root cause of the incident"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Preventative Measures</label>
                <Textarea
                  value={formData.preventativeMeasures}
                  onChange={(e) => handleInputChange('preventativeMeasures', e.target.value)}
                  placeholder="Measures to prevent similar incidents"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Follow-Up Tasks</label>
                <Textarea
                  value={formData.followUpTasks}
                  onChange={(e) => handleInputChange('followUpTasks', e.target.value)}
                  placeholder="Additional tasks or monitoring required"
                  className="rounded-xl border-2 border-slate-200 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pb-8">
            <Button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Generate Report ✨
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}