export let user;

export const setUser = (newUser) =>{
    user=newUser;
}

export const addRoster=(roster)=>{
    user.rosters=user.rosters+","+roster;
}
