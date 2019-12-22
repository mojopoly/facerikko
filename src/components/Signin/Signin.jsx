import React from 'react';
import Form from '../Form/Form';

const Signin = ({onRouteChange, loadUser}) => {
  return (
    <Form btn="Sign In" onRouteChange={onRouteChange} loadUser={loadUser} />
  );
};

export default Signin;
