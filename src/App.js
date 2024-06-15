import React, { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function App() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef(null); // Reference to the canvas

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    const newPageNumber = pageNumber + offset;
    setPageNumber(Math.min(Math.max(newPageNumber, 1), numPages));
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onFileChange(event) {
    const newFile = event.target.files[0];
    setFile(newFile);
    setPageNumber(1); // Reset page number when a new file is selected
  }

  return (
    <>
      <input type="file" onChange={onFileChange} />
      {file && (
        <>
          <div className="flex justify-center items-center m-2 p-2">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                width={600} // Example width
                height={500} // Example height
                canvasRef={canvasRef} // Pass the canvas reference
              />
            </Document>
          </div>
          <div className="flex flex-row justify-center items-center px-2">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="mx-2"
            >
              Previous
            </button>
            <p className="mx-2" >
              Page {pageNumber || '--'} of {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="mx-2"

            >
              Next
            </button>
          </div>
        </>
      )
      }
    </>
  );
}
