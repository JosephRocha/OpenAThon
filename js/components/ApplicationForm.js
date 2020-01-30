
class ApplicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            shirtsize: props.shirtsize,
            school: props.school,
            major: props.major,
            classification: props.classification,
            pronouns: props.pronouns,
            ethnicity: props.ethnicity,
            travel: props.travel,
            dietaryinfo: props.dietaryinfo,
            accomodations: props.accomodations,
            track:props.track,
            lookingforwardto: props.lookingforwardto
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
            <input name="firstname" id="firstname" className="form-control" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange} required autoFocus/>
            <br/>

            <label htmlFor="lastname">Last Name</label>
            <input name="lastname" id="lastname" className="form-control" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange} required autoFocus/>
            <br/>


            <div className="form-group">
            <label htmlFor="shirtsize">Shirt Size</label>
            <select name="shirtsize" id="shirtsize" className="form-control" value={this.state.shirtsize} onChange={this.handleChange} >
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
            <input name="school" id="school" className="form-control" placeholder="What school do you attend?" value={this.state.school} onChange={this.handleChange}  required autoFocus/>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="major">What is your major?</label>
            <input name="major" id="major" className="form-control" placeholder="What is your major?" value={this.state.major} onChange={this.handleChange} required autoFocus/>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="classification">What is your most current level of study?</label>
            <select name="classification" id="classification" className="form-control" value={this.state.classification} onChange={this.handleChange} >
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
            <label htmlFor="pronouns">What are your preferred pronouns?</label>
            <select name="pronouns" id="pronouns" className="form-control" value={this.state.pronouns} onChange={this.handleChange} >
            <option>She/Her</option>
            <option>He/Him</option>
            <option>They/Them</option>
            </select>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="ethnicity">How do you ethnically identify?</label>
            <select name="ethnicity" id="ethnicity" className="form-control" value={this.state.ethnicity} onChange={this.handleChange} >
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
            <select name="travel" id="travel" className="form-control" value={this.state.travel} onChange={this.handleChange} >
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
            <textarea name="dietaryinfo" id="dietaryinfo" className="form-control" rows="3" value={this.state.dietaryinfo} onChange={this.handleChange} ></textarea>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="accomodations">We want all of our hackers to be as rowdy as possible! Are there any other accommodations you might need?</label>
            <textarea name="accomodations" id="accomodations" className="form-control" rows="3" value={this.state.accomodations} onChange={this.handleChange} ></textarea>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Please Upload a copy of your resume</label>
            <input name="file" type="file" className="form-control-file" id="exampleFormControlFile1"/>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="track">What track are you most interested in joining?</label>
            <select name="track" id="track" className="form-control" value={this.state.track} onChange={this.handleChange} >
            <option>Learner</option>
            <option>Security</option>
            <option>Social Good</option>
            <option>General</option>
            </select>
            </div>
            <br/>

            <div className="form-group">
            <label htmlFor="lookingforwardto">What are you looking forward to about RowdyHacks this year?</label>
            <textarea name="lookingforwardto" id="lookingforwardto" className="form-control" rows="3" value={this.state.lookingforwardto} onChange={this.handleChange} ></textarea>
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
