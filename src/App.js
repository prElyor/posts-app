import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Posts from './Components/Posts/Posts';
import PostsEdit from './Components/PostsEdit/PostsEdit';
import ErrorPage from './Components/Error/ErrorPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/posts"/>
          </Route>
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={PostsEdit} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
