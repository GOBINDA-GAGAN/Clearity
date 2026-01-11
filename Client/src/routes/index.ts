
import {createBrowserRouter} from 'react-router'
import Login from '@/pages/auth/Login'


const router= createBrowserRouter([{
    path:'/login',
    Component:Login,
}])

export default router;