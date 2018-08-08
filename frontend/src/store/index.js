import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.store';
import { account } from './account.store';
import { users } from './user.store';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    }
});