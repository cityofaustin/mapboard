import React from "react";
import { Link } from "react-router-dom";
import Proptypes from 'prop-types';
import "./home.css";

export default function HomeButton(props) {
  HomeButton.propTypes = {
    link: Proptypes.object.isRequired
  };
  return React.createElement(
    Link,
    { className: "col-md home-button", to: props.link.link },
    React.createElement(
      "h3",
      null,
      props.link.name
    )
  );
}
