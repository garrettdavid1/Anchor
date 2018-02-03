import {siteStyles} from '../../siteStyles';

export const styles = {
    margin: '0px',
    minHeight: '30px',
    maxHeight: '40px',
    height: '7.5%',
    fontSize: '1em',
    padding: '10px',
    backgroundColor: siteStyles.mainBackgroundColor,
    color: 'white',
    textAlign: 'vertical',
    overflow: 'hidden',
    boxSizing: 'border-box'
}

export const optionsIconStyles = {
    float: 'right',
    fontSize: '1em'
}

export const optionsStyles = {
    position: 'fixed',
    width: '100px',
    left: window.innerWidth - 110 + 'px',
    top: '10px',
    backgroundColor: siteStyles.mainBackgroundColor
}

export const indivOptionStyles = {
    backgroundColor: 'red', 
    color: 'white', 
    height: '20px'}