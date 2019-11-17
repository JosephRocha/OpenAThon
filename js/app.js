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
    
$('form').submit(function (event){
   console.log("WOW");
    event.preventDefault();
    var firstname = jQuery("#firstname").val();
    var lastname = jQuery("#lastname").val();
    console.log(firstname);
    console.log(lastname);
    $.ajax({
        url: "https://ikx4tw4ty9.execute-api.us-east-1.amazonaws.com/dev/user",
        type: "POST",
        data: JSON.stringify({"body": {"accessToken": cognitoUser.signInUserSession.accessToken.jwtToken, 
                                       "userId": cognitoUser.username,
                                       "firstname": jQuery("#firstname").val(),
                                       "lastname": jQuery("#lastname").val(),
                                       "shirtsize": jQuery("#shirtsize").val(),
                                       "school": jQuery("#school").val(),
                                       "major": jQuery("#major").val(),
                                       "classification": jQuery("#classification").val(),
                                       "pronouns": jQuery("#pronouns").val(),
                                       "ethnicity": jQuery("#ethnicity").val(),
                                       "travel": jQuery("#travel").val(),
                                       "dietaryinfo": jQuery("#dietaryinfo").val(),
                                       "accomodations": jQuery("#accomodations").val(),
                                       "track": jQuery("#track").val(),
                                       "lookingforwardto": jQuery("#lookingforwardto").val(),
                                      }}),
        datatype: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (data) {
            alert("Your application has been successfully received!");
        }
    });
});
}
main();