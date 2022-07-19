import { useEffect, useState } from 'react'; 
export default function New_Task_Comp(props)
{
    const [title,setTitle]=useState('')
    {
            return(
            <div style={{paddingBottom:'8%'}}>
            <form className='new-task-or-post'>
                <label>Title: </label>
                <input type='text' style={{marginLeft:0}}  
                    onChange={e=>setTitle(e.target.value)}/> 
                        <br/> <br/> 
                <input className='orange-button' style={{float:'right'}} type="button"  value="Cancel"
                    onClick={()=>props.toggleAddMode()}/>
                <input className='orange-button' style={{float:'right'}} type="button" value="Add"
                    onClick={
                        ()=>{
                                props.addTask(title);
                                props.toggleAddMode()
                            
                            }}/>  

                </form>



                          
            </div>


            )
    }
}