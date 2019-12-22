import React, {useState} from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Particles from 'react-particles-js';
import './App.css';
import particlesOptions from './particleOptions';

const App = () => {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  });
  const [box, setBox] = useState({});
  const [age, setAge] = useState('');
  const [ageProb, setAgeProb] = useState('');
  const [genMas, setGenMas] = useState('');
  const [genFem, setGenFem] = useState('');
  const [ethFirst, setEthFirst] = useState('');
  const [ethFirstProb, setEthFirstProb] = useState('');
  const [ethSec, setEthSec] = useState('');
  const [ethSecProb, setEthSecProb] = useState('');
  const [ethThird, setEthThird] = useState('');
  const [ethThirdProb, setEthThirdProb] = useState('');

  const loadUser = data => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const demographicData = data => {
    setAge(
      data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name
    );
    setAgeProb(
      data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0]
        .value * 100
    );
    data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0]
      .name === 'masculine'
      ? setGenMas(
          data.outputs[0].data.regions[0].data.face.gender_appearance
            .concepts[0].value * 100
        )
      : setGenFem(
          data.outputs[0].data.regions[0].data.face.gender_appearance
            .concepts[0].value * 100
        );
    data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[1]
      .name === 'masculine'
      ? setGenMas(
          data.outputs[0].data.regions[0].data.face.gender_appearance
            .concepts[1].value * 100
        )
      : setGenFem(
          data.outputs[0].data.regions[0].data.face.gender_appearance
            .concepts[1].value * 100
        );
    setEthFirst(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name.toUpperCase()
    );
    setEthFirstProb(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance
        .concepts[0].value * 100
    );
    setEthSec(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[1].name.toUpperCase()
    );
    setEthSecProb(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance
        .concepts[1].value * 100
    );
    setEthThird(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[2].name.toUpperCase()
    );
    setEthThirdProb(
      data.outputs[0].data.regions[0].data.face.multicultural_appearance
        .concepts[2].value * 100
    );
  };

  const calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = box => {
    setBox(box);
  };

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onPictureSubmit = async () => {
    //console.log(user.id);
    await setImgUrl(input);
    await fetch('https://facerikko.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input,
      }),
    })
      .then(response => response.json())
      .then(
        async function(response) {
          if (response) {
            await fetch('https://facerikko.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.id,
              }),
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                setUser(Object.assign(user, {entries: data}));
              })
              .catch(console.log);
          }
          displayFaceBox(calculateFaceLocation(response));
          demographicData(response);
        },
        function(err) {
          console.log(err);
        }
      );
  };

  const onRouteChange = route => {
    if (route === 'signout') {
      setIsSignedIn(false);
      setUser({});
      setInput('');
      setImgUrl('');
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  //console.log(user);
  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <React.Fragment>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            value={input}
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition
            faceBox={box}
            image={imgUrl}
            age={age}
            ageProb={ageProb}
            genMas={genMas}
            genFem={genFem}
            ethFirst={ethFirst}
            ethFirstProb={ethFirstProb}
            ethSec={ethSec}
            ethSecProb={ethSecProb}
            ethThird={ethThird}
            ethThirdProb={ethThirdProb}
          />
        </React.Fragment>
      ) : route === 'signin' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Signup loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
