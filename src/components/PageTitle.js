import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
    leftWall: {
        borderBottom: '1px solid lightblue', 
    },
    rightWall: {
        borderBottom: '1px solid lightblue', 
    },
    middleWall: {
        borderTop: '1px solid lightblue',
        borderRight: '1px solid lightblue', 
        borderLeft: '1px solid lightblue', 
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        borderRadius: 2,
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 10
    }
}

export const PageTitle = (props) => {

    return (
        <div className="row" style={{marginBottom: 10, background: 'white', height: 70}}>
            <div className="col" style={styles.leftWall}></div>
            <div className="col-10 col-md-8 text-center page-title-container"
                style={styles.middleWall}
            >
                <Typography variant="display2">{props.content}</Typography>
            </div>
            <div className="col" style={styles.rightWall}></div>
        </div>
    )
}