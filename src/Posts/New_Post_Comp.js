import { useEffect, useState } from 'react'; 
export default function New_Post_Comp(props)
{
    //New post details
    const [newPost,setNewPost]=useState({})
    {
            return(
            <div style={{paddingBottom:'8%'}}>
                <form className='new-task-or-post'>
                <label>Title: </label>
                <input type='text' style={{marginLeft:0}}  
                    onChange={e=>setNewPost({...newPost,title:e.target.value})}/> 
                        <br/> <br/> 
                <label>body: </label>
                <textarea 
                    onChange={e=>setNewPost({...newPost,body:e.target.value})} /><br/><br/>        
                <input className='orange-button' style={{float:'right'}} type="button"  value="Cancel"
                    onClick={()=>props.toggleAddMode()}/>
                <input className='orange-button' style={{float:'right'}} type="button" value="Add"
                    onClick={
                        ()=>{
                                props.addPost(newPost);
                                props.toggleAddMode()
                            
                            }}/>  

                </form>

            </div>


            )
    }
}