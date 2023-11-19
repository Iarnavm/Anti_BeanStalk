import hibpData from "./findData";

console.log("dsfsfd");
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

breachData = hibpData("facebook").then(response => response.json())
.then(response => {
    displayBreachInfo(response);
    console.log(response);
});

console.log("dafadsf");
