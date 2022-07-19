import { useEffect, useState } from 'react';
import utils from '../utils/utils';
import New_Task_Comp from './New_Task_Comp';
import Task_Comp from './Task_Comp';


function Tasks_Comp(props) {

//Tasks details of user  
const [tasks,setTasks]=useState([])

//When true add new task window will open
const [newTaskMode,setNewTaskMode]=useState(false)

useEffect(
 ()=>
  {
    setTasks(props.tasksData.tasks)

    
  },[props]
)

//Invoked in order to close add new task window
const onCancelAddNewTaskMode=()=>
{
  setNewTaskMode(false)
}

  return (
    <div>
      <div style={{paddingBottom:'7%'}}>
        { !newTaskMode &&
        <button className='orange-button'
         onClick={()=>{setNewTaskMode(true)}} style={{float:'right'}}>Add</button>}
        <label style={{float:'left'}}>
          {newTaskMode?'New Todo - User'+props.tasksData.id:'Todos - User '+props.tasksData.id} </label>
      </div>
          <div>
          {
            
            !newTaskMode &&
            <div style={{ width:'500px',borderStyle : "solid", borderColor : "black",marginTop:'1%',paddingBottom:'5%'}}>
                  {
                    tasks.map((item,index) =>
                      {
                        
                        return <Task_Comp key={index} listId={index} taskData={item}
                        completeATask={props.completeATask} />
                      })
                  }
            </div>


          }
          
        </div>

        <div>
          {
            
            newTaskMode &&
            <div style={{ width:'500px',borderStyle : "solid", borderColor : "black",marginBottom:'2%'}}>
                  {
                      <New_Task_Comp toggleAddMode={onCancelAddNewTaskMode}
                      addTask={props.addTask} />

                  }
            </div>


          }
          
        </div>        

  </div>
    
  );
}

export default Tasks_Comp;