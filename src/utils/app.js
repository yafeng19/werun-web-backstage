import VueCookie from 'vue-cookie'

export function getToken(){
    return VueCookie.get('token');
}

export function removeToken(){
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    document.cookie = 'loginName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'loginName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

