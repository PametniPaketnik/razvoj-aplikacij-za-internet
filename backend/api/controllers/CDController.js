const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const CDController = {
    detect: async (req, res) => {

        const pythonScriptPath = path.join(__dirname, '../../../../racunalniska-vecpredstavnost/compresion.py');
        username = req.body.username;
        console.log('ScriptPath:', pythonScriptPath);

        const imagePath = path.join(__dirname, '../../public/images', `${username}.jpg`);
        console.log('ImagePath:', imagePath);

        const pythonExecutable = 'C:/Users/sabin/AppData/Local/Programs/Python/Python312/python.exe';

        const script = `${pythonExecutable} ${pythonScriptPath} ${imagePath}`

        exec(script, (error, stdout, stderr) => {

            if (error) {
                console.error(`Error executing Python script: ${error}`);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Python script executed successfully');
            const output = stdout.trim();
            console.log(output)

            // Save the output to a file
            const outputFilePath = path.join(__dirname, '../../public/output', `${username}_output.txt`);
            fs.writeFileSync(outputFilePath, output);

            // You can handle the result as needed
            //console.log('Script output:', stdout);
            res.status(200).json({ result: 'Success' });
        });

    },
};

module.exports = CDController;
