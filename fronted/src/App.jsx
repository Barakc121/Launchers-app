import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import LauncherAdd from "./pages/LauncherAdd";
import PageDetailsLauncher from "./pages/PageDetailsLauncher";
import RegisterPage from "./pages/RegisterPage";
import { Link, Route, Routes } from "react-router";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home Page</Link> |
        <Link to="/add">Add Launcher</Link>|
        <Link to="/details"> PageDetailsLauncher</Link>
        <Link to="/register">ניהול משתמשים</Link>

      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<LauncherAdd />} />
          <Route path="/details" element={<PageDetailsLauncher />} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;