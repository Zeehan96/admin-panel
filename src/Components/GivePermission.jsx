export const isGivePermission = () => {
    const storedToken = localStorage.getItem("token");
    return !!storedToken; 
  };
 