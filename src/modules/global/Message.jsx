import React from 'react'

export const Message = ({children, background, color}) => {
    return (
        <p className="message" style={{ background: background, color:color}} >
            {children}
        </p>
    )
}
