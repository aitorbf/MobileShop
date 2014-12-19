var productServices = angular.module('app.services',[]);

productServices.factory('listProductFactory', function($resource,PARSE_CREDENTIALS) {
    return $resource('https://api.parse.com/1/classes/Product', null,
                     { 
        'query':  {
                    method:'GET', 
                    isArray:true,
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    }
                  
                  }
    };

     });


productServices.value('PARSE_CREDENTIALS',{
    APP_ID: 'IOzyklVXHyXdDRTIptfWhbgiwJgkLCyw7CJlAFzf',
    REST_API_KEY:'HOAtISRRXm2yBFz6gykMw9qAvC33RdUt4CXMiuAP'
});
