async function hibpData(domainName) {
	const response = await fetch("https://haveibeenpwned.com/api/v2/breach/" + domainName);
	const data = await response.json();
	console.log(data);
	return data;	
}

async function displayBreachInfo(data) {
    const breachInfoElement = document.querySelector('.content');

    const htmlContent = `
        <h1>${data.Name} Data Breach Information</h1>
        <img src="${data.LogoPath}" alt="${data.Name} Logo" width="100">
        <p><strong>Name:</strong> ${data.Name}</p>
        <p><strong>Title:</strong> ${data.Title}</p>
        <p><strong>Domain:</strong> ${data.Domain}</p>
        <p><strong>Breach Date:</strong> ${data.BreachDate}</p>
        <p><strong>Added Date:</strong> ${data.AddedDate}</p>
        <p><strong>Modified Date:</strong> ${data.ModifiedDate}</p>
        <p><strong>Pwn Count:</strong> ${data.PwnCount}</p>

        <h2>Description</h2>
        <p>${data.Description}</p>

        <h2>Data Classes</h2>
        <ul>${data.DataClasses.map(dataClass => `<li>${dataClass}</li>`).join('')}</ul>
    `;

    breachInfoElement.innerHTML = htmlContent;
}
function getTabInfo() {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // tabs[0] contains information about the active tab
    const activeTab = tabs[0];
    // Log the URL and domain
    let badUrl = extractDomainName(activeTab.url).split(".");
    console.log(badUrl);
    var goodUrl = extractDomainName(activeTab.url);
    console.log(goodUrl);
    if(badUrl[0] == 'www')
        goodUrl = badUrl[1];
    else
        goodUrl = badUrl[0];
    console.log(goodUrl);
    const breachData = hibpData(goodUrl)
    .then(response => {
        displayBreachInfo(response);
        console.log(response);
    });

});
}

  // Function to extract domain name from URL
function extractDomainName(url) {
    const urlObject = new URL(url);
    return urlObject.hostname;
}

  // Call the function to get tab information
getTabInfo();



