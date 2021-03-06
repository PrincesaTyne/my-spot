import React, { useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from './AuthContext'

type PrivateRouteType = {
    component: React.ElementType
    path: string
}

const PrivateRoute = ({component: RouteComponent, ...rest }: PrivateRouteType) => {
    const {currentUser} = useContext(AuthContext)

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
