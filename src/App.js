import React, { useState } from 'react';
// Librerias
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';

// estilos del PDF-VIEWER
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const App = () => {

  // Creando una instancia
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // formulario onchange evento
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // formulario submit evento
  const [viewPdf, setViewPdf] = useState(null);

  // onchange evento --> En esta parte del código admitirá archivos PDF
  const fileType = ['application/pdf'];

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Seleccione un archivo pdf válido');
      }
    }
    else {
      console.log('select your file');
    }
  }

  // formulario submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }
  
  return (
    <div className='container'>
      <br></br>
      <h5 className="text-center">VISUALIZADOR DE PDF</h5>
      <div className="row">
        <div className="col-6 col-md-4">
          {/*Formulario */}
          <form className='form-group' onSubmit={handlePdfFileSubmit}>
            <div className="form-group">
              <input type="file" class="form-control-file " id="exampleFormControlFile1"
              required onChange={handlePdfFileChange}
              />
            </div>
            {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
            <br></br>
            <button type="submit" className='btn btn-info btn-md'>
              Visualizar PDF
            </button>
          </form>
          {/*Finr -> Formulario */}

        </div>
      </div>




      <br></br>

      <div className='pdf-container'>
        {/* Mostrar el PDF si lo ha subido */}

        {viewPdf &&
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </>
        }

        {/* Si no esta subido el archivo PDF el estado es nulo */}

        {!viewPdf && <> No se seleccionó ningún archivo pdf</>}
      </div>

    </div>
  )
}

export default App;