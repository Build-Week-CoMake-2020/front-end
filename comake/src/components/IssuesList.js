import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Login from "./Login";
import { IssueContext } from './context/IssueContext'
// import AddIssue from './actions/AddIssue'
// const CardRow = styled.div`
// display:flex;`;

function IssuesList(props) {
    const [issues, setIssues] = useContext(IssueContext);
    return (
        <>
            
        {/* <div className="items-list-wrapper">
            {props.items.map(itm => {
                return (
                    // <Link exact to={<Login />}>

                    //     <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >

                    //         <h1 >{itm.item}</h1>
                    //         <p>${itm.data}</p>
                    //         <p>{itm.description}</p>
                    //         <p><strong>{itm.location}</strong></p>
                            

                    //     </div>
                    // </Link>
                );
            })}
        </div> */}
        </>
    );
}

export default IssuesList;