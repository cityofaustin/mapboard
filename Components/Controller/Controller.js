import  React from 'react';
import  Map from '../Map/Map';
import Table from '../Table/Table'
import Filter from '../Filter/Filter'
import {rename, filterData, getData, getMarkersFromGroup, markersFromGroup} from '../../Helpers'
import _ from 'lodash';
import './controller.css';
import logo from '../Card/logo.svg';
import Doughnut from '../Charts/CustomDoughnut';
import Proptypes from 'prop-types';

/*Props: Typically a single config file in the form of a JSON object*/

/*This is a component that acts as a default controller for the common Map, Table, Filter Combo, this is
* by no means a standard or the only way to do things, this is simply my implementation that is free to be reused
* you are welcome to combine components your own way.*/


export default class Controller extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            position: this.props.config.center,
            markers: [],
            marker: '',
            filters:[],
            originalData: [],
            originalMarkers: [],
            data: [],
            group: [],
            loading: true,
            opts: this.props.config.headers.map(item => {
                return item.opts ? {name: item.name, opts: item.opts} : null
            })
        };

        if(this.props.config.url){
            getData(this.props.config.url)
                .then(function(res) {
                    return res;
                })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    if (this.props.config.fromGroup) {
                        getMarkersFromGroup(
                            data,
                            this.props.config.fromGroup.url,
                            this.props.config.fromGroup.id,
                            this
                        );
                    }

                    this.setState({
                        data: data,
                        originalData: data,
                        loading: !!this.props.config.fromGroup
                    });
                });
        }
    }


    /*Function passed to table to pull a new center and the marker information from the table*/
    getPosition = position => {
        console.log(position);
        if(!this.props.config.fromGroup){
            let newPosition = [];
            newPosition.push(Number(position.location_latitude));
            newPosition.push(Number(position.location_longitude));
            this.setState({
                position: newPosition,
                marker: position
            })
        }
        else{
            let id = this.props.config.fromGroup.id;
            let url = this.props.config.fromGroup.url;
            getMarkersFromGroup([position], url, id, this);
        }
    };

    /*Function used to pull filter information from filter components*/
    pullData = (data, key) => {
        console.log(data);
        let tmpFilters = this.state.filters;
        tmpFilters[key] = data;
        data = filterData(this.state.originalData, tmpFilters, this.props.config.string_filter);
        if(this.props.config.uniqBy){
            data = _.uniqBy(data, this.props.config.uniqBy)
        }
        this.setState({
            loading: true
        });
        let markers = [];
        if(this.props.config.fromGroup){
            markers = markersFromGroup(this.state.originalMarkers, data, this.props.config.fromGroup.id);
        }
        this.setState({
            filters: tmpFilters,
            data: data,
            markers: markers,
            loading: false,
        })
    };


    render(){
        return (
            this.state.loading ?
                <div className="card no-border">
                    <img className="spinner-center" src={logo} alt="logo"/>
                </div>
                :

                <div>
                  <div className="chart-container">
                    {this.props.config.charts && this.props.config.charts.map((chart, key) => {
                      switch(chart.type){
                        case 'doughnut' : {
                          return <Doughnut key={key} title={chart.title} data={this.state.data} />
                        }
                      }
                    })
                    }
                  </div>
                  <div className="filter-container">
                        {this.props.config.headers.map((header, key) => {
                            if(header.filter){
                                return <div className="filter" style={{width: "12.5%"}} key={key}><Filter myKey={key} pullData={this.pullData} name={header.name} type={header.filter} opts={header.opts ? header.opts : ''} display={header.opts ? header.display_opts : ''}label={rename(header.alt)} key={key}/></div>
                            }else {
                                return ''
                            }
                        })}
                  </div>
                  <div className="controller-container">
                    <Table className="flex-table" fromGroup={this.props.config.fromGroup ? this.props.config.fromGroup : null} data={this.state.data}  filter={this.state.filters} getPosition={this.getPosition} headers={this.props.config.headers}/>
                    <Map className="flex-map" id={this.state.id ? this.state.id : -1} bounds={this.state.bounds} fromGroup={this.props.config.fromGroup ? this.props.config.fromGroup : null} marker_type={this.props.config.marker_type} color={this.props.config.headers[this.props.config.color]} match={this.props.config.id_match} headers={this.props.config.headers} marker={this.props.config.fromGroup ? this.state.group: this.state.marker}  markers={this.props.config.fromGroup ? this.state.markers: this.state.data} center={this.state.position}/>
                  </div>
                </div>

        );
    }
}


Controller.propTypes = {
    config: Proptypes.object.isRequired
};
