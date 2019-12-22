import React from 'react';
import Form from '../Form/Form';

const Signup = ({onRouteChange, loadUser}) => {
  return (
    <Form btn="Sign Up" loadUser={loadUser} onRouteChange={onRouteChange} />
  );
};

export default Signup;
