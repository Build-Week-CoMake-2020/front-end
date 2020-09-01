import React, { useState, useEffect, useContext } from "react";
import IssueContext from "./context/IssueContext";
import axiosAuth from "./utils/axiosAuth";
import UpdateIssue from "./UpdateIssue";
import styled from "styled-components";
import { ActionBtns } from "../Style";
import Upvote from "./Upvote";

const Boxes = styled.div`
  display: flex;
  font-size: 15px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: inherit;
  width: 90%;
  margin: auto;
  padding: 5px;
  background: #c0eef0;
`;

//THIS IS FOR THE USERS TO CREATE A NEW ISSUE
const GetIssues = ({ id }) => {
  const { events, setEvents } = useContext(IssueContext);
  const [issues, setIssues] = useState([]);
  const [issueForm, setIssueForm] = useState({
    issue_name: "",
    issue_location: "",
    category: "",
    priority: "",
    imgurl: "",
    issue_details: ""
  });

  const handleChange = e => {
    setIssueForm({ ...issueForm, [e.target.name]: e.target.value });
  };

  // componentDidMount (cDM), componentUpdate (cU)
  // a life cycle method - aka Effect Hook
  useEffect(() => {
    axiosAuth()
      .get("/posts/")
      .then(res => {
        console.log(res);
        setIssues(res.data.issue); 
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosAuth()
      .post(`/posts/`, issueForm)
      .then(res => {
        setIssueForm({
          issue_name: "",
          issue_location: "",
          category: "",
          priority: "",
          imgurl: "",
          issue_details: ""
        });
        setEvents([...events, res.data.issue]); // UPDATE: changed to res.data.issue to make add new issue work
        setIssues([...issues, res.data.issue]); // UPDATE: changed to res.data.issue to make add new issue work
      })
      .catch(err => {
        console.log(err);
      });
  };
  //SET STATE TO RESPONSE

  const handleDelete = id => {
    axiosAuth()
      .delete(`/posts/${id}`)
      .then(res => {
        console.log(res);
        axiosAuth()
          .get("/posts/")
          .then(res => {
            console.log(res);
            setIssues(res.data.issue); // should be res.data.issue instead of res.data
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  // cf = city form
  return (
    <div className="issues">
      <h2>Issues Created by Neighbors</h2>
      <Boxes>
        {issues.map(cf => (
          <div key={cf.id} className="issue-card">
            <br />
            <h4>
              Issue: <p>{cf.issue_name}</p>
            </h4>
            <div className="issue-desc"> 
              <div className="issue-img">
                {cf.imgurl ? <img src={cf.imgurl} alt="Pic" /> : null}
              </div>
              <div className="issue-details">
                <h4>
                  Issue Location: <p>{cf.issue_location}</p>
                </h4>
                <h4>
                  Category Id: <p>{cf.category}</p>
                </h4>
                <h4>
                  Priority: <p>{cf.priority}</p>
                </h4>
                <h4>
                  Issue Details: <p>{cf.issue_details}</p>
                </h4>
              </div>
            </div>
            <div className="issue-actions">
              <Upvote id={cf.id} />
              <ActionBtns onClick={() => handleDelete(cf.id)}>
                Delete
              </ActionBtns>
              {/* <UpdateBtn id={cf.id} /> */}
              <UpdateIssue id={cf.id} updateInfo={issueForm} />
            </div>
          </div>
        ))}
      </Boxes>
      <form onSubmit={handleSubmit}>
        <h5> Add an Issue</h5>
        <input
          type="text"
          name="issue_name"
          placeholder="Issue"
          value={issueForm.issue_name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="issue_location"
          placeholder="Location"
          value={issueForm.issue_location}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={issueForm.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={issueForm.priority}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="imgurl"
          placeholder="Image URL"
          value={issueForm.imgurl}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="issue_details"
          placeholder="Issue Details"
          value={issueForm.issue_details}
          onChange={handleChange}
        />
        <br />

        <br />

        <button type="submit">Add new issue</button>
      </form>
    </div>
  );
};
export default GetIssues;
