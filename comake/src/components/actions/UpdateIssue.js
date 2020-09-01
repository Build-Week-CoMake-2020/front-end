import React, { useState } from "react";
import  axiosAuth  from "../../utils/axiosAuth";

const initialIssue = {
  issue: "",
  description: ""
};

export default function UpdateIssue ({ issues, setDependency }) {
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
    .put(`/posts/${issueToEdit.issue}`, issueToEdit)  //update
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
  return (
    <div className="update-wrap">
   
      {/* {editing && ( */}
        
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

          <label>
              Description:
                <input 
                 onChange={e =>
                  setIssueToEdit({ ...issueToEdit, description: e.target.value })
                    }
                    value={issueToEdit.description}
                     />
                    </label>
          <div className="button-row">
        
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      {/* )} */}
     
    </div>
  );
};

// export default UpdateIssue;