"use client";
import Image from "next/image";
import Sidebar from "../components/sideBar";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  File,
  X,
  Trash2,
  CheckCircle,
  AlertCircle,
  Menu, // Adicionado para o ícone de três riscos no cabeçalho mobile
} from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Começa fechada para não quebrar o mobile

  // Forçar a sidebar a começar aberta se for Desktop na primeira renderização
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const intervalsRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      intervalsRef.current = {};
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const newFileObjects = fileArray.map((file) => {
      const oversized = file.size > MAX_FILE_SIZE;
      return {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || "unknown",
        status: oversized ? "error" : "pending",
        error: oversized ? "Arquivo excede o limite de 10MB" : null,
      };
    });
    setFiles((prev) => [...prev, ...newFileObjects]);

    newFileObjects
      .filter((fileObj) => fileObj.status !== "error")
      .forEach((fileObj) => {
        simulateUpload(fileObj.id);
      });
  };

  const simulateUpload = (fileId) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading" } : f)),
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        delete intervalsRef.current[fileId];
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "completed" } : f,
          ),
        );
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      } else {
        setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
      }
    }, 200);
    intervalsRef.current[fileId] = interval;
  };

  const removeFile = (fileId) => {
    if (intervalsRef.current[fileId]) {
      clearInterval(intervalsRef.current[fileId]);
      delete intervalsRef.current[fileId];
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <File className="w-5 h-5 text-foreground/50" />,
          color: "text-foreground/50",
          label: "Pendente",
        };
      case "uploading":
        return {
          icon: (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ),
          color: "text-primary",
          label: "Enviando...",
        };
      case "completed":
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          color: "text-green-500",
          label: "Concluído",
          };
      case "error":
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          color: "text-red-500",
          label: "Erro",
        };
      default:
        return {
          icon: <File className="w-5 h-5 text-foreground/50" />,
          color: "text-foreground/50",
          label: "Pendente",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col bg-background min-w-0 transition-all duration-300">
        <header className="bg-transparent sticky top-0 z-30 w-full">
          <div className="max-w-6xl w-full mx-auto px-4 py-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
              {/* ÍCONE DE TRÊS RISCOS (MENU HAMBÚRGUER): Aparece apenas no Mobile */}
              <button
                onClick={toggleSidebar}
                className="bg-card-bg text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden mr-1"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>

            </div>

          </div>
        </header>

        <main className="w-full max-w-6xl mx-auto px-4 py-8 flex-1">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Área de upload. Arraste e solte arquivos aqui ou pressione Enter para selecionar arquivos"
            className={`
            relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              isDragging
                ? "border-primary bg-upload-hover scale-[1.01]"
                : "border-upload-border bg-upload-area hover:border-primary hover:bg-upload-hover"
            }
          `}
          >
            <input
              data-testid="file-input"
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4">
              <div
                data-state="open"
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isDragging ? "bg-primary/20" : "bg-card-bg"
                }`}
              >
                <Upload
                  className={`w-8 h-8 ${
                    isDragging ? "text-primary" : "text-foreground/50"
                  }`}
                />
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {isDragging
                    ? "Solte os arquivos aqui"
                    : "Arraste e solte arquivos aqui"}
                </p>
                <p className="text-sm mt-1">
                  ou{" "}
                  <span className="text-primary font-medium">
                    clique para selecionar arquivos
                  </span>
                </p>
              </div>
              <p className="text-xs text-foreground/40 px-2">
                Suporta todos os tipos de arquivos • Tamanho máximo: 10MB
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Arquivos ({files.length})
                </h2>
                <button
                  onClick={() => {
                    Object.values(intervalsRef.current).forEach(clearInterval);
                    intervalsRef.current = {};
                    setFiles([]);
                    setUploadProgress({});
                  }}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar tudo
                </button>
              </div>

              <div className="space-y-3">
                {files.map((fileObj) => {
                  const statusInfo = getStatusInfo(fileObj.status);
                  const progress = uploadProgress[fileObj.id] || 0;

                  return (
                    <div
                      key={fileObj.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-card-bg border border-card-border transition-all hover:border-primary/50"
                    >
                      <div className="flex-shrink-0">{statusInfo.icon}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-foreground truncate pr-2 text-sm sm:text-base">
                            {fileObj.name}
                          </p>
                          <span
                            data-testid="status"
                            className={`text-xs flex-shrink-0 font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 gap-1">
                          <p className="text-xs sm:text-sm text-foreground/50 truncate">
                            {fileObj.size}
                            {fileObj.error && (
                              <span className="ml-2 text-red-500 block sm:inline">
                                {fileObj.error}
                              </span>
                            )}
                          </p>

                          {fileObj.status === "uploading" && (
                            <div className="w-full sm:w-32 h-1.5 bg-card-border rounded-full overflow-hidden mt-1 sm:mt-0">
                              <div
                                className="h-full bg-primary transition-all duration-200"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}

                          {fileObj.status === "completed" && (
                            <span className="text-xs text-green-500 font-medium">100%</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="flex-shrink-0 p-1 rounded hover:bg-upload-hover text-foreground/40 hover:text-red-500 transition-colors"
                        aria-label="Remover arquivo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {files.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-foreground/40">
                Nenhum arquivo enviado ainda. Comece fazendo upload de arquivos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
