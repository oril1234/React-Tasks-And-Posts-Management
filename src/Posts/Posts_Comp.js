import { useEffect, useState } from 'react';
import utils from '../utils/utils';
import New_Post_Comp from './New_Post_Comp';
import Post_Comp from './Post_Comp';


function Posts_Comp(props) {
//Posts details of user  
const [posts,setPosts]=useState([])

//When true add new post window will open
const [newPostMode,setNewPostMode]=useState(false)

useEffect(
 ()=>
  {

    setPosts(props.postsData.posts)

    
  },[props]
)

//Invoked in order to close add new post window
const onCancelAddNewPostMode=()=>
{
  setNewPostMode(false)
}

  return (
    <div>
      <div style={{paddingBottom:'7%'}}>
        { !newPostMode &&
        <button className='orange-button'
         onClick={()=>{setNewPostMode(true)}} style={{float:'right'}}>Add</button>}
        <label style={{float:'left'}}>
          {newPostMode?'New Post - User'+props.postsData.id:'Posts - User '+props.postsData.id} </label>
      </div>
          <div>
          {
            
            !newPostMode &&
            <div style={{ width:'500px',borderStyle : "solid", borderColor : "black",marginTop:'1%',paddingBottom:'5%'}}>
                  {
                    posts.map((item,index) =>
                      {
                        
                        return <Post_Comp key={index} listId={index} postData={item}
                        addPost={props.addPost}/>
                      })
                  }
            </div>


          }
          
        </div>

        <div>
          {
            
            newPostMode &&
            <div style={{ width:'500px',borderStyle : "solid", borderColor : "black",marginBottom:'2%'}}>
                  {
                      <New_Post_Comp toggleAddMode={onCancelAddNewPostMode}
                      addPost={props.addPost} />

                  }
            </div>


          }
          
        </div>        

  </div>
    
  );
}

export default Posts_Comp;