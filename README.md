# Graph.js

Simple, clean, minimalistic and customisable charts using canvas.

## Installation
Copy `src/graph.min.js` in your project and load it with a script tag :

```html
<script src="graph.min.js"></script>
<script>
    var chart = new Graph({ data: [1, 20, 5, 6, 8], target: document.querySelector('canvas') })
</script>
```

## Creating a chart
To create a chart, you need to instantiate `Graph` with a canvas and a set of data.

```javascript
new Graph({ data: Array, target: HTMLCanvasElement[, legend: Array, ...options]});
```

Bam, you're done !

## Configuring a chart
You can easily change some property of the chart with the config object :

```javascript
{
    // Internal padding for the canvas
    paddingBottom:  0, 
    paddingLeft:    0,
    paddingRight:   0,
    paddingTop:     0,

    // Canvas background
    background:     "#FFFFFFFF",

    // Show circle on the last data
    showCircle:     true,
    circle:         "#55AA77",
    circleSize:     4,

    // Show the line at zero
    centerZero:     false,
    showZeroLine:   true,
    zeroLineColor:  "#EEE",

    // Color and whidth of the line chart
    lineColor:      "#8888EE",
    lineWidth:      3,

    // Show the bounds
    showBounds:     true,
    bounds:         "#8888EE",
    boundsHeight:   14,
    boundsFont:     "Arial",

    // Show the legend
    showLegend:     false,
    legend:         "#8888EE",
    legendHeight:   14,
    legendFont:     "Arial",
}
```

## Customisation

Graph.js can be easily extended to do anything you want. You just need to use standard object inheritance to make it work.

Here is some examples of customisation:

### Cloud of dots

```javascript

class DotCloudGraph extends Graph {
    async drawData() {
        if (this.options.showLine) {
            // Display line graph if showLine is true
            super.drawData();
        }

        // Draw a circle at each data
        for (i = 0; i < this.options.data.length; i++) {
            let coordinates = this.getPointCoordinates(i);
            
            this.options.context.fillStyle = "#D05656";
            this.options.context.beginPath();
            this.options.context.arc(coordinates[0], coordinates[1], 3, 0, 2*Math.PI);
            this.options.context.closePath();
            this.options.context.fill();
        }
    }
}

/**
 * Draw a cloud of dots graph
 */
new DotCloudGraph({ ...options });
```

## License
Graph.js is available under the [Mit License](http://opensource.org/licenses/MIT)