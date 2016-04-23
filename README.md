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

## License
Graph.js is available under the [Mit License](http://opensource.org/licenses/MIT)