
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
    },

    exists: function(variable){
        return (variable !== undefined && variable !== null);
    },

    xhrGet: function(endpoint, dataType, successFn, failFn, alwaysFn){
        $.ajax({
            url: endpoint,
            type: 'get',
            dataType: dataType,
            xhrFields: {
                withCredentials: true
            },
            credentials: 'include',
            crossDomain: true
        }).done(function (resp) {
            if(lib.exists(successFn))
            successFn(resp);
        }).fail(function (resp) {
            if(lib.exists(failFn))
            failFn(resp);
        }).always(function(resp){
            if(lib.exists(alwaysFn))
            alwaysFn(resp);
        });
    },

    xhrPost: function(endpoint, dataType, formData, successFn, failFn, alwaysFn){
        $.ajax({
            url: endpoint,
            type: 'post',
            data: formData,
            dataType: dataType,
            xhrFields: {
                withCredentials: true
            },
            credentials: 'include',
            crossDomain: true
        }).done(function (resp) {
            if(lib.exists(successFn))
            successFn(resp);
        }).fail(function (resp) {
            if(lib.exists(failFn))
            failFn(resp);
        }).always(function(resp){
            if(lib.exists(alwaysFn))
            alwaysFn(resp);
        });
    }
}