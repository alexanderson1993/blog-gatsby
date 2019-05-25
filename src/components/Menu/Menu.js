import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/from");

import Item from "./Item";
import Expand from "./Expand";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = React.createRef();

    const pages = props.pages.map(page => ({
      to: page.node.fields.slug,
      label: page.node.frontmatter.menuTitle
        ? page.node.frontmatter.menuTitle
        : page.node.frontmatter.title
    }));

    this.items = [
      { to: "/", label: "Home" },
      { to: "/blog/", label: "Blog" },
      { to: "/category/", label: "Categories" },
      { to: "/search/", label: "Search" },
      ...pages,
      { to: "/contact/", label: "Contact" }
    ];

    this.renderedItems = []; // will contain references to rendered DOM elements of menu
  }

  state = {
    open: false
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    fixed: PropTypes.bool.isRequired,
    screenWidth: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.renderedItems = this.getRenderedItems();
  }

  getRenderedItems = () => {
    const itemList = this.itemList.current;
    return Array.from(itemList.children);
  };

  render() {
    const { theme, open, close } = this.props;

    return (
      <React.Fragment>
        <nav className={`menu ${open ? "open" : ""}`} rel="js-menu">
          <ul className="itemList" ref={this.itemList}>
            {this.items.map(item => (
              <Item item={item} key={item.label} theme={theme} onClick={close} />
            ))}
          </ul>
        </nav>

        {/* --- STYLES --- */}
        <style jsx>{`
          .menu {
            align-items: center;
            background: ${theme.color.neutral.white};
            bottom: 0;
      
            display: flex;
            flex-grow: 1;
            left: 0;
            max-height: ${open ? "1000px" : "50px"};
            width: 100%;

            padding: 0 ${theme.space.inset.s};
            position: fixed;
            z-index: 1;
            transition: all ${theme.time.duration.default};
          }

          .itemList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0; /* 0 ${theme.space.s}; */
            position: relative;
            width: 100%;
          }
          
          @below desktop {
            .menu {
              height: 100vh;
              max-height:100vh;
              top:0;
            left:0;
            width: 60%;
            transform: translateX(-110%);

            box-shadow: 5px 0px 5px rgba(0,0,0,0.1);



              &.open {
                padding: ${theme.space.inset.m};
                transform: translateX(0px);
              }
              .itemList {
                flex-direction: column;

              }
              :global(.homepage):not(.fixed) & {
                bottom: -100px;
              }
            }
          }

          @from-width desktop {
            .menu {
              border-top: none;
              background: transparent;
              display: flex;
              position: relative;
              justify-content: flex-end;
              padding-left: 50px;
              transition: none;
            }

            .itemList {
              justify-content: flex-end;
              padding: 0;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Menu;
