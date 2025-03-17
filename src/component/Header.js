// 1
// this is the way to add stylings in the inline

// function Header(){
//     return(
//         <>
//         <h1 style={{color:'blue', backgroundColor:'GrayText'}}>Hello</h1>
//         <p>This is cool</p>
//         </>
//     )
// }

// export default Header;

// 2
// this is the way to add numberous properties for styling

function Header(){
    const myStyles={color:'black',
        backgroundColor:'yellow',
        padding:'10px',
        fontFamily:'Italic'}
    return(
        <>
        <h1 style={myStyles}>Hello</h1>
        <p>This is cool!</p>
        </>
    )
}

export default Header