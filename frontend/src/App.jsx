import { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisDashboard from './components/AnalysisDashboard';
import ReportPreview from './components/ReportPreview';
import { FileText, BarChart3, Download } from 'lucide-react';

function App() {
    const [currentView, setCurrentView] = useState('upload');
    const [analysisData, setAnalysisData] = useState(null);
    const [reportData, setReportData] = useState(null);

    const handleAnalysisComplete = (data) => {
        setAnalysisData(data);
        setReportData(data);
        setCurrentView('dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(30px) saturate(180%)',
                borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div className="container" style={{ padding: '1.5rem' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.75rem',
                                fontWeight: 'bold',
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                transition: 'transform 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
                            >
                                📊
                            </div>
                            <div>
                                <h1 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: '800',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '0.25rem',
                                    letterSpacing: '-0.5px'
                                }}>
                                    RAG Document Analysis
                                </h1>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>
                                    National Disaster Management Authority
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentView('upload')}
                                className={`btn ${currentView === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                <FileText size={18} />
                                Upload
                            </button>
                            <button
                                onClick={() => setCurrentView('dashboard')}
                                className={`btn ${currentView === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                                disabled={!analysisData}
                            >
                                <BarChart3 size={18} />
                                Dashboard
                            </button>
                            <button
                                onClick={() => setCurrentView('report')}
                                className={`btn ${currentView === 'report' ? 'btn-primary' : 'btn-secondary'}`}
                                disabled={!reportData}
                            >
                                <Download size={18} />
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container" style={{ marginTop: '2rem' }}>
                {currentView === 'upload' && (
                    <FileUpload onAnalysisComplete={handleAnalysisComplete} />
                )}

                {currentView === 'dashboard' && analysisData && (
                    <AnalysisDashboard data={analysisData} />
                )}

                {currentView === 'report' && reportData && (
                    <ReportPreview data={reportData} />
                )}
            </main>

            {/* Footer */}
            <footer style={{
                marginTop: '4rem',
                padding: '2.5rem 0',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.9rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500'
            }}>
                <p>© 2025 National Disaster Management Authority, Government of India</p>
                <p style={{ marginTop: '0.625rem', fontSize: '0.85rem', opacity: 0.9 }}>
                    Developed by JARVIS GGV | Smart India Hackathon 2025
                </p>
            </footer>
        </div>
    );
}

export default App;
