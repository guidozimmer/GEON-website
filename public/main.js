// Function to load the text file
function loadTextFile(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Error loading text file:', error));
}

// Function to parse the text file content and inject into the HTML
function injectContent(data) {
    const lines = data.split('\n');
    const variables = {};

    lines.forEach(line => {
        const [key, value] = line.split(' = ');
        if (key && value) {
            variables[key.trim()] = value.trim().replace(/"/g, '');
        }
    });

    // Injecting the content into the HTML
    document.getElementById('wwdSolarPower').textContent = variables.wwdSolarPower;
    
    document.getElementById('wwdStorageSolutionsPt1').textContent = variables.wwdStorageSolutionsPt1;
    document.getElementById('wwdStorageSolutionsPt2').textContent = variables.wwdStorageSolutionsPt2;
    document.getElementById('wwdStorageSolutionsPt3').textContent = variables.wwdStorageSolutionsPt3;

    document.getElementById('wwdConsultingServicesPt1').textContent = variables.wwdConsultingServicesPt1;
    document.getElementById('wwdConsultingServicesPt2').textContent = variables.wwdConsultingServicesPt2;


    document.getElementById('wwaDescription').textContent = variables.wwaDescription;

    document.getElementById('wwdiDescriptionPt1').textContent = variables.wwdiDescriptionPt1;
    document.getElementById('wwdiDescriptionPt2').textContent = variables.wwdiDescriptionPt2;


}

// Load the text file and inject content
loadTextFile('websiteText.txt', injectContent);