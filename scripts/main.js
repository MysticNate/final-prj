document.addEventListener('DOMContentLoaded', function () {
    const campaignOverview = document.querySelector('#campaignOverview');
    const messageSection = document.querySelector('#message');

    const campaign = JSON.parse(localStorage.getItem('campaign'));

    if (campaign) {
        // show current campaign details
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
        // message to create a new campaign
        messageSection.innerHTML = `
            <h2>No Active Campaign</h2>
            <p>You don't have an active campaign. <a href="campaign.html">Create a new campaign</a>.</p>
        `;
    }
});
