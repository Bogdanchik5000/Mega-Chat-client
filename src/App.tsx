import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import MainPage from "./pages/MainPage/MainPage";

import JoinChatPage from "./pages/JoinChatPage/JoinChatPage";
import ChatProtectedRoute from "./providers/ChatProtectedRoute";
import HeaderLayout from "./layouts/HeaderLayout/HeaderLayout";
import ConnectLoadingProvider from "./providers/ConnectLoadingProvider";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/join",
        element: <JoinChatPage />,
      },
      {
        path: "/chat",
        element: (
          <ChatProtectedRoute>
            <ChatPage />
          </ChatProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <ChakraProvider>
      <ConnectLoadingProvider>
        <RouterProvider router={router} />
      </ConnectLoadingProvider>
    </ChakraProvider>
  );
}
