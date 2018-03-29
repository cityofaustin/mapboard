import React from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import { getData, getMarkersFromGroup } from "../../Helpers";
import logo from "../Card/logo.svg";
import "./Map.css";
/*Map Component, uses leaflet for base component, but adds functionality
* Can be used separately from Filter and Table.
*/

/*
*Props:
* bounds: Used for fromGroup markers to allow a selection of markers
*/
export default class Transport_Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      markers: [],
      marker: [],
      loading: true,
      latlng: this.props.center
    };
  }

  componentWillMount() {
    if (this.props.url) {
      getData(this.props.url)
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers !== this.props.markers) {
      this.setState({
        markers: nextProps.markers
      });
    }
  }

  render() {      return !this.state.loading ? (
      <div className="flex-map" style={{ textAlign: "center" }}>
        <Map
          bounds={this.props.bounds}
          animate={this.state.animate}
          center={this.props.center}
          zoom={12}
        >
          <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" />
          <Markers
            id={this.props.id}
            fromGroup={this.props.fromGroup}
            marker={this.props.marker}
            type={this.props.marker_type}
            color={this.props.color}
            match={this.props.match}
            markers={this.props.markers}
            headers={this.props.headers}
          />
        </Map>
      </div>
    ) : (
      <div className="card no-border">
        <img className="spinner" src={logo} alt="logo" />
      </div>
    );
  }
}
