
import {siteStyles} from '../../../../siteStyles'

export const styles = {
    position: 'fixed',
    backgroundColor: 'white',
    width: '200px',
    height: '210px',
    top: (window.innerHeight - 210)/ 2,
    left: (window.innerWidth - 200) / 2,
    zIndex: 1000,
    border: '1px solid black',
    borderRadius: '5px'
}

export const submitStyles = {
    marginTop: '10px',
    borderRadius: '5px',
    width: '100px'
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
    marginBottom: '5px'
}

export const cancelStyles = {
    float: 'right',
    fontSize: '14px',
    color: siteStyles.darkBlue,
    marginRight: '5px',
    cursor: 'pointer',
    marginTop: '-17px'
}