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
        const fontType = document.querySelector('#fontType').value;
        const bannerImage = document.querySelector('#bannerImage').files[0];

        let bannerImageURL = '';
        if (bannerImage) {
            // create a URL for the image file
            bannerImageURL = URL.createObjectURL(bannerImage);
        }

        // create the banner HTML
        const bannerHTML = `
            <div style="
                width: ${bannerType === 'vertical' ? '300px' : '250px'};
                height: ${bannerType === 'vertical' ? '600px' : '250px'};
                background-color: ${backgroundColor};
                color: ${textColor};
                font-size: ${fontSize};
                font-family: ${fontType};
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
            fontType,
            image: bannerImageURL
        }));
    });
});
