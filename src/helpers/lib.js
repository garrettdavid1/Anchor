
// import $ from '../../node_modules/jquery/src/jquery'
import $ from 'jquery';

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

    isEmpty: function(variable){
        return variable === '';
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
    },

    formatDateTime: function(date, returnType, includeSeconds){
        var dd = date.getDate();
        var MM = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        hh = hh > 0 ? hh : 12;
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        var tt = 'AM';
        ss = (ss < 10) ? '0' + ss : ss;
        mm = (mm < 10) ? '0' + mm : mm;
        if (hh > 12) {
            hh -= 12;
            tt = 'PM';
        } else if(hh === 12){
            tt = 'PM';
        }
    
        var result;
        switch (returnType) {
        case 'time':
            result = (includeSeconds) ? hh + ':' + mm + ':' + ss + ' ' + tt : hh + ':' + mm + ' ' + tt;
            break;
        case 'date':
            result = MM + '/' + dd + '/' + yyyy;
            break;
        default:
            result = (includeSeconds) ?
                MM + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ':' + ss + ' ' + tt :
                MM + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ' ' + tt;
            break;
        }
        
        return result;
    }
}