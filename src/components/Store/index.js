import React, { Component } from 'react';


const { Provider, Consumer } = React.createContext()

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            queryParams: {},
            tables: [],
            currentTable: '',
            tableData: [],
            setCurrentTable: (curr) => this.setState({ currentTable: curr }),
            setTables: (tables) => this.setState({ tables }),
            setTableData: (data) => this.setState({ tableData: data }),
            getRows: () => this.state.tableData[0] ? Object.keys(this.state.tableData[0]).map(key => key) : [],
            setQueryParams: (key, param) => this.setState({ queryParams: Object.assign({}, this.state.queryParams, { [key]: param }) }),
            setError: (error) => this.setState({ error }),
            setLoading: (loading) => this.setState({ loading })
        }
    }
    render() {
        return <Provider value={{ state: this.state }}>{this.props.children}</Provider>
    }
}

export { Store, Consumer };
