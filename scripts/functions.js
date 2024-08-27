//banner editor
export function handleBannerEditor() {
  const bannerForm = document.querySelector('#bannerForm');
  const bannerPreview = document.querySelector('#bannerPreview');

  bannerForm.addEventListener('input', updateBannerPreview);

  bannerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const bannerType = document.querySelector('#bannerType').value;
    const bannerText = document.querySelector('#bannerText').value;
    const backgroundColor = document.querySelector('#backgroundColor').value;
    const textColor = document.querySelector('#textColor').value;
    const fontSize = document.querySelector('#fontSize').value + 'px';
    const fontFamily = document.querySelector('#fontType').value;

    // Update preview
    updateBannerPreview();

    // Save to localStorage
    const bannerData = {
      type: bannerType,
      text: bannerText,
      backgroundColor,
      textColor,
      fontSize,
      fontFamily
    };

    localStorage.setItem('banner', JSON.stringify(bannerData));
    alert('Banner saved!');
  });

  function updateBannerPreview() {
    const bannerType = document.querySelector('#bannerType').value;
    const bannerText = document.querySelector('#bannerText').value;
    const backgroundColor = document.querySelector('#backgroundColor').value;
    const textColor = document.querySelector('#textColor').value;
    const fontSize = document.querySelector('#fontSize').value + 'px';
    const fontFamily = document.querySelector('#fontType').value;

    const bannerHTML = `
      <div style="
        width: ${bannerType === 'vertical' ? '300px' : '250px'};
        height: ${bannerType === 'vertical' ? '600px' : '250px'};
        background-color: ${backgroundColor};
        color: ${textColor};
        font-size: ${fontSize};
        font-family: ${fontFamily};
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        ${bannerText}
      </div>
    `;

    bannerPreview.innerHTML = bannerHTML;
  }
}


// main page
export function handleMainPage() {
  const campaignOverview = document.querySelector('#campaignOverview');
  const messageSection = document.querySelector('#message');
  // retrieve campaign data from localStorage
  const campaign = JSON.parse(localStorage.getItem('campaign'));

  if (campaign) {
      // ensuring the banner and marketing page data is correctly displayed
      const bannerImageHTML = campaign.bannerImage ? `<img src="${campaign.bannerImage}" alt="Banner Preview" style="width: 100%; height: 100%; object-fit: cover;">` : '<p>No banner image available.</p>';
      const marketingPageContentHTML = campaign.marketingPageContent && typeof campaign.marketingPageContent === 'object' ? `
          <div style="background-color: ${campaign.marketingPageContent.backgroundColor}; color: ${campaign.marketingPageContent.textColor}; padding: 20px;">
              <h1>${campaign.marketingPageContent.title}</h1>
              ${campaign.marketingPageContent.image ? `<img src="${campaign.marketingPageContent.image}" alt="Marketing Image" style="width: 100%; max-height: 300px; object-fit: cover;">` : ''}
              <p>${campaign.marketingPageContent.content}</p>
          </div>
      ` : '<p>No marketing page content available.</p>';

      // Update the campaign overview section with the correct HTML
      campaignOverview.innerHTML = `
          <h2>${campaign.name}</h2>
          <p>Start Date: ${campaign.startDate}</p>
          <p>End Date: ${campaign.endDate}</p>
          <div id="bannerPreview">
              <h3>Banner Preview:</h3>
              ${bannerImageHTML}
          </div>
          <div id="marketingPagePreview">
              <h3>Marketing Page Preview:</h3>
              ${marketingPageContentHTML}
          </div>
      `;
  } else {
      messageSection.innerHTML = `
          <h2>No Active Campaign</h2>
          <p>You don't have an active campaign. <a href="campaign.html">Create a new campaign</a>.</p>
      `;
  }
}

//marketing
export function handleMarketingPageEditor() {
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
      image: imageUrl,
    };

    localStorage.setItem('marketingPage', JSON.stringify(marketingPageData));
    alert('Marketing page saved!');
  }
}

//campaign
export function handleCampaignManagement() {
  const campaignForm = document.querySelector('#campaignForm');
  const currentCampaignSection = document.querySelector('#currentCampaign');

  const existingCampaign = JSON.parse(localStorage.getItem('campaign'));
  const banner = JSON.parse(localStorage.getItem('banner'));
  const marketingPage = JSON.parse(localStorage.getItem('marketingPage'));

  if (existingCampaign) {
    displayCampaignDetails(existingCampaign, banner, marketingPage);
  } else {
    currentCampaignSection.innerHTML = '<p>No current campaign. Please create one.</p>';
  }

  campaignForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const campaignName = document.querySelector('#campaignName').value;
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;

    // retrieve banner and marketing page data from Local Storage
    const banner = JSON.parse(localStorage.getItem('banner'));
    const marketingPage = JSON.parse(localStorage.getItem('marketingPage'));

    // create a campaign object that includes the banner and marketing page data
    const campaign = {
      name: campaignName,
      startDate: startDate,
      endDate: endDate,
      bannerImage: banner ? banner.image : '', // Use banner image URL if it exists
      marketingPageContent: marketingPage ? marketingPage : {} // Use marketing page data if it exists
    };

    console.log('Campaign object:', campaign);

    localStorage.setItem('campaign', JSON.stringify(campaign));

    displayCampaignDetails(campaign, banner, marketingPage);
  });

  function displayCampaignDetails(campaign, banner, marketingPage) {
    currentCampaignSection.innerHTML = `
      <h2>${campaign.name}</h2>
      <p>Start Date: ${campaign.startDate}</p>
      <p>End Date: ${campaign.endDate}</p>
      <div id="bannerPreview">
        <h3>Banner Preview:</h3>
        ${banner && banner.image ? `<img src="${banner.image}" alt="Banner Preview">` : '<p>No banner image available.</p>'}
      </div>
      <div id="marketingPagePreview">
        <h3>Marketing Page Preview:</h3>
        ${marketingPage && marketingPage.title ? `
          <div style="background-color: ${marketingPage.backgroundColor}; color: ${marketingPage.textColor}; padding: 20px;">
            <h1>${marketingPage.title}</h1>
            ${marketingPage.image ? `<img src="${marketingPage.image}" alt="Marketing Image" style="width: 100%; max-height: 300px; object-fit: cover;">` : ''}
            <p>${marketingPage.content}</p>
          </div>
        ` : '<p>No marketing page content available.</p>'}
      </div>
    `;
  }
}

//login
export function handleLogin() {
  // Initial users
  const users = [
      { username: 'Giora', password: 'the drunk russian' },
      { username: 'Nati', password: 'the black thief' },
      { username: 'Waseem', password: 'the arab terrorist' }
  ];

  // Check if users are already in Local Storage
  if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
  }

  const loginForm = document.querySelector('#loginForm');
  const errorMessage = document.querySelector('#errorMessage');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      const storedUsers = JSON.parse(localStorage.getItem('users'));

      // Check login details
      const user = storedUsers.find(user => user.username === username && user.password === password);

      if (user) {
          window.location.href = '../pages/main.html';
      } else {
          errorMessage.textContent = 'Invalid username or password';
      }
  });
}
