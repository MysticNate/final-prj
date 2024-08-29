// localStorage.clear();

// check login status if not on the login page
if (!window.location.pathname.includes('login.html')) {
  checkLoginStatus();
}


//login
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentPage = window.location.pathname;

  // redirect if not logged in and not on the login page
  if (!isLoggedIn && !currentPage.includes('login.html')) {
    window.location.href = '../pages/login.html';
  }
}

export function handleLogin() {
  // Initial users
  let users = [
      { username: 'Giora', password: 'the drunk russian' },
      { username: 'Nati', password: 'the black thief' },
      { username: 'Waseem', password: 'the arab terrorist' }
  ];

  // check if users are already in Local Storage
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
          localStorage.setItem('isLoggedIn', 'true'); //login flag
          window.location.href = '../pages/main.html';
      } else {
          errorMessage.textContent = 'Invalid username or password';
      }
  });
}

// main page
export function handleMainPage() {
  const campaignOverview = document.querySelector('#campaignOverview');
  const messageSection = document.querySelector('#message');

  // Retrieve data from localStorage
  let campaign = JSON.parse(localStorage.getItem('campaign')) || {};
  let banner = campaign.banner || JSON.parse(localStorage.getItem('banner')) || {};
  let marketingPage = JSON.parse(localStorage.getItem('marketingPage')) || {};
  
  if (campaign.name) {
    // checking if banner data exists
    const bannerHTML = generateBannerHTML(banner);
    
    //checking if marketing data exists
    const marketingPageContentHTML = generateMarketingPageHTML(marketingPage);

    // Update the campaign overview section with the correct HTML
    campaignOverview.innerHTML = `
        <h2>${campaign.name}</h2>
        <p>Start Date: ${campaign.startDate}</p>
        <p>End Date: ${campaign.endDate}</p>
        <div id="bannerPreview">
            <h3>Banner Preview:</h3>
            ${bannerHTML}
        </div>
        <div id="marketingPagePreview">
            <h3>Marketing Page Preview:</h3>
            ${marketingPageContentHTML}
        </div>`;
  } else {
      messageSection.innerHTML = `
          <h2>No Active Campaign</h2>
          <p>You don't have an active campaign. <a href="campaign.html">Create a new campaign</a>.</p>
      `;
  }
}

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

      // ensures all values are defined before saving
      let bannerData = {
          type: bannerType,     
          text: bannerText,     
          backgroundColor: backgroundColor,
          textColor: textColor,
          fontSize: fontSize,
          fontFamily: fontFamily
      };

      // save banner data to localStorage
      localStorage.setItem('banner', JSON.stringify(bannerData));

      // update the banner preview
      let campaign = JSON.parse(localStorage.getItem('campaign')) || {};
      campaign.banner = bannerData;
      localStorage.setItem('campaign', JSON.stringify(campaign));
      alert('Banner saved!');
  });

  function updateBannerPreview() {
      const bannerType = document.querySelector('#bannerType').value;
      const bannerText = document.querySelector('#bannerText').value;
      const backgroundColor = document.querySelector('#backgroundColor').value;
      const textColor = document.querySelector('#textColor').value;
      const fontSize = document.querySelector('#fontSize').value + 'px';
      const fontFamily = document.querySelector('#fontType').value;

      const bannerHTML = generateBannerHTML({
        type: bannerType,
        text: bannerText,
        backgroundColor: backgroundColor,
        textColor: textColor,
        fontSize: fontSize,
        fontFamily: fontFamily
    });

    bannerPreview.innerHTML = bannerHTML;
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

    if (pageImage) {
      const reader = new FileReader();
      /* The above code is a JavaScript snippet that is handling the loading of an image file using a
      FileReader object. When the image file is loaded successfully, the code extracts the Base64
      string representation of the image and uses it to generate a marketing page HTML content. The
      generated HTML content includes a title, content, background color, text color, and the image
      itself (using the Base64 string). Finally, the generated HTML content is displayed in a DOM
      element with the id "marketingPagePreview". */
      reader.onload = function (e) {
        const imageUrl = e.target.result;  // Base64 string
        const marketingPageHTML = generateMarketingPageHTML({
          title: pageTitle,
          content: pageContent,
          backgroundColor: pageBackgroundColor,
          textColor: textColor,
          image: imageUrl  // Use Base64 string
        });
        marketingPagePreview.innerHTML = marketingPageHTML;
      };
      reader.readAsDataURL(pageImage);
    } else {
      const marketingPageHTML = generateMarketingPageHTML({
        title: pageTitle,
        content: pageContent,
        backgroundColor: pageBackgroundColor,
        textColor: textColor,
        image: ''  // No image provided
      });
      marketingPagePreview.innerHTML = marketingPageHTML;
    }
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
      const reader = new FileReader();
      reader.onload = function (e) {
        imageUrl = e.target.result;  // Base64 string
        const marketingPageData = {
          title: pageTitle,
          content: pageContent,
          backgroundColor: pageBackgroundColor,
          textColor: textColor,
          image: imageUrl  // Save Base64 string
        };
        localStorage.setItem('marketingPage', JSON.stringify(marketingPageData));
        updateCampaignWithMarketingPage(marketingPageData);
        alert('Marketing page saved!');
      };
      reader.readAsDataURL(pageImage);
    } else {
      const marketingPageData = {
        title: pageTitle,
        content: pageContent,
        backgroundColor: pageBackgroundColor,
        textColor: textColor,
        image: imageUrl
      };
      localStorage.setItem('marketingPage', JSON.stringify(marketingPageData));
      updateCampaignWithMarketingPage(marketingPageData);
      alert('Marketing page saved!');
    }
  }

  function updateCampaignWithMarketingPage(marketingPageData) {
    let campaign = JSON.parse(localStorage.getItem('campaign')) || {};
    campaign.marketingPageContent = marketingPageData;
    localStorage.setItem('campaign', JSON.stringify(campaign));
  }
}


//generate banner page
function generateBannerHTML(banner) {
  if (!banner) return '';

  return `
    <div style="
        width: ${banner.type === 'vertical' ? '300px' : '250px'};
        height: ${banner.type === 'vertical' ? '600px' : '250px'};
        background-color: ${banner.backgroundColor};
        color: ${banner.textColor};
        font-size: ${banner.fontSize};
        font-family: ${banner.fontFamily};
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        overflow: hidden;
    ">
        ${banner.text || 'No banner text'}
    </div>
  `;
}

//generate marketing page
function generateMarketingPageHTML(marketingPage) {
  if (!marketingPage) return '';

  return `
    <div style="background-color: ${marketingPage.backgroundColor}; color: ${marketingPage.textColor}; padding: 20px;">
      <h2>${marketingPage.title}</h2>
      ${marketingPage.image ? `<img src="${marketingPage.image}" alt="Marketing Image" style="width: 100%; max-height: 300px; object-fit: cover;">` : ''}
      <p>${marketingPage.content}</p>
    </div>
  `;
}


//campaign
export function handleCampaignManagement() {
  const campaignForm = document.querySelector('#campaignForm');
  const currentCampaignSection = document.querySelector('#currentCampaign');

  let existingCampaign = JSON.parse(localStorage.getItem('campaign'));
  let banner = JSON.parse(localStorage.getItem('banner'));
  let marketingPage = JSON.parse(localStorage.getItem('marketingPage'));

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
    errorMessage.textContent = '';
    
    // validate campaign name
    function isLetter(char) {
      return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char === ' ') ;
    }

    function isValidCampaignName(name) {
      for (let i = 0; i < name.length; i++) {
        if (isLetter(name[i]) === false) {
          return false;
        }
      }
      return true;
    }

    if (isValidCampaignName(campaignName) === false) {
      errorMessage.textContent = 'Campaign name must contain only letters.';
      return;
    }

    // convert dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // check if end date is before start date
    if (endDateObj < startDateObj) {
      errorMessage.textContent = 'Invalid date range.';
      return;
    }

    // retrieve banner and marketing page data from Local Storage
    const banner = JSON.parse(localStorage.getItem('banner'));
    const marketingPage = JSON.parse(localStorage.getItem('marketingPage'));

    // create a campaign object that includes the banner and marketing page data
    let campaign = {
      name: campaignName,
      startDate: startDate,
      endDate: endDate,
      marketingPageContent: marketingPage ? marketingPage : {} // Use marketing page data if it exists
    };

    localStorage.setItem('campaign', JSON.stringify(campaign));

    displayCampaignDetails(campaign, banner, marketingPage);
  });

  function displayCampaignDetails(campaign, banner, marketingPage) {
    const bannerData = campaign.banner || banner || {};
    const bannerHTML = bannerData.text ? generateBannerHTML(bannerData) : '<p>No banner available.</p>';
    const marketingPageHTML = marketingPage && marketingPage.title ? generateMarketingPageHTML(marketingPage) : '<p>No marketing page content available.</p>';

    currentCampaignSection.innerHTML = `
      <h2>${campaign.name}</h2>
      <p>Start Date: ${campaign.startDate}</p>
      <p>End Date: ${campaign.endDate}</p>
      <div id="bannerPreview">
        <h3>Banner Preview:</h3>
        ${bannerHTML}
      </div>
      <div id="marketingPagePreview">
        <h3>Marketing Page Preview:</h3>
        ${marketingPageHTML}
      </div>
    `;
  } 
}


