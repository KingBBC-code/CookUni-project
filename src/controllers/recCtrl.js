import { createValidation } from "../validation";

function clearStates(viewData) {
    msgs = [];
    sharedData = {};
    viewData = {};
    console.log(viewData);
}


function isAuth() {
    if (sessionStorage.getItem('loggedIn')) {
        return true;
    } else {
        return false;
    }
}


export default class Recipe {
    getHome() {
        const viewData = {...sharedData, homeActive: true, loggedIn: isAuth(), msgs };

        if (allRecipes.length != 0) {
            // No need to fetch from the server 
            viewData.allRecipes = allRecipes;
            viewData.isLoading = false;
            this.loadPartials({ header:'../views/partials/header.hbs', navbar: '../views/partials/navbar.hbs', notifications: '../views/partials/notifications.hbs' }).then(function() {
                this.render('../views/app/home.hbs', viewData).swap();
                clearStates(viewData);
            });

        } else {
            // Go and fetch from the server 

            this.loadPartials({ header:'../views/partials/header.hbs', navbar: '../views/partials/navbar.hbs', notifications: '../views/partials/notifications.hbs' }).then(function() {

                viewData.isLoading = true;
                this.render('../views/app/home.hbs', viewData).swap();
                db.get('recipes', null, { username: 'guest', password: 'guest' }).then(res => {
                    viewData.allRecipes = res;
                    viewData.isLoading = false;
                    allRecipes = res;
                    this.render('../views/app/home.hbs', viewData).swap();
                    clearStates(viewData);
                });
            });
        }

    }

    getCreate() {
        const viewData = {loggedIn: isAuth() };
        // if (formData && msgs.length !== 0) {
        //     viewData.meal ? viewData.meal.input = formData.meal : '';
        //     viewData.ingredients ? viewData.ingredients.input = formData.ingredients : '';
        //     viewData.prepMethod ? viewData.prepMethod.input = formData.prepMethod : '';
        //     viewData.desc ? viewData.desc.input = formData.desc : '';
        //     viewData.foodImageURL ? viewData.foodImageURL.input = formData.foodImageURL : '';
        //     viewData.msgs = msgs;
        // }

        this.loadPartials({
            header: '../views/partials/header.hbs',
            footer: '../views/partials/footer.hbs',
            notifications: '../views/partials/notifications.hbs',
        }).then(function() {
            this.render('../views/app/create.hbs', viewData).swap();
            clearStates(viewData);
        })
    }


    postCreate() {
        let { meal, ingredients, prepMethod, desc, foodImageURL, category } = this.params;
        // formData = { meal, ingredients, prepMethod, description, price, foodimageUrl, category, id };
        let formData = {
            "meal": meal,
            "ingredients": ingredients.split(", "),
            "prepMethod": prepMethod,
            "description": description,
            "foodImageURL": foodImageURL,
            "category": category,
            "likesCounter": 0,
            "categoryImageURL": `https://${category}`
        };
        let isValid = createValidation(formData);

        if (isValid) {
            let serverData = {...formData, user: sessionStorage.getItem('user') }
            db.post('recipes', serverData, sessionStorage.getItem('loggedIn')).then(res => {
                msgs.push({ msg: 'Recipe created successully !', class: 'alert-success' });
                allRecipes.push({...serverData, _id: res._id });
                this.redirect('#/');
            })
        } else {
            this.redirect('#/Recipe/create');
        }
    }

    getShare() {
        const viewData = { shareActive: true, loggedIn: isAuth(), msgs };

        let myRecipes = allRecipes.filter(rec => rec.user == sessionStorage.getItem('user'));

        
        viewData.myRecipes = myRecipes;
        this.loadPartials({ header:'../views/partials/header.hbs', navbar: '../views/partials/navbar.hbs', notifications: '../views/partials/notifications.hbs' }).then(function() {
            this.render('../views/app/share.hbs', viewData).swap();

            clearStates(viewData);
        });


    }

    getLikesCounter() {
        let id = this.params["id"];
        recipe.likesCounter++;
        put("appdata", `recipes/${id}`, "Kinvey")
            .then(() => {
                displaySuccess("You liked that recipe.");
                this.redirect(`/recipe/${id}`);
            })
            .catch(handleError);
    }

    getDetails() {
        const product = allRecipes.find(item => item._id.toString() === this.params.id);
      
        if (product) {
            let viewData = { product, loggedIn: isAuth(), msgs }
            this.loadPartials({ header:'../views/partials/header.hbs', navbar: '../views/partials/navbar.hbs', notifications: '../views/partials/notifications.hbs' }).then(function() {
                this.render('../views/app/share.hbs', viewData).swap();
                clearStates(viewData);
            });
        }
    }


    getDelete() {
        let id = this.params.id;
        db.delete('recipes', id, sessionStorage.getItem('loggedIn')).then(() => {
            allRecipes = allRecipes.filter(rec => rec._id !== id);
            this.redirect('#/Recipe/share')
        })
    }


    getEdit() {

        let id = this.params.id
        let Recipe = allRecipes.find(rec => rec._id == id);

        let viewData = {
            loggedIn: isAuth(),
            editMode: true,
            id: Recipes._id,
            msgs,
            ...sharedData
        };

        if (Object.keys(sharedData).length > 1) {
            viewData.meal.input = formData.meal;
            viewData.ingredients.input = formData.ingredients;
            viewData.prepMethod.input = formData.prepMethod;
            viewData.desc.input = formData.desc;
            viewData.foodImageURL.input = formData.foodImageURL;
            viewData.category.input = formData.category;
        } else {
            viewData.meal = { input: recipes.meal };
            viewData.ingredients = { input: recipes.ingredients };
            viewData.prepMethod = { input: recipes.prepMethod };
            viewData.desc = { input: recipes.desc };
            viewData.foodImageURL = { input: recipes.foodImageURL };
            viewData.category = { input: recipes.category };
        }


        this.loadPartials({
            navbar: '../views/partials/navbar.hbs',
            notifications: '../views/partials/notifications.hbs'
        }).then(function() {
            this.render('../views/recipe/profile.hbs', viewData).swap();
            clearStates(viewData);
        });

    }

    postEdit() {
        let {   formData = { meal, ingredients, prepMethod, desc, price, foodimageUrl, category, id } } = this.params;
        formData = {   meal, ingredients, prepMethod, desc, foodImageURL}
        let isValid = createValidation(formData);


        if (isValid) {
            let serverData = {...formData, user: sessionStorage.getItem('user') }
            db.edit('recipes', id, serverData, sessionStorage.getItem('loggedIn')).then(res => {
                msgs.push({ msg: 'Recipe updated successully !', class: 'alert-success' });

                let index = allRecipes.findIndex(rec => rec._id == id);
                allRecipes[index] = {...serverData, _id: id }

                // allRecipes = allRecipes.filter(rec => rec._id !== id)
                // allRecipes.push({...serverData, _id: id })

                this.redirect('#/Recipe/share')
            })
        } else {
            this.redirect(`#/Recipe/edit/${id}`)
        }

    }
}