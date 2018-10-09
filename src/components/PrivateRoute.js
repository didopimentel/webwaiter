import React from 'react'

export const PrivateRoute = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends React.Component {
        render () {
            const role = localStorage.getItem('role');
            if (allowedRoles.includes(role)) 
                return <WrappedComponent {...this.props} />
            else {
                return <div style={{paddingTop: '150px'}}>Not allowed!</div>
            }
        }

    }
    return WithAuthorization
}
    export default PrivateRoute