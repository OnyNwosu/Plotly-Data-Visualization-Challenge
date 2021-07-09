// FUNCTION #1 of 4
function buildCharts(patientID) {
    d3.json("samples.json").then(data => {

        var metadata = data.metadata
        var samples = data.samples;
        var filteredMetadata = metadata.filter(row => row.id == patientID)[0];
        var filteredSample = samples.filter(row => row.id == patientID)[0];
        // var filteredSample.sample_values = data.samples[0].sample_values.slice(0,10).reverse(); 
        // var filteredSample.otu_labels = data.samples[0].otu_labels.slice(0,10);
        // var otu_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();
        // var filteredSample.otu_ids = otu_top.map(d => "OTU " + d);
        // var filteredSample.otu_labels = data.samples[0].otu_labels.slice(0,10);
        console.log("metadata", filteredMetadata)
        console.log("samples", filteredSample)
            


    // Bubble Data 
        // var bubbleData = [{
        //     x: filteredSample.otu_ids,
        //     y: filteredSample.sample_values,
        //     text:filteredSample.otu_labels,
        //     mode: 'markers',
        //     marker: {
        //         color: filteredSample.otu_ids,
        //         colorscale:"Rainbow",
        //         opacity: [1, 0.8, 0.6, 0.4],
        //         size: filteredSample.sample_values
        // }

        // }];

        // var bubbleLayout = {
        //     title: false,
        //     showlegend: false,
        //     height: 600,
        //     width: 1250,
        //     xaxis:{title:"OTU_ID"}
        // };

        // Plotly.newPlot('bubble', bubbleData, bubbleLayout);



        var combine_list = [filteredSample.sample_values,filteredSample.otu_labels,filteredSample.otu_ids];
      
        var new_bar_data = combine_list[0].map(function(col, i){
          return combine_list.map(function(row){
              return row[i];
          });
        });
        
        new_bar_data.sort(function(a, b){
          return b[0] - a[0];
          });
        
        var top_ten_bar_data = new_bar_data.slice(0,10);
        
        var new_bar_data = top_ten_bar_data[0].map(function(col, i){
          return top_ten_bar_data.map(function(row){
              return row[i];
          });
        });


    // Bar Chart
    var barData = [{
        type: 'bar',
        x: filteredSample.sample_values,
        y: filteredSample.otu_ids,
        text: filteredSample.otu_labels,
        marker: {
            color: 'blue'},
        orientation: "h",
    
    }];

  var barLayout = {
    title: false,
    showlegend: false,
    height: 450,
    width: 460,
    xaxis: {title: false}
  };
    
    Plotly.newPlot('bar', barData, barLayout);




    // Gauge Data
       
        // Plotly.newPlot("gauge", guageData, bubbleLayout)
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