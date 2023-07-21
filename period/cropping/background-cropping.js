// API request
async function backgroundCropping() {
    console.log('Cropped baby!');
    console.log('God damn finally got it.');
    // Request parameter
    const endpoint = 'https://sdk.photoroom.com/v1/segment'
    const apiKey = '2d95a0ff1ff9886a130f08dad268e867eba5456c' // zennteam1 account, 3 calls left
    const imageURL = 'http://localhost:1234/get-image'

    // Creating data
    const formData = new FormData();

    // Load the image file
    const imageFile = await fetch(imageURL)
        .then(response => response.blob())
        .then(blob => new File([blob], 'SAAB.jpg', { type: 'application/json' }));

    // Append the image file to the formData
    formData.append("image_file", imageFile);

    const response = await fetch(endpoint,
        {
            method: "POST",
            headers: {"x-api-key": apiKey},
            body: formData
        }
    );

    if (response.status === 200) {
        // Display the processed image on the web page at localhost:1234
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.src = imageUrl;
        document.body.appendChild(img);
        console.log('Image uploaded and processed successfully!');
    } else {
        console.log('Image upload failed.');
    }
}