export const setUser = async (userId: string, userData: UserData) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT", // O el método HTTP adecuado
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario en la base de datos");
    }

    console.log("Usuario actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};