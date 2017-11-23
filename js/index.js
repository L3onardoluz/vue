var users = [
    { id: 1, name: 'Programador', username: 'progifrs', email: 'prog@poa.ifrs.gedu.br' },
    { id: 2, name: 'Patrick Garcia', username: 'patrick.garcia', email: 'patrick.garcia@poa.ifrs.edu.br' },
    { id: 3, name: 'Bugginho ', username: 'bugs', email: 'buginho@hotmail.com' },
    { id: 4, name: 'Guri da fronteira', username: 'guridf', email: 'guridf@churrasco.br' }

];

function findUser(userId) {
    return users[findUserKey(userId)];
};

function findUserKey(userId) {
    for (var key = 0; key < users.length; key++) {
        if (users[key].id == userId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#user-list',
    data: function() {
        return { users: users, searchKey: '' };
    },
    computed: {
        filteredUsers: function() {
            return this.users.filter(function(user) {
                return this.searchKey == '' || user.name.indexOf(this.searchKey) !== -1;
            }, this);
        }
    }
});

var User = Vue.extend({
    template: '#user',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    }
});

var UserEdit = Vue.extend({
    template: '#user-edit',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    },
    methods: {
        updateUser: function() {
            var user = this.user;
            users[findUserKey(user.id)] = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            };
            router.push('/');
        }
    }
});

var UserDelete = Vue.extend({
    template: '#user-delete',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    },
    methods: {
        deleteUsers: function() {
            users.splice(findUserKey(this.$route.params.user_id), 1);
            router.push('/');
        }
    }
});

var AddUser = Vue.extend({
    template: '#add-user',
    data: function() {
        return { user: { name: '', username: '', email: '' } }
    },
    methods: {
        createUser: function() {
            var user = this.user;
            users.push({
                id: Math.random().toString().split('.')[1],
                name: user.name,
                username: user.username,
                email: user.email
            });
            router.push('/');
        }
    }
});

var router = new VueRouter({
    routes: [
        { path: '/', component: List },
        { path: '/user/:user_id', component: User, name: 'user' },
        { path: '/add-user', component: AddUser },
        { path: '/user/:user_id/edit', component: UserEdit, name: 'user-edit' },
        { path: '/user/:user_id/delete', component: UserDelete, name: 'user-delete' }
    ]
});
app = new Vue({
    router: router
}).$mount('#app')