export interface ViewDimensions {
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}

export function calculateViewDimensions({
  width, height, margins, showXAxis = false, showYAxis = false, xAxisHeight = 0,
  yAxisWidth = 0, showXLabel = false, showYLabel = false, showLegend = false,
  legendType = 'ordinal', legendPosition = 'right', xAxisPositionReversed = false, columns = 12
}): ViewDimensions {
  let xOffset = margins[3];
  let chartWidth = width;
  let chartHeight = height - margins[0] - margins[2];
  let yOffset = 0;

  if (showLegend && legendPosition === 'right') {
    if (legendType === 'ordinal') {
      columns -= 2;
    } else {
      columns -= 1;
    }
  }

  if (showLegend && legendPosition === 'below') {
    chartHeight -= 25;
  }

  chartWidth = chartWidth * columns / 12;

  chartWidth = chartWidth - margins[1] - margins[3];

  if (showXAxis) {
    chartHeight -= 5;
    chartHeight -= xAxisHeight;
    if (xAxisPositionReversed) {
      yOffset += xAxisHeight;
    }

    if (showXLabel) {
      // text height + spacing between axis label and tick labels
      const offset = 25 + 5;
      chartHeight -= offset;
      if (xAxisPositionReversed) {
        yOffset += offset;
      }
    }
  }

  if (showYAxis) {
    chartWidth -= 5;
    chartWidth -= yAxisWidth;
    xOffset += yAxisWidth;
    xOffset += 10;

    if (showYLabel) {
      // text height + spacing between axis label and tick labels
      const offset = 25 + 5;
      chartWidth -= offset;
      xOffset += offset;
    }
  }

  chartWidth = Math.max(0, chartWidth);
  chartHeight = Math.max(0, chartHeight);

  return {
    yOffset: ~~yOffset,
    width: ~~chartWidth,
    height: ~~chartHeight,
    xOffset: ~~xOffset
  };
}
