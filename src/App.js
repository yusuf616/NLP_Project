import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import * as Home from './Pages/Home/Exports'
import * as AITeacher from './Pages/AITeacher/Exports' 

const router=createBrowserRouter([
    {
        path:'/',
        element:<Home.HomePage/>,
        children:Home.HomeRoutes
    },
    {
        path:'/aiteacher',
        element:<AITeacher.AITeacherPage/>,
        children:AITeacher.AITeacherRoutes
    }
])

export const App=()=>{
    return(<div className='full-page'>
        <RouterProvider router={router}/>
    </div>);
}