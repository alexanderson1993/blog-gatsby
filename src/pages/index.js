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
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => <Hero backgrounds={backgrounds} theme={theme} />}
        </ThemeContext.Consumer>

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
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
