const register = (
    <div class="card shadow bg-white rounded">
        <div class="card-body">
        <form class="form">
            <div id="errorMessage"></div>
            <small id="emailHelp" class="form-text text-muted">Our records indicate you have not submitted an application! Please fill out and submit the form below to apply.</small>
            <br/>
                
            <h1 class="h3 mb-3 font-weight-normal">RowdyHacks 2020 Application</h1>
            
            <label for="firstname">First Name</label>
            <input id="firstname" class="form-control" placeholder="First Name" required autofocus/>
            <br/>
            
            <label for="lastname">Last Name</label>
            <input id="lastname" class="form-control" placeholder="Last Name" required autofocus/>
            <br/>
            
            
            <div class="form-group">
            <label for="shirtsize">Shirt Size</label>
            <select id="shirtsize" class="form-control">
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
            
            <div class="form-group">
            <label for="school">What school do you attend?</label>
            <input id="school" class="form-control" placeholder="What school do you attend?" required autofocus/>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="major">What is your major?</label>
            <input id="major" class="form-control" placeholder="What is your major?" required autofocus/>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="classification">What is your most current level of study?</label>
            <select id="classification" class="form-control">
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Master's Student</option>
                <option>PhD Student</option>
            </select>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="pronouns">What are your preferred pronouns?</label>
            <select id="pronouns" class="form-control">
                <option>She/Her</option>
                <option>He/Him</option>
                <option>They/Them</option>
            </select>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="ethnicity">How do you ethnically identify?</label>
            <select id="ethnicity" class="form-control">
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
              
            <div class="form-group">
            <label for="travel">How do you plan to travel to RowdyHacks this year?</label>
            <select id="travel" class="form-control">
                <option>Driving</option>
                <option>Charter Bus</option>
                <option>Walking</option>
                <option>Biking</option>
                <option>Public Transportation</option>
                <option>Flying</option>
            </select>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="dietaryinfo">Do you have any dietary restrictions?</label>
            <textarea id="dietaryinfo" class="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="accomodations">We want all of our hackers to be as rowdy as possible! Are there any other accommodations you might need?</label>
            <textarea id="accomodations" class="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="exampleFormControlFile1">Please Upload a copy of your resume</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
            </div>
            <br/>
             
            <div class="form-group">
            <label for="track">What track are you most interested in joining?</label>
            <select id="track" class="form-control">
                <option>Learner</option>
                <option>Security</option>
                <option>Social Good</option>
                <option>General</option>
            </select>
            </div>
            <br/>
            
            <div class="form-group">
            <label for="lookingforwardto">What are you looking forward to about RowdyHacks this year?</label>
            <textarea id="lookingforwardto" class="form-control" rows="3"></textarea>
            </div>
            <br/>
            
            <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label class="form-check-label" for="defaultCheck1">
                    I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct.</a>
                </label>
            </div>
            </div>
            <br/>
            
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label class="form-check-label" for="defaultCheck1">
               I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.
            </label>
            </div>
            <br/>
            
            <button class="btn btn-lg btn-primary btn-block" type="submit">Submit Application</button>
        </form>
        </div>
        </div>
    );

const statusDisplay = (
 <div class="card shadow bg-white rounded">
        <div class="card-body">
            <h2> Your application has been received! </h2>
            You may check the status of your application at any time here. Once a decision has been made you will receive an email.
            <br/>
            <br/>
            <button type="button" class="btn btn-primary">Edit Application</button>
            <small id="emailHelp" class="form-text text-muted">For support please contact: *insert support email here*</small>
        </div>
 </div>
);

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
    
  //Check status
    //If non existant
   // ReactDOM.render(register, document.getElementById('root'));
    
  //Else if registered display play button.
    ReactDOM.render(statusDisplay, document.getElementById('root'));
  //Else if accepted display accept button.

  //Else if accepted display status.
    
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