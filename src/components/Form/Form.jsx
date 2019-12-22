import React, {useState} from 'react';

const Form = ({btn, loadUser, onRouteChange}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPass(event.target.value);
  };

  const onSubmit = () => {
    if (btn === 'Sign In') {
      fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            loadUser(user);
            onRouteChange('home');
          }
        })
        .catch(err => console.log(err));
    } else {
      fetch('http://localhost:3001/signup', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          password: pass,
          email: email,
        }),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            loadUser(user);
            onRouteChange('home');
          }
        });
    }
  };

  // const onSubmitSignUp = () => {

  // };

  return (
    <article className="br3 ba b--black-10 mv6 shadow-5 w-100 w-50-m w-50-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">{btn}</legend>
            {btn === 'Sign Up' ? (
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onNameChange}
                />
              </div>
            ) : null}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={pass}
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value={btn}
              onClick={onSubmit}
            />
          </div>
          {btn === 'Sign In' ? (
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('signup')}
                className="f6 link dib black db grow link pointer"
              >
                Register
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </article>
  );
};

export default Form;
