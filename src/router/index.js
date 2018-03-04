import Vue from 'vue';
import Router from 'vue-router';
import frame from "../pages/frame/Home.vue";
import login from '../pages/login/index.vue';
import orderquery from '../pages/orderquery/index.vue';
import publish from '../pages/publish/index.vue';
import proedit from '../pages/proedit/index.vue';
import salepro from '../pages/salepro/index.vue';
import hubpro from '../pages/hubpro/index.vue';
import editnotice from '../pages/editnotice/index.vue';
Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/orderquery',
            component: frame,
            children: [
                {
                    path: '/',
                    component: orderquery
                },
                {
                    path: '/publish',
                    component: publish
                },
                {
                    path: '/proedit/:id',
                    component: proedit
                },
                {
                    path: '/salepro',
                    component: salepro
                },
                {
                    path: '/hubpro',
                    component: hubpro
                },
                {
                    path: '/editnotice',
                    component: editnotice
                },
            ]
        },
        {
            path: '/login',
            component: login
        },
    ]
})