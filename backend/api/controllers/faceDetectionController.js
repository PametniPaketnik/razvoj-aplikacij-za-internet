const fs = require('fs');
const path = require('path');

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
        const userId = req.body.userId;

        // Access the uploaded image byte array
        const imageBytes = Buffer.from(req.body.image, 'base64');

        // Check if an image was uploaded
        if (!imageBytes) {
            return res.status(400).send('No image found in the request');
        }

        saveImage(imageBytes, userId)
            .then((imageFilePath) => {
                // Perform face detection or other processing on the image here

                // Return the response
                res.send('Image uploaded and processed successfully');
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
};