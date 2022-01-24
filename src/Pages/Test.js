import React, { useEffect, useState } from 'react'
import { Client } from '../Client';

function Test() {

    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        Client.items().type('home').toObservable().subscribe(response => {
            setHomeData({ "en-us": response.items });
        });
    }, [])

    return (
        <>
            <h1>Test</h1>
            {homeData['en-us'] &&
                <pre>{JSON.stringify(homeData['en-us'].map(item => item.system), undefined, 2)}</pre>
            }
        </>
    )
}

export default Test
