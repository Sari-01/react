import { useEffect, useState } from "react";

function Timer() {
    const [count, setCount] = useState(1)
    console.log("qqq")

    useEffect(() => {
        console.log("Screen rendered!")
        checkCount()
    }, [count])

    function checkCount() {
        if (count > 10) {
            setCount(1)
        }
    }

    function addCount() {
        console.log("1111")
        setCount((previousState) => { return previousState + 1 })
    }
    return (
        <>
            <h1>I have rendered {count} times!</h1>
            <button onClick={addCount}>Increase Count</button>
        </>
    )
}

export default Timer;