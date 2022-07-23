
import {useState,useEffect} from 'react'
import Posts_Comp from '../Posts/Posts_Comp';
import Tasks_Comp from '../Tasks/Tasks_Comp';
import utils from '../utils/utils';
import New_User_Comp from './New_User_Comp';
import UserComp from './User_comp';

function UsersComp() {

  //All the users and their personal details, as well as their tasks and posts
  const [allUsers, setAllUsers] = useState([])

  //The users that will be displayed
  const [displayedUsers, setDisplayedUsers] = useState([])

  //True when a new user is added
  const [addNewUserMode,setAddNewUserMode]=useState(false)

  //Users their name or email contains this string are shown
  const [prefix, setPrefix] = useState("")

  //Id of user that has been selected
  const [selectedUserId, setSelectedUserId] = useState(0)

  //If true user's tasks are shown
  const [showTodos,setShowTodos]=useState(false)

  //If true user's posts are shown
  const [showPosts,setShowPosts]=useState(false)

  //////////useEffect 1////////////
  useEffect(
    ()=>{
    async function getUsers() 
    {
      //Fetch all users details
      let resp = await utils.getUsers();

      /*
      Creates a whole new object that contains the user details
      as well as their tasks and posts
      */
      let fullData=await Promise.all(resp.data.map(async (user)=>{
        
        let tasks=await utils.getUserTasks(user.id)
        let posts=await utils.getUserPosts(user.id)
        let detailsAndTasks={...user,tasks:[...tasks],
          //Checking if all the users tasks have been completed
          allCompleted:tasks.every(
            x=>{
              return x.completed
            }
          ),posts:[...posts]}
        return detailsAndTasks  
      })) 
      setAllUsers(fullData);
      
    }
    getUsers()
    },[]
  )
   //////////End of useEffect 1////////////

    //////////useEffect 2////////////
    useEffect(
      ()=>
      {
        //Activated whenever 2 new prefix is input
        get_matching_users()
      },[allUsers,prefix]
    )
     //////////End of useEffect 2////////////
  


   /*
    In this method all the users which their names or emails
     contains the givern
    string will be fetched
   */
  const get_matching_users= ()=>
  {
    
    
    let matching_users=allUsers.filter(x=>x.name.includes(prefix) ||
                    x.email.includes(prefix) )
                
    setDisplayedUsers(matching_users)     
              
  }

  //If the argument of this method is true add new user window will be shown
  const onToggleAddNewUserMode=(state)=>
  {
    
    setAddNewUserMode(state)
    
  }

  //Invoked when a new user is added from the new user component
  const onAddNewUser=(newUser)=>
  {
    
    let tmpUsers=[...allUsers]
    let tmpUser={...newUser,id:allUsers.length+1,address:{street:'',
      city:'',zipcode:''},tasks:[],posts:[]}
    tmpUsers.push(tmpUser);
    setAllUsers(tmpUsers)

  }

  //Activated from child component when a user is deleted
  const onDeleteUser=(userId)=>
  {
    if(userId==selectedUserId)
      {
        setShowTodos(false);
        setShowPosts(false)
        setSelectedUserId(0);
      }
    setAllUsers(current=> current.filter(user => {
      return user.id !== userId;
    }))
  }

  //Activated from child component when user details are updated
  const onUpdateUser=(userDetails)=>
  {
    let tmpusers=[...allUsers];
    tmpusers=tmpusers.map(user=>{
      if(user.id==userDetails.id)
        user=userDetails
      return user  
    }
      )
    setAllUsers(tmpusers)
  }

  /*Activated from child component when a user is selected to show their 
  tasks and posts
  */
  const onSelectUser=(userId)=>
  {
    setSelectedUserId(userId)
    setShowTodos(true);
    setShowPosts(true);
    setAddNewUserMode(false)
    
  }


  //Activated from a child component when a task is completed
  const onCompleteTask=(taskId)=>
  {
    let tmpusers=[...allUsers];
    tmpusers=tmpusers.map(user=>{
      let userTmp={...user}
      
      if(userTmp.id===selectedUserId)
      {
        userTmp.tasks.map(task=>{
          if(task.id==taskId)
            {
              task.completed=true
            }
          return task;
        })
      }

      userTmp={...userTmp,allCompleted: userTmp.tasks.every(
        x=>{
          return x.completed
        }
      )}
      
      return userTmp  
    }
      )
    setAllUsers(tmpusers)
  }


  //Activated from child component when a new task is added with title as argument
  const onAddNewTodo=(title)=>
  {
    let tmpusers=[...allUsers];
    tmpusers=tmpusers.map(user=>{
      let userTmp={...user}
      
      if(userTmp.id===selectedUserId)
      {
        userTmp.tasks.push({userId:selectedUserId,id:userTmp.tasks.length+1,
            title:title,completed:false})
      }

      userTmp={...userTmp,allCompleted: userTmp.tasks.every(
        x=>{
          return x.completed
        }
      )}
      
      return userTmp  
    }
      )
    setAllUsers(tmpusers)
  }

    //Activated from child component when a new post is added with title as argument
    const onAddNewPost=(newPost)=>
    {
      let tmpusers=[...allUsers];
      tmpusers=tmpusers.map(user=>{
        let userTmp={...user}
        
        if(userTmp.id===selectedUserId)
        {
          userTmp.posts.push({userId:selectedUserId,id:userTmp.posts.length+1,
              title:newPost.title,body:newPost.body})
        }
        
        return userTmp  
      }
        )
      setAllUsers(tmpusers)
    }

  //////////////////////////Html Code///////////////////////////
  return (
    <div>

    <div style={{float:'left'}} className='child' >
    <h1 style={{marginRight:'100'
    }}>Users</h1>

    <strong>Search</strong>
    <input type="text" onChange={e=>setPrefix(e.target.value)} />
    <input type="button" className='orange-button' value="Add" onClick={()=>onToggleAddNewUserMode(true)} /> <br/>
    {
      displayedUsers.map(item =>
        {
          return <UserComp
          selectedUser={selectedUserId}
          selectComponent={onSelectUser} 
          changeUserDetails={onUpdateUser}
          deleteUser={onDeleteUser} userData={item} key={item.id} />
        })
    }
</div>
{
    showTodos && !addNewUserMode &&
    <div style={{float:'right'}} className='child' >
      <Tasks_Comp completeATask={onCompleteTask} addTask={onAddNewTodo} 
          key={selectedUserId} tasksData={displayedUsers.find(user=>user.id==selectedUserId)}/>

    </div>
}
{
    showPosts && !addNewUserMode &&
    <div style={{float:'right'}} className='child' >
      <Posts_Comp addPost={onAddNewPost} 
          key={selectedUserId} postsData={displayedUsers.find(user=>user.id==selectedUserId)}/>

    </div>
}

{

    addNewUserMode && 
    <div style={{float:'right'}} className='child' >
      <New_User_Comp addUser={onAddNewUser} 
      toggleAddNewUserMode={onToggleAddNewUserMode}
          />

    </div>
}

</div>

    
  );
}

export default UsersComp;