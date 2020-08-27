import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useParams, Route, useRouteMatch, Link } from 'react-router-dom';
import axios from 'axios'
import Card from './itemCard'
import ItemList from './ItemList';
import axiosAuth from '../utils/axiosAuth';





const Items = (props) => {
    const [issues, setIssues] = useState ();

    const id = useParams ()
    useEffect (() => {
        axiosAuth
        .get(`/posts/`)
        .then (response => {
            console.log(response.data);
            setIssues(response.data)
        })
        .catch(error => console.log("Error!", error))
    }, [id]);
    
    if (!issues) {
        return <div>Loading products...</div>;
      }
    
      const { id, name, description, zip_id} = issues;

    return (
        <div className = "item-wrapper">
            <div classname = "item-card">
                <h2>{name}</h2>
                {/* {date.map(item => (
                <div key = {date} className ="list-item">
                    {date} */}
                    </div>
            ))}

                <div className = "description">
                     Description: <em>{description}</em>
                </div>
                <div className = "location">
                    Location: <strong>{zip_id}</strong>
                </div>
           

            </div>
   
       
     
       
    )
   }
export default Items;