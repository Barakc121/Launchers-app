import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  launchers: [],
  selectedLauncher: null,

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
  }
}));

export default useStore;