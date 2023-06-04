const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const fsExtra = require('fs-extra');

function saveImage(imageBytes, userId) {
    return new Promise((resolve, reject) => {
        // Get the file extension
        const fileExtension = '.jpg';

        // Generate the image filename with the userId and file extension
        const imageFilename = `${userId}${fileExtension}`;

        // Construct the destination directory path
        const userImagesDir = path.join('public', 'userImages', userId);

        // Create the userImages directory if it doesn't exist
        if (!fs.existsSync(userImagesDir)) {
            fs.mkdirSync(userImagesDir, { recursive: true });
        }

        // Save the image to the userImages directory with the generated filename
        const imageFilePath = path.join(userImagesDir, imageFilename);
        fs.writeFile(imageFilePath, imageBytes, 'binary', (err) => {
            if (err) {
                reject('Failed to save the image');
            } else {
                resolve(imageFilePath);
            }
        });
    });
}

module.exports = {
    detect: (req, res) => {
        // Get the userId from the request body
        const userId = req.body.id;

        // Access the uploaded image byte array
        const imageBytes = Buffer.from(req.body.image, 'base64');

        // Check if an image was uploaded
        if (!imageBytes) {
            return res.status(400).send('No image found in the request');
        }

        saveImage(imageBytes, userId)
            .then((imageFilePath) => {
                // Perform face detection or other processing on the image here
                // Najbolj grda koda, ugabno AAAAAAAAAAAAAAAAA
                // To morem nujno spremenit
                let uploadedImagePath = path.dirname(imageBytes.path);
                uploadedImagePath = uploadedImagePath + "/" + userId;
                
                const scriptPath = path.join(__dirname, `../../../../osnove-racunalniskega-vida/src/login.py`);
                const imagePath = path.join(__dirname, `../../${imageFilePath}`);
                const outputPath = path.join(__dirname, `../../${uploadedImagePath}/obraz.jpg`);
                const script = `python ${scriptPath} --id ${userId} --imgpath '${imagePath}' --outputpath '${outputPath}'`;

                exec(script, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing Python script: ${error}`);
                        return res.status(500).send('Internal Server Error');
                    }
                    
                    // Capture the output of the Python script
                    const output = stdout.trim();

                    // Return the response
                    console.log(output)
                    if(output === "True") {
                        // Delete the userImages directory after sending the response
                        // fsExtra.removeSync(path.join('public', 'userImages', userId));
                        res.send('Image uploaded and processed successfully');
                    }
                    else {
                        res.status(500).send("Napaka v scripti!");
                    }
                });
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
};