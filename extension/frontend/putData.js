const rating = document.getElementsByClassName("rating")[0];
const block = document.getElementsByClassName("block");
for(var i = 1; i < 100; i++){
    rating.innerHTML += "<div class = 'block'></div>"
    block[i].style.transform = "rotate(" + 3.6 * i + "deg)";
    block[i].style.animationDelay = `${i/40}s`;
}
async function hibpData(domainName) 
{
    let garbage = await setTarget(domainName);
    console.log('here');
    try{
	const response = await fetch("https://haveibeenpwned.com/api/v2/breach/" + domainName);
	const data = await response.json();
	console.log(data);
	return data;
    } catch(error){
        return error.message;
    }
}

async function setTarget(domainName)
{
    var garbage = {"websiteURL": "www." + domainName + ".com"}
    fetch("http://phishwarden-env.eba-qwxkz56x.ap-south-1.elasticbeanstalk.com/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(garbage)
    }).then(response=>response.json()).then(data => {
        
        const counter = document.querySelector('.counter');
        console.log(data.phishingWebsite);
        counter.innerHTML = Math.round(data.phishingWebsite * 100);
        if(Math.round(data.phishingWebsite * 100) > 50){
            
            
            for(var i = 0; i < 100; i++){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.goBack(tabs[0].id);
                });
                rating.innerHTML += "<div class = 'block'></div>"
                block[i].style.backgroundColor = "red";
                block[i].style.boxShadow = "0 0 15px red,0 0 30px red";
            }
        }        
    });
}

async function displayBreachInfo(data) 
{ 
    const breachInfoElement = document.querySelector('.content');
    var htmlContent;
    if(data == "Unexpected end of JSON input"){
        htmlContent = "There have not been any recent data breaches on this website!";
        // var imgElement = document.createElement("img");
        // imgElement.src = "./resource/check.png";
        // imgElement.alt = "this is an image";
        // imgElement.width = 120;
        // imgElement.height = 120;
        // breachInfoElement.appendChild(imgElement);
        breachInfoElement.innerHTML += "<br>";
    }
    else htmlContent = `
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
        <p>${data.Description}</p><br>

        <h2>Data Classes</h2>
        ${data.DataClasses.map(dataClass => `${dataClass}<br>`).join('')}
        <br><br>
    `;

    breachInfoElement.innerHTML += htmlContent;
}
function getTabInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
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

function extractDomainName(url) {
    const urlObject = new URL(url);
    return urlObject.hostname;
}

getTabInfo();