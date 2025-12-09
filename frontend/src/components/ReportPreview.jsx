import { Download, FileText, CheckCircle } from 'lucide-react';

function ReportPreview({ data }) {
    const { reportFilename, analysis, executiveSummary } = data;

    const handleDownload = () => {
        window.open(`/api/analysis/report/${reportFilename}`, '_blank');
    };

    return (
        <div className="fade-in">
            <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="text-center mb-4">
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1.5rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <CheckCircle size={40} />
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        Report Generated Successfully
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Your government-format analysis report is ready for download
                    </p>
                </div>

                {/* Report Preview */}
                <div style={{
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        borderBottom: '3px solid var(--primary)',
                        paddingBottom: '1.5rem',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                            GOVERNMENT OF INDIA
                        </h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.5rem' }}>
                            National Disaster Management Authority
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            (Ministry of Home Affairs)
                        </p>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                            DISASTER MANAGEMENT TRAINING
                        </h4>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                            ANALYSIS REPORT
                        </h4>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                            EXECUTIVE SUMMARY
                        </h5>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', textAlign: 'justify', fontSize: '0.95rem' }}>
                            {executiveSummary ? executiveSummary.substring(0, 300) + '...' : 'Analysis summary not available'}
                        </p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                            KEY METRICS
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Training Sessions</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                                    {analysis.totalTrainings || 'N/A'}
                                </p>
                            </div>
                            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Participants</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--secondary)' }}>
                                    {analysis.totalParticipants || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '2px solid var(--border)',
                        paddingTop: '1rem',
                        marginTop: '2rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        color: 'var(--text-tertiary)'
                    }}>
                        <p>© National Disaster Management Authority, Government of India</p>
                        <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            CONFIDENTIAL - For Official Use Only
                        </p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center">
                    <button
                        onClick={handleDownload}
                        className="btn btn-success"
                        style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
                    >
                        <Download size={24} />
                        Download Full Report (PDF)
                    </button>

                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        The complete report includes detailed analysis, charts, gap analysis, and recommendations
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReportPreview;
