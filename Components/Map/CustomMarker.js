import React from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import PopupFrame from "./PopupFrame";
import Proptypes from 'prop-types'

/*
* CustomMarker, this is solely used to bind a Custom PopUp to Marker.
* Not used to create custom markers
*/

/*
* Props:
* format: The format of the
* info: What information should be displayed in the popup
*/

export default class CustomMarker extends Marker {
  render() {
    console.log(this.props);
    this.leafletElement.bindPopup(
      ReactDOMServer.renderToStaticMarkup(
        <PopupFrame format={this.props.format} info={this.props.info} />
      )
    );
    return super.render();
  }
}

CustomMarker.propTypes = {
    format: Proptypes.array.isRequired,
    info: Proptypes.object.isRequired,
    open: Proptypes.bool.isRequired
};
