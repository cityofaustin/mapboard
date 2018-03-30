import React from 'react';
import './card.css';
import logo from './logo.svg';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            count: this.props.config.init_val,
            year: this.props.year
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        let headers = new Headers();
        let myInit = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };

        let url = 'https://data.austintexas.gov/resource/' + this.props.config.resource_id + '.json';
        if (this.props.config.query) {
            url += `?$query=${this.props.config.query}`;
            url = url.replace(/%fiscal_year%/, this.props.year);
        }
        fetch(url, myInit).then(function (res) {
            return res;
        }).then(resp => resp.json()).then(data => {
            data = data[0];
            let count = data.count ? data.count : 0;
            this.setState({
                count: count,
                loaded: true
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.year !== this.state.year) {
            if (this.props.config.year) {
                this.setState({
                    year: nextProps.year,
                    loaded: false
                });
                setTimeout(() => {
                    this.getData();
                }, 500);
            }
        }
    }

    render() {
        return this.state.loaded ? React.createElement(
            'div',
            { className: 'card' },
            React.createElement(
                'div',
                { className: 'center' },
                React.createElement(
                    'i',
                    { className: "fas fa-" + this.props.config.icon },
                    ' '
                ),
                React.createElement(
                    'h3',
                    null,
                    this.props.config.display_name
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    this.state.count
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { target: '_blank', href: `https://data.austintexas.gov/dataset/${this.props.config.resource_id}` },
                    React.createElement(
                        'p',
                        null,
                        'view data'
                    )
                )
            )
        ) : React.createElement(
            'div',
            { className: 'card no-border' },
            React.createElement('img', { className: 'spinner', src: logo, alt: 'logo' })
        );
    }
}
