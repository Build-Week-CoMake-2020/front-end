import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { IssueContext } from './context/IssueContext'
import axiosAuth from '../utils/axiosAuth'
import { useParams, useHistory } from "react-router-dom";
// import AddIssue from './actions/AddIssue'
// const CardRow = styled.div`
// display:flex;`;
function IssuesList(props) {
    const [issues, setIssues] = useContext(IssueContext);

const deleteIssue = id => {
    axiosAuth()
    .delete(`/posts/${issues.id}`)    //delete
    .then(res => {
        console.log(res);
        axiosAuth()
        .get("/posts/")
        .then(res => {
            console.log(res);
            setIssues(res.data.data);
        })
        .catch(err=> {
            console.log(err)
        });
    
      //window.location.reload(true);
      // console.log(res.data)
      // updateIssues(issue.filter((item) => item.id !== colorToEdit.id))
      
    })
    // make a delete request to delete this issue
  };


    return (
        <>
            
        <div className="items-list-wrapper">
            {props.items.map(itm => {
                return (
                    <Link exact to={<Login />}>

                        <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >

                            <h1 >{itm.item}</h1>
                            <p>{itm.description}</p>
                            <p>{itm.id}</p>
                            <p><strong>{itm.zip_id}</strong></p>
                            
                    <button onClick = { e => {
                        //e.stopPropagation();
                        console.log("HAVING ISSUES",issues)
                        deleteIssue(itm)}}>Delete Issue</button>
                   
                        </div>
                    </Link>
                );
            })}
        </div>
        </>
    );
}

export default IssuesList;