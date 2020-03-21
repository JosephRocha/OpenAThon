class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = jQuery("#username").val().toLowerCase();

    var poolData = {
        UserPoolId : 'us-east-1_0EX0SzGKU',
        ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
    };
    
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });
    
    cognitoUser.forgotPassword({
        onSuccess: function(result) {
        ReactDOM.render(<ConfirmNewPasswordForm username={username}/>, document.getElementById('root'));
    },
        onFailure: function(err) {
            console.log(err);
        }
    });
  }

  render() {
    return (
      <div className="card shadow bg-white rounded">
                <img className="mb-12" src="res/AbstractRowdy.png" alt="" width="100" height="100" style={{display: 'block', margin: 'auto', marginTop: '5%'}}/>
                <div className="card-body">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <div id="errorMessage"></div>
                        <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email</label>
                        <input id="username" className="form-control" placeholder="Email" required autoFocus/>
                        <p className="text-right"><a href="#" onClick={(e) => ReactDOM.render(<SignInForm/>, document.getElementById('root'))}>Remembered Password</a></p>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                    </form>
                </div>
                <p className="mt-4 mb-2 text-muted">&copy; RowdyHacks - 2020</p>
            </div>
        );
  }
}

class ConfirmNewPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: props.username};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    

    var poolData = {
        UserPoolId : 'us-east-1_0EX0SzGKU',
        ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
    };
    
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: this.state.username,
        Pool: userPool
    });
      
    var verificationCode = jQuery("#verificationcode").val();
    var newPassword = jQuery("#password").val();
    var confirmNewPassword = jQuery("#confirmPassword").val();
    cognitoUser.confirmPassword(verificationCode, newPassword, {
         onSuccess: function(result) {
           ReactDOM.render(<SignInForm success={true} successText="Success! You have successfully changed your password."/>, document.getElementById('root'))
         },
        onFailure: function(err) {
            console.log(err);
        }
    });
}
  
  render() {
    return (
      <div className="card shadow bg-white rounded">
                <img className="mb-12" src="res/AbstractRowdy.png" alt="" width="100" height="100" style={{display: 'block', margin: 'auto', marginTop: '5%'}}/>
                <div className="card-body">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <div id="errorMessage"></div>
                        <h1 className="h3 mb-3 font-weight-normal">Enter Verification Code and New Password</h1>
                        <label htmlFor="inputVerificationCode" className="sr-only">Verification Code</label>
                        <input id="verificationcode" className="form-control" placeholder="Verification Code" required autoFocus/>
                        <br/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password" required/>
                        <br/>
                        <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required/>
                        <div className="checkbox mb-3"></div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                    </form>
                </div>
                <p className="mt-4 mb-2 text-muted">&copy; RowdyHacks - 2020</p>
            </div>
    );
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: props.username};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      var email = jQuery("#email").val().toLowerCase();
      var password = jQuery("#password").val();
      var confirmPassword = jQuery("#confirmPassword").val();

      var oneNumber = /[0-9]/.test(password);
      var oneUpper = /[A-Z]/.test(password);
      var oneUnder = /[a-z]/.test(password);

       if(password.length < 8 || !oneUnder || !oneUpper || !oneNumber){
          var node = document.getElementById('errorMessage');
          node.innerHTML = '';
          var alert = document.createElement("div");
          alert.className += "alert alert-danger";
          alert.innerHTML = "Password must be at least 8 characters long and contain at least one numeric, uppercase, and lowercase character";
          node.appendChild(alert);
       }else if(password != confirmPassword){
          var node = document.getElementById('errorMessage');
          node.innerHTML = '';
          var alert = document.createElement("div");
          alert.className += "alert alert-danger";
          alert.innerHTML = "Password confirmation does not match password.";
          node.appendChild(alert);
       }else{
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
                  console.log(err);
                  var node = document.getElementById('errorMessage');
                  node.innerHTML = '';
                  var alert = document.createElement("div");
                  alert.className += "alert alert-danger";
                  alert.innerHTML = err.message;
                  node.appendChild(alert);
                  return;
              }
              var cognitoUser = result.user;
              console.log('user name is ' + cognitoUser.getUsername());
              ReactDOM.render(<SignInForm success={true} successText="Success! A confirmation email has been sent."/>, document.getElementById('root'))
              
          });
        }
}
  
  render() {
    return (
      <div className="card shadow bg-white rounded">
                <img className="mb-12" src="res/AbstractRowdy.png" alt="" width="100" height="100" style={{display: 'block', margin: 'auto', marginTop: '5%'}}/>
                <div className="card-body">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <div id="errorMessage"></div>
                        <h4 className="h4 mb-3 font-weight-normal">RowdyHacks Account Registration</h4>
                        <label htmlFor="inputEmail" className="sr-only">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="Email" required autoFocus/>
                        <br/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password" required/>
                        <br/>
                        <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required/>
                        <p className="text-muted">Password must be at least 8 characters long, include an uppercase, and a number.</p>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                        <br/>
                        Already have an account? <a href="#" onClick={(e) => ReactDOM.render(<SignInForm/>, document.getElementById('root'))}>Sign In</a>
                    </form>  
                </div>
                <p className="mt-4 mb-2 text-muted">&copy; RowdyHacks - 2020</p>
            </div>
    );
  }
}

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: props.username,
                  success: props.success,
                  successText: props.successText};
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      var username = jQuery("#username").val().toLowerCase();
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
}
  
  render() {
    return (
      <div className="card shadow bg-white rounded">
                <img className="mb-12" src="res/AbstractRowdy.png" alt="" width="100" height="100" style={{display: "block", margin: "auto", marginTop: "5%"}}/>
                <div className="card-body">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <div id="errorMessage">{this.state.success == true ? 
                                                      <div className="alert alert-success">{this.state.successText}</div>
                                                : null}
                        </div>
                        <h1 className="h3 mb-3 font-weight-normal">RowdyHacks Sign In</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email</label>
                        <input id="username" className="form-control" placeholder="Email" required autoFocus/>
                        <br/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password" required/>
                        <div className="checkbox mb-3">
                        <p className="text-right"><a href="#" onClick={(e) => ReactDOM.render(<ChangePasswordForm/>, document.getElementById('root'))}>Forgot password?</a></p>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                    <br/>
                    RowdyHacks Registration is now closed. You can still apply if you have an account.
                </div>
                <p className="mt-4 mb-2 text-muted">&copy; RowdyHacks - 2020</p>
            </div>
    );
  }
}

ReactDOM.render(<SignInForm/>, document.getElementById('root'));
