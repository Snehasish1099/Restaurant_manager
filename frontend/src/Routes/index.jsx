import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import LandingPage from '../components/LandingPage';
// import Login from '../components/authentication/Login';
import LoginIndex from '../containers/authentication/LoginIndex';
// import Register from '../components/authentication/Register';
import RegistrationIndex from '../containers/authentication/RegistrationIndex';
import FoodItemDetailsPage from '../components/FoodItemDetailsPage';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<LoginIndex />} />
            <Route path='register' element={<RegistrationIndex />} />
            <Route path='/food_item_details/:id' element={<FoodItemDetailsPage />} />
            <Route path='/restaurant_details/:id' element={<RestaurantDetailsPage />} />
        </Route>
    )
)

export default router