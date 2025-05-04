import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import RecipeDetails from "./pages/RecipeDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect/*" element={<Connect />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/admin"element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;