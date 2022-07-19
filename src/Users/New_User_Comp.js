import { useEffect, useState } from 'react'; 
export default function New_User_Comp(props)
{
    const [newUser,setNewUser]=useState({})
    {
            return(
            <div style={{ width:'500px',borderStyle : "solid",
             borderColor : "black",marginTop:'1%',paddingBottom:'5%'}}>
                <label>Name: </label>
                <input  
                    onChange={e=>setNewUser({...newUser,name:e.target.value})}/> 
                        <br/> <br/> 
                <label>email: </label>
                <input style={{width:'80%'}} 
                    onChange={e=>setNewUser({...newUser,email:e.target.value})} />        
                <input style={{float:'right'}} type="button"  value="Cancel"
                    onClick={()=>props.toggleAddNewUserMode(false)}/>
                <input style={{float:'right'}} type="button" value="Add"
                    onClick={
                        ()=>{
                                props.addUser(newUser);
                                props.toggleAddNewUserMode(false)
                            
                            }}/>  

            </div>


            )
    }
}