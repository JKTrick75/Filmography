import React from 'react'

function Header({children}){
    return (
        <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">{children}</h1>
        </header>
    )
}

export default Header