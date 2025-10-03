import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import cbreLogo from 'figma:asset/4e88521a9eb0e631a5eb9c3856387994f995b311.png';

interface GeneratedReportsProps {
  userName: string;
  onBack: () => void;
}

export function GeneratedReports({ userName, onBack }: GeneratedReportsProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-slate-800">Generated Reports</CardTitle>
          <p className="text-slate-600 text-sm mt-2">
            View and manage your incident reports, {userName}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg text-gray-900 mb-3">No Reports Found</h3>
            <p className="text-gray-600 text-sm mb-6">
              You haven't generated any incident reports yet. Create your first report to see it here.
            </p>
            <Button 
              onClick={onBack}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white"
            >
              Create New Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}