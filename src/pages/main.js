
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login'
import Home from './home'

function Main () {
    return (
        <Router>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/index" component={Home}></Route>
        </Router>
    )
}
export default Main