import { createBrowserRouter } from "react-router"
import Login from "@/pages/auth/Login"
import { Button } from "@/components/ui/button"

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
    },
    {
        path: "/refresh-token",
    },
    {
        path: "/",
        Component: () => {
            return <><h1>Welcome</h1> <Button>Home</Button>
            </>
        },
        children: [
            {
                index: true,
            },
            {
                path: "blogs", // "/blogs"
            },
            {
                path: "blogs/:slug", // "/blogs/:slug"
            },
        ],
    },
    {
        path: "/admin",
        children: [
            {
                index: true, // "/admin"
            },
            {
                path: "dashboard", // "/admin/dashboard"
            },
            {
                path: "blogs", // "/admin/blogs"
            },
            {
                path: "blogs/create", // "/admin/blogs/create"
            },
            {
                path: "blogs/:slug/edit", // "/admin/blogs/:slug/edit"
            },
            {
                path: "comments", // "/admin/comments"
            },
            {
                path: "users", // "/admin/users"
            },
        ],
    },
    {
        path: "/settings",
    },
])

export default router
