import {siteStyles} from '../../siteStyles'

export const styles = {
    width: '100%',
    height: '100%',
    // backgroundColor: siteStyles.mainBackgroundColor
}

export const containerStyles = {
    width: '100vw',
    height: '100vh'
}

export const actionStyles = {
    marginTop: window.innerWidth > 800 ? '80px' : '20px',
    fontWeight: 900,
    fontSize: '22px'
}

export const backdropStyles = {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    zIndex: 100,
    left: '10vw',
    top: '30vh',
    height: '40vh',
    width: '80vw',
    color: siteStyles.blue
}

export const openMessageStyles = {
    width: '80%',
    margin: '10px',
    textAlign: 'left'
}

export const welcomeStyles = {
    paddingLeft: '100px', 
    fontSize: '30px',
    fontWeight: 900
}

export const anchorStyles = {
    width: 'calc(100% - 200px)',
    fontSize: '200px',
    paddingLeft: '100px',
    fontStyle: 'oblique',
    fontWeight: 900,
    textAlign: 'left',
    fontFamily: 'Baskerville, "Baskerville Old Face", "Goudy Old Style", Garamond, "Times New Roman", serif',
    opacity: '.8'
}

export let loginFormStyles = {
    position: 'fixed',
    backgroundColor: 'white',
    minWidth: '300px',
    width: '20vw',
    height: '50vh',
    top: '25vh',
    left: window.innerWidth < 800 ? 'calc(calc(100vw - 300px) / 2)' : '60vw',
    zIndex: 1000,
    border: '5px solid ' + siteStyles.blue,
    // borderRadius: '5px',
    // paddingTop: '100px',
    paddingBottom: '10px',
    boxShadow: '3px 3px 3px black'
}

export let registerFormStyles = {
    position: 'fixed',
    backgroundColor: 'white',
    minWidth: '300px',
    width: '20vw',
    minHeight: '350px',
    height: '50vh',
    top: window.innerWidth < 800 ? 'calc(calc(100vh - 350px) / 2)' : '25vh',
    left: window.innerWidth < 800 ? 'calc(calc(100vw - 300px) / 2)' : '60vw',
    zIndex: 1000,
    border: '5px solid ' + siteStyles.blue,
    // borderRadius: '5px',
    paddingBottom: '10px',
    boxShadow: '3px 3px 3px black'
}

export const submitStyles = {
    marginTop: '5px',
    borderRadius: '5px',
    width: 'calc(80% + 10px)'
}

export const headerStyles = {
    width: '100%',
    height: '20px',
    backgroundColor: siteStyles.green,
    color: 'black',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTopRightRadius: '5px',
    borderTopLeftRadius: '5px',
    paddingTop: '3px'
}

export const labelStyles = {
    display: 'block',
    marginBottom: '0px'
}

export const inputStyles = {
    width: 'calc(100% - 20px)',
    margin: '0px 10px 5px 10px',
    padding: '2px'
}

export const needOrHaveAcctStyles = {
    cursor: 'pointer',
    color: siteStyles.blue,
    float: 'left',
    marginLeft: '10px'
}

export const messageStyles = {
    color: 'red'
}