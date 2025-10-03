import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, FileText, Eye } from 'lucide-react';
import { supabase, Report } from '../lib/supabase';

interface GeneratedReportsProps {
  userName: string;
  onBack: () => void;
  onViewReport: (report: Report) => void;
}

export function GeneratedReports({ userName, onBack, onViewReport }: GeneratedReportsProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [userName]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_name', userName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Generated Reports</h1>
          <p className="text-slate-600 text-xl">View and manage your incident reports</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A862] mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No Reports Yet</h3>
            <p className="text-slate-600 mb-8">
              You haven't generated any incident reports yet. Create your first report to see it here.
            </p>
            <Button
              onClick={onBack}
              className="h-12 px-8 rounded-2xl bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create New Report
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.report_type === 'vocal'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {report.report_type === 'vocal' ? 'Vocal Report' : 'Written Report'}
                      </span>
                      {report.language && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {report.language}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{report.incident_type}</h3>
                    <p className="text-slate-600 mb-3 line-clamp-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>📍 {report.location}</span>
                      <span>📅 {formatDate(report.created_at)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => onViewReport(report)}
                    className="ml-6 h-12 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>View</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
