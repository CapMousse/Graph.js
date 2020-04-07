# Graph.js

![Graph]( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACJCAYAAACW2wWcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABTJSURBVHhe7d35lxNF28bx4L4+LiiioKAioCIqoP//jx4PRxSQRVBwV8R9X5+XTz9TmjcmmaTTnXTS1/ecPjOTmclMd1dddd133VW94783GIQQwhpw09bHEELoPBGsEMLaEMEKIawNEawQwtoQwQohrA0RrDGYOD179uzgt99+23olhNAFIlhj+Ouvvyqx+vLLL7deCSF0gQjWGAjWH3/8EcEKoWNEsMZAsP7888/B999/XwlXCKEbRLDGIBzcsWNH9flXX31VfQwhrJ4I1hh++eWXwa233jq49957ExaG0CEiWGP49ddfK8HatWtXwsIQOkQEawwE65Zbbhk88MADf+eyQgirJ4I1BoJ15513JiwMoWNEsMZAsO64447q8507dw6+++67auYwhLBaIlhjKA4L99xzT5XDEhqGEFZLBGuE33//vVqac9ttt1Vfc1rEyushhNUSwRqBu7r55purAzfddFMlXj/88EP1dQhhdUSwRiBYRMosIXx+++23D3788cfq6xDC6ohgjaBolEgVh6XiXVj4008/VV+HEFZHBGsEgsVRDXP33XdXzivP6whhtUSwRvj555//Lmko3HXXXdX6wghWCKslgjXCOIdVviZmIYTVEcEaQvmCmqtRwZKAl9PKTGEIqyWCNUSpwRonWI7MFIawWiJYQ5Ti0FI0OoyK94SEIayWCNYQZgIx6rBgpjClDSGslgjWENevX692Zyi7jQ5jplB+K0t0QlgdEawtCJFdGR5++OGtV/4/pdQhYWEIqyOCtYUZQFvI2E5mHPJanNeVK1cGn3/+eZ5ZGMIKiGBt8cUXX1ThYFlDOIrlOs8880wVGn744YeD06dPp5A0hCUTwbqB+qtvv/12YjhY4L6I1rPPPluFkNk6OYTlEsG6AeERDt5///1br0yHy7J9ch4BFsJyiWDdwJ7tyhaI0CzIZT300EODb775ZuuVEMIyiGDdgFPyhJxx5QyTEB5ad5hZwxCWR+8FS7Go+ioJ93lQ+S4RrxQihLAcei9YHBLhKQ+dmBVujCvLI8BCWB69Fyz1V3JXs+avhnnwwQerBdF5MnQIy6H3giWk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)

Simple, clean and minimalistic line charts using canvas.

## Installation
Copy `src/graph.min.js` in your project and load it with a script tag :

```html
<script src="graph.min.js"></script>
<script>
    var chart = new Graph({ data, target, ...options })
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
    drawData() {
        return new Promise((resolve) => {
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
        })

    }
}

/**
 * Draw a cloud of dots graph
 */
new DotCloudGraph({ ...options });
```

## License
Graph.js is available under the [Mit License](http://opensource.org/licenses/MIT)