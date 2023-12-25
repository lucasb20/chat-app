import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { IndexPage } from './pages/IndexPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { GeralPage } from './pages/GeralPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <RegisterPage />
  },
  {
    path: "/auth/recovery",
    element: <GeralPage text={'Blz, me diz aí o email associado a tua conta e a gente conversa.'} />
  },
  {
    path: "/auth/help",
    element: <GeralPage text={'É aquela história: Se você precisar de mim, é o mesmo que nada.'} />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
