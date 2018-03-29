import React from "react";
import { Link } from "react-router-dom";
import Proptypes from 'prop-types';
import "./home.css";

export default function HomeButton(props) {
  HomeButton.propTypes = {
      link: Proptypes.object.isRequired
  };
  return (
    <Link className="col-md home-button" to={props.link.link}>
      <h3>{props.link.name}</h3>
    </Link>
  );
}
