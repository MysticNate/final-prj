//banner editor
export function handleBannerEditor() {
  const bannerForm = document.querySelector('#bannerForm');
  const bannerPreview = document.querySelector('#bannerPreview');

  bannerForm.addEventListener('submit', (event) => {
      event.preventDefault(); // this prevents the form from refreshing the page

      const bannerType = document.querySelector('#bannerType').value;
      const bannerText = document.querySelector('#bannerText').value;
      const backgroundColor = document.querySelector('#backgroundColor').value;
      const textColor = document.querySelector('#textColor').value;
      const fontSize = document.querySelector('#fontSize').value + 'px';
      const fontFamily = document.querySelector('#fontType').value;
      const bannerImage = document.querySelector('#bannerImage').files[0];

      let bannerImageURL = ''; // create a URL for the image if there is one
      if (bannerImage) {
          bannerImageURL = URL.createObjectURL(bannerImage);
      }

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
              ${bannerImageURL ? `<img src="${bannerImageURL}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
              ${bannerText}
          </div>
      `;

      bannerPreview.innerHTML = bannerHTML;

      // Save to localStorage if needed
      localStorage.setItem('banner', JSON.stringify({
          type: bannerType,
          text: bannerText,
          backgroundColor,
          textColor,
          fontSize,
          fontFamily,
          image: bannerImageURL
      }));
  });
}

// main page
export function handleMainPage() {
  const campaignOverview = document.querySelector('#campaignOverview');
  const messageSection = document.querySelector('#message');
  // retrieve campaign data from localStorage
  const campaign = JSON.parse(localStorage.getItem('campaign'));

  if (campaign) {
      campaignOverview.innerHTML = `
          <h2>${campaign.name}</h2>
          <p>Start Date: ${campaign.startDate}</p>
          <p>End Date: ${campaign.endDate}</p>
          <div id="bannerPreview">
              <h3>Banner Preview:</h3>
              <img src="${campaign.bannerImage}" alt="Banner Preview">
          </div>
          <div id="marketingPagePreview">
              <h3>Marketing Page Preview:</h3>
              <div>${campaign.marketingPageContent}</div>
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
          image: imageUrl
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

  if (existingCampaign) {
      displayCampaignDetails(existingCampaign);
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

      displayCampaignDetails(campaign);
  });

  function displayCampaignDetails(campaign) {
      currentCampaignSection.innerHTML = `
          <h2>${campaign.name}</h2>
          <p>Start Date: ${campaign.startDate}</p>
          <p>End Date: ${campaign.endDate}</p>
          <div id="bannerPreview">
              <h3>Banner Preview:</h3>
              ${campaign.bannerImage ? `<img src="${campaign.bannerImage}" alt="Banner Preview">` : '<p>No banner image available.</p>'}
          </div>
          <div id="marketingPagePreview">
              <h3>Marketing Page Preview:</h3>
              ${campaign.marketingPageContent && campaign.marketingPageContent.title ? `
                  <div style="background-color: ${campaign.marketingPageContent.backgroundColor}; color: ${campaign.marketingPageContent.textColor}; padding: 20px;">
                      <h1>${campaign.marketingPageContent.title}</h1>
                      ${campaign.marketingPageContent.image ? `<img src="${campaign.marketingPageContent.image}" alt="Marketing Image" style="width: 100%; max-height: 300px; object-fit: cover;">` : ''}
                      <p>${campaign.marketingPageContent.content}</p>
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
