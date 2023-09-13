# belly-button-challenge

## BackGround:
In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

**The dashboard view: <a href="/index.html" target="_blank">Belly Button Diversity Dashboard</a>**

## Plotly
The steps to complete the tasks were as follows: 

* Using the D3 library to read in `samples.json` 

* Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    1. Use **sample_values** as the values for the bar chart.
    2. Use **otu_ids** as the labels for the bar chart.
    3. Use **otu_labels** as the hovertext for the chart.

 ![Bar Chart](/images/barchart.png)

* Create a bubble chart that displays each sample.
    1. Use **otu_ids** for the x values.
    2. Use **sample_values** for the y values.
    3. Use **sample_values** for the marker size.
    4. Use **otu_ids** for the marker colors.
    5. Use **otu_labels** for the text values.

![Bubble Chart](/images/bubbleChart.png)

* Display the sample metadata, i.e., an individual's demographic information.
* Display each key-value pair from the metadata JSON object somewhere on the page.

![Bar Chart](/images/demographic.png)

* Update all the plots when a new sample is selected, the dashboard is shown as follows:

![Dashboard](/images/finalLook.png)

### Advanced Challenge Assignment
* Use Gauge chart to plot the weekly washing frequency of the individual.
* Modify the example gauge code to account for values ranging from 0 through 9.
* Update the chart whenever a new sample is selected.

![Guage Chart](/images/guage.png)


### Refrences: 
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.