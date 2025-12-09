import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, MapPin, AlertTriangle, Lightbulb, Target } from 'lucide-react';

function AnalysisDashboard({ data }) {
    const { analysis, executiveSummary } = data;

    const themeData = Object.entries(analysis.themeDistribution || {}).map(([name, value]) => ({
        name,
        value
    }));

    const stateData = Object.entries(analysis.stateWiseCoverage || {})
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

    const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            {/* Top Stats - Horizontal (Chote Boxes) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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

                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(67, 233, 123, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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

                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(240, 147, 251, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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

                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(79, 172, 254, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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

            {/* Main Layout: Left (Graphs) + Right (Business Insights) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
                {/* Left Side - Graphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Charts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Theme Distribution */}
                        {themeData.length > 0 && (
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    color: '#1f2937'
                                }}>
                                    📊 Theme Distribution
                                </h3>
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

                        {/* State Coverage */}
                        {stateData.length > 0 && (
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    color: '#1f2937'
                                }}>
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

                {/* Right Side - Business Insights (Vertical Sidebar) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {/* Key Insights */}
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
                <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
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
