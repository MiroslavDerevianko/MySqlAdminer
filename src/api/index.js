import {apiurl} from '../config';

export const getTables  = ()  => {
    return fetch(`${apiurl}/tables`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}

export const getTable = (table) => {
    return fetch(`${apiurl}/table`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table })
    })
    .then(res => res.json())
}

export const getQuery = (table, query) => {
    return fetch(`${apiurl}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table, query })
    })
    .then(res => res.json())
}

export const addRow = (table, values) => {
    return fetch(`${apiurl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table, values })
    })
    .then(res => res.json())
}

export const updateRow = (table, query, newvalues) => {
    return fetch(`${apiurl}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table, query, newvalues })
    })
    .then(res => res.json())
}

export const deleteRow = (table, query) => {
    return fetch(`${apiurl}/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table, query })
    })
    .then(res => res.json())
}