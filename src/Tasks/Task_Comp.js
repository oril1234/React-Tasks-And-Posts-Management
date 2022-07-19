import { useEffect, useState } from 'react';


function Task_Comp(props) {

  //Details of task
  const [taskDetails, setTaskDetails] = useState({});
  useEffect(
  ()=>{
    
    setTaskDetails({...props.taskData})
  },[]
  )

  return (
    <div>
          <div style={{ borderStyle : "solid",
              borderColor : "black",marginTop:'2%',
                marginLeft:'1%',marginRight:'1%',paddingLeft:'1%',paddingBottom:'1%'}}>

        <form className='task-or-post'>
          <label>Title:</label><textarea className='title-area' value={taskDetails.title} disabled/><br/>
          <label>completed: </label>
            <label>{String(taskDetails.completed?'true':'false')} </label>
            {
          !taskDetails.completed &&
          <button
          className='orange-button'
            onClick={()=>
              {
                props.completeATask(props.taskData.id);
                setTaskDetails({...taskDetails,completed:true});
              }}
            style={{marginLeft:'30%'}}>Mark Completed</button>
          }
          </form>        
   

            
          </div>
 
    </div>
    
  );
}

export default Task_Comp;