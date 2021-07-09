// FUNCTION #1 of 4
function buildCharts(patientID) {
    d3.json("samples.json").then(data => {

        var metadata = data.metadata
        var samples = data.samples;
        var filteredMetadata = metadata.filter(row => row.id == patientID)[0];
        var filteredSample = samples.filter(row => row.id == patientID)[0];
        var washingFrequency = filteredMetadata.wfreq
        var sample_values = filteredSample.sample_values
        var otu_ids = filteredSample.otu_ids
        var otu_labels = filteredSample.otu_labels
        console.log(sample_values)
        console.log(otu_ids);
        console.log(otu_labels);

        // Bubble Data 
        var bubbleData = [{
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            text: filteredSample.otu_labels,
            mode: 'markers',
            marker: {
                color: filteredSample.otu_ids,
                colorscale: "Rainbow",
                opacity: [1, 0.8, 0.6, 0.4],
                size: filteredSample.sample_values
            }

        }];

        var bubbleLayout = {
            title: false,
            showlegend: false,
            height: 600,
            width: 1250,
            xaxis: { title: "OTU_ID" }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Bar Chart

        var barData = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            marker: {
                color: 'blue'
            },
            orientation: "h",
        }]

        var barLayout = {
            title: false,
            showlegend: false,
            height: 450,
            width: 460,
            xaxis: { title: false }
        };

        Plotly.newPlot('bar', barData, barLayout);


        // Gauge Data --Optional
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washingFrequency,
                title: { text: "Frequency of Belly Button Washes per Weeks" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 9] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gauge', data, layout);


    })
};


// FUNCTION #2 of 4
function populateDemographicInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        // ADD APPROXIMATELY 3-6 LINE OF CODE
        var result = data.metadata.filter(meta => meta.id.toString() == patientID)[0];

        demographicInfoBox.html("");
        Object.entries(result).forEach((key) => {
            demographicInfoBox.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// FUNCTION #3 of 4
function optionChanged(patientID) {

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