/* eslint-disable react/prop-types */
import { Loader2, X, Download, FileText, Copy } from "lucide-react";

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const PreviewModal = ({
  coverLetterSections,
  setCoverLetterSections,
  isLoading,
  onClose,
  error,
  name,
}) => {
  const coverLetterPreviewRef = useRef(null);
  const introductionRef = useRef(null);
  const bodyRef = useRef(null);
  const conclusionRef = useRef(null);
  const [copied, setCopied] = useState(false);


  const updateSectionContent = (section, ref) => {
    setCoverLetterSections((prev) => ({
      ...prev,
      [section]: ref.current.innerHTML,
    }));
  };

  const handleDownloadPdf = async () => {
    if (!coverLetterPreviewRef.current) return;
    const input = coverLetterPreviewRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      backgroundColor: '#fff',
      useCORS: true,
      windowWidth: input.scrollWidth,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const padding = 40; // 40pt padding
    const imgWidth = pageWidth - 2 * padding;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let y = padding;
    if (imgHeight + 2 * padding > pageHeight) {
      let remainingHeight = imgHeight;
      let position = padding;
      const pageImgHeight = pageHeight - 2 * padding;
      while (remainingHeight > 0) {
        pdf.addImage(
          imgData,
          'PNG',
          padding,
          position,
          imgWidth,
          pageImgHeight,
        );
        remainingHeight -= pageImgHeight;
        if (remainingHeight > 0) {
          pdf.addPage();
          position = padding;
        }
      }
    } else {
      pdf.addImage(imgData, 'PNG', padding, y, imgWidth, imgHeight);
    }
    pdf.save('CoverLetter.pdf');
  };

  const handleCopyToClipboard = () => {
    if (!coverLetterSections) return;
    const stripHtml = (html) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    };
    const text = [
      name ? name + '\n' : '',
      stripHtml(coverLetterSections.introduction),
      '',
      stripHtml(coverLetterSections.body),
      '',
      stripHtml(coverLetterSections.conclusion),
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  if (!coverLetterSections && !isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[80vw] h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 pl-6 border-b border-gray-200">
          <h2 className="flex justify-center items-center text-xl font-semibold bg-gradient-to-b from-zinc-900 to-zinc-600 text-transparent bg-clip-text">
            Cover Letter
            <button className="mt-1 ml-4 text-sm font-normal w-auto justify-center items-center text-center px-4 py-0.5 text-white transition-all rounded-md sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer shadow-zinc-300">
              AI Generated
            </button>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div>{error}</div>

        {/* Modal Content */}
        <div className="bg-white p-6 sm:p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-base text-zinc-700 ml-1">
                Preview & Edit the sections before downloading.
              </p>
            </div>
            <div className="gap-4 flex items-center">
              <button
                onClick={handleDownloadPdf}
                // disabled={!coverLetterSections || isLoading || !libsLoaded}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={copied}
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>

          <div
            ref={coverLetterPreviewRef}
            className="p-8 border border-slate-200 rounded-lg bg-white text-sm"
          >
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="mt-4 font-medium text-lg">
                  Generating your Cover Letter
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  This might take a moment.
                </p>
              </div>
            )}

            {!isLoading && !coverLetterSections && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FileText className="h-12 w-12" />
                <p className="mt-4 font-medium">
                  Your cover letter will be shown here.
                </p>
              </div>
            )}

            {coverLetterSections && (
              <div className="prose prose-sm max-w-none prose-slate">
                <p className="font-bold text-lg mb-4 pl-2">{name}</p>
                <div
                  ref={introductionRef}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={() =>
                    updateSectionContent("introduction", introductionRef)
                  }
                  className="editable-section p-2 rounded-md hover:bg-zinc-50 transition-colors focus:outline-none focus:bg-zinc-100"
                  dangerouslySetInnerHTML={{
                    __html: coverLetterSections.introduction,
                  }}
                />
                <br />
                <div
                  ref={bodyRef}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={() => updateSectionContent("body", bodyRef)}
                  className="editable-section p-2 rounded-md hover:bg-zinc-50 transition-colors focus:outline-none focus:bg-zinc-100"
                  dangerouslySetInnerHTML={{ __html: coverLetterSections.body }}
                />
                <br />
                <div
                  ref={conclusionRef}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={() =>
                    updateSectionContent("conclusion", conclusionRef)
                  }
                  className="editable-section p-2 rounded-md hover:bg-zinc-50 transition-colors focus:outline-none focus:bg-zinc-100"
                  dangerouslySetInnerHTML={{
                    __html: coverLetterSections.conclusion,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviewModal;
