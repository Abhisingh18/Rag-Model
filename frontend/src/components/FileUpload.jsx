import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

function FileUpload({ onAnalysisComplete }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
            setSuccess(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            setSuccess(true);
            setUploading(false);

            // Pass analysis data to parent
            if (onAnalysisComplete) {
                onAnalysisComplete(response.data);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
            setUploading(false);
            setProgress(0);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError(null);
        setSuccess(false);
        setProgress(0);
    };

    return (
        <div className="fade-in">
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        Upload Training Data
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Upload PDF, Excel, or CSV files containing disaster management training data
                    </p>
                </div>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    style={{
                        border: `3px dashed ${isDragActive ? 'var(--primary-light)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-xl)',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isDragActive ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-secondary)',
                        transition: 'all var(--transition-normal)',
                        marginBottom: '1.5rem'
                    }}
                >
                    <input {...getInputProps()} />

                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Upload size={40} />
                    </div>

                    {isDragActive ? (
                        <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary)' }}>
                            Drop the file here...
                        </p>
                    ) : (
                        <>
                            <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Drag & drop your file here
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                or click to browse files
                            </p>
                            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                                Supported formats: PDF, Excel (.xlsx, .xls), CSV (Max 10MB)
                            </p>
                        </>
                    )}
                </div>

                {/* Selected File */}
                {file && (
                    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', fontSize: '1rem' }}>{file.name}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={removeFile}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--error)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                {uploading && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div className="flex items-center justify-between mb-2">
                            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                                Analyzing document...
                            </span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>
                                {progress}%
                            </span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                                transition: 'width 0.3s ease',
                                borderRadius: 'var(--radius-lg)'
                            }} />
                        </div>
                        <div className="flex items-center gap-2 mt-3" style={{ color: 'var(--text-secondary)' }}>
                            <Loader size={16} className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                            <span style={{ fontSize: '0.875rem' }}>
                                Processing with AI... This may take a minute
                            </span>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 mb-3" style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--error)'
                    }}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="flex items-center gap-2 mb-3" style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--success)'
                    }}>
                        <CheckCircle size={20} />
                        <span>Analysis completed successfully! View the dashboard to see insights.</span>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
                >
                    {uploading ? (
                        <>
                            <Loader size={20} className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Upload size={20} />
                            Upload & Analyze
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default FileUpload;
