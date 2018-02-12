import {siteStyles} from '../../siteStyles';

export const styles = {
    // backgroundColor: siteStyles.mainBackgroundColor
    backgroundImage: 'url(https://images.pexels.com/photos/452738/pexels-photo-452738.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom'
}

export const shadowStyles = { 
    height: '5px', 
    width: '100%', 
    boxShadow: '3px 0px 3px ' + siteStyles.mainBackgroundColor + ' inset, 0px 3px 3px black inset'
}