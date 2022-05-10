import React, {useContext, useEffect} from 'react'
import AutoProvider from '../privateRoute/AutoProvider'
import { Redirect, Route} from 'react-router-dom'

export const PrivateRoute =({component:RouteComponent,...rest}) =>{
    const {jwt} = useContext(AutoProvider)

      return (
        <Route {...rest}re
            render={routerPros =>
            !!jwt ? (
                <RouteComponent {...routerPros} />
                )
                :(
                <Redirect to={'/'} /> 
                    )
             } />
     )

}
