import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

 
const IssueCard = ({id, name, description, location, date}) => {
  
    return (
        
        <div>
       <p>Name:{name}</p>
       <p>Date: {date}</p>
       <p>Description: {description}</p>
       <p>Location: {location}</p>
        
       
       
      </div>
    )
}
export default IssueCard;
