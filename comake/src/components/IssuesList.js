import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { IssueContext } from './context/IssueContext'
import axiosAuth from '../utils/axiosAuth'

// import AddIssue from './actions/AddIssue'
// const CardRow = styled.div`
// display:flex;`;
const deleteIssue = issue => {
    axiosAuth()
    .delete(`/posts/${issue.id}`, issue)    //delete
    .then(res => {
      window.location.reload(true);
      // console.log(res.data)
      // updateIssues(issue.filter((item) => item.id !== colorToEdit.id))
      
    })
    // make a delete request to delete this issue
  };

function IssuesList(props) {
    const [issues, setIssues] = useContext(IssueContext);
    return (
        <>
            
        <div className="items-list-wrapper">
            {props.items.map(itm => {
                return (
                    <Link exact to={<Login />}>

                        <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >

                            <h1 >{itm.item}</h1>
                            <p>{itm.description}</p>
                            <p><strong>{itm.zip_id}</strong></p>
                            
                    <button onClick = { e => {
                        e.stopPropagation();
                        console.log(issues)
                        delete(issues.id)}}>Delete Issue</button>
                   
                        </div>
                    </Link>
                );
            })}
        </div>
        </>
    );
}

export default IssuesList;