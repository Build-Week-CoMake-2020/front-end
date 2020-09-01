import React, { useState } from "react";
import { ActionBtns } from "../Style";

const Upvote = props => {
 const [upvotes, setUpvotes] = useState(0);
 const [disabled, setDisabled] = useState(false);

 return (
   <div className="issue-upvote">
     <h6>{upvotes} upvotes</h6>
     <ActionBtns
       onClick={() => {
         setUpvotes(upvotes + 1);
         setDisabled(true);
       }}
       disabled={disabled}
     >
       Upvote
     </ActionBtns>
   </div>
 );
};

export default Upvote;