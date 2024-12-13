// const form = document.getElementById('uploadForm');
// const storyText = document.getElementById('storyText');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     try {
//         const response = await fetch('/generate-story', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const data = await response.json();
//             storyText.textContent = data.story;
//         } else {
//             storyText.textContent = 'Error generating story.';
//         }
//     } catch (error) {
//         storyText.textContent = 'An error occurred.';
//     }
// });

// const form = document.getElementById('uploadForm');
// const storyText = document.getElementById('storyText');
// const fileInput = document.getElementById('fileInput');
// const uploadedImages = document.getElementById('uploadedImages');

// // Event listener for the file input to show thumbnails
// fileInput.addEventListener('change', (event) => {
//     uploadedImages.innerHTML = ''; // Clear previous images
//     const files = event.target.files;

//     Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const img = document.createElement('img');
//             img.src = e.target.result;
//             img.className = 'thumbnail'; // Add a class for styling
//             uploadedImages.appendChild(img);
//         };
//         reader.readAsDataURL(file);
//     });
// });

// // Event listener for the form submission
// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     try {
//         const response = await fetch('/generate-story', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const data = await response.json();
//             storyText.textContent = data.story;
//         } else {
//             storyText.textContent = 'Error generating story.';
//         }
//     } catch (error) {
//         storyText.textContent = 'An error occurred.';
//     }
// });
 
// ------------------------------------------------------- 

// const form = document.getElementById('uploadForm');
// const storyText = document.getElementById('storyText');
// const imagePreviewContainer = document.getElementById('imagePreviewContainer');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     try {
//         const response = await fetch('/generate-story', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const data = await response.json();
//             storyText.textContent = data.story;
//         } else {
//             storyText.textContent = 'Error generating story.';
//         }
//     } catch (error) {
//         storyText.textContent = 'An error occurred.';
//     }
// });

// // Show image previews
// document.getElementById('fileInput').addEventListener('change', (event) => {
//     const files = event.target.files;
//     imagePreviewContainer.innerHTML = ''; // Clear previous previews

//     Array.from(files).forEach((file) => {
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             const img = document.createElement('img');
//             img.src = e.target.result;
//             imagePreviewContainer.appendChild(img);
//         };

//         reader.readAsDataURL(file);
//     });
// });

// ------------------------------------------------------

const form = document.getElementById('uploadForm');
const storyText = document.getElementById('storyText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const loadingMessage = document.getElementById('loadingMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Show the loading spinner and message
    loadingSpinner.style.display = 'block';
    loadingMessage.style.display = 'block';
    storyText.textContent = ''; // Clear previous story text

    try {
        const response = await fetch('/generate-story', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            storyText.textContent = data.story;
        } else {
            storyText.textContent = 'Error generating story.';
        }
    } catch (error) {
        storyText.textContent = 'An error occurred.';
    } finally {
        // Hide the loading spinner and message
        loadingSpinner.style.display = 'none';
        loadingMessage.style.display = 'none';
    }
});

// Show image previews
document.getElementById('fileInput').addEventListener('change', (event) => {
    const files = event.target.files;
    imagePreviewContainer.innerHTML = ''; // Clear previous previews

    Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreviewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
});

