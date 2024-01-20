const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CDController = {
    compressImage: async (req, res, operation) => {
        const pythonScriptPath = path.join(__dirname, '../../../../racunalniska-vecpredstavnost/compresion.py');
        const username = req.body.username;
        const imagePath = path.join(__dirname, '../../public/images', `${username}.jpg`);
        const pythonExecutable = 'C:/Users/sabin/AppData/Local/Programs/Python/Python312/python.exe';

        const script = `${pythonExecutable} ${pythonScriptPath} ${imagePath}`;
        const childProcess = spawn(script, { shell: true });

        let output = '';

        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error output: ${data}`);
        });

        childProcess.on('error', (error) => {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        childProcess.on('close', (code) => {
            console.log('Python script executed successfully');
            const outputFilePath = path.join(__dirname, '../../public/output', `${username}_output.txt`);
            fs.writeFileSync(outputFilePath, output, 'utf8');
            res.status(200).json({ result: 'Success' });
        });
    },

    decompressImage: async (req, res) => {
        const pythonScriptPath = path.join(__dirname, '../../../../racunalniska-vecpredstavnost/decompresion.py');
        const username = req.body.username;
        const outputFilePath = path.join(__dirname, '../../public/output', `${username}_output.txt`);
        const pythonExecutable = 'C:/Users/sabin/AppData/Local/Programs/Python/Python312/python.exe';

        const script = `${pythonExecutable} ${pythonScriptPath} ${outputFilePath} ${username}`;
        const childProcess = spawn(script, { shell: true });

        let output = '';

        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error output: ${data}`);
        });

        childProcess.on('error', (error) => {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        childProcess.on('close', (code) => {
            console.log('Python script executed successfully');
            res.status(200).json({ result: 'Success' });
        });
    },

    compress: async (req, res) => {
        await CDController.compressImage(req, res, 'compress');
    },

    decompress: async (req, res) => {
        await CDController.decompressImage(req, res, 'decompress');
    },
};

module.exports = CDController;
