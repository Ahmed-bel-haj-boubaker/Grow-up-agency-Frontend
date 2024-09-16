import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "80%" }}>
      <Sidebar childrenC={children} />
    </div>
  );
};

export { Layout };

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
