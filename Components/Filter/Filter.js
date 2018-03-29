import React from "react";
import { createArray, indexOfValue } from "../../Helpers";
import Select from "react-select";
import Proptypes from 'prop-types';
import "react-select/dist/react-select.css";
import "./filter.css";

/*Filter Component to be used in conjunction with Table or Map, unlike other components this one can not
* be used by itself and must have controller functions passed in as props*/

/*Props:
* myKey: key used to determine order of filtering
* pullData: function used to pull filter
* label: What is seen by the user
* name: What corresponds to the section of data that is being filtered
* type: Search or Toggle used to determine which type of filter will be rendered
* opts: What options can the filter be set to(only used for toggle filter)
*/

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.type === "search" ? "" : "All",
      opts: this.props.opts ? createArray(this.props.opts) : "",
      number: 0
    };
  }

  componentWillMount() {
    if (typeof this.state.opts === "object") {
      let tmpArray = this.state.opts;
      tmpArray.unshift({ value: "All", key: null });
      this.setState({
        opts: tmpArray
      });
    }
  }

  /*Keeps track of current state for search filter and sends Data to controller*/
  onSearchChange = e => {
    this.props.pullData(e.target.value, this.props.myKey);
    this.setState({
      value: e.target.value
    });
  };

  /*Handles State Change for Toggle Filter and Sends Data to controller*/
  handleToggle = e => {
    this.setState({ value: e.value });

    let name = this.props.name;
    e.value === null
      ? this.props.pullData({}, this.props.myKey)
      : this.props.pullData({ name, value: e.value }, this.props.myKey);
  };

  render() {
    const selectedOption = this.state;
    const value = selectedOption && selectedOption.value;
    return this.props.type === "toggle" ? (
      <div className="toggle">
        <label>{this.props.label}</label>
        <br />
        <Select
          name="form-field-name"
          value={value}
          onChange={this.handleToggle}
          options={this.state.opts.map(opt => {
            return { value: opt.key, label: opt.value, clearableValue: false };
          })}
        />
      </div>
    ) : (
      <div className="SearchBar">
        <label>{this.props.label}</label>
        <input
          style={{ width: "100%" }}
          type="text"
          value={this.state.value}
          onChange={this.onSearchChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
    myKey: Proptypes.number.isRequired,
    pullData: Proptypes.func.isRequired,
    label: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    type: Proptypes.oneOf(['toggle','search']),
    opts: Proptypes.oneOfType([
        Proptypes.string,
        Proptypes.object
    ]),

};
