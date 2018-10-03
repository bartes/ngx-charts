export interface ViewDimensions {
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
}
export declare function calculateViewDimensions({width, height, margins, showXAxis, showYAxis, xAxisHeight, yAxisWidth, showXLabel, showYLabel, showLegend, legendType, legendPosition, xAxisPositionReversed, columns}: {
    width: any;
    height: any;
    margins: any;
    showXAxis?: boolean;
    showYAxis?: boolean;
    xAxisHeight?: number;
    yAxisWidth?: number;
    showXLabel?: boolean;
    showYLabel?: boolean;
    showLegend?: boolean;
    legendType?: string;
    legendPosition?: string;
    xAxisPositionReversed?: boolean;
    columns?: number;
}): ViewDimensions;
