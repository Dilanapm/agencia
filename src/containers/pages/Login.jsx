import React from "react";
import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import LoginForm from "components/login/LoginForm"; // Asegúrate de que la ruta sea correcta

function Login() {
    return (
        <Layout>
            <Navbar />
            <div className="pt-20 pb-10 flex justify-center items-center min-h-screen bg-gray-100">
                <LoginForm />
            </div>
            <Footer />
        </Layout>
    );
}

export default Login;
