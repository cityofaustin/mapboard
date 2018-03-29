import React from "react";
import HomeButton from "./HomeButton";
import Proptypes from 'prop-types'
export default function Home(props) {

  Home.propTypes = {
      links: Proptypes.array.isRequired,
  };

  return (
    <div className="container-fluid">
      <div className="row home-row">
        {props.links.map((link, index) => {
          return <HomeButton key={index} link={link}/>;
        })}
      </div>
    </div>
  );
}
