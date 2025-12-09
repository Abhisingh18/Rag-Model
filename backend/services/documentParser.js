import pdf from 'pdf-parse';
import XLSX from 'xlsx';
import csv from 'csv-parser';
import fs from 'fs';
import { Readable } from 'stream';

class DocumentParser {
    /**
     * Parse PDF file and extract text
     */
    async parsePDF(filePath) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);

            return {
                text: data.text,
                pages: data.numpages,
                metadata: data.info
            };
        } catch (error) {
            throw new Error(`PDF parsing failed: ${error.message}`);
        }
    }

    /**
     * Parse Excel file and extract data
     */
    async parseExcel(filePath) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Convert to text format for RAG processing
            const text = this.convertExcelToText(jsonData, worksheet);

            return {
                text,
                data: jsonData,
                sheets: workbook.SheetNames.length
            };
        } catch (error) {
            throw new Error(`Excel parsing failed: ${error.message}`);
        }
    }

    /**
     * Parse CSV file and extract data
     */
    async parseCSV(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    const text = this.convertCSVToText(results);
                    resolve({
                        text,
                        data: results,
                        rows: results.length
                    });
                })
                .on('error', (error) => {
                    reject(new Error(`CSV parsing failed: ${error.message}`));
                });
        });
    }

    /**
     * Convert Excel data to readable text format
     */
    convertExcelToText(jsonData, worksheet) {
        let text = '';

        // Add headers
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const headers = [];
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_col(C) + '1';
            if (worksheet[address]) {
                headers.push(worksheet[address].v);
            }
        }
        text += headers.join(' | ') + '\n';
        text += '-'.repeat(80) + '\n';

        // Add data rows
        jsonData.forEach((row, index) => {
            const rowText = Object.values(row).join(' | ');
            text += `Row ${index + 1}: ${rowText}\n`;
        });

        return text;
    }

    /**
     * Convert CSV data to readable text format
     */
    convertCSVToText(data) {
        let text = '';

        if (data.length > 0) {
            // Add headers
            const headers = Object.keys(data[0]);
            text += headers.join(' | ') + '\n';
            text += '-'.repeat(80) + '\n';

            // Add data rows
            data.forEach((row, index) => {
                const rowText = Object.values(row).join(' | ');
                text += `Row ${index + 1}: ${rowText}\n`;
            });
        }

        return text;
    }

    /**
     * Main parsing method - detects file type and parses accordingly
     */
    async parseDocument(filePath, fileType) {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return await this.parsePDF(filePath);
            case 'excel':
            case 'xlsx':
            case 'xls':
                return await this.parseExcel(filePath);
            case 'csv':
                return await this.parseCSV(filePath);
            default:
                throw new Error(`Unsupported file type: ${fileType}`);
        }
    }
}

export default new DocumentParser();
