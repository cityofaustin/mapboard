import React from "react";
import HomeButton from "./HomeButton";
import Proptypes from 'prop-types';
export default function Home(props) {

  Home.propTypes = {
    links: Proptypes.array.isRequired
  };

  return React.createElement(
    "div",
    { className: "container-fluid" },
    React.createElement(
      "div",
      { className: "row home-row" },
      props.links.map((link, index) => {
        return React.createElement(HomeButton, { key: index, link: link });
      })
    )
  );
}
