import React, { useState, useEffect, createContext } from 'react'
import axiosAuth from '../../utils/axiosAuth'


export const IssueContext = createContext();
export const IssueProvider = props => {
    const [issues, setIssues] = useState([])
    useEffect(() => {
        axiosAuth()
            .get("/posts/")
            .then(response => {
                setIssues(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error?", error);
            });
    }, []);

    return (
        <IssueContext.Provider value={[issues, setIssues]}>
            {/* Context Api is managing state, making props availalbe everywhere */}
            {props.children}
        </IssueContext.Provider>
    )
}

