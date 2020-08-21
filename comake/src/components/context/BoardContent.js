import React, { useState, useEffect, createContext } from 'react'
import axiosAuth from '../utils/axioshAuth'


export const BoardContext = createContext();
export const BoardProvider = props => {
    const [entries, setEntries] = useState([])
    useEffect(() => {
        axiosAuth()
            .get("board")
            .then(response => {
                setEntries(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error?", error);
            });
    }, []);

    return (
        <BoardContext.Provider value={[entries, setEntries]}>
            {/* Context Api is managing state, making props availalbe everywhere */}
            {props.children}
        </BoardContext.Provider>
    )
}