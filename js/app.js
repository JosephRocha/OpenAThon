var data = {
    UserPoolId : 'us-east-1_0EX0SzGKU',
    ClientId : 'dosfp2tvj9r5d4u3ssn29gau6'
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);

var cognitoUser = userPool.getCurrentUser();
if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
        if (err) {
            window.location.replace("login.html");
        }
    });
} else {
    window.location.replace("login.html");
}
if(cognitoUser.signInUserSession == null){
    window.location.replace("login.html");
}
document.getElementById('navbarDropdownMenuLink').innerHTML = cognitoUser.signInUserSession.idToken.payload.email

var UserInfo = null;

fetch('https://api.rowdyhacks.io/v1/search', {
    method: 'POST',
    body: JSON.stringify({"accessToken": cognitoUser.signInUserSession.accessToken.jwtToken}),
    headers: {Accept: 'application/json','Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then(responseJson=>{
        if(responseJson['body']['Item']){
            UserInfo = responseJson['body']['Item'];
            var element = <StatusDisplay appstatus={UserInfo.appstatus.S} firstname={UserInfo.firstname.S}/>;
            ReactDOM.render(element, document.getElementById('root'));
        }else{
            var element = <ApplicationForm/>;
            ReactDOM.render(element, document.getElementById('root'));
        }
    });

function editApplication(){
    var editForm = <ApplicationForm firstname={UserInfo.firstname.S}
    lastname={UserInfo.lastname.S}
    gender={UserInfo.gender.S} 
    shirtsize={UserInfo.shirtsize.S} 
    school={UserInfo.school.S} 
    major={UserInfo.major.S} 
    classification={UserInfo.classification.S} 
    ethnicity={UserInfo.ethnicity.S} 
    travel={UserInfo.travel.S} 
    dietaryinfo={UserInfo.dietaryinfo.S} 
    track={UserInfo.track.S} 
    joke={UserInfo.joke.S} 
    firsthear={UserInfo.firsthear.S} 
    lookingforwardto={UserInfo.lookingforwardto.S}
    phonenumber={UserInfo.phonenumber.S}
    hackathons={UserInfo.hackathons.S}
    isResubmit = {true}/>;

    ReactDOM.render(editForm, document.getElementById('root'));
}

function logout(){
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.signOut();
        window.location.replace("login.html");
    }
}

class ApplicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            gender: props.gender,
            shirtsize: props.shirtsize,
            school: props.school,
            major: props.major,
            classification: props.classification,
            ethnicity: props.ethnicity,
            travel: props.travel,
            dietaryinfo: props.dietaryinfo,
            track:props.track,
            joke: props.joke,
            firsthear: props.firsthear,
            lookingforwardto: props.lookingforwardto,
            phonenumber: props.phonenumber,
            hackathons: props.hackathons,
            age: props.age,
            isResubmit: props.isResubmit
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        $('#submitButton').prop('disabled', true);
        const element = (
                         <div>
                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Submitting...
                         </div>
        );
       ReactDOM.render(element, document.getElementById('submitButton'));

        $.ajax({
            url: "https://ikx4tw4ty9.execute-api.us-east-1.amazonaws.com/dev/user",
            type: "POST",
            data: JSON.stringify({"body": {"accessToken": cognitoUser.signInUserSession.accessToken.jwtToken, 
                                           "userId": cognitoUser.username,
                                           "firstname": jQuery("#firstname").val(),
                                           "lastname": jQuery("#lastname").val(),
                                           "phonenumber": jQuery("#phonenumber").val(),
                                           "gender": jQuery("#gender").val(),
                                           "shirtsize": jQuery("#shirtsize").val(),
                                           "school": jQuery("#school").val(),
                                           "major": jQuery("#major").val(),
                                           "classification": jQuery("#classification").val(),
                                           "ethnicity": jQuery("#ethnicity").val(),
                                           "travel": jQuery("#travel").val(),
                                           "dietaryinfo": jQuery("#dietaryinfo").val(),
                                           "track": jQuery("#track").val(),
                                           "joke": jQuery("#joke").val(),
                                           "firsthear": jQuery("#firsthear").val(),
                                           "lookingforwardto": jQuery("#lookingforwardto").val(),
                                           "hackathons": jQuery("#hackathons").val(),
                                           "age": jQuery("#age").val(),
                                           "email": cognitoUser.signInUserSession.idToken.payload.email
                                          }}),
            datatype: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function (data) {
                var file = $("#file")[0].files[0];
                if(!file){
                    window.location.replace("index.html");
                    return 
                }
                var filename = $("#file")[0].value
                if(!filename.endsWith(".pdf")){
                    const element = (
                        <div className="alert alert-danger" role="alert">
                            <p>{data['errorMessage']}Resume must be in PDF form</p>
                        </div>);
                        ReactDOM.render(element, document.getElementById('errorMessage'));
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        const button = (<button id="submitButton" className="btn btn-lg btn-primary btn-block " type="submit">Submit Application</button>);
                        ReactDOM.render(button, document.getElementById("buttonX"));
                        return;
                }
                $.ajax({
                    type: 'PUT',
                    url: data['body'],
                    headers: {"Content-Type": "application/pdf"},
                    processData: false,
                    data: file,
                    success: function () {
                        window.location.replace("index.html");
                    },
                    error: function (err) {
                        const element = (
                        <div className="alert alert-danger" role="alert">
                            <p>{data['errorMessage']}. Refresh the page and try again</p>
                            <p>If the problem persists please contact team@rowdyhacks.org or text support at (210) 551 8620</p>
                        </div>);
                        ReactDOM.render(element, document.getElementById('errorMessage'));
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }});
            },
            error: function (err) {
                    const element = (
                    <div className="alert alert-danger" role="alert">
                        <p>Internal Server Error, Refresh the page and try again</p>
                        <p>If the problem persists please contact team@rowdyhacks.org or text support at (210) 551 8620</p>
                    </div>);
                    ReactDOM.render(element, document.getElementById('errorMessage'));
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
            
            {this.state.isResubmit == true ?
                <div>
                <button type="button" className="btn btn-danger" style={{float: 'right'}} onClick={(e) => ReactDOM.render(<StatusDisplay appstatus={UserInfo.appstatus.S} firstname={UserInfo.firstname.S}/>, document.getElementById('root'))}>Cancel Edit</button>
                </div>
                : 
                <small id="emailHelp" className="form-text text-muted">Our records indicate you have not submitted an application! Please fill out and submit the form below to apply.</small>}
          
            <br/>

            <h1 className="h3 mb-3 font-weight-normal text-center">RowdyHacks 2020 Application</h1>

                                                                                                                                                                                                                                      
            <label htmlFor="firstname">What is your first name?</label>
            <input name="firstname" id="firstname" className="form-control" placeholder="First Name" value={this.state.firstname || ''} onChange={this.handleChange} required autoFocus/>
            <br/>

            <label htmlFor="lastname">What is your last name?</label>
            <input name="lastname" id="lastname" className="form-control" placeholder="Last Name" value={this.state.lastname || ''} onChange={this.handleChange} required />
            <br/>
            
            <div className="form-group">
            <label htmlFor="age">What is your age range?</label>
            <select name="age" id="age" className="form-control" value={this.state.age || ''} onChange={this.handleChange} >
            <option>18-24</option>
            <option>25-30</option>
            <option>31-40</option>
            <option>40 and Older</option>
            </select>
            </div>
            <br/>                                                                                                                  
                                                                                                                   
            <div className="form-group">
            <label htmlFor="gender">What gender do you identify as?</label>
            <select name="gender" id="gender" className="form-control" value={this.state.gender || ''} onChange={this.handleChange} >
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            </select>
            </div>
            <br/>
                                                                                                                          
            <label htmlFor="phonenumber">What is your phone number?</label>
            <input name="phonenumber" id="phonenumber" className="form-control" placeholder="123 456 7890" value={this.state.phonenumber || ''} onChange={this.handleChange} required />
            <br/>                                                                                                                      

            <div className="form-group">
            <label htmlFor="shirtsize">What is your shirt size?</label>
            <select name="shirtsize" id="shirtsize" className="form-control" value={this.state.shirtsize || ''} onChange={this.handleChange} >
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
            <input name="school" id="school" className="form-control" placeholder="What school do you attend?" value={this.state.school || ''} onChange={this.handleChange}  required />
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="major">What is your major?</label>
            <input name="major" id="major" className="form-control" placeholder="What is your major?" value={this.state.major || ''} onChange={this.handleChange} required />
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="classification">What is your most current level of study?</label>
            <select name="classification" id="classification" className="form-control" value={this.state.classification || ''} onChange={this.handleChange} >
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>Masters Student</option>
            <option>PhD Student</option>
            </select>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="ethnicity">How do you ethnically identify?</label>
            <select name="ethnicity" id="ethnicity" className="form-control" value={this.state.ethnicity || ''} onChange={this.handleChange} >
            <option>American Indian or Alaskan Native</option>
            <option>Asian</option>
            <option>Black or African-American</option>
            <option>Hispanic or Latino</option>
            <option>Native Hawaiian or other Pacific Islander</option>
            <option>White</option>
            <option>Other</option>
            <option>Prefer not to answer</option>
            </select>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="travel">How do you plan to travel to RowdyHacks this year?</label>
            <select name="travel" id="travel" className="form-control" value={this.state.travel || ''} onChange={this.handleChange} >
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
            <textarea name="dietaryinfo" id="dietaryinfo" className="form-control" rows="3" value={this.state.dietaryinfo || ''} onChange={this.handleChange} ></textarea>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Please upload a PDF copy of your resume to share it with our sponsors to have the opportunity to gain exposure and career opportunities.</label>
            <input name="file" type="file" id="file" className="form-control-file" validate={this.state.isResubmit == true ? null : "required"}/>
            </div>
            <br/>
                                                                                                                    
            <div className="form-group">
            <label htmlFor="hackathons">How many hackathons have you attended?</label>
            <input name="hackathons" className="form-control" type="number" value="1234" id="hackathons" value={this.state.hackathons || ''} onChange={this.handleChange} required/>
            </div>        
            <br/>                                                                                                             
                
            <div className="form-group">
            <label htmlFor="track">What track are you most interested in joining?</label>
            <select name="track" id="track" className="form-control" value={this.state.track || ''} onChange={this.handleChange} required>
            <option>Learner</option>
            <option>Security</option>
            <option>General</option>
            </select>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="joke">We want all of our hackers to be as rowdy as possible! Tell us your best tech joke.</label>
            <textarea name="joke" id="joke" className="form-control" rows="3" value={this.state.joke || ''} onChange={this.handleChange}></textarea>
            </div>
            <br/>
            
            <div className="form-group">
            <label htmlFor="firsthear">How did you first hear about RowdyHacks?</label>
            <select name="firsthear" id="firsthear" className="form-control" value={this.state.firsthear || ""} onChange={this.handleChange} required>
            <option>Major League Hacking</option>
            <option>Social Media</option>
            <option>ACM Meeting</option>
            <option>Campus Flyer/Banner</option>
            <option>Instructor</option>
            <option>Friend</option>
            <option>Other</option>
            </select>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="lookingforwardto">Why do you want to attend RowdyHacks?</label>
            <textarea name="lookingforwardto" id="lookingforwardto" className="form-control" rows="3" value={this.state.lookingforwardto || ''} onChange={this.handleChange}></textarea>
            </div>
            <br/>

            <div className="form-group">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required/>
            <label className="form-check-label" htmlFor="defaultCheck1">
            I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct.</a>
            </label>
            </div>
            </div>
            <br/>

            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" required/>
            <label className="form-check-label" htmlFor="defaultCheck2">
            I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.
            </label>
            </div>
            <br/>
            <div id="buttonX">
            <button id="submitButton" className="btn btn-lg btn-primary btn-block " type="submit">Submit Application</button>
            </div>                                                                                                           
            </form>
            </div>
            </div>
        );
    }
}

class StatusDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appstatus: props.appstatus,
            firstname: props.firstname
        }
    }
    
    render() {
        return (
            <div className="card shadow bg-white rounded">
            <div className="card-body">
            { this.state.appstatus === "APPLIED" ?
                <div>
                    <h1 className="text-center"> Thank you {this.state.firstname}! </h1>
                    <h2 className="text-center"> Your application has been received</h2>
                    <p className="text-center">You may check the status of your application at any time here. Once a decision has been made you will receive an email with further instructions.</p>
                    <div className="col text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="stepper stepper-horizontal">
                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">1</span>
                                        <span className="label">Applied</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">2</span>
                                        <span className="label">Accepted</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">3</span>
                                        <span className="label">RSVP</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">4</span>
                                        <span className="label">Checked In</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg btn-block" style={{margin: "5px"}} onClick={editApplication}>Edit Application</button>
                    </div>
                </div> 
            : this.state.appstatus === "ACCEPTED" ?
                <div>
                    <h1 className="text-center"> Congratulations {this.state.firstname}!</h1>
                    <h2 className="text-center"> You have been accepted to RowdyHacks 2020 </h2>
                    <p className="text-center">We are so excited to have you join us in March! Please RSVP for the event below to confirm your attendance.</p>
                    <div className="col text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="stepper stepper-horizontal">
                                    <li className="completed">
                                        <a href="#!">
                                        <span className="circle">1</span>
                                        <span className="label">Applied</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">2</span>
                                        <span className="label">Accepted</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">3</span>
                                        <span className="label">RSVP</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">4</span>
                                        <span className="label">Checked In</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <button type="button" className="btn btn-success btn-lg btn-block" style={{margin: "5px"}} onClick={editApplication}>RSVP</button>
                            </div>
                            <div className="col-sm">
                                <button type="button" className="btn btn-danger btn-lg btn-block" style={{margin: "5px"}} onClick={editApplication}>Decline Invitation</button>
                            </div>
                        </div>
                    </div>
                </div>
            : this.state.appstatus === "RSVP" ?
                <div>
                    <h1 className="text-center"> Thank You {this.state.firstname}!</h1>
                    <h2 className="text-center"> Your participation at RowdyHacks 2020 is confirmed!</h2>
                    <p className="text-center">We are so excited to have you join us at RowdyHacks 2020! We will send you all future information about the event with the email you provided.</p>
                    <div className="col text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="stepper stepper-horizontal">
                                    <li className="completed">
                                        <a href="#!">
                                        <span className="circle">1</span>
                                        <span className="label">Applied</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">2</span>
                                        <span className="label">Accepted</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">3</span>
                                        <span className="label">RSVP</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#!">
                                        <span className="circle">4</span>
                                        <span className="label">Checked In</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-center">Please save the image below on your phone. We will be using it to sign you in.</p>
                        <img src="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png" className="img-thumbnail" alt="Responsive image" style={{height:'300px'}}/>
                    </div>
                </div>
        : this.state.appstatus === "CHECKEDIN" ?
                <div>
                    <h1 className="text-center"> Welcome {this.state.firstname}!</h1>
                    <h2 className="text-center">We are so excited to have you join us!</h2>
                    <div className="col text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="stepper stepper-horizontal">
                                    <li className="completed">
                                        <a href="#!">
                                        <span className="circle">1</span>
                                        <span className="label">Applied</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">2</span>
                                        <span className="label">Accepted</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">3</span>
                                        <span className="label">RSVP</span>
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="#!">
                                        <span className="circle">4</span>
                                        <span className="label">Checked In</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-center">Please save the image below on your phone.</p>
                        <img src="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png" className="img-thumbnail" alt="Responsive image" style={{height:'300px'}}/>
                    </div>
                </div>
            :null
        }
        <div className="col text-center">
            <small id="emailHelp" className="form-text text-muted">For support please contact: team@rowdyhacks.org</small>
        </div>
        </div>
        </div>
          );
    }
}