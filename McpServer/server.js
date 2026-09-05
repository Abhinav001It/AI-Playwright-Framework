const fs = require('fs');

const {
    McpServer
} = require('@modelcontextprotocol/sdk/server/mcp.js');

const {
    StdioServerTransport
} = require('@modelcontextprotocol/sdk/server/stdio.js');

const server = new McpServer({
    name: 'playwright-test-results',
    version: '1.0.0'
});

server.tool(
    'get_test_results',
    'Read Playwright JSON test results',
    {},
    async () => {

        const file =
            'test-results/results.json';

        if (!fs.existsSync(file)) {

            return {
                content: [
                    {
                        type: 'text',
                        text: 'results.json not found'
                    }
                ]
            };
        }

        const results =
            fs.readFileSync(file, 'utf-8');

        return {
            content: [
                {
                    type: 'text',
                    text: results
                }
            ]
        };
    }
);

const transport =
    new StdioServerTransport();

server.connect(transport);