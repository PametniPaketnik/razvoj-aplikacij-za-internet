const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const fsExtra = require('fs-extra');

function saveImage(imageData, userId) {
    return new Promise((resolve, reject) => {
        // Convert the base64-encoded image data to a buffer
        const imageBuffer = Buffer.from(imageData, 'base64');

        // Generate the file extension
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
        fs.writeFile(imageFilePath, imageBuffer, (err) => {
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
        //const imageBytes = Buffer.from(req.body.image, 'base64');
        //const imageBytes = req.file

        const imageBytes = req.body.image
        //console.log(req.body.image)

        // Check if an image was uploaded
        if (!imageBytes) {
            return res.status(400).send('No image found in the request');
        }

        saveImage(imageBytes, userId)
            .then((imageFilePath) => {
                // Perform face detection or other processing on the image here
                // Najbolj grda koda, ugabno AAAAAAAAAAAAAAAAA
                // To morem nujno spremenit

                console.log(imageFilePath)
                //let uploadedImagePath = path.dirname(imageBytes.path);
                //uploadedImagePath = uploadedImagePath + "/" + userId;


                const scriptPath = path.join(__dirname, `../../../../osnove-racunalniskega-vida/src/login.py`);
                console.log(scriptPath)
                //const imagePath = path.join(__dirname, `../../public/userImages/${userId}/${userId}.jpg`);
                const imagePath = path.resolve(__dirname, '..', '..', 'public', 'userImages', userId, userId + '.jpg');
                console.log(imagePath)
                //const outputPath = path.join(__dirname, `../../public/userImages/${userId}/obraz.jpg`);
                const outputPath = path.resolve(__dirname, '..', '..', 'public', 'userImages', userId, 'obraz.jpg');
                console.log(outputPath)
                console.log(userId)
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
                        res.send(true);
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