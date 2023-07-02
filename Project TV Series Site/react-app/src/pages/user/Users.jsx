import { useEffect, useState } from "react";
import { getUsers } from "../../services/Api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const appUsers = await getUsers();
    if (appUsers?.length) {
      setUsers(appUsers);
    }
    console.log(appUsers);
    return appUsers;
  };
  return (
    <>
      <h1>Users</h1>

      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
            </div>
          );
        })}
    </>
  );
};

export default Users;
