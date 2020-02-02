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
                        <br/>
                        <div className="checkbox mb-3"></div>
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
          window.location.replace("signin.html");
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

ReactDOM.render(<ChangePasswordForm/>, document.getElementById('root'));
