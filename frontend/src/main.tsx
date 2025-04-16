import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Admin from './Admin'

const path = window.location.pathname

let Page
if (path.startsWith("/admin")) {
    Page = Admin
} else if (path.startsWith("/submit")) {
    Page = App
} else {
    // Redirect all other routes to /submit
    window.location.href = "/submit"
    throw new Error("Redirecting to /submit")
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Page />)
