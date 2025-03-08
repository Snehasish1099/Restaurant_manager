import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import LandingPage from '../components/LandingPage';
import LoginIndex from '../containers/authentication/LoginIndex';
import RegistrationIndex from '../containers/authentication/RegistrationIndex';
import FoodItemDetailsPage from '../components/FoodItemDetailsPage';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage';
import UserProfilePage from '../components/user/UserProfilePage';
import Layout from '../common/layout/Layout';
import GoogleMapIndex from '../components/GoogleMapIndex';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='login' element={<LoginIndex />} />
            <Route path='register' element={<RegistrationIndex />} />

            <Route path='/' element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path='food_item_details/:id' element={<FoodItemDetailsPage />} />
                <Route path='restaurant_details/:id' element={<RestaurantDetailsPage />} />
                <Route path='user_profile/:id' element={<UserProfilePage />} />

                <Route path='map' element={<GoogleMapIndex/>}/>
            </Route>
        </>
    )
)

export default router