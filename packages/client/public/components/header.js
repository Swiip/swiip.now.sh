import html from "/html.js";
import style from "/style.js";

const Header = style("header")({
  display: "flex",
  flexDirection: "row"
});

const Title = style("h1")({
  fontWeight: "normal",
  whiteSpace: "nowrap",
  flex: "1"
});

const Nav = style("nav")({
  width: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const NavItems = style("ul")({
  listStyle: "none",
  padding: "0",
  margin: "0",
  display: "flex",
  justifyContent: "space-around"
});

const NavButton = style("button")({
  padding: "20px 30px",
  lineHeight: "30px",
  ":after": {
    content: "''",
    display: "block",
    width: "0",
    height: "2px",
    background: "white",
    transition: "width .3s"
  },
  ":hover:after": {
    width: "100%"
  }
});

const HeaderComponent = () => html`
  <${Header}>
    <${Title}>Swiip's home page<//>
    <${Nav}>
      <${NavItems}>
        <li><${NavButton}>Blog<//></li>
        <li><${NavButton}>Code<//></li>
        <li><${NavButton}>Jobs<//></li>
        <li><${NavButton}>News<//></li>
        <li><${NavButton}>About<//></li>
      <//>
    <//>
  <//>
`;

export default HeaderComponent;
