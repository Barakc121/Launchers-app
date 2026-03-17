import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  // ניהול משגרים
  launchers: [],
  selectedLauncher: null,
  // ניהול משתמשים וניווט ללוגין
  users: [],
  user: null,
  token: localStorage.getItem("token") || null,
  currentPage: "login",

  //   פעולת הניוו
  navigate: (page) => {
    const { token, user } = get();
    if (!token && page !== "login") {
      set({ currentPage: "login" });
      return;
    }

    // אישור כניסה רק למנהל
    if (page == "register" && user?.user_type !== "admin") {
      alert("רק למנהל יש אישור כניבה ");
      return;
    }
    set({ currentPage: page });
  },

  // ניסיון כניסה
  login: async (credentail) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login/auth/api",
        credentail,
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      set({ token, user, currentPage: "home" });
    } catch {
      alert("יש לך תקלה בהתחברות");
    }
  },
  //   יציאה מהמערכת
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, currentPage: "login" });
  },

  // להשיג את המשתמש המחובר
  // getCurrentUser:async()={
  // try{
  //     const res = await axios.get("http://localhost:5000/getUser/auth/api",{
  //         headers:{}
  //     });

  // }catch{
  //     return
  // }}

  registerUser : async (newUser) => {
     try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",newUser
        ,{
          headers: { Authorization: `bearer ${get().token}` },
        },
      );
      get().fetchAllUsers();

    } catch {
      alert("לא נוצר המשתמש");
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/auth/deleteUsers",
        {
          headers: { Authorization: `bearer ${get().token}` },
        },
      );
      get().fetchAllUsers();
    } catch {
      alert("לא נמחק המשתמש");
    }
  },

  fetchAllUsers: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/allUsers", {
        headers: { Authorization: `bearer ${get().token}` },
      });
      set({ users: res.data });
    } catch {
      console.log("error in useStore-fetchallUsers");
    }
  },

  fetchLaunchers: async () => {
    const res = await axios.get("http://localhost:5000/api/launchers");
    set({ launchers: res.data });
  },

  addLauncher: async (newLauncher) => {
    await axios.post("http://localhost:5000/api/launchers", newLauncher);
    await get().fetchLaunchers();
  },

  deleteLauncher: async (id) => {
    await axios.delete(`http://localhost:5000/api/launchers/${id}`);
    await get().fetchLaunchers();
  },

  setSelectLaunchers: (launcher) => {
    set({ selectedLauncher: launcher });
  },
}));

export default useStore;
