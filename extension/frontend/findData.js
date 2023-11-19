export default async function hibpData(domainName) {
	const response = await fetch("https://haveibeenpwned.com/api/v2/breach/" + domainName)
	const data = await response.json();
	console.log(data);
	return data;	
}
