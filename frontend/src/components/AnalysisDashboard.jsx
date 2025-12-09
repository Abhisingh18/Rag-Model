import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, MapPin, AlertTriangle, Lightbulb, Target, X, HelpCircle, Book } from 'lucide-react';

function AnalysisDashboard({ data }) {
    const { analysis, executiveSummary } = data;
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDocs, setShowDocs] = useState(false);

    // Prepare chart data
    const themeData = Object.entries(analysis.themeDistribution || {}).map(([name, value]) => ({
        name,
        value
    }));

    const stateData = Object.entries(analysis.stateWiseCoverage || {})
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

    const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

    // Get states for selected theme from analysis data
    const getThemeDetails = (themeName) => {
        const themeStates = analysis.themeStateMapping?.[themeName] || {};
        const statesWithCounts = Object.entries(themeStates)
            .map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count);

        return {
            theme: themeName,
            count: analysis.themeDistribution[themeName],
            states: statesWithCounts
        };
    };

    const handlePieClick = (data) => {
        const themeDetails = getThemeDetails(data.name);
        setSelectedTheme(themeDetails);
        setShowModal(true);
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem', position: 'relative' }}>
            {/* Floating Help Button */}
            <button
                onClick={() => setShowDocs(true)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999,
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                }}
                title="View Documentation"
            >
                <Book size={28} color="white" />
            </button>

            {/* Documentation Modal */}
            {showDocs && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)',
                    padding: '2rem'
                }}
                    onClick={() => setShowDocs(false)}
                >
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '900px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        position: 'relative'
                    }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowDocs(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                            <X size={20} color="#ef4444" />
                        </button>

                        {/* Documentation Content */}
                        <div style={{ paddingRight: '2rem' }}>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                📚 System Documentation
                            </h1>
                            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                                Complete guide on how the RAG Document Analysis System works
                            </p>

                            {/* Quick Links */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                marginBottom: '2rem',
                                border: '1px solid rgba(102, 126, 234, 0.2)'
                            }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#667eea' }}>
                                    🚀 Quick Start
                                </h3>
                                <ol style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
                                    <li><strong>Upload CSV/Excel file</strong> with training data</li>
                                    <li><strong>Wait for analysis</strong> (automatic, 100% FREE)</li>
                                    <li><strong>View dashboard</strong> with insights and charts</li>
                                    <li><strong>Click pie chart</strong> to see theme details</li>
                                    <li><strong>Download PDF report</strong> for official use</li>
                                </ol>
                            </div>

                            {/* System Overview */}
                            <section style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                                    📋 System Overview
                                </h2>
                                <p style={{ lineHeight: '1.8', color: '#374151' }}>
                                    This is an <strong>AI-powered Training Data Analysis System</strong> designed for disaster management training programs.
                                    It analyzes CSV/Excel files containing training records and generates comprehensive insights, gap analysis,
                                    and professional PDF reports.
                                </p>
                            </section>

                            {/* Key Features */}
                            <section style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                                    ✨ Key Features
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {[
                                        { icon: '📊', title: 'Interactive Charts', desc: 'Click pie chart to see theme-wise state details' },
                                        { icon: '📈', title: 'Real-time Analysis', desc: 'Instant insights from your training data' },
                                        { icon: '📄', title: 'PDF Reports', desc: 'Government-format professional reports' },
                                        { icon: '🆓', title: '100% FREE', desc: 'No API keys or subscriptions needed' },
                                        { icon: '⚡', title: 'Fast Processing', desc: 'Analyze thousands of records in seconds' },
                                        { icon: '🎯', title: 'Gap Analysis', desc: 'Identify underserved states and themes' }
                                    ].map((feature, idx) => (
                                        <div key={idx} style={{
                                            padding: '1rem',
                                            background: 'rgba(102, 126, 234, 0.03)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(102, 126, 234, 0.1)'
                                        }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1f2937' }}>
                                                {feature.title}
                                            </h4>
                                            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5' }}>
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* How It Works */}
                            <section style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                                    🔄 How It Works
                                </h2>
                                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                    {[
                                        { step: '1', title: 'File Upload', desc: 'Drag & drop or select CSV/Excel file' },
                                        { step: '2', title: 'Data Parsing', desc: 'System extracts training records from file' },
                                        { step: '3', title: 'AI Analysis', desc: 'Local analysis calculates metrics and insights' },
                                        { step: '4', title: 'Dashboard Display', desc: 'Interactive charts and insights shown' },
                                        { step: '5', title: 'PDF Generation', desc: 'Professional report created automatically' }
                                    ].map((item, idx) => (
                                        <div key={idx} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: '-2rem',
                                                top: '0',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '0.9rem'
                                            }}>
                                                {item.step}
                                            </div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1f2937' }}>
                                                {item.title}
                                            </h4>
                                            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6' }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Dashboard Guide */}
                            <section style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                                    🎯 Dashboard Guide
                                </h2>
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#667eea' }}>
                                        📊 Interactive Pie Chart
                                    </h4>
                                    <ul style={{ marginLeft: '1.5rem', lineHeight: '2', color: '#374151' }}>
                                        <li><strong>Click any theme</strong> to see detailed breakdown</li>
                                        <li>Popup shows <strong>states covered</strong> for that disaster type</li>
                                        <li>Each state displays <strong>training count</strong> badge</li>
                                        <li>Data is <strong>theme-specific</strong> (Flood shows only flood-affected states)</li>
                                    </ul>

                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '1.5rem 0 1rem', color: '#43e97b' }}>
                                        📍 State Coverage Chart
                                    </h4>
                                    <ul style={{ marginLeft: '1.5rem', lineHeight: '2', color: '#374151' }}>
                                        <li>Shows <strong>top 8 states</strong> by training count</li>
                                        <li>Sorted from highest to lowest</li>
                                        <li>Hover to see exact numbers</li>
                                    </ul>

                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '1.5rem 0 1rem', color: '#f093fb' }}>
                                        ⚠️ Gap Analysis
                                    </h4>
                                    <ul style={{ marginLeft: '1.5rem', lineHeight: '2', color: '#374151' }}>
                                        <li><strong>Underserved States:</strong> States with less than 5 trainings</li>
                                        <li><strong>Underserved Themes:</strong> Disaster types needing more coverage</li>
                                        <li><strong>Critical Gaps:</strong> Important areas requiring immediate attention</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Technical Details */}
                            <section style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                                    ⚙️ Technical Details
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(59, 130, 246, 0.05)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #3b82f6'
                                    }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                                            Frontend
                                        </h4>
                                        <ul style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.8', marginLeft: '1rem' }}>
                                            <li>React 18</li>
                                            <li>Vite</li>
                                            <li>Recharts</li>
                                            <li>Lucide Icons</li>
                                        </ul>
                                    </div>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(16, 185, 129, 0.05)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #10b981'
                                    }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                                            Backend
                                        </h4>
                                        <ul style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.8', marginLeft: '1rem' }}>
                                            <li>Node.js</li>
                                            <li>Express</li>
                                            <li>PDFKit</li>
                                            <li>CSV Parser</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Support */}
                            <section style={{
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#667eea' }}>
                                    💡 Need Help?
                                </h3>
                                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                                    Check the <strong>HOW_IT_WORKS.md</strong> file in the project root for detailed technical documentation.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}

            {/* Theme Details Modal */}
            {showModal && selectedTheme && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}
                    onClick={() => setShowModal(false)}
                >
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        position: 'relative'
                    }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                            <X size={20} color="#ef4444" />
                        </button>

                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '0.5rem'
                        }}>
                            🌊 {selectedTheme.theme}
                        </h2>

                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '1.5rem'
                        }}>
                            Total Trainings: <strong style={{ color: '#667eea' }}>{selectedTheme.count}</strong>
                        </p>

                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }}>
                            📍 States Covered ({selectedTheme.states.length}):
                        </h3>

                        {selectedTheme.states.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '0.75rem'
                            }}>
                                {selectedTheme.states.map((item, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.75rem 1rem',
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                                        border: '1px solid rgba(102, 126, 234, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: '#667eea' }}>•</span>
                                            {item.state}
                                        </span>
                                        <span style={{
                                            background: '#667eea',
                                            color: 'white',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                No state data available for this theme.
                            </p>
                        )}

                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '8px',
                            borderLeft: '3px solid #3b82f6'
                        }}>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#374151',
                                lineHeight: '1.6'
                            }}>
                                💡 <strong>Insight:</strong> This disaster theme has been covered across multiple states, indicating comprehensive training coverage for {selectedTheme.theme.toLowerCase()} preparedness.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of the dashboard content remains the same... */}
            {/* Top Stats - Horizontal */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Award size={24} color="white" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.25rem' }}>
                                Total Trainings
                            </p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#667eea' }}>
                                {analysis.totalTrainings || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Users size={24} color="white" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.25rem' }}>
                                Participants
                            </p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#43e97b' }}>
                                {analysis.totalParticipants?.toLocaleString() || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <TrendingUp size={24} color="white" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.25rem' }}>
                                Completion
                            </p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f093fb' }}>
                                {analysis.averageCompletionRate || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <MapPin size={24} color="white" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.25rem' }}>
                                States
                            </p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#4facfe' }}>
                                {Object.keys(analysis.stateWiseCoverage || {}).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Layout: Left (Charts) + Right (Business Insights) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Left Side - Charts & Gap Analysis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Charts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Theme Distribution - INTERACTIVE */}
                        {themeData.length > 0 && (
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1f2937' }}>
                                    📊 Theme Distribution
                                </h3>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
                                    Click on any theme to see details
                                </p>
                                <ResponsiveContainer width="100%" height={240}>
                                    <PieChart>
                                        <Pie
                                            data={themeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name.substring(0, 8)} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            onClick={handlePieClick}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {themeData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* State Coverage */}
                        {stateData.length > 0 && (
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
                                    📍 Top States
                                </h3>
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={stateData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.1)" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#667eea" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Gap Analysis */}
                    {analysis.gapAnalysis && (
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#1f2937'
                            }}>
                                <AlertTriangle size={24} color="#f093fb" />
                                Gap Analysis
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                {analysis.gapAnalysis.underservedStates && analysis.gapAnalysis.underservedStates.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', color: '#f093fb' }}>
                                            Underserved States
                                        </h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {analysis.gapAnalysis.underservedStates.slice(0, 6).map((state, idx) => (
                                                <span key={idx} style={{
                                                    padding: '0.4rem 0.75rem',
                                                    background: 'rgba(240, 147, 251, 0.1)',
                                                    border: '1px solid rgba(240, 147, 251, 0.3)',
                                                    borderRadius: '16px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    color: '#f093fb'
                                                }}>
                                                    {state}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {analysis.gapAnalysis.underservedThemes && analysis.gapAnalysis.underservedThemes.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', color: '#f5576c' }}>
                                            Underserved Themes
                                        </h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {analysis.gapAnalysis.underservedThemes.map((theme, idx) => (
                                                <span key={idx} style={{
                                                    padding: '0.4rem 0.75rem',
                                                    background: 'rgba(245, 87, 108, 0.1)',
                                                    border: '1px solid rgba(245, 87, 108, 0.3)',
                                                    borderRadius: '16px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    color: '#f5576c'
                                                }}>
                                                    {theme}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {analysis.gapAnalysis.criticalGaps && analysis.gapAnalysis.criticalGaps.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', color: '#4facfe' }}>
                                            Critical Gaps
                                        </h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {analysis.gapAnalysis.criticalGaps.slice(0, 3).map((gap, idx) => (
                                                <li key={idx} style={{
                                                    padding: '0.5rem',
                                                    background: 'rgba(79, 172, 254, 0.05)',
                                                    borderLeft: '3px solid #4facfe',
                                                    marginBottom: '0.4rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.8rem',
                                                    color: '#374151'
                                                }}>
                                                    {gap}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Business Insights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {analysis.keyInsights && analysis.keyInsights.length > 0 && (
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#1f2937'
                            }}>
                                <Lightbulb size={24} color="#667eea" />
                                Business Insights
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {analysis.keyInsights.map((insight, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.875rem',
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                                        borderLeft: '3px solid #667eea',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        lineHeight: '1.6',
                                        color: '#374151'
                                    }}>
                                        <strong style={{ color: '#667eea' }}>•</strong> {insight}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommendations - Full Width */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#1f2937'
                    }}>
                        <Target size={24} color="#43e97b" />
                        Recommendations
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        {analysis.recommendations.map((recommendation, idx) => (
                            <div key={idx} style={{
                                padding: '1rem',
                                background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%)',
                                borderLeft: '3px solid #43e97b',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                color: '#374151',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(67, 233, 123, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <strong style={{ color: '#43e97b' }}>✓</strong> {recommendation}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnalysisDashboard;
