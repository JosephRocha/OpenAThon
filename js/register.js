function registerUser(username, email, password){
  var poolData = { UserPoolId : 'us-east-1_0EX0SzGKU',
      ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
      Name : 'email',
      Value : email
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(email, password, attributeList, null, function(err, result){
      if (err) {
          displayErrorMessage(err.message);
          return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      displaySuccessMessage();
  });
}

function displayErrorMessage(message){
  node = document.getElementById('errorMessage');
  node.innerHTML = '';
  var alert = document.createElement("div");
  alert.className += "alert alert-danger";
  alert.innerHTML = message;
  node.appendChild(alert);
}

function displaySuccessMessage(){
  node = document.getElementById('errorMessage');
  node.innerHTML = '';
  var alert = document.createElement("div");
  alert.className += "alert alert-success";
  alert.innerHTML = "Success! A confirmation email has been sent.";
  node.appendChild(alert);
}


$('form').submit(function (event){
  event.preventDefault();
  var username = jQuery("#username").val();
  var email = jQuery("#email").val();
  var password = jQuery("#password").val();
  var confirmPassword = jQuery("#confirmPassword").val();
  if(password == confirmPassword){
    registerUser(username, email, password);
  }else{
    displayErrorMessage("Password confirmation does not match password.")
  }
}
);
