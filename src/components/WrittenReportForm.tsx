import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WrittenReportFormProps {
  userName: string;
  onBack: () => void;
  onGenerateReport: (report: any) => void;
}

interface FormData {
  incidentType: string;
  description: string;
  location: string;
  date: string;
  time: string;
}

export function WrittenReportForm({ userName, onBack, onGenerateReport }: WrittenReportFormProps) {
  const [formData, setFormData] = useState<FormData>({
    incidentType: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const incidentDateTime = `${formData.date}T${formData.time}:00`;

      const { data, error } = await supabase
        .from('reports')
        .insert({
          user_name: userName,
          report_type: 'written',
          incident_type: formData.incidentType,
          description: formData.description,
          location: formData.location,
          incident_date: incidentDateTime,
        })
        .select()
        .single();

      if (error) throw error;

      onGenerateReport(data);
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Failed to create report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 rounded-xl hover:bg-white/80 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Written Incident Report</h1>
          <p className="text-slate-600 text-center mb-8">Fill in the details of the incident</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Incident Type *</label>
              <Select value={formData.incidentType} onValueChange={(value) => handleInputChange('incidentType', value)} required>
                <SelectTrigger className="h-12 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Safety Incident">Safety Incident</SelectItem>
                  <SelectItem value="Equipment Failure">Equipment Failure</SelectItem>
                  <SelectItem value="Security Breach">Security Breach</SelectItem>
                  <SelectItem value="Environmental Issue">Environmental Issue</SelectItem>
                  <SelectItem value="Property Damage">Property Damage</SelectItem>
                  <SelectItem value="Service Disruption">Service Disruption</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Building, floor, room number"
                className="h-12 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="h-12 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time *</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="h-12 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a detailed description of the incident..."
                className="min-h-32 rounded-2xl border-2 border-slate-200 focus:border-[#00A862] transition-all resize-none"
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  'Generating Report...'
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}