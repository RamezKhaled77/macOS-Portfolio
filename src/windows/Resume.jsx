import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Download } from "lucide-react";
import { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // الصفحة الحالية متزامنة من 1

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // التعيين الافتراضي للـ Page الأولى
  }

  // دوال التنقل
  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        {/* أدوات التحكم بالتنقل بين الصفحات */}
        {numPages && (
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-1 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="icon" size={18} />
            </button>
            <span>
              {pageNumber} / {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-1 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="icon" size={18} />
            </button>
          </div>
        )}

        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <Document file="files/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
