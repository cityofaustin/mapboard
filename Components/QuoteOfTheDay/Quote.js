import React from "react";
import "./quote.css";

export default class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: ""
    };
  }
  componentWillMount() {
    let headers = new Headers();
    let myInit = {
      method: "GET",
      headers: headers,
      mode: "cors",
      cache: "default"
    };
    let url = "https://data.austintexas.gov/resource/dykj-9er2.json";
    fetch(url, myInit)
      .then(response => {
        return response.json();
      })
      .then(data => {
        data = data[data.length - 1];
        let author = data.attribution;
        let quote = data.quote;
        this.setState({
          quote: quote,
          author: author
        });
      });
  }
  render() {
    return (
      <p className="quote">
        {this.state.quote} - {this.state.author}
      </p>
    );
  }
}
