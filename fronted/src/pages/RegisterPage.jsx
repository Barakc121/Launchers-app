import { useState, useEffect } from "react";
import useStore from "../useSrote";
import './RegisterPage.css'

function RegisterPage() {
  const { registerUser, deleteUser, users, fetchAllUsers } = useStore();

  // טופס משתמש
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "",
  });

  // מביאים את כל הצשתמשים
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Hוצר את ת הטופס ללא רינדור של הדף
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };
  console.log(users);
  return (
    <div>
      <h1>ניהול משתמשים</h1>
      <form  className="user-form" onSubmit={handleSubmit}>
        {/* שם משתמש */}
        <input
          type="text"
          placeholder="שם משתמש"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />

        {/* סיסמא */}
        <input
          type="password"
          placeholder="סיסמא"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        {/* מייל */}
        <input
          type="text"
          placeholder="מייל"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <select
          onChange={(e) =>
            setFormData({ ...formData, user_type: e.target.value })
          }
        >
          <option value="חיל האוויר">חיל האוויר</option>
          <option value="חיל מודיעין">חיל מודיעין</option>
          <option value="admin">מנהל </option>
        </select>
        <button type="submit">ליצור משתמש </button>
      </form>
      {/* <hr /> */}

      <table className="user-table">
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>תפקיד</th>
            <th>פעולה</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0
            ? users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.user_type}</td>
                  <td>
                    <button className="btn-delete" onClick={() => deleteUser(u._id)}>מחק</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default RegisterPage;
