import { jsPDF } from 'jspdf';
import { Report } from './supabase';

export const generateReportPDF = (report: Report, userName: string): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPos = 20;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CBRE Incident Report', pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: 'center' });
  doc.text(`Report ID: ${report.id}`, pageWidth / 2, yPos + 5, { align: 'center' });

  yPos += 20;
  doc.setDrawColor(0, 168, 98);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  yPos += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Incident Details', margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const addField = (label: string, value: string) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(value || 'N/A', maxWidth - 40);
    doc.text(lines, margin + 45, yPos);
    yPos += 6 * lines.length + 2;
  };

  addField('Reported By', userName);
  addField('Report Type', report.report_type === 'vocal' ? 'Vocal Report' : 'Written Report');
  if (report.language) {
    addField('Language', report.language);
  }
  addField('Incident Type', report.incident_type);
  addField('Location', report.location);
  addField('Date', new Date(report.incident_date).toLocaleString());

  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Description:', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(report.description || 'N/A', maxWidth);
  doc.text(descLines, margin, yPos);
  yPos += 6 * descLines.length + 10;

  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setDrawColor(0, 168, 98);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text('This report was generated using CBRE AI Incident Reporter', pageWidth / 2, yPos, { align: 'center' });

  doc.save(`CBRE-Incident-Report-${report.id}.pdf`);
};
