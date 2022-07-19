import axios from 'axios';

const getUsers = () =>
{  
    return axios.get("https://jsonplaceholder.typicode.com/users");
}

const getUserTasks =  async (userID) =>
{  
    let resp = await axios.get("https://jsonplaceholder.typicode.com/todos?userId=" + userID);
    let userTodos = resp.data.splice(0,5);


    return userTodos
}

const getUserPosts =  async (userID) =>
{  
    let resp = await axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + userID);
    let userPosts = resp.data.splice(0,5);


    return userPosts
}

export default {getUsers, getUserTasks,getUserPosts}