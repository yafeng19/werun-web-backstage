import router from './index.js'

const whiteRouter = ['/logIn'];

import { getToken, removeToken } from '@/utils/app.js'

/* router.beforeEach((to,from,next)=>{
    if(getToken()){
       if(to.path == '/logIn'){
           removeToken();//清除token
           next();
       }
       next();

    }else{     
        if(whiteRouter.indexOf(to.path)!=-1){
            next();
        }else{
            
            alert("请登陆！");
            next('logIn')
        }

     }


})
 */