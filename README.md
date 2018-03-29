# MapBoard

## Table of Contents
* [About](#about)
* [Getting Started](#getting-started)
* [Components](#components)
 

## About
MapBoard is a project for the Austin Transportation Department. This project takes previously created pages and makes
them into re-usable components.

## Getting Started

## Components
* [Controller](#controller)
* [Table](#table)
* [Filter](#filter)
* [Charts](#charts)
* [Map](#map)
* [Markers](#markers)
* [Custom Marker](#custom-marker)
* [Custom Circle Marker](#custom-circle-marker)
* [Popup Frame](#popup-frame)
* [Card](#card)

### Controller
Controller is a default configuration that contains a table, filters charts
a map, and takes a single configuration file. Best example is in the getting started section.
### Table
Table is a component that pulls data and displays it in a table format, uses React-Tables
##### Props
data: Array  
filter: Array  
fromGroup: Object  
getPosition: Func  
headers: Array of Objects

### Filter
Filters are components that take user input and push that data to parent component. 
##### Props
myKey: Number  
pullData: Func()  
label: String  
name: String  
type: String['toggle' or 'search']
opts: String or Object

### Charts
TODO: More Charts currently only Doughnut

##### Props

### Map
Map is a component that uses Leaflet-React that interacts with Table and Filter using a controller

##### Props
bounds:  
center: Array  
color: Object 
fromGroup: Object  
headers: Array  
id: Number  
marker: Object  
markers: Array
marker_type: String['circle' or 'default']  
match: String

### Markers
Markers decides type of marker and passes the markers to the map. 
##### Props
color: String  
fromGroup: Object  
headers: Array  
id: Number  
marker: Object  
match: ?  
type: String['circle' or 'default']  

### Custom Marker
CustomMarker, this is solely used to bind a Custom PopUp to Marker.  
<b>Not used to create custom markers</b>
##### Props
format: Array  
info: Object  
open: Boolean
### Custom Circle Marker
Custom Circle Marker Exact same as the Custom Marker Except it extends Circle Marker

##### Props
center: Object  
color: String  
format: Array  
info: Object  
open: Boolean

### Popup Frame
Component that binds to Custom Marker to show details
##### Props
format: Array  
info: Object
### Card
Component Used to pull information from given URL and display it in a Card
##### Props
TODO: Cleanup