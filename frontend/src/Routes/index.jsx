import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import LandingPage from '../components/LandingPage';
// import Login from '../components/authentication/Login';
import LoginIndex from '../containers/authentication/LoginIndex';
// import Register from '../components/authentication/Register';
import RegistrationIndex from '../containers/authentication/RegistrationIndex';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<LoginIndex />} />
            <Route path='register' element={<RegistrationIndex />} />
        </Route>
    )
)

export default router