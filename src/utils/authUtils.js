export const handleLogout = (logoutCallback, navigate, delayLogout = false) => {
    if (delayLogout) {
        // Espera un tiempo antes de limpiar el localStorage
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            if (logoutCallback) logoutCallback();
            if (navigate) navigate('/');
        }, 100); // Ajusta el tiempo según sea necesario
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        if (logoutCallback) logoutCallback();
        if (navigate) navigate('/');
    }
};
