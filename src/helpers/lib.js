
import $ from '../../node_modules/jquery/src/jquery'

export const lib = {
    hideTransactionsForSmallScreens: function () {
        if (window.innerWidth < 600) {
            $('.transaction').hide();
            $('.transactionPlaceholder').hide();
            $('.endingBalance').hide();
            $('.newTransButton').hide();
            $('.viewDayButton').show();
        } else {
            $('.transaction').show();
            $('.transactionPlaceholder').show();
            $('.endingBalance').show();
            $('.newTransButton').show();
            $('.viewDayButton').hide();
        }
    },

    hideLastMonthButtonIfNotExists: function(isFirstAvailableMonth){
        if(isFirstAvailableMonth){
            $('#lastMonth').hide();
        }else{
            $('#lastMonth').show();
        }
    },

    setFocus(selector){
        setTimeout(function(){
            $(selector).focus();
        }, 20)
    }
}