import { createBrowserRouter } from "react-router-dom";
import Analytics from "../pages/Analytics";
import AllShortCodes from "../pages/AllShortCodes";
import ShortenForm from "../components/form/ShortenForm";
import NotFound from "../pages/NotFound";

const useRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ShortenForm />,
    },
    {
      path: "/analytics/:short_code",
      element: <Analytics />,
    },
    {
      path: "/short-codes",
      element: <AllShortCodes />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default useRoutes;
