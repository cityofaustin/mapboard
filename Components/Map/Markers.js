import React from "react";
import Circle from "./CustomCircleMarker";
import Marker from "./CustomMarker";

/*Creates a list of markers components from a list of marker information*/

/*
* Props-
* color: determines color options for different markers
* fromGroup: determines if the markers are coming from a large group of markers, includes secondary url and id used to pull markers per group
* headers: used to pass on to Markers as format
* id: id is used to select which marker to automatically open up without User Click
* marker: an individual marker
* match: used to determine what marker will be opened
* type: Circle or Default
*/

export default class extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.color) {
      this.state = {
        name: this.props.color.name,
        opts: this.props.color.display_opts
      };
    }
  }

  simulateClick = e => {
    if (e) {
      e.leafletElement.openPopup();
    }
  };

  render() {
    let groupColor = "green";
    if (this.props.marker.length > 0 && this.props.fromGroup) {
      groupColor = this.state.opts[this.props.marker[0][this.state.name]].color;
    }
    return this.props.markers.length > 0 ? (
      <div>
        {this.props.markers.map((marker, i) => {
          if (isNaN(Number(marker.location_latitude))) {
            return "";
          }
          let open =
            this.props.marker[this.props.match] === marker[this.props.match];
          let color = this.props.fromGroup
            ? marker[this.props.fromGroup.id] === this.props.id
              ? groupColor
              : "blue"
            : this.state.opts[marker[this.state.name]].color;
          if (this.props.type === "circle") {
            return (
              <Circle
                color={color}
                format={this.props.headers}
                info={marker}
                ref={open ? this.simulateClick : null}
                open={open}
                key={i}
                center={{
                  lat: Number(marker.location_latitude),
                  lng: Number(marker.location_longitude)
                }}
              />
            );
          } else if (this.props.type === "marker") {
            return (
              <Marker
                format={this.props.headers}
                info={marker}
                ref={open ? this.simulateClick : null}
                open={open}
                key={i}
                position={{
                  lat: Number(marker.location_latitude),
                  lng: Number(marker.location_longitude)
                }}
              />
            );
          } else {
            return (
              <Marker
                format={this.props.headers}
                info={marker}
                ref={open ? this.simulateClick : null}
                open={open}
                key={i}
                position={{
                  lat: Number(marker.location_latitude),
                  lng: Number(marker.location_longitude)
                }}
              />
            );
          }
        })}
      </div>
    ) : (
      ""
    );
  }
}
