import React, { useState, useContext } from 'react'
import { IssueContext } from '../context/IssueContext'
import axiosAuth from '../../utils/axiosAuth'
import { useHistory, Link } from 'react-router-dom'
import { CardTitle, Card, Input, Button, FormGroup, CardImg, Form} from 'reactstrap';
// import DeleteItem from './DeleteItems'


function AddIssue() {
    const  push  = useHistory()
    const [name, setName] = useState('');
    // const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [zip_id, setZip_id] = useState('');
    const [newIssue, setNewIssue] = useState('')
    const [issues, setIssues] = useContext(IssueContext);

   // console.log("here is my added item ", products)
   const initialIssue = {
    issue: "",
    description: ""
  };

    const updateName = e => {
        setName(e.target.value)
        //capture event, target and value from the inputs
    }
    // const updateDate = e => {
    //     setDate(e.target.value)
    // }
    const updateDescription = e => {
        setDescription(e.target.value)
    }
    const updateLocation = e => {
        setZip_id(e.target.value)
    }
    const addProduct = e => {
        e.preventDefault();
        setIssues(prevIssues => setIssues([...prevIssues, { item: name, description: description, zip_id: zip_id }]))
        axiosAuth()
            .post(`https://peaceful-everglades-45828.herokuapp.com/api/posts/create`, newIssue)
            .then(res => setNewIssue(res.data.data).history.push('/ProfilePage'));
    }
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
        <>
        <Form onSubmit={addProduct}>
            <input placeholder="Issue name" type="text" name="name" value={name} onChange={updateName} />
            {/* <input placeholder="date" type="text" name="date" value={date} onChange={updateDate} /> */}
            <input placeholder="Location" type="text" name="zip_id" value={zip_id} onChange={updateLocation} />
            <input placeholder="Description" type="text" name="description" value={description} onChange={updateDescription} />
          
        <Button >Submit</Button>

            {/* <button>Submit</button>  */}
            <Link to = '/ProfilePage'>
               
            <button>Back to ProfilePage</button>
            
          </Link>
          
        </Form>
        <div className="items-list-wrapper">
                {issues.map(itm => {
                return (
   
                    
                        <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >
                            <h1 >{itm.item}</h1>
                            <p>{itm.description}</p>
                            <p><strong>{itm.zip_id}</strong></p>
                            {/* <p>{itm.date}</p> */}
                    
                        </div>
                    
                        
                              
                );
            })}
        </div>
        </>
    )
}
export default AddIssue