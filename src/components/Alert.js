import React from 'react'
import '../styles/webwaiter-styles.css'
import Typography from '@material-ui/core/Typography'

export const Alert = (props) => {

    return (
        <div className="alert-container">
            <Typography className={props.type} style={{width:'100%', height:'100%', padding:10}}>
                {props.message}
            </Typography>
        </div>
    )
}  