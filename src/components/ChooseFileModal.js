import React, { useState } from "react";
import axios from "axios";

export const ChooseFileModal = ({ isOpen, onClose, onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setErrorMessage(""); // Clear any previous error
    } else {
      setErrorMessage("Selecione um arquivo válido (.csv).");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);

      // Pass the file to the parent component if needed
      // onFileSelect(file);

      onClose(); // Close the modal after successful upload
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      setErrorMessage("Falha ao enviar o arquivo. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="font-bold mb-4 uppercase text-primary">
          Importar Arquivo
        </h2>

        <input
          type="file"
          accept=".csv"
          className="block w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-300"
          onChange={handleFileChange}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <button
          onClick={handleFileUpload}
          className="mt-4 w-full bg-primary text-sm text-white py-2 rounded-md font-semibold hover:bg-blue-300"
        >
          importar
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-400 text-sm text-white py-2 rounded-md font-semibold hover:bg-third"
        >
          fechar
        </button>
      </div>
    </div>
  );
};
