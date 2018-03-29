import React from "react";
import { Link } from "react-router-dom";
import { rename } from "../../Helpers";
import Proptypes from 'prop-types';
import "./Header.css";
import Quote from "../QuoteOfTheDay/Quote";

export default class Header extends React.Component {
  componentWillMount() {
    this.setState({ menuVisible: false });
  }

  showMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  };

  hideMenu = () => {
    this.setState({
        menuVisible: false
    })
  };

  render() {
    return (
      <div>
        <div className={this.props.title ? "headerCom" : `headerCom headerHome`}>
          <div className="header-container">
            <div className="text-flex">
              <h2>
                {this.props.title
                  ? rename(this.props.title)
                  : "Austin Transportation Hub"}
              </h2>
              {this.props.title && (
                <Link onClick={this.hideMenu} to="/">
                  <p>Transportation Data and Performance Hub</p>
                </Link>
              )}
            </div>
            <div className="menu-flex">
              {this.props.title && (
                <i
                  onClick={this.showMenu}
                  className="fa fa-bars header-menu-button"
                />
              )}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{paddingBottom: '10px'}}>
              <ul
                className="header-menu"
                style={{ display: this.state.menuVisible ? "" : "none" }}
              >
                {this.props.pages.map((page, index) => {
                  return (
                    <div key={index}>
                      <Link onClick={this.showMenu} to={page.link}>
                        {page.name}
                      </Link>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row-border">
          <Quote />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  pages: Proptypes.array.isRequired,
  title: Proptypes.string.isRequired,
};
