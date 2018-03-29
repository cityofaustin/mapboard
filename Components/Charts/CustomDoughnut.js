import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import Chart from '../../../node_modules/chart.js/src/chart';
import './Charts.css';

Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.showText) {
      //Get ctx from string
      let ctx = chart.chart.ctx;

      //Get options from the center object in options
      let centerConfig = chart.config.options.elements.center || {};
      let fontStyle = centerConfig.fontStyle || 'Arial';
      let sum = chart.config.data.datasets[0].data.reduce((i,j) => i+j);
      let txt = Math.floor(((chart.config.data.datasets[0].data[0]) / sum) * 100) + '%';
      let txtTwo = `${chart.config.data.datasets[0].data[0]} of ${sum}`;
      let color = centerConfig.color || chart.config.data.datasets[0].backgroundColor[0];
      let sidePadding = centerConfig.sidePadding || 20;
      let sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      let stringWidth = ctx.measureText(txt).width;
      let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      let widthRatio = elementWidth / stringWidth;
      let newFontSize = Math.floor(30 * widthRatio);
      let elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) - 10;
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
      ctx.font = (fontSizeToUse/2.5)+"px " + fontStyle;
      ctx.fillStyle = 'black';
      ctx.fillText(txtTwo, centerX, centerY + (centerY / 3));
    }
  }
});


export default class DonutWithText extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const data = {
      datasets: [{
        data: [200, 50],
        backgroundColor: [
          '#217d1e',
          '#BFBFBF'
        ],
      }],
      options: {
        hover: {mode: false},
        legend: {display: false},
        tooltips: {enabled: false},
        showText: true,
        maintainAspectRatio: false,
      }
    };
    return (
      <div>
        <h4 style={{textAlign: 'center'}}>{this.props.title}</h4>
        <div className="doughnut">
          <Doughnut options={data.options} data={data} />
        </div>
      </div>
    );
  }
};


