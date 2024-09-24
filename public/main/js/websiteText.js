 // Function to load the text file
export function loadTextFile(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Error loading text file:', error));
}

// Function to parse the text file content and inject into the HTML
export function injectContent(data) {
    const lines = data.split('\n');
    const variables = {};

    lines.forEach(line => {
        const [key, value] = line.split(' = ');
        if (key && value) {
            variables[key.trim()] = value.trim().replace(/"/g, '');
        }
    });

    // Injecting the content into the HTML


    document.getElementById('aboutUsVisionPart1').textContent = variables.aboutUsVisionPart1;
    document.getElementById('aboutUsVisionPart2').textContent = variables.aboutUsVisionPart2;

    document.getElementById('weStandForText').textContent = variables.weStandForText;

    document.getElementById('ourOfferText1').textContent = variables.ourOfferText1;
    document.getElementById('ourOfferText2').textContent = variables.ourOfferText2;

    document.getElementById('ourOfferLandOwnersPart1').textContent = variables.ourOfferLandOwnersPart1;
    document.getElementById('ourOfferLandOwnersPart2').textContent = variables.ourOfferLandOwnersPart2;
    document.getElementById('ourOfferLandOwnersPart3').textContent = variables.ourOfferLandOwnersPart3;

    document.getElementById('ourOfferCitizensPart1').textContent = variables.ourOfferCitizensPart1;
    document.getElementById('ourOfferCitizensPart2').textContent = variables.ourOfferCitizensPart2;
    
    document.getElementById('ourOfferCitizensPart3').textContent = variables.ourOfferCitizensPart3;
    document.getElementById('ourOfferCitizensPart4').textContent = variables.ourOfferCitizensPart4;
    document.getElementById('ourOfferCitizensPart5').textContent = variables.ourOfferCitizensPart5;


    document.getElementById('ourOfferInvestorsPart1').textContent = variables.ourOfferInvestorsPart1;
    document.getElementById('ourOfferInvestorsPart2').textContent = variables.ourOfferInvestorsPart2;
    document.getElementById('ourOfferInvestorsPart3').textContent = variables.ourOfferInvestorsPart3;
    document.getElementById('ourOfferInvestorsPart4').textContent = variables.ourOfferInvestorsPart4;


}

