function retrieveUser(){
  var data = {
        UserPoolId : 'us-east-1_0EX0SzGKU',
        ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                window.location.replace("signin.html");
            }
        });
    }
    return cognitoUser;
}

function retrieveData(token){
  $.ajax({
          url: "https://fmo0lm1z4l.execute-api.us-east-1.amazonaws.com/prod/item",
          type: "GET",
          datatype: 'json',
          crossDomain: true,
          contentType: 'application/json',
          headers: {"Authorization": token},
          success: function (data) {
              console.log("got data")
          }
      });
}

function logout(){
  var cognitoUser = retrieveUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
    window.location.replace("signin.html");
  }
}

function main(){
  var cognitoUser = retrieveUser();
  if(cognitoUser == null){
    window.location.replace("signin.html");
  }
  document.body.innerHTML = document.body.innerHTML.replace(/\{username\}/g, "@"+cognitoUser.username);
  retrieveData(cognitoUser.signInUserSession.idToken.jwtToken);
}

main();
