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



    let dotSpan = document.createElement('span');

    // Set the dot's content, font size, and color
    dotSpan.textContent = '■';
    dotSpan.style.fontSize = '36px'; // Set the font size
    dotSpan.style.color = '#d6fd51';  // Replace this with your desired color
    
    // Adjust position to move the square down
    dotSpan.style.position = 'relative';
    dotSpan.style.top = '5px';  // Move it down by 20px






    //document.getElementById('aboutUsVisionPart1').textContent = variables.aboutUsVisionPart1;

    //document.getElementById('weStandForText').textContent = variables.weStandForText;

    document.getElementById('ourOfferText1').textContent = variables.ourOfferText1;
    document.getElementById('ourOfferText1').appendChild(dotSpan);


    document.getElementById('ourOfferLandOwnersPart1').textContent = variables.ourOfferLandOwnersPart1;
    document.getElementById('ourOfferLandOwnersPart2').textContent = variables.ourOfferLandOwnersPart2;


    document.getElementById('ourOfferCitizensPart1').textContent = variables.ourOfferCitizensPart1;
    document.getElementById('ourOfferCitizensPart2').textContent = variables.ourOfferCitizensPart2;



    document.getElementById('ourOfferInvestorsPart1').textContent = variables.ourOfferInvestorsPart1;
    document.getElementById('ourOfferInvestorsPart2').textContent = variables.ourOfferInvestorsPart2;


}

