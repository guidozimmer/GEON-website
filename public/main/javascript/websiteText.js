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
    //document.getElementById('wwdSolarPower').textContent = variables.wwdSolarPower;
    
    //document.getElementById('wwdStorageSolutionsPt1').textContent = variables.wwdStorageSolutionsPt1;
    //document.getElementById('wwdStorageSolutionsPt2').textContent = variables.wwdStorageSolutionsPt2;
    //document.getElementById('wwdStorageSolutionsPt3').textContent = variables.wwdStorageSolutionsPt3;

    //document.getElementById('wwdConsultingServicesPt1').textContent = variables.wwdConsultingServicesPt1;
    //document.getElementById('wwdConsultingServicesPt2').textContent = variables.wwdConsultingServicesPt2;

    document.getElementById('aboutUsVisionPart1').textContent = variables.aboutUsVisionPart1;
    document.getElementById('aboutUsVisionPart2').textContent = variables.aboutUsVisionPart2;

    document.getElementById('weStandForText').textContent = variables.weStandForText;

    document.getElementById('ourOfferText1').textContent = variables.ourOfferText1;
    document.getElementById('ourOfferText2').textContent = variables.ourOfferText2;

    document.getElementById('aboutUsLandOwnersPart1').textContent = variables.aboutUsLandOwnersPart1;
    document.getElementById('aboutUsLandOwnersPart2').textContent = variables.aboutUsLandOwnersPart2;
    document.getElementById('aboutUsLandOwnersPart3').textContent = variables.aboutUsLandOwnersPart3;

    document.getElementById('aboutUsCitizensPart1').textContent = variables.aboutUsCitizensPart1;
    document.getElementById('aboutUsCitizensPart2').textContent = variables.aboutUsCitizensPart2;
    
    document.getElementById('aboutUsOffersText').textContent = variables.aboutUsOffersText;

    document.getElementById('aboutUsInvestorsPart1').textContent = variables.aboutUsInvestorsPart1;
    document.getElementById('aboutUsInvestorsPart2').textContent = variables.aboutUsInvestorsPart2;
    document.getElementById('aboutUsInvestorsPart3').textContent = variables.aboutUsInvestorsPart3;


    document.getElementById('wwaDescription').textContent = variables.wwaDescription;

    document.getElementById('wwdiDescriptionPt1').textContent = variables.wwdiDescriptionPt1;
    document.getElementById('wwdiDescriptionPt2').textContent = variables.wwdiDescriptionPt2;


}

