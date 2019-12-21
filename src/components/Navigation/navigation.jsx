import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p
          className="f3 link dim black underlined pa3 pointer"
          onClick={() => onRouteChange('signout')}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            className="f3 link dim black underlined pa3 pointer"
            onClick={() => onRouteChange('signin')}
          >
            Sign In
          </p>
          <p
            className="f3 link dim black underlined pa3 pointer"
            onClick={() => onRouteChange('signup')}
          >
            Sign Up
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
