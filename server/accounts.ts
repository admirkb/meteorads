
//Accounts.onCreateUser(function (options, user) {
//    console.log('Creating user: ' + user.username);
//    return user;
//});

ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "301911750443-0vpjraqkbskvql8ro12uld5g5tg6a1c4.apps.googleusercontent.com",
    loginStyle: "popup",
    secret: "y35Z6mq-PYGkI1pdZ0r84I8y"
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "1628349814148181",
    loginStyle: "popup",
    secret: "c64d216aa341dda126241cdaed3cf60e"
});

ServiceConfiguration.configurations.remove({
    service: "twitter"
});

ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: "tBiex3W99DKkjpYpRxGDiHgMD",
    loginStyle: "popup",
    secret: "kQd7BQ5rdgqS8Ch1ZycPwVIcJYKGlnjDq171SawajPnQJbkxxJ"
});