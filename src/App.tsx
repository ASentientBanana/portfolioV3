import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProjectsPage from "./pages/projects";
import Admin from "./pages/admin";
import ProjectsAdmin from "./pages/admin/projects";
import { StrictMode } from "react";
import { AuthProvider } from "./context/auth";
import { ModalProvider } from "./context/authModal";
import Root from "./pages";
import { Toaster } from "./components/ui/toaster";
import AboutPage from "./pages/about";
import LoginPage from "./pages/admin/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <AboutPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "projects",
        element: <ProjectsAdmin />,
      },
    ],
  },
]);

const App = () => {
  console.log(sessionStorage.getItem("pk-tk"));

  return (
    <StrictMode>
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ModalProvider>
      </AuthProvider>
    </StrictMode>
  );
};

export default App;
