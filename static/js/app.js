//Url of the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});


// Initialize the dashboard
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset").on("change", update_graphics);
   
  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((data) => {
      
      // Set a variable for the sample names
      let names = data.names;

      // Add  samples to dropdown menu
      names.forEach((id) => {

          // Log the value of id for each iteration of the loop
          console.log(id);

          dropdownMenu.append("option")
          .text(id)
          .property("value",id);
      });

      // Set the first sample from the list
      let id = names[0];

      // Log the value of sample_one
      console.log(id);

      // Build the initial plots
      createDemoInfo(id);
      createBarChart(id);
      createBubbleChart(id);
      createGauge(id);

  });
};
//handle dropdown selection change
function  update_graphics(){
  
  
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let id = dropdownMenu.property("value");

  createDemoInfo(id);
  createBarChart(id);
  createBubbleChart(id);
  createGauge(id);
 
 
};

// Function that populates metadata info
function createDemoInfo(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(result => result.id == sample);

      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value to the panel
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs as they are being appended to the metadata panel
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

 // Function that builds the bar chart
function createBarChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };


      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace])
  });
};

// Function that builds the bubble chart
function createBubbleChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
      
      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);
      
      // Set up the trace for bubble chart
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
          }
      };

      // Set up the layout
      let layout = {
          title: "Bacteria Per Sample",
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace1], layout)
  });
};

// Function that builds the guage
function createGauge(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

     // Filter based on the value of the sample
    let meta = data.metadata;
    let metavalue = meta.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = metavalue[0];
      console.log( 'meta Data = ', valueData)

      // Get the frequency of values
      let wfreq = valueData.wfreq;
      
      // Log the data to the console
      console.log('wFreq = ', wfreq)

    
    //Plot the weekly washing frequency in a gauge chart.
    // Get the first ID's washing frequency
    var firstWFreq = wfreq;

    // Calculations for gauge needle
    var firstWFreqDeg = firstWFreq * 20;
    var degrees = 180 - firstWFreqDeg;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(degrees * Math.PI / 180);
    var y = radius * Math.sin(degrees * Math.PI / 180);

    // Create path for gauge needle
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    // Create trace for gauge chart (chart and pointer)
    var dataGauge = [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "850000" },
            showlegend: false,
            name: "Freq",
            text: firstWFreq,
            hoverinfo: "text+name"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    'rgba(14, 127, 3, .5)',
                    'rgba(14, 127, 30, .5)',
                    'rgba(14, 127, 65, .5)',
                    'rgba(110, 154, 22, .5)',
                    'rgba(170, 202, 42, .5)',
                    'rgba(202, 209, 95, .5)',
                    'rgba(210, 206, 145, .5)',
                    'rgba(222, 216, 197, .5)',
                    'rgba(240, 230, 215, .5)',
                    'rgba(225,225,225,0)',

                ]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ];

    // Create the layout for the gauge chart
    var layoutGauge = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor: "850000",
                line: {
                    color: "850000"
                }
            }],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        height: 550,
        width: 550,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        }
    };
    var config = { responsive: true }

    // Plot the gauge chart
    Plotly.newPlot('gauge', dataGauge, layoutGauge, config);
  })

};

  
init();