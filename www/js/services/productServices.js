var productServices = angular.module('app.services',[]);

productServices.factory('listProductFactory', function($resource,PARSE_CREDENTIALS) {
    return $resource('https://api.parse.com/1/classes/Product', null,
                     { 
        'query':  {
            method:'GET', 
            isArray:false,
            headers:{
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            }

        }
    }

 )});

productServices.factory('getProductFactory', function($resource,PARSE_CREDENTIALS) {
    return $resource('https://api.parse.com/1/classes/Product/:id', null,
                     { 
        'query':  {
            method:'GET', 
            isArray:false,
            headers:{
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            }

        }
    }

 )});


productServices.value('PARSE_CREDENTIALS',{
    APP_ID: 'ozXaOn5rtoWO5luXNvJ96XfjvdbWJEyXCiNBDkzF',
    REST_API_KEY:'l8aP4kfOskkDrgw8SYMDcryaq8fS7Bwp4M2mWt5U'
});
