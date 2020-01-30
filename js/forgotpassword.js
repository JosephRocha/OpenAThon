$('form').submit(function (event) {
  event.preventDefault();
  var username = jQuery("#username").val();

    var poolData = {
        UserPoolId : 'us-east-1_0EX0SzGKU',
        ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
    };
    
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });
    
    cognitoUser.forgotPassword({
        onSuccess: function(result) {
            console.log('call result: ' + result);
            window.location.replace("signin.html");
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
            var verificationCode = prompt('Please input verification code ', '');
            var newPassword = prompt('Enter new password ', '');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
});
    
    
    