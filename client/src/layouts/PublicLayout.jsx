import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main className=" pt-24 bg-stone-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
