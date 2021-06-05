export const loginValidation = ({ userName, password }) => {
//remove email its not required
    sharedData = { userName:{}, password: {} };

    if (!userName) {
        msgs.push({ msg: 'Username is required', class: 'alert-danger' });
        sharedData.userName.invalid = true;

    } else if (!validator.isLength(userName,{min: 2, max:15})) {
        msgs.push({ msg: 'Username Should Be 3 Characters', class: 'alert-danger' });
        sharedData.userName.invalid = true;
    } else {
        sharedData.userName.valid = true;
    }

    

    if (!password) {
        msgs.push({ msg: 'Password Field is required', class: 'alert-danger' });
        sharedData.password.invalid = true;
    } else if (!validator.isLength(password, { min: 6, max: 15 })) {
        msgs.push({ msg: 'Password should be 6-15 characters', class: 'alert-danger' });
        sharedData.password.invalid = true;
    } else {
        sharedData.password.valid = true;
    }

    let isValid = msgs.length === 0;
    return isValid;
};


export const signupValidation = ({ fName, lName, userName, password, password2 }) => {
    loginValidation({ userName, password});
    sharedData.password2 = {};
    if (!fName) {
            msgs.push({ msg: 'First Name is required', class: 'alert-danger' });
            sharedData.fName.invalid = true;

        } else if (!validator.isLength(fName,{min: 2, max:15})) {
            msgs.push({ msg: 'First Name Should Be 2 Characters', class: 'alert-danger' });
            sharedData.fName.invalid = true;
        } else {
            sharedData.fName.valid = true;
        }

    if (!lName) {
            msgs.push({ msg: 'Last Name is required', class: 'alert-danger' });
            sharedData.lName.invalid = true;

        } else if (!validator.isLength(lname,{min: 2, max:15})) {
            msgs.push({ msg: 'Last Name Should Be 2 Characters', class: 'alert-danger' });
            sharedData.lName.invalid = true;
        } else {
            sharedData.lName.valid = true;
        }
    if (!password2) {
        msgs.push({ msg: 'Confirmed Password Field is required', class: 'alert-danger' });
        sharedData.password2.invalid = true;
        } else if (!validator.equals(password, password2)) {
            msgs.push({ msg: 'Password not matching', class: 'alert-danger' });
            sharedData.password2.invalid = true;
        } else {
            sharedData.password2.valid = true;
        }

    let isValid = msgs.length === 0;
    return isValid;
};


export const createValidation = ({ meal, ingredients, prepMethod, description, foodImageURL, category }) => {
    if (meal.length >= 4 &&
        ingredients.length >= 2 &&
        prepMethod.length >= 10 &&
        description.length >= 10 &&
        (foodImageURL.startsWith("http://") || foodImageURL.startsWith("https://")) &&
        category) {
        return true;
    }
    if (!validateData) {
        sharedData.recipe = { invalid: true, valid: false, msg: 'Provide recipe' };
    } else
    if (!validator.isLength(recipe, { min: 4 })) {
        sharedData.recipe = { invalid: true, valid: false, msg: 'Recipe should be at least 4 characters' };
    } else {
        sharedData.recipe = { valid: true, invalid: false };
    }

    if (!meal) {
        sharedData.meal = { invalid: true, valid: false, msg: 'Provide meal' };
    } else if (!validator.isLength(meal, { min: 4 })) {
        sharedData.meal = { invalid: true, valid: false, msg: 'meal should be at least 4 characters' };
    } else {
        sharedData.meal = { valid: true, invalid: false };
    }

    if (sharedData.recipe.invalid || sharedData.meal.invalid) {
        msgs.push({ msg: 'Check your input', class: 'alert-danger' });
    }

    let isValid = msgs.length === 0;
    return isValid;
};

// export const createValidation = ({ meal, ingredients, prepMethod, desc, imageUrl, category }) => {

//     if (!meal) {
//         sharedData.meal = { invalid: true, valid: false, msg: 'Provide Meal' };
//     } else if (!validator.isLength(meal, { min: 4 })) {
//         sharedData.meal = { invalid: true, valid: false, msg: 'Mealshould be at least 4 characters' };
//     } else {
//         sharedData.meal = { valid: true, invalid: false };
//     }

//     if (!ingredients) {
//         sharedData.ingredients = { invalid: true, valid: false, msg: 'Provide ingredients' };
//     } else if (!validator.isLength(ingredients, { min: 4 })) {
//         sharedData.ingredients = { invalid: true, valid: false, msg: 'ingredients should be at least 4 characters' };
//     } else {
//         sharedData.ingredients = { valid: true, invalid: false };
//     }


//     if (!prepMethod) {
//         sharedData.prepMethod = { invalid: true, valid: false, msg: 'Provide prepMethod' };
//     } else if (!validator.isLength(prepMethod, { min:10 })) {
//         sharedData.prepMethod = { invalid: true, valid: false, msg: 'prepMethod should be 10 characters long' };
//     } else {
//         sharedData.prepMethod = { valid: true, invalid: false };
//     }



//     if (!desc) {
//         sharedData.desc = { invalid: true, valid: false, msg: 'Provide Description' };
//     } else if (!validator.isLength(desc, { min: 10 })) {
//         sharedData.desc = { invalid: true, valid: false, msg: 'Description should be at least 10 characters' };
//     } else {
//         sharedData.desc = { valid: true, invalid: false };
//     }

//     if (!imageUrl) {
//         sharedData.imageUrl = { invalid: true, valid: false, msg: 'Provide ImageUrl' };
//     } else {
//         sharedData.imageUrl = { valid: true, invalid: false };
//     }

//     if (!category) {
//         sharedData.category = { invalid: true, valid: false, msg: 'Provide category' };
//     } else if (!validator.isLength(desc, { min: 10 })) {
//         sharedData.desc = { invalid: true, valid: false, msg: 'Description should be at least 10 characters' };
//     } else {
//         sharedData.desc = { valid: true, invalid: false };
//     }
//     if (sharedData.meal.invalid ||
//         sharedData.ingredients.invalid ||
//         sharedData.desc.invalid ||
//         sharedData.imageUrl.invalid ||
//         sharedData.prepMethod.invalid) {
//         msgs.push({ msg: 'Check your input', class: 'alert-danger' });
//     }

//     let isValid = msgs.length === 0;
//     return isValid;

// };