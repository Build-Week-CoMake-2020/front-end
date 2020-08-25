import React, { useState, useContext } from 'react'
import { IssueContext } from '../context/IssueContext'
import {axiosAuth} from './utils/axiosAuth'
import { useHistory } from 'react-router-dom'
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
    const addProduct = e => {
        e.preventDefault();
        setIssues(prevIssues => setIssues([...prevIssues, { item: name, date: date, description: description, location: location }]))
        axiosAuth()
            .post(``, newIssue)
            .then(res => setNewIssue(res.data.data).history.push('/Profilepage'));
    }
    return (
        <>
        <form onSubmit={addProduct}>
            <input placeholder="Item name" type="text" name="name" value={name} onChange={updateName} />
            <input placeholder="date" type="text" name="price" value={date} onChange={updateDate} />
            <input placeholder="Location" type="text" name="location" value={location} onChange={updateLocation} />
            <input placeholder="Description" type="text" name="description" value={description} onChange={updateDescription} />
            <button>Submit</button>
        </form>
        <div className="items-list-wrapper">
                {issues.map(itm => {
                return (

                        <div className="item-card" key={itm.id} style={{ padding: '25px' }}  >
                            <h1 >{itm.item}</h1>
                            <p>{itm.description}</p>
                            <p><strong>{itm.location}</strong></p>
                            <p>${itm.date}</p>
                        </div>
                );
            })}
        </div>
        </>
    )
}
export default AddIssue