import User from './controllers/userCtrl';
import Recipe from './controllers/recCtrl';
import Kinvey from './helpers/kinvey';

// States or global data that are shared with views 

window.allRecipes = []; // dom data 
window.msgs = [];
window.sharedData = {};
window.formData = {};
window.db = new Kinvey('kid_BkAjzXdF_', 'e715db1f331604155a1594597e411ffe7');

async function main() {
    const authToken = await kinvey.login(data);
    console.log(authToken);
    const recipes = await kinvey.logout(authToken);
    console.log(recipes);
}

document.addEventListener('DOMContentLoaded', main);

const app = Sammy('#rooter', function() {
    this.use('Handlebars', 'hbs');



    db.get('recipes', null, { username: 'guest', password: 'guest' }).then(res => {
        allRecipes = res;
    });

    const userCtrl = new User();
    const recCtrl = new Recipe();

    //@route    GET  /
    //@desc     render Home Page 
    //@access   Public
    this.get('#/', recCtrl.js.getHome);

    //@route    GET  /recipe/create
    //@desc     render create Page 
    //@access   Private
    this.get('#/recipe/create', recCtrl.js.getCreate);
        //@route    Post  /recipe/create
        //@desc     store new recipe in db  
        //@access   Private
    this.post('#/recipe/create', recCtrl.js.postCreate);

    //@route    GET  /recipe/share
    //@desc     render share Page 
    //@access   Private
    this.get('#/recipe/share', recCtrl.js.getshare);

    //@route    GET  /recipe/share/:id
    //@desc     render recipe share view
    //@access   Public
    this.get('#/recipe/share/:id', recCtrl.js.getshare);

    //@route    GET  /recipe/delete/:id
    //@desc     Delete a recipe
    //@access   Private
    this.get('#/recipe/delete/:id', recCtrl.js.getDelete);

    //@route    GET  /recipe/edit/:id
    //@desc     Edit a recipe
    //@access   Private
    this.get('#/recipe/edit/:id', recCtrl.js.getEdit);

    //@route    GET  /recipe/edit/
    //@desc     Process the update recipe
    //@access   Private
    this.post('#/recipe/edit', recCtrl.js.postEdit);

    //@route    GET  /user/login
    //@desc     render login Page 
    //@access   Public
    this.get('#/user/login', userCtrl.getLogin);

    //@route    GET  /user/logout
    //@desc     logoout a user 
    //@access   Private
    this.get('#/user/logout', userCtrl.getLogout);

    //@route    POST  /user/login
    //@desc     process and login users
    //@access   Private
    this.post('#/user/login', userCtrl.postLogin);

    //@route    GET  /user/signup
    //@desc     render signup Page 
    //@access   Public
    this.get('#/user/signup', userCtrl.getSignup);

    //@route    POST  /user/signup
    //@desc     process and sigup users
    //@access   Private
    this.post('#/user/signup', userCtrl.postSignup);

});

app.run('#/');