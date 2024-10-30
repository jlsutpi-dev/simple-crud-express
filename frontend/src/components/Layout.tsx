import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div>
      <div>
        <TopBar />
      </div>
      <div style={{ display: "flex", justifyContent: "" }}>
        <Sidebar />
        <div style={{ margin: 20 }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
