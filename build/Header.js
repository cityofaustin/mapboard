import React from "react";
import { Link } from "react-router-dom";
import { rename } from "../../Helpers";
import Proptypes from 'prop-types';
import "./Header.css";
import Quote from "../QuoteOfTheDay/Quote";

export default class Header extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.showMenu = () => {
      this.setState({
        menuVisible: !this.state.menuVisible
      });
    }, this.hideMenu = () => {
      this.setState({
        menuVisible: false
      });
    }, _temp;
  }

  componentWillMount() {
    this.setState({ menuVisible: false });
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: this.props.title ? "headerCom" : `headerCom headerHome` },
        React.createElement(
          "div",
          { className: "header-container" },
          React.createElement(
            "div",
            { className: "text-flex" },
            React.createElement(
              "h2",
              null,
              this.props.title ? rename(this.props.title) : "Austin Transportation Hub"
            ),
            this.props.title && React.createElement(
              Link,
              { onClick: this.hideMenu, to: "/" },
              React.createElement(
                "p",
                null,
                "Transportation Data and Performance Hub"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "menu-flex" },
            this.props.title && React.createElement("i", {
              onClick: this.showMenu,
              className: "fa fa-bars header-menu-button"
            })
          )
        ),
        React.createElement(
          "div",
          { style: { textAlign: "center" } },
          React.createElement(
            "div",
            { style: { paddingBottom: '10px' } },
            React.createElement(
              "ul",
              {
                className: "header-menu",
                style: { display: this.state.menuVisible ? "" : "none" }
              },
              this.props.pages.map((page, index) => {
                return React.createElement(
                  "div",
                  { key: index },
                  React.createElement(
                    Link,
                    { onClick: this.showMenu, to: page.link },
                    page.name
                  )
                );
              })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "row-border" },
        React.createElement(Quote, null)
      )
    );
  }
}

Header.propTypes = {
  pages: Proptypes.array.isRequired,
  title: Proptypes.string.isRequired
};
