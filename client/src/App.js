// These imports are from the npm packages.
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// The following imports are bringing in component pages.
import Home from './components/home'
import Nav from './components/Nav'
import About from './components/about'
import Login from './components/login/login'
import ParentLogin from './components/login/parent'
import SitterLogin from './components/login/sitter'
import Signup from './components/signup/signup'
import ParentSignup from './components/signup/parent'
import SitterSignup from './components/signup/sitter'
import ParentAccount from './components/accounts/paccount'
import SitterAccount from './components/accounts/saccount'
import Prime from './prime'



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers, authorization: token ? `Bearer ${token}`: ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

// This code provides the API routes for each page.
return(
  <ApolloProvider client={client}>
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/signup/parent" element={<ParentSignup />} />
          <Route path="/signup/sitter" element={<SitterSignup />} />
        <Route path='/login' element={<Login/>}/>
          <Route path='/login/parent' element={<ParentLogin />} />
          <Route path='/login/sitter' element={<SitterLogin />} />
        <Route path='/about' element={<About />} />
      <Route path='/sitter/saccount' element={<SitterAccount></SitterAccount>}></Route>
<<<<<<< HEAD
      <Route path="/parent/paccount" element={<Parentaccount></Parentaccount>}></Route>
        
=======
      <Route path="/parent/paccount" element={<ParentAccount></ParentAccount>}></Route>
       <Route path="/prime" element={<Prime></Prime>}></Route>
>>>>>>> 75d6e5efd80711e8706d5da39c5d1bed76cfbec5
        {/* <Route path='/help' element={<Help />} /> */}
      </Routes>
    </Router>
  </ApolloProvider>
);
}



export default App;
