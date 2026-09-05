const fs = require('fs');

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen3:4b';

const resultsPath = 'test-results/results.json';

if (!fs.existsSync(resultsPath)) {
    console.log('❌ results.json not found');
    process.exit(1);
}

const results = JSON.parse(
    fs.readFileSync(resultsPath, 'utf-8')
);

function findFailures(suite) {

    const failures = [];

    if (suite.suites) {
        for (const childSuite of suite.suites) {
            failures.push(
                ...findFailures(childSuite)
            );
        }
    }

    if (suite.specs) {

        for (const spec of suite.specs) {

            for (const test of spec.tests || []) {

                if (
                    test.status === 'unexpected' ||
                    test.status === 'failed'
                ) {

                    failures.push({
                        title: spec.title,
                        file: spec.file,
                        line: spec.line,
                        error:
                            test.results?.[0]?.error?.message
                    });
                }
            }
        }
    }

    return failures;
}

async function analyzeWithAI(failure) {

    const prompt = `
You are a Senior QA Automation Engineer.

Analyze the following Playwright test failure.

Test:
${failure.title}

File:
${failure.file}

Line:
${failure.line}

Error:
${failure.error}

Provide:

Root Cause:
Failure Category:
Suggested Fix:
Issue Type:

Issue Type must be:
Automation Issue
Environment Issue
Application Bug
Unknown

Keep the answer concise and practical.
`;

    const response = await fetch(OLLAMA_URL, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            model: MODEL,

            prompt: prompt,

            stream: false
        })
    });

    if (!response.ok) {

        throw new Error(
            `Ollama API failed: ${response.status}`
        );
    }

    const data = await response.json();

    return data.response;
}

async function main() {

    const failures = findFailures(results);

    console.log(
        '\n===== PLAYWRIGHT AI FAILURE ANALYZER =====\n'
    );

    if (failures.length === 0) {

        console.log('✅ No failures found.');

        return;
    }

    for (const failure of failures) {

        console.log(`Test: ${failure.title}`);
        console.log(`File: ${failure.file}`);
        console.log(`Line: ${failure.line}`);

        console.log('\nError:');
        console.log(failure.error);

        console.log('\n🤖 AI Analysis:\n');

        try {

            const analysis =
                await analyzeWithAI(failure);

            console.log(analysis);

        } catch (error) {

            console.log(
                '❌ AI analysis failed:',
                error.message
            );
        }

        console.log(
            '\n--------------------------------------\n'
        );
    }
}

main();