import { Menu, MenuDivider, MenuItem, Position } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { Link, useNavigate } from "react-router-dom";
import "./Appbar.css";

function SettingsContent() {
  const handleLogout = () => {
    console.log("handleLogout");
  };
  return (
    <Menu>
      <Link to="/settings">
        <MenuItem icon="cog" text="Settings" />
      </Link>
      <MenuItem icon="help" text="Help" />
      <MenuDivider />
      <MenuItem text="Logout" icon="log-out" onClick={handleLogout} />
    </Menu>
  );
}

export default function Appbar() {
  const navigate = useNavigate();
  const purchasePass = () => {
    navigate("register");
  };

  return (
    <main>
      <nav className="bp4-navbar bp4-dark">
        <div style={{ margin: "0 auto", width: "480px" }}>
          <div className="bp4-navbar-group bp4-align-left">
            <Link to="/">
              <div className="bp4-navbar-heading">Bus Pass Registration</div>
            </Link>
          </div>
          <div className="bp4-navbar-group bp4-align-right">
            <Link to="/">
              <button className="bp4-button bp4-minimal bp4-icon-home">
                Home
              </button>
            </Link>
            <button
              onClick={purchasePass}
              className="bp4-button bp4-minimal bp4-icon-taxi"
            >
              Buy Pass
            </button>
            <span className="bp4-navbar-divider"></span>
            <Link to="/profile">
              <button className="bp4-button bp4-minimal bp4-icon-user"></button>
            </Link>

            <Popover2
              content={<SettingsContent />}
              position={Position.BOTTOM_LEFT}
            >
              <button className="bp4-button bp4-minimal bp4-icon-cog"></button>
            </Popover2>
          </div>
        </div>
      </nav>
    </main>
  );
}
