// FUNCTION #1 of 4
function buildCharts(patientID) {
    d3.json("samples.json").then(data => {

        var metadata = data.metadata
        var samples = data.samples;
        var filteredMetadata = metadata.filter(row => row.id == patientID)[0];
        var filteredSample = samples.filter(row => row.id == patientID)[0];

        var sample_values = filteredSample.sample_values
        var otu_ids = filteredSample.otu_ids
        var otu_labels = filteredSample.otu_labels
        console.log(sample_values)
        console.log(otu_ids)
        console.log(otu_labels)

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



        // var combine_list = [filteredSample.sample_values, filteredSample.otu_labels, filteredSample.otu_ids];

        // var new_bar_data = combine_list[0].map(function (col, i) {
        //     return combine_list.map(function (row) {
        //         return row[i];
        //     });
        // });

        // var sorted = data.sort(function (a, b) {
        // searchA = a.filteredSample.sample_values;
        // searchB = b.filteredSample.sample_values;
        // return searchB - searchA;
        // });

        // new_bar_data.sort(function (a, b) {
        // return b[0] - a[0];
        // return b - a;
        // });

        // var topTen = new_bar_data.slice(0, 10);
        // topTen.reverse();

        // var new_bar_data = topTen[0].map(function (col, i) {
        //     return topTen.map(function (row) {
        //         return row[i];
        //     });
        // });

        // Bar Chart

        var barData = [{
            type: 'bar',
            // x: topTen.map(sample => sample.filteredSample.sample_values),
            // y: topTen.map(sample => filteredSample.otu_ids),
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
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



        // Plotly.newPlot("gauge", guageData, bubbleLayout)


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