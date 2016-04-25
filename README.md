# Graph.js

![Graph](http://img.shwaark.com/uploads/big/14613584467762.png)

Simple, clean and minimalistic line charts using canvas.

## Installation
Copy `src/graph.min.js` in your project and load it with a script tag :

```html
<script src="graph.min.js"></script>
<script>
    var chart = new Graph(canvas, datas, options)
</script>
```

## Creating a chart
To create a chart, you need to instantiate `Graph` with a canvas and a set of data.

```javascript
new Graph(HTMLCanvasElement, Array datas[, Object options]);
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
    background:     "#FFFFFF",

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
    boundsFont:     "Arial"
}
```

## Customisation

Graph.js can be easily extended to do anything you want. You just need to use standard object inheritance to make it work.

Here is an example to make a dot cloud graph:

```javascript
function DotCloudGraph () {
    Graph.apply(this, arguments);
}

DotCloudGraph.prototype = Object.create(Graph.prototype);
DotCloudGraph.prototype.constructor = DotCloudGraph;

/**
 * Draw a cloud of dots graph
 */
DotCloudGraph.prototype.drawData = function () {
    if (this.options.showLine) {
        // Display line graph if showLine is true
        Graph.prototype.drawData.call(this);
    }

    // Draw a circle at each data
    var i = this.data.length - 1, coordinates;

    for (; i >= 0; i--) {
        coordinates = this.getPointCoordinates(i);
        
        this.context.fillStyle = "#D05656";
        this.context.beginPath();
        this.context.arc(coordinates[0], coordinates[1], 3, 0, 2*Math.PI);
        this.context.closePath();
        this.context.fill();
    }
}

new DotCloudGraph(cavas, data, options);
```

![Customisation](http://img.shwaark.com/uploads/big/14615687299646.png)

## License
Graph.js is available under the [Mit License](http://opensource.org/licenses/MIT)