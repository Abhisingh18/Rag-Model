import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, MapPin, AlertTriangle, Lightbulb } from 'lucide-react';

function AnalysisDashboard({ data }) {
    const { analysis, executiveSummary } = data;

    // Prepare chart data
    const themeData = Object.entries(analysis.themeDistribution || {}).map(([name, value]) => ({
        name,
        value
    }));

    const stateData = Object.entries(analysis.stateWiseCoverage || {}).map(([name, value]) => ({
        name,
        value
    })).slice(0, 10);

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

    return (
        <div className="fade-in">
            {/* Executive Summary */}
            <div className="glass-panel mb-4">
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={28} style={{ color: 'var(--accent)' }} />
                    Executive Summary
                </h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1rem', textAlign: 'justify' }}>
                    {executiveSummary}
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="glass-card">
                    <div className="flex items-center gap-3">
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Award size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Trainings</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                                {analysis.totalTrainings || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center gap-3">
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Users size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Participants</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--secondary)' }}>
                                {analysis.totalParticipants || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center gap-3">
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Completion Rate</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent)' }}>
                                {analysis.averageCompletionRate || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center gap-3">
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <MapPin size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>States Covered</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#8b5cf6' }}>
                                {Object.keys(analysis.stateWiseCoverage || {}).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Theme Distribution */}
                {themeData.length > 0 && (
                    <div className="glass-panel">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                            Theme Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={themeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {themeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* State-wise Coverage */}
                {stateData.length > 0 && (
                    <div className="glass-panel">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                            Top States by Training Coverage
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stateData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Gap Analysis */}
            {analysis.gapAnalysis && (
                <div className="glass-panel mb-4">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={24} style={{ color: 'var(--warning)' }} />
                        Gap Analysis
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {analysis.gapAnalysis.underservedStates && analysis.gapAnalysis.underservedStates.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                                    Underserved States
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {analysis.gapAnalysis.underservedStates.map((state, idx) => (
                                        <li key={idx} style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            borderLeft: '3px solid var(--error)',
                                            marginBottom: '0.5rem',
                                            borderRadius: 'var(--radius-sm)'
                                        }}>
                                            {state}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {analysis.gapAnalysis.underservedThemes && analysis.gapAnalysis.underservedThemes.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                                    Underserved Themes
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {analysis.gapAnalysis.underservedThemes.map((theme, idx) => (
                                        <li key={idx} style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'rgba(245, 158, 11, 0.05)',
                                            borderLeft: '3px solid var(--warning)',
                                            marginBottom: '0.5rem',
                                            borderRadius: 'var(--radius-sm)'
                                        }}>
                                            {theme}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Key Insights & Recommendations */}
            <div className="grid grid-cols-2 gap-4">
                {/* Key Insights */}
                {analysis.keyInsights && analysis.keyInsights.length > 0 && (
                    <div className="glass-panel">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Key Insights
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {analysis.keyInsights.map((insight, idx) => (
                                <li key={idx} style={{
                                    padding: '0.75rem',
                                    background: 'rgba(59, 130, 246, 0.05)',
                                    borderLeft: '3px solid var(--info)',
                                    marginBottom: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}>
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Recommendations */}
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                    <div className="glass-panel">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Recommendations
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {analysis.recommendations.map((recommendation, idx) => (
                                <li key={idx} style={{
                                    padding: '0.75rem',
                                    background: 'rgba(16, 185, 129, 0.05)',
                                    borderLeft: '3px solid var(--success)',
                                    marginBottom: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}>
                                    {recommendation}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnalysisDashboard;
