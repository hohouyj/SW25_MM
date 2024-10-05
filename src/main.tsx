import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import MonsterView from "./components/MonstersView/MonsterView.tsx";

const router = createBrowserRouter([
  {
    path: "home",
    element: (
      <>
        <div>
          <h1>Hello World</h1>
          <Link to="monsters">Monsters</Link>
        </div>
        <App />
      </>
    ),
  },
  {
    path: "/",
    element: <MonsterView />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
