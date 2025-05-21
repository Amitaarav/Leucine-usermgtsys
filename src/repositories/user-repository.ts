let users = [];
let refreshTokens = {};
let activityLogs = [];

// finding user by Id id- string return {Object}
const findById = async (id) => users.find((user) => user.id === id);

// finding user by Email
const findByEmail = async (email) => users.find((user) => user.email === email);

const findAll = async () => {
    const userFound = users.map((user)=>{
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword
    })
}

// create user
const create = async (userData) =>{
     users.push(userData);

     logActivity("User created","User account created : ",userData.id)

     const { password, ...userWithoutPassword } = userData;
     return userWithoutPassword;

}

// update user

const updateUser = async(id,updateData) => {
    const index = users.find((user) => user.id === id);

    if( index !== -1){
        users[index] = {...users[index], ...updateData};
        logActivity("User updated","User account updated : ",id)
        
        
        const { password, ...userWithoutPassword } = users[index];
        return userWithoutPassword;
    }

    return null;
}

// delete user

const deleteUser = async (id) => {
    const initialength = users.length;
    users = users.filter((user) => user.id !== id); // updatind users array excluding user to be deleted

    delete refreshTokens[id];

    if (initialength > users.length) {
        logActivity("User deleted","User account deleted : ",id)
        return true;
    }
    return false;
}

const storeRefreshToken = async (userId,token) => {

    if(!refreshTokens[userId]){
        refreshTokens[userId] = [];
    }
    refreshTokens[userId].push(token);
    logActivity("Refresh token stored","Refresh token stored : ",userId)
    return true;
}

const validateRefreshToken = async (userId,token) => {
    const tokens = refreshTokens[userId];
    return tokens?.includes(token) || false;
}

const updateRefreshToken = async (userId, oldToken, newToken) =>{
    
    if(!refreshTokens[userId]){
        return false;
    }
    const tokens = refreshTokens[userId];
    const index = tokens.findIndex(token => token === oldToken);
    if(index !== -1){
        tokens[index] = newToken;
        logActivity("Refresh token updated","Refresh token updated : ",userId)
        return true;
    }else{
        return false;
    }

}

const removeRefreshToken = async (userId,token) => {
    if(!refreshTokens[userId]){
        return false;
    }
    const tokens = refreshTokens[userId];
    const index = tokens.findIndex(token => token === token);
    if(index !== -1){
        tokens.splice(index,1);
        logActivity("Refresh token removed","Refresh token removed : ",userId)
        return true;
    }else{
        return false;
    }
}

// counting total user

const countUsers = async () =>{
    return users.length;
}

const countUserByRole = async()=>{
    const counts = {};

    users.forEach(user => {
        const role = user.role;
        counts[role] = (counts[role] || 0) + 1;
    })

    return counts;
}

const getRecentRegistrations = async (limit = 5) =>{
    return users
        .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt - a.createdAt))
        .slice(0,limit)
        .map((user)=>{
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword
    });
}

const logActivity = (action,description,userId) => {
    
    const log = {
        id:`log_${Date.now()}`,
        action,
        description,
        userId,
        createdAt: new Date()
    }

    activityLogs.push(log);
    return log;
}

const getUserActivityLogs = async(userId) => {
    return activityLogs.filter(log => log.userId === userId)
    .sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp))
}

export default {
    getRecentRegistrations,
    getUserActivityLogs,
    logActivity,
    findById,
    findByEmail,
    findAll,
    create,
    updateUser,
    deleteUser,
    storeRefreshToken,
    validateRefreshToken,
    updateRefreshToken,
    removeRefreshToken,
    countUsers,
    countUserByRole
}