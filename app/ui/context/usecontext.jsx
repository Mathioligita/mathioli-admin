const { createContext, useContext } = require("react");

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default UserContext;