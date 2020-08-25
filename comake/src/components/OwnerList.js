import React, {useState, useEffect} from 'react'
import OwnerCard from './OwnerCard'
import axiosAuth from '../utils/AxiosAuth'

const OwnersList = props => {
    const [owners, setOwner] = useState([])
    useEffect(() => {
        axiosAuth()
            .get("issue")
            .then(response => {
                setOwner(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error?", error);
            });
    }, []);
    return (
        <div className="items-list-wrapper">
            {owners.map(owner => {
                return <OwnerCard owner={owner} key={owner.id} />;
            })}
        </div>
    );
}
export default OwnersList