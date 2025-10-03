import { Button } from './ui/button';
import { ArrowLeft, Book, Phone, HelpCircle, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface HelpSupportProps {
  userName: string;
  onBack: () => void;
}

export function HelpSupport({ userName, onBack }: HelpSupportProps) {
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
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Help & Support</h1>
          <p className="text-slate-600 text-xl">We're here to assist you, {userName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <Book className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">User Guide</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Learn how to create effective incident reports using our platform.
            </p>
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-md">
              View Guide
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00A862] to-[#00C878] rounded-xl flex items-center justify-center mr-4 shadow-md">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contact Support</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Get direct assistance from our CBRE support team.
            </p>
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#00A862] to-[#00C878] hover:from-[#009656] hover:to-[#00B86C] text-white font-semibold shadow-md">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold">
                How do I create an incident report?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                You can create an incident report using either the Written Report or Vocal Report option from the main menu. The Written Report allows you to fill out a structured form, while the Vocal Report lets you speak naturally in your preferred language.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold">
                What languages are supported for vocal reports?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                The Vocal Report feature supports multiple languages including English, Tamil, Hindi, Spanish, and Chinese. Select your preferred language at the beginning of the vocal report process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold">
                Can I edit my report after generating it?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes! When viewing your generated report in the modal, click the "Edit" button to make changes to the report content before downloading or sharing it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold">
                How do I export my report as PDF?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                After generating your report, click the "PDF Report" button in the report modal. You'll have options to save the PDF locally or share it directly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-semibold">
                Where can I find my previous reports?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Navigate to "Generated Reports" from the main menu to view all your previously created incident reports. You can click on any report to view its details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-semibold">
                What should I do in case of an emergency?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                For urgent incidents requiring immediate attention, please contact CBRE emergency support directly at the emergency hotline. This tool is designed for incident documentation, not emergency response.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-md">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Emergency Reporting</h3>
          <p className="text-slate-600 mb-6">
            For urgent incidents requiring immediate attention, please use the emergency hotline.
          </p>
          <Button className="h-12 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg">
            Emergency Contact
          </Button>
        </div>
      </div>
    </div>
  );
}
