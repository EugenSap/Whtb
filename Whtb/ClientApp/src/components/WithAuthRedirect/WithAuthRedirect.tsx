import React from "react";
import {Redirect} from "react-router-dom";
interface withUser {
    user: user | undefined;
}
interface user {
    userName: string | undefined
}
function WithAuthRedirect<T extends withUser = withUser> (Component: React.ComponentType<T>) {
    const WrappedComponent = (props: T) => {
        if (props.user && props.user.userName)
        {
            return <Component {...(props as T)}/>
        }
        return <Redirect to={'/login'}/>
    };

    return WrappedComponent;
    //(props: T) =>  props.user.userName ? <Redirect to={'/login'}/> : <Component {...props}/>
}

export default WithAuthRedirect