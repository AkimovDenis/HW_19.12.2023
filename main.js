let signUp = document.querySelector("#signup");

signUp.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = (signUp.email.value.search("@") > -1 && signUp.email.value != "") ? true : false;
    let password = (signUp.password.value === signUp.confirm.value);

    if(email && password && !getUserByEmail(signUp.email.value)) {
        // localStorage.setItem("email", signUp.email.value);
        // localStorage.setItem("password", signUp.password.value);

        let usersStorage;
        if (localStorage.getItem("users") == null) {
            usersStorage = {};
            usersStorage.users = [];
        }
        else {
            usersStorage = JSON.parse(localStorage.getItem("users"));
        }

        let newUser = {};
        newUser.email = signUp.email.value;
        newUser.password = signUp.password.value;        
        usersStorage.users.push(newUser);

        localStorage.setItem("users", JSON.stringify(usersStorage));
    }    
    else {
        alert("Invalid data");
    }
});

let signIn = document.querySelector("#signin");
signIn.addEventListener("submit", function(event) {
    event.preventDefault();
    if (getStatusAutorization(signIn.email.value, signIn.password.value)) {
        usersStorage.logs = [];
        alert("You're in!");
    }
    else {
        alert("Who are you?");
    }
})

// function getUserByEmail() {
//     let storage = JSON.parse(localStorage.getItem("users"));
//     for(users of storage.users) {
//         console.log(users.email);
//     }
// }

function getUserByEmail(email) {
    let storage = JSON.parse(localStorage.getItem("users"));
    for(user of storage.users) {
        if (user.email.toLowerCase() == email.toLowerCase()) {
            return true;
        }        
    }
    return false;
}

function getStatusAutorization(email, password) {
    let storage = JSON.parse(localStorage.getItem("users"));
    for(user of storage.users) {
        if ((user.email.toLowerCase() == email.toLowerCase()) && (user.password == password)) {
            return true;
        }        
    }
    return false;
}