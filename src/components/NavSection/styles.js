import {siteStyles} from '../../siteStyles';

export const styles = {
    margin: '0px',
    height: '8vh',
    width: '100%',
    fontSize: '2em',
    fontWeight: '900',
    padding: '10px',
    boxSizing: 'border-box',
    lineHeight: '100%',
    display: 'table',
    backgroundColor: siteStyles.green,
    border: '1px solid black',
    borderTop: '1px solid #38667a',
    borderLeft: 'none',
    borderRight: 'none',
    overflow: 'hidden'
}

export const dateStyles = {
    height: '100%',
    width: '30%',
    lineHeight: '100%',
    display: 'table-cell',
    verticalAlign: 'middle'
}

export const dateManipulatorStyles = {
    boxSizing: 'border-box',
    verticalAlign: 'middle'
}

export const optionsIconStyles = {
    float: 'right',
    fontSize: '1em'
}

export const optionsStyles = {
    position: 'fixed',
    width: '100px',
    left: 'calc(100vw - 110px)',
    top: '10px',
    border: '2px solid lightgray',
    boxShadow: '3px 3px 3px black',
    zIndex: 100
}

export const logoutStyles = {
    backgroundColor: 'red', 
    paddingBottom: '2px',
    color: 'white', 
    height: '20px',
    width: '100px',
    fontSize: '.5em',
    border: '1px solid gray'
}

export const indivOptionStyles = {
    backgroundColor: siteStyles.darkBlue, 
    paddingBottom: '2px',
    color: 'white', 
    height: '20px',
    width: '100px',
    fontSize: '.5em',
    border: '1px solid gray'
}