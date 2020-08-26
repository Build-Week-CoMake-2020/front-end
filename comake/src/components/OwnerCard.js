import React from "react";
const OwnerCard = ({ owner }) => {
    return (
        <div style={{ fontFamily: 'Monoton', color: '#ffffff', margin: '20px' }}>
            <h2>Issue Title: {owner.title}</h2>
            <div> 
                <p>Description: {owner.description}</p>
                <p>Location: {owner.location}</p>
            </div>
        </div>
    );
};
export default OwnerCard;