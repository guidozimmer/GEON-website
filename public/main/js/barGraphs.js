export function barGraphs () {
    let chartCounter = 1;
    const maxWidth = 300; // Example max width
    const maxHeight = 40; // Example max height

    // Function to create and return the chart for 18 months
    function createChart18Monate(canvasId, containerClass, firstdata18Monate, secondData18Monate, globalMaxValue) {
    var labels = ["18 monate"];
    var barColors1 = ["#348200"]; // Fill color for the first bar
    var barColors2 = ["#98CB35"]; // Fill color for the second bar
    var borderColors1 = ["#348200"]; // Border color for the first bar
    var borderColors2 = ["#348200"]; // Border color for the second bar
    var canvas = document.getElementById(canvasId); // Canvas for graphs
    var autobahnclusterDiv = document.querySelector(containerClass); // Projektcluster Div

    // Compute the maximum value by adding 400 to the sum of firstdata18Monate and secondData18Monate
    var maxValue = firstdata18Monate[0] + secondData18Monate[0];

    // Set the valueRange18Monate array
    var valueRange18Monate = [0, globalMaxValue];

    // Adjust the canvas dimensions to match the specified max width and height
    if (autobahnclusterDiv) {
        canvas.width = Math.min(autobahnclusterDiv.offsetWidth + 40, maxWidth);
        canvas.height = Math.min(maxHeight, maxHeight);
    } else {
        console.log('No element with class "projektcluster" found.');
    }

    // Create a new chart instance
    var chart = new Chart(canvas, {
        type: "horizontalBar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Graph1-18Monate',
                    backgroundColor: barColors1,
                    borderColor: borderColors1,
                    borderWidth: 1,
                    data: firstdata18Monate
                },
                {
                    label: 'Graph2-18Monate',
                    backgroundColor: barColors2,
                    borderColor: borderColors2,
                    borderWidth: 0.5,
                    data: secondData18Monate
                }
            ]
        },
        options: {
            responsive: false, // Make sure the chart is not responsive to fit the fixed dimensions
            maintainAspectRatio: false,
            legend: { display: false }, // Hides the legend
            animation: {
                duration: 0 // Disable animation by setting duration to 0
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: false,
                        min: valueRange18Monate[0], // Use the first element of valueRange as the min value
                        max: valueRange18Monate[1]  // Use the second element of valueRange as the max value
                    },
                    gridLines: {
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        color: "transparent"
                    },
                    drawBorder: true,
                    borderColor: "transparent"
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#D7FC51" // Change label color to #D7FC51
                    },
                    gridLines: {
                        display: false,
                    },
                    drawBorder: true,
                    borderColor: "transparent"
                }]
            },
            plugins: {
                datalabels: {
                    display: false
                }
            },
            layout: {
                padding: {
                    right: 70, // Add padding to the right to prevent text cut off
                    left: 10
                }
            }
        }
    });

    // Generate IDs for value elements based on the chartCounter
    var valueId1 = `value${chartCounter}_1`;
    var valueId2 = `value${chartCounter}_2`;

    // Update the corresponding <h2> elements with the chart values
    document.getElementById(valueId1).innerHTML = `${firstdata18Monate[0]} <span style="font-size: smaller;">MW<sub>p</sub>`;
    document.getElementById(valueId2).innerHTML = `<span style="font-family: Acumin-Regular;">${secondData18Monate[0]} <span style="font-size: smaller;">MW<sub>p</sub></span></span>`;

    // Wait for the chart to finish rendering
    chart.update();

    function updatePosition() {
        // Get the elements for both bars in the first dataset
        const bar1 = chart.getDatasetMeta(0).data[0];
        const bar2 = chart.getDatasetMeta(1).data[0];

        if (!bar1) { // Check if the first bar was found
            console.log('First bar not found.');
        }

        if (!bar2) { // Check if the second bar was found
            console.log('Second bar not found.');
        } else {
            const bar1Width = bar1._model.base - bar1._model.x; // Calculate the width using base and x properties
            const bar2Width = bar2._model.base - bar2._model.x; // Calculate the width using base and x properties

            var value1 = document.getElementById(valueId1); // Canvas for graphs
            var value2 = document.getElementById(valueId2);

            var offset1 = bar1Width + 140;
            var offset2 = bar2Width + 70;

            var currentLeft1 = parseInt(window.getComputedStyle(value1).left, 10);
            var currentLeft2 = parseInt(window.getComputedStyle(value2).left, 10);

            value1.style.left = (currentLeft1 - offset1) + "px";
            value2.style.left = (currentLeft2 - offset2) + "px";
        }
    };

    updatePosition()

    // Increment the chartCounter for the next call
    chartCounter++;
    }

    // Function to create and return the chart for 36 months
    function createChart36Monate(canvasId, containerClass, firstdata36Monate, secondData36Monate, globalMaxValue) {
    var labels = ["36 Monate"];
    var barColors1 = ["#348200"]; // Fill color for the first bar
    var barColors2 = ["#98CB35"]; // Fill color for the second bar
    var borderColors1 = ["#A3D33A"]; // Border color for the first bar
    var borderColors2 = ["#348200"]; // Border color for the second bar
    var valueRange36Monate = [0, globalMaxValue]; // Min and max values for the x-axis
    var canvas = document.getElementById(canvasId) // Canvas for graphs
    var autobahnclusterDiv = document.querySelector(containerClass); // Projektcluster Div

    // Adjust the canvas dimensions to match the specified max width and height
    if (autobahnclusterDiv) {
        canvas.width = Math.min(autobahnclusterDiv.offsetWidth + 40, maxWidth);
        canvas.height = Math.min(maxHeight, maxHeight);
    } else {
        console.log('No element with class "autobahn" found.');
    }

    // Create a new chart instance
    var chart = new Chart(canvas, {
        type: "horizontalBar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Graph1-36Monate',
                    backgroundColor: barColors1,
                    borderColor: borderColors1,
                    borderWidth: 1,
                    data: firstdata36Monate
                },
                {
                    label: 'Graph2-36Monate',
                    backgroundColor: barColors2,
                    borderColor: borderColors2,
                    borderWidth: 0.5,
                    data: secondData36Monate
                }
            ]
        },
        options: {
            responsive: false, // Make sure the chart is not responsive to fit the fixed dimensions
            maintainAspectRatio: false,
            legend: { display: false }, // Hides the legend
            animation: {
                duration: 0 // Disable animation by setting duration to 0
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: false,
                        min: valueRange36Monate[0], // Use the first element of valueRange as the min value
                        max: valueRange36Monate[1]  // Use the second element of valueRange as the max value
                    },
                    gridLines: {
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        color: "transparent"
                    },
                    drawBorder: true,
                    borderColor: "transparent"
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#D7FC51" // Change label color to #D7FC51
                    },
                    gridLines: {
                        display: false,
                    },
                    drawBorder: true,
                    borderColor: "transparent"
                }]
            },
            plugins: {
                datalabels: {
                    display: false
                }
            },
            layout: {
                padding: {
                    right: 70, // Add padding to the right to prevent text cut off
                    left: 10
                }
            }
        }
    });

    // Generate IDs for value elements based on the chartCounter
    var valueId1 = `value${chartCounter}_1`;
    var valueId2 = `value${chartCounter}_2`;

    // Update the corresponding <h2> elements with the chart values
        document.getElementById(valueId1).innerHTML = `${firstdata36Monate[0]} <span style="font-size: smaller;">MW<sub>p</sub>`;
            document.getElementById(valueId2).innerHTML = `<span style="font-family: Acumin-Regular;">${secondData36Monate[0]} <span style="font-size: smaller;">MW<sub>p</sub></span></span>`;

    // Wait for the chart to finish rendering
    chart.update();

    function updatePosition() {
        // Get the elements for both bars in the first dataset
        const bar1 = chart.getDatasetMeta(0).data[0];
        const bar2 = chart.getDatasetMeta(1).data[0];

        if (!bar1) { // Check if the first bar was found
            console.log('First bar not found.');
        }

        if (!bar2) { // Check if the second bar was found
            console.log('Second bar not found.');
        } else {
            const bar1Width = bar1._model.base - bar1._model.x; // Calculate the width using base and x properties
            const bar2Width = bar2._model.base - bar2._model.x; // Calculate the width using base and x properties

            var value1 = document.getElementById(valueId1); // Canvas for graphs
            var value2 = document.getElementById(valueId2);

            var offset1 = bar1Width + 140;
            var offset2 = bar2Width + 70;

            var currentLeft1 = parseInt(window.getComputedStyle(value1).left, 10);
            var currentLeft2 = parseInt(window.getComputedStyle(value2).left, 10);

            value1.style.left = (currentLeft1 - offset1) + "px";
            value2.style.left = (currentLeft2 - offset2) + "px";
        }
    };

    updatePosition()

    // Increment the chartCounter for the next call
    chartCounter++;

    document.getElementById(canvasId).style.marginTop = "-15px";
    }

    document.addEventListener('DOMContentLoaded', (event) => {
    function getElementCoordinates(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            right: rect.right + window.scrollX
        };
    }

    // Get the canvas for drawing the lines
    const lineCanvas = document.getElementById('lineCanvas');

    // Check if canvas is obtained
    if (!lineCanvas) {
        console.error('Canvas not found');
        return;
    }

    // Set the size of the lineCanvas to cover the entire viewport
    lineCanvas.width = window.innerWidth;
    lineCanvas.height = window.innerHeight;

    // Get the 2D drawing context
    const ctx = lineCanvas.getContext('2d');

    // Get all the canvas elements
    const charts = document.querySelectorAll('canvas[id^="Chart"]');

    // Draw lines between each pair of charts
    for (let i = 0; i < charts.length; i += 2) {
        const canvas1 = charts[i];
        const canvas2 = charts[i + 1];

        // Calculate their coordinates
        const coords1 = getElementCoordinates(canvas1);
        const coords2 = getElementCoordinates(canvas2);

        // Extract the required coordinates and move them 50px to the right
        const topCoords = {
            x: coords1.left + 78,
            y: coords1.top + 4
        };
        const bottomCoords = {
            x: coords2.left + 78,
            y: coords2.bottom - 4
        };

        // Draw the line from topCoords to bottomCoords
        ctx.beginPath();
        ctx.moveTo(topCoords.x, topCoords.y);
        ctx.lineTo(bottomCoords.x, bottomCoords.y);
        ctx.strokeStyle = 'black'; // Line color
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    });

        // Define your datasets with only data1 and data2
    const dataSet1 = { id: 'Chart1', containerClass: '.autobahn', labels: ['18 Monate'], data1: [229], data2: [1175] };
    const dataSet2 = { id: 'Chart2', containerClass: '.autobahn', labels: ['36 Monate'], data1: [0], data2: [0] };
    
    const dataSet3 = { id: 'Chart3', containerClass: '.bahnstrecke', labels: ['18 Monate'], data1: [0], data2: [0] };
    const dataSet4 = { id: 'Chart4', containerClass: '.bahnstrecke', labels: ['36 Monate'], data1: [0], data2: [0] };
    
    const dataSet5 = { id: 'Chart5', containerClass: '.landwirtschaft', labels: ['18 Monate'], data1: [106.5], data2: [382] };
    const dataSet6 = { id: 'Chart6', containerClass: '.landwirtschaft', labels: ['36 Monate'], data1: [614.3], data2: [269] };
    
    const dataSet7 = { id: 'Chart7', containerClass: '.batteriespeicher', labels: ['18 Monate'], data1: [336], data2: [1557] };
    const dataSet8 = { id: 'Chart8', containerClass: '.batteriespeicher', labels: ['36 Monate'], data1: [269], data2: [614.3] };

    // Manually create an array with only data1 and data2 from each dataset
    const allData = [
    ...dataSet1.data1, ...dataSet1.data2,
    ...dataSet2.data1, ...dataSet2.data2,
    ...dataSet3.data1, ...dataSet3.data2,
    ...dataSet4.data1, ...dataSet4.data2,
    ...dataSet5.data1, ...dataSet5.data2,
    ...dataSet6.data1, ...dataSet6.data2,
    ...dataSet7.data1, ...dataSet7.data2,
    ...dataSet8.data1, ...dataSet8.data2
    ];

    // Find the global maximum value
    const globalMaxValue = Math.max(...allData);

    // Manually call the appropriate chart creation function for each dataset
    function createCharts() {
    createChart18Monate(dataSet1.id, dataSet1.containerClass, dataSet1.data1, dataSet1.data2, globalMaxValue);
    createChart36Monate(dataSet2.id, dataSet2.containerClass, dataSet2.data1, dataSet2.data2, globalMaxValue);
    createChart18Monate(dataSet3.id, dataSet3.containerClass, dataSet3.data1, dataSet3.data2, globalMaxValue);
    createChart36Monate(dataSet4.id, dataSet4.containerClass, dataSet4.data1, dataSet4.data2, globalMaxValue);
    createChart18Monate(dataSet5.id, dataSet5.containerClass, dataSet5.data1, dataSet5.data2, globalMaxValue);
    createChart36Monate(dataSet6.id, dataSet6.containerClass, dataSet6.data1, dataSet6.data2, globalMaxValue);
    createChart18Monate(dataSet7.id, dataSet7.containerClass, dataSet7.data1, dataSet7.data2, globalMaxValue);
    createChart36Monate(dataSet8.id, dataSet8.containerClass, dataSet8.data1, dataSet8.data2, globalMaxValue);
    }

    // Call the function to create all charts
    createCharts();

    }
