(function(){
    function Graph (data, canvas, options) {
        this.options = {
            paddingBottom:  0,
            paddingLeft:    0,
            paddingRight:   0,
            paddingTop:     0,
            showCircle:     false,
            circle:         "#55AA77",
            circleSize:     4,
            background:     "#FFFFFF",
            showZeroLine:   false,
            centerZero:     false,
            zeroLineColor:  "#EEE",
            lineColor:      "#C5C5C5",
            lineWidth:      3,
            showBounds:     false,
            bounds:         "#8888EE",
            boundsHeight:   14,
            boundsFont:     "Arial"
        };

        if (!Array.isArray(data)) throw new Error('Data is not an array');
        if (!canvas || !canvas.nodeName || canvas.nodeName !== "CANVAS") throw new Error('Canvas not defined');

        this.data = data;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        if (options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) this.options[key] = options[key];
            }
        }

        this.init();
        this.draw();
    }

    /**
     * Init graph
     */
    Graph.prototype.init = function () {
        if (this.options.showBounds) {
            this.options.paddingLeft = this.options.paddingLeft || this.options.boundsHeight / 1.4;
            this.options.paddingTop = this.options.paddingTop || this.options.boundsHeight * 1.4;
            this.options.paddingBottom = this.options.paddingBottom || this.options.boundsHeight * 1.4;
        }

        if (this.options.showCircle) {
            this.options.paddingRight = this.options.paddingRight || this.options.circleSize;
            this.options.paddingTop = this.options.paddingTop || this.options.circleSize;
            this.options.paddingBottom = this.options.paddingBottom || this.options.circleSize;
        }

        
        this.options.paddingTop = this.options.paddingTop || this.options.lineWidth;
        this.options.paddingBottom = this.options.paddingBottom || this.options.lineWidth;
    }

    /**
     * Draw the graph
     */
    Graph.prototype.draw = function() {
        this.drawBackground();
        this.computeScale();
        this.drawMiddle();
        this.drawScale();
        this.drawData();
        this.drawCircle();
        this.drawBounds();
    };

    /**
     * Draw canvas brackground
     */
    Graph.prototype.drawBackground = function() {
        this.context.fillStyle = this.options.background;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    /**
     * Compute scale for given canvas size
     */
    Graph.prototype.computeScale = function() {
        var height      = this.canvas.height,
            width       = this.canvas.width;

        this.maxPositive = Math.abs(Math.max.apply(null, this.data));
        this.maxNegative = Math.abs(Math.min.apply(null, this.data));
        this.max = Math.max(this.maxPositive, this.maxNegative);

        height  -= this.options.paddingTop + this.options.paddingBottom;
        width   -= this.options.paddingLeft + this.options.paddingRight;

        this.horizontalScale = width / (this.data.length-1);

        if (this.options.centerZero) {
            this.middle = Math.round(height / 2);
            this.verticalScale = this.middle / this.max;
        } else {
            this.verticalScale = height / (this.maxPositive + this.maxNegative);
            this.middle = Math.round(this.maxPositive * this.verticalScale);
        }
    };

    /**
     * Draw middle line of a graph
     */
    Graph.prototype.drawMiddle = function() {
        if (!this.options.showZeroLine) return;

        this.context.moveTo(this.options.paddingLeft, this.middle +  this.options.paddingTop);
        this.context.lineTo(this.canvas.width - this.options.paddingRight, this.middle + this.options.paddingTop);
        this.context.strokeStyle = this.options.zeroLineColor;
        this.context.stroke();
    };

    /**
     * Draw scale line
     */
    Graph.prototype.drawScale = function () {
        if (!this.options.showBounds) return;

        this.context.moveTo(this.options.paddingLeft, this.options.paddingTop);
        this.context.lineTo(this.options.paddingLeft, this.canvas.height - this.options.paddingBottom);
        this.context.strokeStyle = this.options.zeroLineColor;
        this.context.stroke();
    };

    /**
     * Draw data line     
     */
    Graph.prototype.drawData = function() {
        var i = this.data.length - 2;

        this.context.strokeStyle = this.options.lineColor;
        this.context.lineWidth = this.options.lineWidth;

        this.context.beginPath();
        this.context.moveTo.apply(this.context, this.getPointCoordinates(this.data.length - 1));

        for (; i >= 0; i--) {
            this.context.lineTo.apply(this.context, this.getPointCoordinates(i));
        }

        this.context.stroke();
    };

    /**
     * Compute coordinates for asked data index
     * @param  {index} index
     * @return {array}
     */
    Graph.prototype.getPointCoordinates = function(index) {
        return [
            this.options.paddingLeft + (index * this.horizontalScale),
            (this.middle + this.options.paddingTop) - (this.verticalScale * this.data[index])
        ]
    };

    /**
     * Draw circle to the end of the graph
     */
    Graph.prototype.drawCircle = function() {
        if (!this.options.showCircle) return;

        var lastPoint = this.getPointCoordinates(this.data.length - 1);

        this.context.fillStyle = this.options.circle;
        this.context.beginPath();
        this.context.arc(lastPoint[0], lastPoint[1], this.options.circleSize, 0, 2*Math.PI);
        this.context.closePath();
        this.context.fill();
    };

    /**
     * Draw scale bounds text
     */
    Graph.prototype.drawBounds = function() {
        if (!this.options.showBounds) return;
        

        var topBound    = this.options.centerZero ? this.max : this.maxPositive,
            bottomBound = this.options.centerZero ? this.max : this.maxNegative;

        this.context.font = this.options.boundsHeight + "px " + this.options.boundsFont;
        this.context.fillStyle = this.options.bounds;
        this.context.textBaseline = 'middle'; 
        this.context.textAlign = 'center'; 
        this.context.fillText(topBound, this.options.paddingLeft, this.options.paddingTop - this.options.boundsHeight);
        this.context.fillText((bottomBound ? "-" : "") + bottomBound, this.options.paddingLeft, this.canvas.height - this.options.paddingBottom + this.options.boundsHeight);
    };

    this.Graph = Graph;
})(this);