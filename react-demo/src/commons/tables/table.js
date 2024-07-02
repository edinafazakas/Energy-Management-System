import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Field from "./fields/Field";
import { Col, Row } from "react-bootstrap";

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            columns: props.columns,
            search: props.search,
            filters: [],
            pageSize: props.pageSize || 10,
            selectedRow: null,
        };
    }

    search() {}

    filter(data) {
        let accepted = true;

        this.state.filters.forEach((val) => {
            if (String(val.value) === "") {
                accepted = true;
            }

            if (
                !String(data[val.accessor]).includes(String(val.value)) &&
                !String(val.value).includes(String(data[val.accessor]))
            ) {
                accepted = false;
            }
        });

        return accepted;
    }

    handleRowClick = (rowIndex) => {
        this.setState({ selectedRowIndex: rowIndex });
    };



    handleChange(value, index, header) {
        if (this.state.filters === undefined)
            this.setState({ filters: [] });

        this.state.filters[index] = {
            value: value.target.value,
            accessor: header,
        };

        this.forceUpdate();
    }

    render() {
        let data = this.state.data
            ? this.state.data.filter((data) => this.filter(data))
            : [];



        return (
            <div>
                <Row>
                    {this.state.search.map((header, index) => {
                        return (
                            <Col key={index}>
                                <div>
                                    <Field
                                        id={header.accessor}
                                        label={header.accessor}
                                    />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                <Row>
                    <Col>
                        <ReactTable
                            data={data}
                            resolveData={(data) => data.map((row) => row)}
                            columns={this.state.columns}
                            defaultPageSize={this.state.pageSize}
                            showPagination={true}
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo) {
                                    return {
                                        onClick: () => this.handleRowClick(rowInfo.index),
                                        style: {
                                            background: rowInfo.index === this.state.selectedRowIndex ? "#ADD8E6" : "white",
                                        },
                                    };
                                } else {
                                    return {};
                                }
                            }}


                        />

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Table;
