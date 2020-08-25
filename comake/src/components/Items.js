import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useParams, Route, useRouteMatch, Link } from 'react-router-dom';
import axios from 'axios'
import Card from './itemCard'
import ItemList from './ItemList';





const Items = (props) => {
    const [products, setProducts] = useState ();

    const id = useParams ()
    useEffect (() => {
        axios
        .get(`https://amp-node-api.herokuapp.com/api/market/${id.id}`)
        .then (response => {
            console.log(response.data);
            setProducts(response.data)
        })
        .catch(error => console.log("Error!", error))
    }, [id]);
    
    if (!products) {
        return <div>Loading products...</div>;
      }
    
      const { id, name, date, description, location } = products;

    return (
        <div className = "item-wrapper">
            <div classname = "item-card">
                <h2>{name}</h2>
                {date.map(item => (
                <div key = {date} className ="list-item">
                    {date}
                    </div>
            ))}

                <div className = "description">
                     Description: <em>{description}</em>
                </div>
                <div className = "location">
                    Location: <strong>{location}</strong>
                </div>
           

            </div>
   
       
     
        </div>
    )
   }
export default Items;