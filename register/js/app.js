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

document.body.innerHTML = document.body.innerHTML.replace(/\{username\}/g, cognitoUser.signInUserSession.idToken.payload.email);

  $.ajax({
        url: "https://ikx4tw4ty9.execute-api.us-east-1.amazonaws.com/dev/search",
        type: "POST",
        data: JSON.stringify({"body": {"accessToken": cognitoUser.signInUserSession.accessToken.jwtToken}}), 
        datatype: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (data) {
            if(data['body']['Item']){
                ReactDOM.render(statusDisplay, document.getElementById('root'));
            }else{
                const element = <MyForm name="Sara" />;
                ReactDOM.render(element, document.getElementById('root'));
            }
            console.log(data);
        }
  });


class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    
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
            window.location.replace("index.html");
        }
    });
    const data = new FormData(event.target);

  }

  render() {
    return (
      <div className="card shadow bg-white rounded">
        <div className="card-body">
        <form className="form" onSubmit={this.handleSubmit}>
            <div id="errorMessage"></div>
            <small id="emailHelp" className="form-text text-muted">Our records indicate you have not submitted an application! Please fill out and submit the form below to apply.</small>
            <br/>
                
            <h1 className="h3 mb-3 font-weight-normal">RowdyHacks 2020 Application</h1>
            
            <label htmlFor="firstname">First Name</label>
            <input id="firstname" className="form-control" placeholder="First Name" required autoFocus/>
            <br/>
            
            <label htmlFor="lastname">Last Name</label>
            <input id="lastname" className="form-control" placeholder="Last Name" required autoFocus/>
            <br/>
            
            
            <div className="form-group">
            <label htmlFor="shirtsize">Shirt Size</label>
            <select id="shirtsize" className="form-control">
                <option>XXS</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
                <option>3XL</option>
                <option>4XL</option>
             </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="school">What school do you attend?</label>
            <input id="school" className="form-control" placeholder="What school do you attend?" required autoFocus/>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="major">What is your major?</label>
            <input id="major" className="form-control" placeholder="What is your major?" required autoFocus/>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="classification">What is your most current level of study?</label>
            <select id="classification" className="form-control">
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Master's Student</option>
                <option>PhD Student</option>
            </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="pronouns">What are your preferred pronouns?</label>
            <select id="pronouns" className="form-control">
                <option>She/Her</option>
                <option>He/Him</option>
                <option>They/Them</option>
            </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="ethnicity">How do you ethnically identify?</label>
            <select id="ethnicity" className="form-control">
                <option>American Indian or Alaskan Native</option>
                <option>Asian</option>
                <option>Black or African-American</option>
                <option>Hispanic or Latino</option>
                <option>Native Hawaiian or other Pacific Islander</option>
                <option>White</option>
                <option>Prefer not to answer</option>
            </select>
            </div>
            <br/>
              
            <div className="form-group">
            <label htmlFor="travel">How do you plan to travel to RowdyHacks this year?</label>
            <select id="travel" className="form-control">
                <option>Driving</option>
                <option>Charter Bus</option>
                <option>Walking</option>
                <option>Biking</option>
                <option>Public Transportation</option>
                <option>Flying</option>
            </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="dietaryinfo">Do you have any dietary restrictions?</label>
            <textarea id="dietaryinfo" className="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="accomodations">We want all of our hackers to be as rowdy as possible! Are there any other accommodations you might need?</label>
            <textarea id="accomodations" className="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Please Upload a copy of your resume</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
            </div>
            <br/>
             
            <div className="form-group">
            <label htmlFor="track">What track are you most interested in joining?</label>
            <select id="track" className="form-control">
                <option>Learner</option>
                <option>Security</option>
                <option>Social Good</option>
                <option>General</option>
            </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="lookingforwardto">What are you looking forward to about RowdyHacks this year?</label>
            <textarea id="lookingforwardto" className="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div className="form-group">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct.</a>
                </label>
            </div>
            </div>
            <br/>
            
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
            <label className="form-check-label" htmlFor="defaultCheck2">
               I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.
            </label>
            </div>
            <br/>
            
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit Application</button>
        </form>
        </div>
        </div>
    );
  }
}


const statusDisplay = (
 <div className="card shadow bg-white rounded">
        <div className="card-body">
            <h2> Your application has been received! </h2>
            You may check the status of your application at any time here. Once a decision has been made you will receive an email.
            <br/>
            <br/>
            <button type="button" className="btn btn-primary">Edit Application</button>
            <small id="emailHelp" className="form-text text-muted">For support please contact: *insert support email here*</small>
        </div>
 </div>
);



function logout(){
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
    window.location.replace("signin.html");
  }
}