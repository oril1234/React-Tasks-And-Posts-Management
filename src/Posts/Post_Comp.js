import { useEffect, useState } from 'react';


function Post_Comp(props) {

  //Details of post
  const [postDetails, setPostDetails] = useState({});
  useEffect(
  ()=>{
    setPostDetails({...props.postData})
  },[]
  )

  return (
    <div>
          <div style={{ borderStyle : "solid",
              borderColor : "black",marginTop:'2%',
                marginLeft:'1%',marginRight:'1%',paddingLeft:'1%',paddingBottom:'1%'}}>

          <form className='task-or-post'>
          <label>Title:</label><textarea className='title-area' value={postDetails.title} disabled/><br/>
          <label>body: </label>
            <textarea  value={postDetails.body} disabled/>
          </form>
          </div>
            
    </div>
    
  );
}

export default Post_Comp;