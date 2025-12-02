import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Routes>
      <Route path="/" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
