document.addEventListener('DOMContentLoaded', () => {
    const marketingForm = document.querySelector('#marketingForm');
    const marketingPagePreview = document.querySelector('#marketingPagePreview');

    marketingForm.addEventListener('input', updatePreview);
    marketingForm.addEventListener('submit', saveMarketingPage);

    function updatePreview() {
        const pageTitle = document.querySelector('#pageTitle').value;
        const pageContent = document.querySelector('#pageContent').value;
        const pageBackgroundColor = document.querySelector('#pageBackgroundColor').value;
        const textColor = document.querySelector('#textColor').value;
        const pageImage = document.querySelector('#pageImage').files[0];

        let imageHTML = '';
        if (pageImage) {
            const imageUrl = URL.createObjectURL(pageImage);
            imageHTML = `<img src="${imageUrl}" alt="Marketing Image" style="width: 100%; max-height: 300px; object-fit: cover;">`;
        }

        marketingPagePreview.innerHTML = `
            <div style="background-color: ${pageBackgroundColor}; color: ${textColor}; padding: 20px;">
                <h1>${pageTitle}</h1>
                ${imageHTML}
                <p>${pageContent}</p>
            </div>
        `;
    }

    function saveMarketingPage(event) {
        event.preventDefault();

        const pageTitle = document.querySelector('#pageTitle').value;
        const pageContent = document.querySelector('#pageContent').value;
        const pageBackgroundColor = document.querySelector('#pageBackgroundColor').value;
        const textColor = document.querySelector('#textColor').value;
        const pageImage = document.querySelector('#pageImage').files[0];

        let imageUrl = '';
        if (pageImage) {
            imageUrl = URL.createObjectURL(pageImage);
        }

        const marketingPageData = {
            title: pageTitle,
            content: pageContent,
            backgroundColor: pageBackgroundColor,
            textColor: textColor,
            image: imageUrl
        };

        localStorage.setItem('marketingPage', JSON.stringify(marketingPageData));
        alert('Marketing page has been saved');
    }
});
