import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function testGeminiDirect() {
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAQudSMm7BbOkL3P5f01FoefcboH9jBHQo';

    // Try different API versions and models
    const tests = [
        {
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            model: 'gemini-pro (v1beta)'
        },
        {
            url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
            model: 'gemini-pro (v1)'
        },
        {
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            model: 'gemini-1.5-flash (v1beta)'
        }
    ];

    console.log('🔍 Testing Gemini API directly...\n');

    for (const test of tests) {
        try {
            console.log(`Testing: ${test.model}`);

            const response = await fetch(test.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: 'Say hello' }]
                    }]
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ SUCCESS: ${test.model} works!`);
                console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
                return test;
            } else {
                console.log(`❌ FAILED: ${test.model}`);
                console.log(`   Status: ${response.status}`);
                console.log(`   Error: ${data.error?.message || JSON.stringify(data)}\n`);
            }
        } catch (error) {
            console.log(`❌ ERROR: ${test.model}`);
            console.log(`   ${error.message}\n`);
        }
    }

    console.log('❌ All tests failed! API key might be invalid.');
}

testGeminiDirect();
