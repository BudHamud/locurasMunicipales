import React from "react";

const Login = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const userData = await response.json();
      const token = userData.token; // Suponiendo que la respuesta del backend incluye un token

      // Almacenar token en LocalStorage o en una cookie
      localStorage.setItem("auth_token", token);

      navigate("/home"); // Redireccionar a la página principal
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejo de errores adecuado (p. ej. mostrar un mensaje de error al usuario)
    }
  };

  return <div></div>;
};

export default Login;
