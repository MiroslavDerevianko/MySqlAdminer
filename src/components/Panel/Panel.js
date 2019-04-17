import React, { Component, useState, useEffect } from 'react';
import { getTables, getTable, getQuery } from '../../api';
import './Panel.css';

class Panel extends Component {
    componentDidMount() {
        const { setTables, setError } = this.props;
        getTables().then(data => {
            if (data.sqlMessage) throw new Error(data.sqlMessage)
            setTables(data);
        })
            .catch(error => setError(error.message));
    }
    componentDidUpdate(prevprops) {
        const { currentTable } = this.props;
        if (prevprops.currentTable !== currentTable) {
            this.refresh();
        }
    }
    send(table, query) {
        const { setTableData, setError, setLoading } = this.props;
        setLoading(true);
        getQuery(table, query).then(data => {
            setLoading(false);
            if (data.sqlMessage) throw new Error(data.sqlMessage)
            setTableData(data);
        })
            .catch(error => setError(error.message));
    }
    refresh() {
        const { setTableData, currentTable, setLoading, setError } = this.props;
        setLoading(true);
        getTable(currentTable).then(data => {
            setLoading(false);
            if (data.sqlMessage) throw new Error(data.sqlMessage)
            if (data) {
                setTableData(data);
            }
        })
            .catch(error => setError(error.message));
    }
    render() {
        const { tables, setCurrentTable, currentTable } = this.props;
        return (
            <div className="Panel-container">
                <div className="Panel-select">
                    <h1>Select table</h1>
                    <select onChange={(e) => { setCurrentTable(e.target.value) }}>
                        <option value={currentTable}></option>
                        {tables.map((table, index) => <option key={index} value={table.table_name}>{table.table_name}</option>)}
                    </select>
                </div>
                {currentTable && (
                    <div className="Panel-form-container">
                        <h1>Set Query Values</h1>
                        <QueryForm {...this.props} send={this.send.bind(this)} />
                    </div>
                )}
            </div>
        );
    }
}

const QueryForm = ({ queryParams, currentTable, send }) => {
    const [query, setQuery] = useState({})
    useEffect(() => {
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value === false) setQuery(Object.assign({}, query, { [key]: undefined }));
        });
    }, [queryParams])
    return (
        <form className="Panel-form" onSubmit={(e) => { e.preventDefault() }}>
            {Object.entries(queryParams).filter(([key, value]) => value === true).map(([key, value]) => {
                return (
                    <div className="Panel-form-item" key={key}>
                        <label>{key}</label>
                        <input type="text" onChange={(e) => {
                            setQuery(Object.assign({}, query, { [key]: e.target.value }));
                        }} />
                    </div>
                )
            })}
            <button onClick={() => { send(currentTable, query) }}>Send</button>
        </form>
    )
}


export default Panel;
