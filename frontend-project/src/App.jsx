// ==============================================
// App.jsx (Updated with Reports Route)
// ==============================================

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import Products from "./components/Products";
import Sales from "./components/Sales";
import Reports from "./components/Reports";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* CREATE ACCOUNT */}
                <Route
                    path="/create-account"
                    element={<CreateAccount />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* CUSTOMERS */}
                <Route
                    path="/customers"
                    element={<Customers />}
                />

                {/* PRODUCTS */}
                <Route
                    path="/products"
                    element={<Products />}
                />

                {/* SALES */}
                <Route
                    path="/sales"
                    element={<Sales />}
                />

                {/* REPORTS */}
                <Route
                    path="/reports"
                    element={<Reports />}
                />

                {/* LOGOUT */}
                <Route
                    path="/logout"
                    element={<Logout />}
                />

                {/* 404 PAGE */}
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;