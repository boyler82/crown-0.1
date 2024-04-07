import { Routes, Route, } from 'react-router-dom';


import Navigation from './routes/navigation/navigation.components';
import Home from './routes/home/home.components';
import Authentication from './routes/authentication/authentication.component';



const Shop = () => {
  return (
    <h1>I am at shop page</h1>
  );
};

const App = () => {
  return (    
    <Routes>
      <Route path = '/' element = { <Navigation />} >
        <Route index element = { <Home />} />
        <Route path = 'shop' element = { <Shop />} />
        <Route path = 'auth' element = { <Authentication />} />
      </Route>
    </Routes>
    );
};

export default App;