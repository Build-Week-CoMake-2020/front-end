import React, { useState, useContext, useEffect } from 'react'
import { IssueContext } from '../context/IssueContext'
import axiosAuth from '../../utils/axiosAuth'
import { useHistory, Link } from 'react-router-dom'
import { CardTitle, Card, Input, Button, FormGroup, CardImg} from 'reactstrap';
// import DeleteItem from './DeleteItems'


function AddIssue() {
    const  push  = useHistory()
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [newIssue, setNewIssue] = useState('')
    const [issues, setIssues] = useContext(IssueContext);

   // console.log("here is my added item ", products)


    const updateName = e => {
        setName(e.target.value)
        //capture event, target and value from the inputs
    }
    const updateDate = e => {
        setDate(e.target.value)
    }
    const updateDescription = e => {
        setDescription(e.target.value)
    }
    const updateLocation = e => {
        setLocation(e.target.value)
    }
// useEffect(() => {
//     axiosAuth()
//     .get("/posts/")
//     .then(res => {
//         console.log(res);
//         setIssues(res.data.issue)
//     })
//     .catch(err => {
//         console.log(err)
//     })
//})
    const addProduct = e => {
        e.preventDefault();
        setIssues(prevIssues => setIssues([...prevIssues, { item: name, description: description, location: location }]))
        axiosAuth()
            .post(`/posts/create`, newIssue)
            .then(res => setNewIssue(res.data.issues).history.push('/Profilepage'));
    }
    return (
        <>
        <form onSubmit={addProduct}>
            <br></br>
            <input placeholder="Item name" 
            type="text" 
            name="name" 
            value={name} 
            onChange={updateName} />

            <br></br>

            <input 
            placeholder="Location" 
            type="text" 
            name="location" 
            value={location} 
            onChange={updateLocation} />
            <br></br>

            <input 
            placeholder="Description" 
            type="text" 
            name="description" 
            value={description} 
            onChange={updateDescription} />

            <button>Submit</button>
            <span>
            <Link to='/ProfilePage'>
            <Button>Back To Profile Page</Button>
            </Link>
            </span>

        </form>
        <div className="items-list-wrapper">
                {issues.map(itm => {
                return (

                        <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >
                            <h1 >{itm.item}</h1>
                            <p>{itm.description}</p>
                            <p><strong>{itm.location}</strong></p>
                            
                        </div>
                );
            })}
        </div>
        </>
    )
}
export default AddIssue