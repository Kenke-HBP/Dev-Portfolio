import React from "react";

const UserContext = React.createContext({
    user: { firstName: '', lastName: '' },
    onUserUpdate: () => { }
})

export default UserContext;