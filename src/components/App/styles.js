import {siteStyles} from '../../siteStyles';

export const styles = {
    backgroundColor: siteStyles.mainBackgroundColor
}

export const shadowStyles = { 
    height: '5px', 
    width: '100%', 
    boxShadow: '5px 0px 5px ' + siteStyles.mainBackgroundColor + ' inset, 0px 5px 5px black inset'
}