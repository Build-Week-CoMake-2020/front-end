
import React, { useState, useEffect, useContext } from 'react';
import { CardTitle, Card, Input, Button, FormGroup, CardImg} from 'reactstrap';
import { Route, Link } from 'react-router-dom'
import IssuesList from './IssuesList';
import OwnerList from './OwnerList';
import axiosAuth from '../utils/axiosAuth'
import { IssueContext } from './context/IssueContext'


// const deleteIssue = issue => {
//     axiosAuth()
//     .delete(`/posts/${issue.id}`, issue)    //delete
//     .then(res => {
//       window.location.reload(true);
//       // console.log(res.data)
//       // updateIssues(issue.filter((item) => item.id !== colorToEdit.id))
      
//     })
//     // make a delete request to delete this issue
//   };
const ProfilePage = () => {
    const [issues, setIssues] = useContext(IssueContext)
   
    
    return (
        <div style={{ backgroundColor: '#e74c3d' }}>
            <div className='header' style={{ display: 'flex' }}>
                <Card style={{ width: '25%', marginLeft: '50px', borderRadius: '0%'}}>
                    {/* <div
                        style={{
                            height: "100px",
                            width: "25%",
                            border: "1px dashed black",
                            borderRadius: '50%',
                            marginLeft: '100px',
                            marginTop: "50px"
                        }}>
                    </div> */}
                    <CardImg style = {{width:'100%', margin:'0 auto', height:'200px'}} src={require ('../assets/img4.jpg')}/>
                    <Input type="file" style={{ marginTop: "200px", margin: "15%" }} />
                </Card>
                
                {/* <CardTitle style={{ marginTop: '230px', marginLeft: '100px' }}><h1>Business Owner: <br /><span style={{ fontFamily: 'Monoton' }}>Business<br /> Name<br />  LLC.</span></h1>
                    <OwnersList />
                </CardTitle> */}
                <hr />

                <Link to='/AddIssue'>
                    <FormGroup style={{padding:'10px'}}>
                    <Button >Add Issue</Button>
                    </FormGroup>
                </Link>
                
                    {/* <FormGroup style={{padding:'10px'}}>
                    <Button onClick = { e => {
                        e.stopPropagation();
                        console.log(issues)
                        delete(issues.id)}}>Delete Issue</Button>
                    </FormGroup> */}
            
            </div>
            <br />
            <Card>

                <div className="items-list-wrapper">
                    <IssuesList items={issues} />
                    
                </div>
            </Card>

        </div>

    )
}
export default ProfilePage;