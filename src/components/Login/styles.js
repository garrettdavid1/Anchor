import {siteStyles} from '../../siteStyles'

export const styles = {
    width: '100%',
    height: '100%',
    backgroundColor: siteStyles.mainBackgroundColor
}

export let loginFormStyles = {
    position: 'fixed',
    backgroundColor: 'white',
    width: '300px',
    height: 'auto',
    top: (window.innerHeight - 210)/ 2,
    left: (window.innerWidth - 300) / 2,
    zIndex: 1000,
    border: '1px solid black',
    borderRadius: '5px',
    paddingBottom: '10px',
    boxShadow: '5px 5px 5px black'
}
export let registerFormStyles = {
    position: 'fixed',
    backgroundColor: 'white',
    width: '300px',
    height: 'auto',
    top: (window.innerHeight - 347)/ 2,
    left: (window.innerWidth - 300) / 2,
    zIndex: 1000,
    border: '1px solid black',
    borderRadius: '5px',
    paddingBottom: '10px',
    boxShadow: '5px 5px 5px black'
}

export const submitStyles = {
    marginTop: '10px',
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
    color: 'red'
}