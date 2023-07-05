import {useContext} from "react";
import {UserContext, UserContextType} from "./user.context";

const useUserContext = () : UserContextType => useContext(UserContext);

export default useUserContext;
