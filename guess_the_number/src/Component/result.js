// import react from 'react'

function Result({secretNum, term}) {
    // {} is mandatory while passing the parameters. while passing this way the parameters are checking with correct condition.

    let result;
    if (term) {
        // the above if condition is needed so that the output in the beginning will give u as empty
        // console.log("termmm", term)
        if (term > secretNum) {
            result = 'Higher'
        }
        else if (term < secretNum) {
            result = 'Lower'
        }
        else if (term == secretNum) {
            result = 'Yes! U R Correct'
        }
        else {
            result = 'INVALID INPUT'
        }
    }
    return (
        <h3>
            You guessed : {result}
        </h3>
    )
}

export default Result;