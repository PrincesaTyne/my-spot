import React, { useContext} from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {AuthContext} from './AuthContext'



const PrivateRoute: React.FC<RouteProps> = ({component: RouteComponent, ...rest }:any) => {
    const {currentUser}: any = useContext(AuthContext)

    return (
        <Route 
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent  {...routeProps} />
                ) : (
                    <Redirect to={'/login'} />
                )
            }
        />
    )
}

export default PrivateRoute
