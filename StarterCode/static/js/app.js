// FUNCTION #1 of 4
function buildCharts(patientID) {
    d3.json("samples.json").then(data => {

        var metadata = data.metadata
        var samples = data.samples;
        var filteredMetadata = metadata.filter(row => row.id == patientID)[0];
        var filteredSample = samples.filter(row => row.id == patientID)[0];
        console.log("metadata", filteredMetadata)
        console.log("samples", filteredSample)
        
        var bubbleData = [{
            // x: [1, 2, 3, 4],
            // y: [10, 11, 12, 13],
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            mode: 'markers',
            marker: {
                color: filteredSample.otu_ids,
                colorscale:"Rainbow",
                opacity: [1, 0.8, 0.6, 0.4],
                size: filteredSample.sample_values
            }
        }];

        var bubbleLayout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        // Plotly.newPlot("barDiv", barData, barLayout)
        // Plotly.newPlot("bubbleDiv", bubbleData, bubbleLayout)
        // Plotly.newPlot("gaugeDiv", guageData, bubbleLayout)
    })
};

// FUNCTION #2 of 4
function populateDemographicInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        console.log(data)
        // ADD APPROXIMATELY 3-6 LINE OF CODE
    })
}

// FUNCTION #3 of 4
function optionChanged(patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemographicInfo(patientID);
}

// FUNCTION #4 of 4
function initializeDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemographicInfo(patientIDs[0]);
    });
};

initializeDashboard();