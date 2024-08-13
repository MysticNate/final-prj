document.addEventListener('DOMContentLoaded', () => {
    const bannerForm = document.querySelector('#bannerForm');
    const bannerPreview = document.querySelector('#bannerPreview');

    bannerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const bannerType = document.querySelector('#bannerType').value;
        const bannerText = document.querySelector('#bannerText').value;
        const backgroundColor = document.querySelector('#backgroundColor').value;
        const textColor = document.querySelector('#textColor').value;
        const fontSize = document.querySelector('#fontSize').value + 'px';
        const bannerImage = document.querySelector('#bannerImage').files[0];

        let bannerImageURL = '';
        if (bannerImage) {
            // create a URL for the image file
            bannerImageURL = URL.createObjectURL(bannerImage);
        }

        // create the banner HTML
        const bannerHTML = `
            <div style="
                width: ${bannerType === 'vertical' ? '200px' : '500px'};
                height: ${bannerType === 'vertical' ? '500px' : '200px'};
                background-color: ${backgroundColor};
                color: ${textColor};
                font-size: ${fontSize};
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                position: relative;
                overflow: hidden;
            ">
                ${bannerImageURL ? `<img src="${bannerImageURL}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
                ${bannerText}
            </div>
        `;

        // update the banner preview
        bannerPreview.innerHTML = bannerHTML;
        
        // save banner settings to Local Storage
        localStorage.setItem('banner', JSON.stringify({
            type: bannerType,
            text: bannerText,
            backgroundColor,
            textColor,
            fontSize,
            image: bannerImageURL
        }));
    });
});
