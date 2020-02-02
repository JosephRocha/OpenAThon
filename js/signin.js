$('form').submit(function (event) {
  event.preventDefault();
  var username = jQuery("#username").val().toLowerCase();;
  var password = jQuery("#password").val();

  var authenticationData = {
        Username : username,
        Password : password
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : 'us-east-1_0EX0SzGKU',
        ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            window.location.replace("index.html");
        },

        onFailure: function (err) {
            var element = document.getElementById("errorMessage");
            element.innerHTML = '';
            var alert = document.createElement("div");
            alert.className += "alert alert-danger";
            alert.innerHTML = err.message;
            element.appendChild(alert);
        }
    });
});
