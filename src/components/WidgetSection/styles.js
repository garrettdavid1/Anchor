import {siteStyles} from '../../siteStyles';

let windowHeight = window.innerHeight;
let navSectionHeight = windowHeight * .075 > 40 ? 40 : windowHeight * .075 < 30 ? 30 : windowHeight * .075;
let dateSectionHeight = windowHeight * .1 > 60 ? 60 : windowHeight * .1 < 25 ? 25 : windowHeight * .1;

export const styles = {
    margin: '0px',
    fontSize: '1em',
    padding: '0px 10px',
    boxSizing: 'border-box',
    backgroundColor: siteStyles.mainBackgroundColor
}

export const containerStyles = {
    backgroundColor: siteStyles.mainBackgroundColor,
    maxHeight: windowHeight - (navSectionHeight + dateSectionHeight + 4) + 'px',
    minHeight: windowHeight - (navSectionHeight + dateSectionHeight + 4) + 'px',
    height: windowHeight - (navSectionHeight + dateSectionHeight + 4) + 'px',
    overflowY: 'scroll'
}

export const loadingStatusStyles = {
    fontWeight: '900',
    fontSize: '16px',
    marginTop: '20px'
}

    