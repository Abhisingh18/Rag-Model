import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGeminiModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const modelsToTry = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'models/gemini-pro',
        'models/gemini-1.5-pro',
        'models/gemini-1.5-flash'
    ];

    console.log('🔍 Testing Gemini models with your API key...\n');

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Say "Hello"');
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS: ${modelName} works!`);
            console.log(`   Response: ${text}\n`);
            break; // Stop after first success
        } catch (error) {
            console.log(`❌ FAILED: ${modelName}`);
            console.log(`   Error: ${error.message}\n`);
        }
    }
}

testGeminiModels();
