import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MonsterView from "./components/MonstersView/MonsterView.tsx";
import SpellView from "./components/SpellView/SpellView.tsx";
import AppLayout from "./layouts/AppLayout.tsx";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import FeatureView from "./components/FeatureView/FeatureView.tsx";
import CharacterManager from "./components/Character/CharacterManager.tsx";
import { CharacterSheet } from "./components/Character/CharacterSheet.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/monsters" replace />,
      },
      {
        path: "monsters",
        element: <MonsterView />,
      },
      {
        path: "spells",
        element: <SpellView />,
      },
      {
        path: "features",
        element: <FeatureView />
      },
      {
        path: "characters",
        element: <CharacterManager />
      },
      {
        path: "charactersheet/:id",
        element: <CharacterSheet />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
