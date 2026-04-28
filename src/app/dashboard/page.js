"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
    Upload,
    File,
    X,
    Sun,
    Moon,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function DashboardPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const intervalsRef = useRef({});

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }

        return () => {
            Object.values(intervalsRef.current).forEach(clearInterval);
        };
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");

        document.documentElement.classList.toggle("dark", newMode);
    };

    const handleFiles = (newFiles) => {
        const fileArray = Array.from(newFiles);

        const newFileObjects = fileArray.map((file) => {
            const oversized = file.size > MAX_FILE_SIZE;

            return {
                id: `${file.name}-${Date.now()}`,
                file,
                name: file.name,
                size: formatFileSize(file.size),
                status: oversized ? "error" : "pending",
                error: oversized ? "Arquivo excede o limite de 10MB" : null,
            };
        });

        setFiles((prev) => [...prev, ...newFileObjects]);

        newFileObjects
            .filter((f) => f.status !== "error")
            .forEach((f) => {
                setTimeout(() => simulateUpload(f.id), 300);
            });
    };

    const simulateUpload = (fileId) => {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === fileId ? { ...f, status: "uploading" } : f
            )
        );

        let progress = 0;

        const interval = setInterval(() => {
            progress += 25;

            if (progress >= 100) {
                clearInterval(interval);
                delete intervalsRef.current[fileId];

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId ? { ...f, status: "completed" } : f
                    )
                );

                setUploadProgress((prev) => {
                    const copy = { ...prev };
                    delete copy[fileId];
                    return copy;
                });
            } else {
                setUploadProgress((prev) => ({
                    ...prev,
                    [fileId]: progress,
                }));
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
    };

    const clearAllFiles = () => {
        Object.values(intervalsRef.current).forEach(clearInterval);
        intervalsRef.current = {};
        setFiles([]);
        setUploadProgress({});
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "pending":
                return { label: "Pendente" };
            case "uploading":
                return { label: "Enviando..." };
            case "completed":
                return { label: "Concluído" };
            case "error":
                return { label: "Erro" };
            default:
                return { label: "Pendente" };
        }
    };

    // Drag and drop handlers
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

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <header className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10">
                        <Image
                            src="/logo.png"
                            alt="Logo Lar e Vida"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Lar e Vida</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Dashboard de Upload de Arquivos
                        </p>
                    </div>
                </div>

                <button
                    onClick={toggleTheme}
                    aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                    {darkMode ? <Sun /> : <Moon />}
                </button>
            </header>

            <main className="p-6">
                {/* Upload Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    aria-label="Área de upload. Arraste e solte arquivos aqui ou pressione Enter para selecionar arquivos"
                    className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                        isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                    }`}
                >
                    <input
                        data-testid="file-input"
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                    />

                    <div data-state="open" className="flex justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                    </div>

                    {isDragging ? (
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            Solte os arquivos aqui
                        </p>
                    ) : (
                        <>
                            <p className="text-lg">Arraste e solte arquivos aqui</p>
                            <p className="text-gray-500 dark:text-gray-400">
                                ou clique para selecionar arquivos
                            </p>
                        </>
                    )}
                    <p className="text-sm text-gray-400 mt-2">
                        Suporta todos os tipos de arquivos • Tamanho máximo: 10MB
                    </p>
                </div>

                {/* File counter and clear button */}
                {files.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-lg font-semibold">Arquivos ({files.length})</h2>
                        <button
                            onClick={clearAllFiles}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Limpar tudo
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {files.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>Nenhum arquivo enviado ainda. Comece fazendo upload de arquivos.</p>
                    </div>
                )}

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-4">
                        {files.map((file) => {
                            const status = getStatusInfo(file.status);
                            const statusColor =
                                file.status === "completed"
                                    ? "text-green-600"
                                    : file.status === "error"
                                    ? "text-red-600"
                                    : file.status === "uploading"
                                    ? "text-blue-600"
                                    : "text-gray-600";

                            return (
                                <div
                                    key={file.id}
                                    className="flex justify-between items-center border p-3 mt-2 rounded"
                                >
                                    <div className="flex items-center gap-2">
                                        <File size={20} />
                                        <span>{file.name}</span>
                                        <span className="text-sm text-gray-500">
                                            ({file.size})
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span
                                            data-testid="status"
                                            className={`font-medium ${statusColor}`}
                                        >
                                            {status.label}
                                        </span>

                                        {file.status === "error" && (
                                            <span className="text-sm text-red-500">
                                                {file.error}
                                            </span>
                                        )}

                                        <button
                                            aria-label="Remover arquivo"
                                            onClick={() => removeFile(file.id)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Progress bar for uploading files */}
                                    {file.status === "uploading" && uploadProgress[file.id] && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                            <div
                                                className="h-full bg-blue-500 transition-all"
                                                style={{
                                                    width: `${uploadProgress[file.id]}%`,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
