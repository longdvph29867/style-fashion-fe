import React from 'react'

type Props = {}

const UnauthorizedPage = (props: Props) => {
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    )
}

export default UnauthorizedPage