import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import MonsterView from "./components/MonstersView/MonsterView.tsx";
import { MantineProvider } from "@mantine/core";
import SpellView from "./components/SpellView/SpellView.tsx";

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
  },{
    path: "/spells",
    element: <SpellView />,
  }
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
