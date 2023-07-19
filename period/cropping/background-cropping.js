// API request
async function backgroundCropping() {
    console.log('Cropped baby!');
    console.log('God damn finally got it.');
    // Request parameter
    const endpoint = 'https://sdk.photoroom.com/v1/segment'
    const apiKey = '6d729068db857d822f0c667d708c51342a5de3f0'
    const imageURL = '/js/photos/SAAB.jpg'

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

    if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log(result);
            // Process the JSON data here
        } else if (contentType && contentType.includes('image/png')) {
            // Convert the image blob to a data URL
            const reader = new FileReader();
            reader.onloadend = async () => {
                const dataURL = reader.result;
                // Send the data URL to the server to save the image
                const saveResponse = await fetch('/save-cropped-image', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: dataURL }),
                });

                if (saveResponse.ok) {
                    console.log('Cropped image saved successfully!');
                } else {
                    console.error('Failed to save the cropped image:', saveResponse.status);
                }
            };
        } else {
            console.error('Unexpected response type:', contentType);
        }
    } else {
        console.error('API request failed with status:', response.status);
    }
}