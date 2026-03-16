import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;