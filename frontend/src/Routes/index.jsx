import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import LandingPage from '../components/LandingPage';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Route>
    )
)

export default router