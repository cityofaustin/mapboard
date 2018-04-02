import React from "react";
import { format } from "../../Helpers";
/*Custom PopUp for Marker*/

/*
* Props:
* format: The format of the
* info: What information should be displayed in the popup
*/

export default class PopupFrame extends React.Component {
  render() {
    let signal = this.props.info;
    return React.createElement(
      "div",
      null,
      "Signal id | ",
      signal.signal_id,
      React.createElement("br", null),
      this.props.format.map((item, key) => {
        let name = item.alt;
        let data = signal[item.name];
        data = item.opts ? item.opts[data] : data;
        data = item.format ? format(item.format, data) : data;
        return React.createElement(
          "div",
          { key: key },
          name,
          " | ",
          data,
          " ",
          React.createElement("br", null)
        );
      }),
      this.props.children
    );
  }
}
