import { handleBannerEditor, handleMainPage, handleMarketingPageEditor, handleCampaignManagement, handleLogin } from './functions.js';

document.addEventListener('DOMContentLoaded', ()=>{
//banner
if (location.pathname.includes('banner.html')) {
    handleBannerEditor();
}

//main
if (location.pathname.includes('main.html')) {
    handleMainPage();
}

//marketing
if (location.pathname.includes('marketing.html')) {
  handleMarketingPageEditor();
}

//campaign
if (location.pathname.includes('campaign.html')) {
  handleCampaignManagement();
}

//login
if (location.pathname.includes('login.html')) {
  handleLogin();
}
});