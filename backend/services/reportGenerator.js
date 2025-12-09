import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReportGenerator {
    async generateReport(analysisResults, documentInfo, executiveSummary) {
        return new Promise((resolve, reject) => {
            try {
                const reportsDir = path.join(__dirname, '../reports');
                if (!fs.existsSync(reportsDir)) {
                    fs.mkdirSync(reportsDir, { recursive: true });
                }

                const filename = `NDMA_Training_Report_${Date.now()}.pdf`;
                const filepath = path.join(reportsDir, filename);

                const doc = new PDFDocument({
                    size: 'A4',
                    margins: { top: 60, bottom: 60, left: 60, right: 60 }
                });

                const stream = fs.createWriteStream(filepath);
                doc.pipe(stream);

                // Generate report
                this.addCoverPage(doc, documentInfo);
                this.addExecutiveSummary(doc, executiveSummary);
                this.addKeyMetrics(doc, analysisResults);
                this.addDetailedAnalysis(doc, analysisResults);
                this.addGapAnalysis(doc, analysisResults);
                this.addInsights(doc, analysisResults);
                this.addRecommendations(doc, analysisResults);

                doc.end();

                stream.on('finish', () => {
                    resolve({ filename, filepath, url: `/reports/${filename}` });
                });

                stream.on('error', (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    addCoverPage(doc, documentInfo) {
        // Top Border
        doc.rect(0, 0, doc.page.width, 10).fill('#1e40af');

        // Government Header
        doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af')
            .text('GOVERNMENT OF INDIA', 0, 100, { align: 'center' }).moveDown(0.3);

        doc.fontSize(24).fillColor('#2563eb')
            .text('National Disaster Management Authority', { align: 'center' }).moveDown(0.2);

        doc.fontSize(12).font('Helvetica').fillColor('#6b7280')
            .text('Ministry of Home Affairs', { align: 'center' }).moveDown(3);

        // Title Box
        const titleY = doc.y;
        doc.roundedRect(80, titleY, 440, 100, 10).fillAndStroke('#dbeafe', '#3b82f6');

        doc.fontSize(22).font('Helvetica-Bold').fillColor('#1e40af')
            .text('DISASTER MANAGEMENT', 80, titleY + 15, { width: 440, align: 'center' }).moveDown(0.3);

        doc.fontSize(20).fillColor('#2563eb')
            .text('TRAINING ANALYSIS REPORT', 80, doc.y, { width: 440, align: 'center' });

        doc.moveDown(4);

        // Report Details
        const currentDate = new Date().toLocaleDateString('en-IN', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        const detailsY = doc.y;
        doc.roundedRect(120, detailsY, 360, 100, 8).fillAndStroke('#f8fafc', '#cbd5e1');

        doc.fontSize(11).font('Helvetica-Bold').fillColor('#374151')
            .text('📅 Report Date:', 140, detailsY + 15);
        doc.font('Helvetica').text(currentDate, 250, detailsY + 15);

        doc.font('Helvetica-Bold').text('📄 Document:', 140, detailsY + 35);
        doc.font('Helvetica').text(documentInfo.originalName || 'Training Data', 250, detailsY + 35, { width: 210 });

        doc.font('Helvetica-Bold').text('🔍 Analysis Type:', 140, detailsY + 55);
        doc.font('Helvetica').text('Comprehensive Analysis', 250, detailsY + 55);

        doc.font('Helvetica-Bold').text('✅ Status:', 140, detailsY + 75);
        doc.font('Helvetica').fillColor('#059669').text('COMPLETED', 250, detailsY + 75);

        doc.moveDown(4);

        // Confidentiality Notice
        const noticeY = doc.y;
        doc.roundedRect(100, noticeY, 400, 50, 5).fillAndStroke('#fee2e2', '#dc2626');

        doc.fontSize(11).font('Helvetica-Bold').fillColor('#991b1b')
            .text('⚠️ CONFIDENTIAL DOCUMENT', 0, noticeY + 10, { align: 'center' }).moveDown(0.3);

        doc.fontSize(9).font('Helvetica').fillColor('#7f1d1d')
            .text('For official use only. Unauthorized distribution prohibited.', 0, doc.y, { align: 'center' });

        // Bottom Border
        doc.rect(0, doc.page.height - 10, doc.page.width, 10).fill('#1e40af');

        doc.addPage();
    }

    addExecutiveSummary(doc, summary) {
        doc.fontSize(18).font('Helvetica-Bold').fillColor('#1e40af')
            .text('📋 EXECUTIVE SUMMARY', { underline: true }).moveDown(1);

        const summaryY = doc.y;
        const summaryHeight = doc.heightOfString(summary, { width: 460, align: 'justify' });

        doc.roundedRect(60, summaryY - 10, 480, summaryHeight + 30, 8)
            .fillAndStroke('#eff6ff', '#93c5fd');

        doc.fontSize(11).font('Helvetica').fillColor('#1f2937')
            .text(summary, 70, summaryY, { width: 460, align: 'justify', lineGap: 5 });

        doc.addPage();
    }

    addKeyMetrics(doc, analysis) {
        doc.fontSize(18).font('Helvetica-Bold').fillColor('#1e40af')
            .text('📊 KEY PERFORMANCE METRICS', { underline: true }).moveDown(1.5);

        const metrics = [
            { icon: '🎯', label: 'Total Training Sessions', value: analysis.totalTrainings || 0, color: '#3b82f6', bg: '#dbeafe' },
            { icon: '👥', label: 'Total Participants', value: analysis.totalParticipants?.toLocaleString() || 0, color: '#10b981', bg: '#d1fae5' },
            { icon: '📈', label: 'Completion Rate', value: analysis.averageCompletionRate || 'N/A', color: '#f59e0b', bg: '#fef3c7' },
            { icon: '📍', label: 'States Covered', value: Object.keys(analysis.stateWiseCoverage || {}).length, color: '#8b5cf6', bg: '#ede9fe' },
            { icon: '🎓', label: 'Disaster Themes', value: Object.keys(analysis.themeDistribution || {}).length, color: '#ec4899', bg: '#fce7f3' }
        ];

        let yPos = doc.y;
        metrics.forEach((metric) => {
            doc.roundedRect(60, yPos, 480, 50, 8).fillAndStroke(metric.bg, metric.color);
            doc.fontSize(24).text(metric.icon, 75, yPos + 13);
            doc.fontSize(12).font('Helvetica-Bold').fillColor('#374151')
                .text(metric.label, 115, yPos + 12);
            doc.fontSize(20).font('Helvetica-Bold').fillColor(metric.color)
                .text(metric.value.toString(), 380, yPos + 10, { width: 150, align: 'right' });
            yPos += 60;
        });

        doc.addPage();
    }

    addDetailedAnalysis(doc, analysis) {
        doc.fontSize(18).font('Helvetica-Bold').fillColor('#1e40af')
            .text('📈 DETAILED ANALYSIS', { underline: true }).moveDown(1.5);

        // Theme Distribution
        if (analysis.themeDistribution && Object.keys(analysis.themeDistribution).length > 0) {
            doc.fontSize(14).font('Helvetica-Bold').fillColor('#2563eb')
                .text('Theme Distribution', 60).moveDown(0.8);

            const themes = Object.entries(analysis.themeDistribution).sort((a, b) => b[1] - a[1]);
            themes.forEach(([theme, count], idx) => {
                const percentage = ((count / analysis.totalTrainings) * 100).toFixed(1);
                doc.fontSize(10).font('Helvetica').fillColor('#1f2937')
                    .text(`${idx + 1}. ${theme}: ${count} sessions (${percentage}%)`, { indent: 20 })
                    .moveDown(0.3);
            });
            doc.moveDown(1);
        }

        // State Coverage
        if (analysis.stateWiseCoverage && Object.keys(analysis.stateWiseCoverage).length > 0) {
            doc.fontSize(14).font('Helvetica-Bold').fillColor('#2563eb')
                .text('Top 10 States', 60).moveDown(0.8);

            const states = Object.entries(analysis.stateWiseCoverage)
                .sort((a, b) => b[1] - a[1]).slice(0, 10);

            states.forEach(([state, count], idx) => {
                doc.fontSize(10).font('Helvetica').fillColor('#1f2937')
                    .text(`${idx + 1}. ${state}: ${count} sessions`, { indent: 20 })
                    .moveDown(0.3);
            });
        }

        doc.addPage();
    }

    addGapAnalysis(doc, analysis) {
        if (!analysis.gapAnalysis) return;

        doc.fontSize(18).font('Helvetica-Bold').fillColor('#dc2626')
            .text('⚠️ GAP ANALYSIS', { underline: true }).moveDown(1.5);

        if (analysis.gapAnalysis.underservedStates?.length > 0) {
            doc.fontSize(13).font('Helvetica-Bold').fillColor('#f59e0b')
                .text('Underserved States', 60).moveDown(0.5);

            analysis.gapAnalysis.underservedStates.forEach((state, idx) => {
                doc.fontSize(10).font('Helvetica').fillColor('#92400e')
                    .text(`${idx + 1}. ${state}`, { indent: 20 }).moveDown(0.3);
            });
            doc.moveDown(1);
        }

        if (analysis.gapAnalysis.criticalGaps?.length > 0) {
            doc.fontSize(13).font('Helvetica-Bold').fillColor('#dc2626')
                .text('Critical Gaps', 60).moveDown(0.5);

            analysis.gapAnalysis.criticalGaps.forEach((gap, idx) => {
                doc.fontSize(10).font('Helvetica').fillColor('#7f1d1d')
                    .text(`${idx + 1}. ${gap}`, { indent: 20, align: 'justify' })
                    .moveDown(0.5);
            });
        }

        doc.addPage();
    }

    addInsights(doc, analysis) {
        if (!analysis.keyInsights?.length) return;

        doc.fontSize(18).font('Helvetica-Bold').fillColor('#1e40af')
            .text('💡 BUSINESS INSIGHTS', { underline: true }).moveDown(1.5);

        analysis.keyInsights.forEach((insight, idx) => {
            doc.fontSize(10).font('Helvetica').fillColor('#1e40af')
                .text(`${idx + 1}. ${insight}`, { indent: 20, align: 'justify' })
                .moveDown(0.8);
        });

        doc.addPage();
    }

    addRecommendations(doc, analysis) {
        if (!analysis.recommendations?.length) return;

        doc.fontSize(18).font('Helvetica-Bold').fillColor('#059669')
            .text('✅ STRATEGIC RECOMMENDATIONS', { underline: true }).moveDown(1.5);

        analysis.recommendations.forEach((rec, idx) => {
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#065f46')
                .text(`${idx + 1}. ${rec}`, { indent: 20, align: 'justify' })
                .moveDown(0.8);
        });

        // Footer
        doc.moveDown(2);
        doc.fontSize(9).font('Helvetica').fillColor('#6b7280')
            .text('© National Disaster Management Authority, Government of India', { align: 'center' });
    }
}

export default new ReportGenerator();
