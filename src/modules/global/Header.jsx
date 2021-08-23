import React from 'react'

export const Header = ({title}) => {
    return (
        <>
            <div className="header">
                <h1 className="header-title">{title}</h1>    
            </div>   
        </>
    )
}
