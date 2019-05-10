import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Seo from "../components/Seo";

class IndexPage extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>{theme => <Hero theme={theme} />}</ThemeContext.Consumer>

        <Seo facebook={facebook} />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;

//hero-background
