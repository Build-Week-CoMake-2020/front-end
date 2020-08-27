import React, { useState } from "react";
import axios from "axios";
import  axiosAuth  from "../utils/axiosAuth";
import { Route, useHistory, Link} from 'react-router-dom' 

const initialIssue = {
  issue: "",
  description: ""
};

const IssueList = ({ issues, updateIssues, setDependency }) => {
  console.log(issues);
  const [editing, setEditing] = useState(false);
  const [issueToEdit, setIssueToEdit] = useState(initialIssue);

  const editIssue = issue => {
    setEditing(true);
    setIssueToEdit(issue);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosAuth()
    .put(`/posts/${issueToEdit.id}`, issueToEdit)  //update
    .then(res => {
      console.log(res.data)
      setDependency(true)

    })

    .catch(err => 
      console.log(err))
    // Make a put request to save your updated issue
    // think about where will you get the id from...
    // where is is saved right now?
  };


  const deleteIssue = issue => {
    axiosAuth()
    .delete(`posts/${issue.id}`, issue)    //delete
    .then(res => {
      window.location.reload(true);
      // console.log(res.data)
      // updateIssues(issue.filter((item) => item.id !== colorToEdit.id))
      
    })
    // make a delete request to delete this issue
  };

  return (
    <div className="colors-wrap">
      <p>Issues</p>
      <Link to ='/add'>
        <button>Add Issue</button>
        </Link>
      <ul>
        {issues.map(issue => (
          <li key={issue.issue} onClick={() => editIssue(issue)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteIssue(issue)
                  }
                }>
                  x
              </span>{" "}
              {issue.issue}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: issue.description }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Issue</legend>
          <label>
            Issue Title:
            <input
              onChange={e =>
                setIssueToEdit({ ...issueToEdit, issue: e.target.value })
              }
              value={issueToEdit.issue}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default IssueList;
