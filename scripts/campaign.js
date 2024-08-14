document.addEventListener('DOMContentLoaded', () => {
    const campaignForm = document.querySelector('#campaignForm');
    const currentCampaignSection = document.querySelector('#currentCampaign');

    // load existing campaign from Local Storage
    const existingCampaign = JSON.parse(localStorage.getItem('campaign'));

    if (existingCampaign) {
        // shows existing campaign details
        displayCampaignDetails(existingCampaign);
    } else {
        currentCampaignSection.innerHTML = '<p>No current campaign. Please create one.</p>';
    }

    // campaign submit
    campaignForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const campaignName = document.querySelector('#campaignName').value;
        const startDate = document.querySelector('#startDate').value;
        const endDate = document.querySelector('#endDate').value;

        // create a campaign object
        const campaign = {
            name: campaignName,
            startDate: startDate,
            endDate: endDate,
        };

        // save the campaign to Local Storage
        localStorage.setItem('campaign', JSON.stringify(campaign));

        // shows the campaign details
        displayCampaignDetails(campaign);
    });

    // Function to display campaign details
    function displayCampaignDetails(campaign) {
        currentCampaignSection.innerHTML = `
            <h2>${campaign.name}</h2>
            <p>Start Date: ${campaign.startDate}</p>
            <p>End Date: ${campaign.endDate}</p>
            <!-- we can add more stuff here -->
        `;
    }
});
