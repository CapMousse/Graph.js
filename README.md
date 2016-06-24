# Graph.js

![Graph](http://img.shwaark.com/uploads/big/14613584467762.png)

Simple, clean and minimalistic line charts using canvas.

## Installation
Copy `src/graph.min.js` in your project and load it with a script tag :

```html
<script src="graph.min.js"></script>
<script>
    var chart = new Graph(data, canvas,  options)
</script>
```

## Creating a chart
To create a chart, you need to instantiate `Graph` with a canvas and a set of data.

```javascript
new Graph(Array data, HTMLCanvasElement[, Object options]);
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

Here is some examples of customisation:

### Cloud of dots

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

new DotCloudGraph(data, canvas, options);
```

### Filled graph

```javascript
function FilleGraph () {
    Graph.apply(this, arguments);
}

FilleGraph.prototype = Object.create(Graph.prototype);
FilleGraph.prototype.constructor = FilleGraph;

/**
 * Draw a filled graph
 */
CustomGraph.prototype.drawData = function () {
    if (this.options.showLine) {
        Graph.prototype.drawData.call(this);
    }

    var i = this.data.length - 1, coordinates, coordinates2;

    for (; i >= 1; i--) {
        coordinates = this.getPointCoordinates(i);
        coordinates2 = this.getPointCoordinates(i-1);
        
        this.context.fillStyle = "#d3d3d3";
        this.context.beginPath();
        this.context.lineTo(coordinates[0], coordinates[1]);
        this.context.lineTo(coordinates[0], this.middle +  this.options.paddingTop);
        this.context.lineTo(coordinates2[0]-1, this.middle +  this.options.paddingTop);
        this.context.lineTo(coordinates2[0]-1, coordinates2[1]);
        this.context.closePath();
        this.context.fill();
    }
}
```

![Customisation](http://img.shwaark.com/uploads/big/14615687299646.png)

## License
Graph.js is available under the [Mit License](http://opensource.org/licenses/MIT)