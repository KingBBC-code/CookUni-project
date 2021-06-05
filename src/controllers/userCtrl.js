import { loginValidation, signupValidation } from "../validation";


function isAuth() {
    if (sessionStorage.getItem('loggedIn')) {
        return true;
    } else {
        return false;
    }
}

function clearStates(viewData) {
    msgs = [];
    sharedData = {};
    viewData = {};
}
export default class User {

    getLogin() {
        console.log('getLogin');
        const viewData = {...sharedData, loginActive: true, loggedIn: isAuth() };

        if (formData && msgs.length !== 0) {
            viewData.userName ? viewData.userName.input = formData.userName : '';
            viewData.password ? viewData.password.input = formData.password : '';
            viewData.msgs = msgs;
        }

        this.loadPartials({
            navbar: './views/partials/navbar.hbs',
            notifications: '../views/partials/notifications.hbs',
            footer: './views/partials/footer.hbs',
        }).then(function(part) {
            console.log(part);
            this.render('../views/auth/login.hbs', viewData).swap();
            clearStates(viewData);
        });
    }

    postLogin() {

        const { userName, password } = this.params;
        formData = { userName, password };
        let isValid = loginValidation(formData);

        if (!isValid) {
            this.redirect('#/views/auth/login.hbs');
            return;
        }

        sharedData.isLoading = true;
        this.redirect('#/views/auth/login.hbs');

        db.login({ username: userName, password }).then(jsonRes => {
            sessionStorage.setItem('user', jsonRes._id);
            sessionStorage.setItem('loggedIn', jsonRes._kmd.authtoken);
            loggedIn = true;
            msgs.push({ msg: 'Login successful.', class: 'alert-success' });
            sharedData.isLoading = false;
            this.redirect('#/views/auth/login.hbs');

        }).catch(err => {
            msgs.push({ msg: err.statusText, class: 'alert-danger' });
            sharedData.userName = {};
            sharedData.userName.invalid = true;
            sharedData.password = {};
            sharedData.isLoading = false;
            this.redirect('#/views/auth/login.hbs');
        });

    }


    getSignup() {
        console.log("getSignup");
        console.log(sharedData);

        const viewData = {...sharedData, signupActive: true };
        console.log(viewData);
        if (formData && msgs.length !== 0) {
            viewData.userName.input = formData.userName;
            viewData.password.input = formData.password;
            viewData.password2.input = formData.password2;
            viewData.msgs = msgs;
        }

        this.loadPartials({
            navbar: '../views/partials/navbar.hbs',
            notifications: '../views/partials/notifications.hbs',
            footer: '../views/partials/footer.hbs',
        }).then(function(part) {
            console.log(part);
            this.render('../views/auth/sign-up.hbs', viewData).swap();
            clearStates(viewData);
        });
    }


    // postSignup() {
    //     const { username, password, password2 } = this.params;
    //     formData = { username, password2, password };
    //     let isValid = signupValidation(formData);
    postSignup() {
    
        const { fName, lName, userName, password, password2 } = this.params;
        formData = { fName, lName, userName, password, password2 };

        if (!isValid) {
            this.redirect('#/user/signup');
            return;
        }

        sharedData.isLoading = true;
        this.redirect('#/user/signup');
    //     db.signup({ username: username, password }).then(res => {
    //         console.log(res);
    //         msgs.push({ msg: 'User Created Successfully !', class: 'alert-success' })
    //         sharedData.isLoading = false;
    //         this.redirect('#/user/login');
    //         formData = {}
    //     }).catch(err => {
    //         if (err.status === 409) {
    //             msgs.push({ msg: 'User Already exists!', class: 'alert-danger' });
    //             sharedData.username = {}
    //             sharedData.username.invalid = true;
    //             sharedData.password = {};
    //             sharedData.password2 = {};
    //             sharedData.isLoading = false;
    //             this.redirect('#/user/signup');
    //         }
    //     })
    // }
    db.signup({ fName, lName, userName, password }).then(res => {
        console.log(res);
        msgs.push({ msg: 'Sign up sucessful', class: 'alert-success' });
        sharedData.isLoading = false;
        this.redirect('#/user/signin');

    }).catch(err => {
        if (err.status === 409) {
            msgs.push({ msg: 'This username is already taken.  Please retry your request with a different username.ss', class: 'alert-danger' });
            sharedData.userName = {};
            sharedData.userName.invalid = true;
            sharedData.password = {};
            sharedData.password2 = {};
            sharedData.isLoading = false;
            this.redirect('#/user/signup');
        }
    });
}


    getLogout() {

        let token = sessionStorage.getItem('loggedIn');
        db.logout(token).then(res => {
            msgs.push({ msg: 'Logout successful.', class: 'alert-success' });
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('user');
            loggedIn = false;
            this.redirect('/user/login');
        }).catch(err => {
            msgs.push({ msg: err.statusText, class: 'alert-danger' });
            this.redirect('/');
        });
    }
}