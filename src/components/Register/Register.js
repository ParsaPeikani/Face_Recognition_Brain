import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ Name: event.target.value });
  };
  onEmailChange = (event) => {
    document.getElementById("emailexists").style.display = "none";
    this.setState({ Email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ Password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://smartspiderserver2-com.onrender.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        name: this.state.Name,
      }),
    })
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((user) => {
        console.log("user here is ", user);
        if (user[0].id) {
          this.props.loadUser(user[0]);
          this.props.onRouteChange("home");
        } else {
          console.log("user", user);
          document.getElementById("emailexists").style.display = "block";
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0" style={{ color: "yellow" }}>
                Register
              </legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="name"
                  style={{ color: "yellow" }}
                >
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-#2F3C7E yellow w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="email-address"
                  style={{ color: "yellow" }}
                >
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-#2F3C7E yellow w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="password"
                  style={{ color: "yellow" }}
                >
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-#2F3C7E yellow w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div id="emailexists" className="dn">
                <p>This account has already been registered</p>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--yellow bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                style={{ color: "yellow" }}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
