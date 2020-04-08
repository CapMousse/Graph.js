class Graph {
    constructor(options) {
        this.options = {
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            showCircle: false,
            circle: "#55AA77",
            circleSize: 4,
            background: "#FFFFFF",
            showZeroLine: false,
            centerZero: false,
            zeroLineColor: "#EEE",
            lineColor: "#C5C5C5",
            lineWidth: 3,
            showBounds: false,
            bounds: "#8888EE",
            boundsHeight: 14,
            boundsFont: "Arial",
            showLegend: false,
            legend: false,
            legendColor: "#8888EE",
            legendHeight: 14,
            legendFont: "Arial",
        };

        if (options) {
            this.options = { ...this.options, ...options};
        }

        if (typeof this.options.data !== 'object' && !Array.isArray(this.options.data)) {
            throw new Error('Data is not an array');
        }

        if (!this.options.target || !this.options.target.nodeName || this.options.target.nodeName !== "CANVAS") {
            throw new Error('Canvas not defined');
        }

        this.options.context = this.options.target.getContext('2d');

        this.init();
        this.draw();
    }

    /**
     * Compute coordinates for asked data index
     * @param  {index} index
     * @return {array}
     */
    getPointCoordinates(index) {
        const x = this.options.paddingLeft + (index * this.horizontalScale);
        const y = (this.middle + this.options.paddingTop) - (this.verticalScale * this.options.data[index]);
        
        return [x, y];
    }

    /**
     * Init graph
     */
    init() {
        this.options.target.height = this.options.target.parentElement.offsetHeight;
        this.options.target.width = this.options.target.parentElement.offsetWidth;
        
        if (this.options.showLegend) {
            this.options.paddingLeft = this.options.paddingLeft || this.options.legendHeight * 2;
            this.options.paddingRight = this.options.paddingRight || this.options.legendHeight * 2;
            this.options.paddingBottom = this.options.paddingBottom || this.options.legendHeight * 2.5;
        }

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
    async draw() {
        await this.drawBackground();
        await this.computeScale();
        await this.drawMiddle();
        await this.drawScale();
        await this.drawData();
        await this.drawCircle();
        await this.drawBounds();
        await this.drawLegend();
    }

    /**
     * Draw canvas brackground
     */
    async drawBackground() {
        this.options.context.fillStyle = this.options.background;
        this.options.context.fillRect(0, 0, this.options.target.width, this.options.target.height);
    }

    /**
     * Compute scale for given canvas size
     */
    async computeScale() {
        this.maxValue = Math.abs(Math.max(...this.options.data));
        this.minValue = Math.abs(Math.min(...this.options.data));

        if (this.minValue != this.maxValue && this.options.showZeroLine) {
            if(this.maxValue > this.minValue) {
                this.minValue = 0;
            } else {
                this.maxValue = 0;
            }
        }

        this.max = Math.max(this.maxValue, this.minValue);
        this.height = this.options.target.height - (this.options.paddingTop + this.options.paddingBottom);
        this.width = this.options.target.width - (this.options.paddingLeft + this.options.paddingRight);
        this.horizontalScale = this.width / (this.options.data.length - 1);
        
        if (this.options.centerZero || this.maxValue == this.minValue) {
            this.middle = Math.round(this.height / 2);
            this.verticalScale = this.middle / this.max;
        } else {
            this.verticalScale = this.height / (this.maxValue - this.minValue);
            this.middle = Math.round(this.maxValue * this.verticalScale);
        }
    }

    /**
     * Draw middle line of a graph
     */
    async drawMiddle() {
        if (!this.options.showZeroLine) {
            return;
        }

        this.options.context.moveTo(this.options.paddingLeft, this.middle + this.options.paddingTop);
        this.options.context.lineTo(this.options.target.width - this.options.paddingRight, this.middle + this.options.paddingTop);
        this.options.context.strokeStyle = this.options.zeroLineColor;
        this.options.context.stroke();
    }

    /**
     * Draw scale line
     * @return {Promise}
     */
    async drawScale() {
        if (!this.options.showBounds) {
            return;
        }

        this.options.context.moveTo(this.options.paddingLeft, this.options.paddingTop);
        this.options.context.lineTo(this.options.paddingLeft, this.options.target.height - this.options.paddingBottom);
        this.options.context.strokeStyle = this.options.zeroLineColor;
        this.options.context.stroke();
    }

    /**
     * Draw data line
     * @return {Promise}
     */
    async drawData() {
        const dataLength = this.options.data.length - 1;

        this.options.context.strokeStyle = this.options.lineColor;
        this.options.context.lineWidth = this.options.lineWidth;
        this.options.context.moveTo.apply(this.options.context, this.getPointCoordinates(0));
        this.options.context.beginPath();

        for (let i = 0; i <= dataLength; i++) {
                this.options.context.lineTo.apply(this.options.context, this.getPointCoordinates(i));
        }
        
        this.options.context.stroke();
    }

    /**
     * Draw circle to the end of the graph
     * @return {Promise}
     */
    async drawCircle() {
        if (!this.options.showCircle) {
            return;
        }

        const lastPoint = this.getPointCoordinates(this.options.data.length - 1);
        this.options.context.fillStyle = this.options.circle;
        this.options.context.beginPath();
        this.options.context.arc(lastPoint[0], lastPoint[1], this.options.circleSize, 0, 2 * Math.PI);
        this.options.context.closePath();
        this.options.context.fill();
    }

    /**
     * Draw scale bounds text
     * @return {Promise}
     */
    async drawBounds() {
        if (!this.options.showBounds) {
            return;
        }

        const topBound = this.options.centerZero ? this.max : this.maxValue;
        const bottomBound = this.options.centerZero ? -this.max : this.minValue;

        this.options.context.font = this.options.boundsHeight + "px " + this.options.boundsFont;
        this.options.context.fillStyle = this.options.bounds;
        this.options.context.textBaseline = 'middle';
        this.options.context.textAlign = 'center';
        this.options.context.fillText(topBound, this.options.paddingLeft - (this.options.showLegend ? this.options.paddingLeft / 2 : 0), this.options.paddingTop - (this.options.showLegend ? 0 : this.options.boundsHeight));
        this.options.context.fillText(bottomBound, this.options.paddingLeft - (this.options.showLegend ? this.options.paddingLeft / 2 : 0), this.options.target.height - this.options.paddingBottom + (this.options.showLegend ? 0 : this.options.boundsHeight));
    }

    /**
     * Draw graph legend
     */
    async drawLegend() {
        const dataLength = this.options.data.length -1;

        if (!this.options.showLegend || !this.options.legend) {
            return;
        }

        this.options.context.font = this.options.legendHeight + "px " + this.options.legendFont;
        this.options.context.fillStyle = this.options.legendColor;
        this.options.context.textBaseline = 'middle';
        this.options.context.textAlign = 'center';

        for (let i = 0; i <= dataLength; i++) {
            this.options.context.fillText(this.options.legend[i], this.getPointCoordinates(i)[0], this.options.target.height - this.options.paddingBottom / 2);
        }
    }
}