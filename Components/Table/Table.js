import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData, filterData, format } from "../../Helpers";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.url ? [] : this.props.data,
      filteredData: [],
      filter: ""
    };
  }

  componentWillMount() {
    if (this.props.url) {
      getData(this.props.url, this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.state.filter) {
      let filteredData = filterData(this.state.data, nextProps.filter);
      this.setState({
        filteredData: filteredData
      });
    }
  }

  render() {
    let columns = this.props.headers.map(header => {
      return {
        Header: header.alt,
        accessor: header.name,
        Cell:
          header.opts || header.format
            ? row =>
                !header.format ? (
                  <div>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: header.display_opts[row.value].color
                      }}
                    >
                      <i
                        className={[
                          `fa fa-${header.display_opts[row.value].class}`
                        ]}
                      >
                        {header.opts[row.value]}
                      </i>
                    </span>
                  </div>
                ) : header.format && header.opts ? (
                  <span
                    style={{ backgroundColor: header.display_opts[row.value] }}
                  >
                    <div
                      className={[
                        `fa fa-${header.display_opts[row.value].class}`
                      ]}
                    >
                      {format(header.format, header.opts[row.value])}
                    </div>
                  </span>
                ) : (
                  <span>{format(header.format, row.value)}</span>
                )
            : null
      };
    });
    this.props.data.forEach(i => {});
    return (
      <ReactTable
        className={"-striped -highlight flex-table"}
        /*style={{ height: "400px" }}*/
        showPagination={false}
        minRows={0}
        defaultPageSize={1000}
        columns={columns}
        data={
          this.props.data
            ? this.props.data
            : this.props.filter.length > 0
              ? this.state.filteredData
              : this.state.data
        }
        getTdProps={(state, rowInfo) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo) {
                this.props.getPosition(rowInfo.original);
                if (handleOriginal) {
                  handleOriginal();
                }
              }
            }
          };
        }}
      />
    );
  }
}
