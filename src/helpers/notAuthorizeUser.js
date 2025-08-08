function notAuthorizeUser(activeUser='', users=[]) {

  if(!users.length){ // Allow all users, if array is empty
    return 1
  }
  if(users.length && !activeUser){ // Dont allow any user, if array there is users list and current user is empty
    return -1
  }

  const authorize = users.filter(item => item.toLowerCase() == activeUser.toLowerCase())
  if(authorize.length){
    return -1
  }else{
    return 1
  }
//   else if(requiredUser.includes(activeUser)){
//     return 1
//   }else{
//     return -1
//   }
}

  export default notAuthorizeUser