import {siteStyles} from '../../../siteStyles';

export const styles = {
    boxSizing: 'border-box',
    height: '100%',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: siteStyles.widgetBackground,
    boxShadow: '3px 3px 3px black'
}

export const tableStyles = {
    width: '100%',
    border: '1px solid gray',
    boxShadow: '3px 3px 3px black'
}

export const headerRowStyles = {
    border: '1px solid gray',
    width: '100%'
}

export const headerStyles = {   
    padding: '2px',
    width: '20%', 
    minWidth: '50px',
    backgroundColor: siteStyles.darkBlue,
    color: 'white'
}

export const cellStyles = {
    textAlign: 'left',
    // backgroundColor: 'white',
    padding: '2px',
    width: '20%', 
    minWidth: '50px',
    fontWeight: 700,
    borderBottom: '1px solid gray'
}

export const noTransCellStyles = {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '2px',
    width: '20%', 
    minWidth: '50px',
    fontWeight: 700,
    borderBottom: '1px solid gray'
}