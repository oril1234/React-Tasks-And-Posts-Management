import { useState,useEffect } from 'react';


function UserComp(props) 
{


   //User details to update
  const [updatedUserDetails, setUpdatedUserDetails] = useState({});
  
  //When true it mean all tasks user has have benn completed
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
 
  //When true other datail of the user will be show - street, city and zip code
  const [showOtherData, setShowOtherData] = useState(false);
 
  //The background color of the component
  const[compColor,setCompColor]=useState('white')

  useEffect(()=>
  { 

    setUpdatedUserDetails(props.userData)
    setAllTasksCompleted(props.userData.allCompleted)


  },[props]
)

  useEffect(
    ()=>
    {
      if(props.userData.id==props.selectedUser)
        setCompColor('#f8cbad')
      else 
        setCompColor('white') 
    }
  )

    /*
    Invoked whenever the user id label is clicked in order to notify the
    father component this user has been selected
    */
    const onSelectId=()=>
    {
      
      props.selectComponent(updatedUserDetails.id)
    }




  return (
    <div style={{backgroundColor:compColor,marginTop:'2%'}}>
        <div className="child" style={{ width : "400px",borderStyle : "solid",
          borderColor :allTasksCompleted? "green":"red"}}>



          <form className='user-form'>
          <label> <strong style={{cursor:'pointer'}}
            onClick={onSelectId}>ID : {props.userData.id}</strong><br/></label><br/>
          <label>Name: </label> 
           <input style={{backgroundColor:compColor}} 
                  value={updatedUserDetails.name || ''} 
                onChange={(e)=>
                setUpdatedUserDetails({...updatedUserDetails,
                  name:e.target.value})}/>
                <br/> 
          <label>Email: </label>
          <input style={{backgroundColor:compColor}} 
                  value={updatedUserDetails.email || ''} 
                  onChange={(e)=>
                    setUpdatedUserDetails({...updatedUserDetails,
                  email:e.target.value})}/>
                <br/> 
          <div className={!showOtherData?'other-data-button-div':''}>
            <input className='other-data-button' 
            type="button" value="Other Data" 
            onMouseOver={()=>
            {
              if(updatedUserDetails.address.street=='')
                setShowOtherData(false)
              else  
                setShowOtherData(true)
            } 
            } />  
            
          </div>            

            {
            showOtherData &&
           <div className='other-data-div' onClick={(e)=>
                {if(e.target===e.currentTarget)
                  setShowOtherData(false)}}>

                <label onClick={()=>setShowOtherData(false)}>Street: </label> 
                <input className='other-data' value={updatedUserDetails.address.street || ''} 
                            onChange={(e)=>
                            setUpdatedUserDetails({...updatedUserDetails,
                              address:{...updatedUserDetails.address,sreet:e.target.value}})}/>
                            <br/>
                <label onClick={()=>setShowOtherData(false)}>City: </label>
                <input className='other-data' value={updatedUserDetails.address.city || ''} 
                  onChange={(e)=>
                  setUpdatedUserDetails({...updatedUserDetails,
                    address:{...updatedUserDetails.address,city:e.target.value}})}/>
                  <br/>
                  
               <label onClick={()=>setShowOtherData(false)}>Zip Code: </label>
               <input className='other-data' value={updatedUserDetails.address.zipcode || ''} 
                  onChange={(e)=>
                    setUpdatedUserDetails({...updatedUserDetails,
                    address:{...updatedUserDetails.address,zipcode:e.target.value}})}/>
                  <br/>

            </div>
            }
            </form>
          <div style={{float:'right'}} className='user-buttons-div'>
          <input className='orange-button' type="button" value="Update" 
              onClick={()=>props.changeUserDetails(updatedUserDetails)}
            />             
          </div> 

          <div style={{float:'right'}} className='user-buttons-div'>
          <input className='orange-button' type="button" value="Delete"
            onClick={()=>{
              props.deleteUser(parseInt(props.userData.id))}}
            />
        </div>

        </div>
    
    </div>
    
  );
}

export default UserComp;