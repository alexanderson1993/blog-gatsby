import React from "react";
import PropTypes from "prop-types";

class Hero extends React.Component {
  componentDidMount() {
    if (!window.twttr) {
      window.twttr = (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      })(document, "script", "twitter-wjs");
    }
    if (!window.githubButton) {
      (function(d, s, id) {
        window.githubButton = true;
        if (d.getElementById(id)) return;
        const fjs = d.getElementsByTagName(s)[0];
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://buttons.github.io/buttons.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "github-buttons");
    }
  }
  render() {
    const { backgrounds, theme } = this.props;

    return (
      <React.Fragment>
        <section className="hero">
          <h1>
            <strong>👋</strong> Hi! I'm Alex.
          </h1>
          <h2>I build web apps using React, GraphQL, and Node.</h2>
          <div className="follow-buttons">
            <a
              className="twitter-follow-button"
              href="https://twitter.com/ralex1993"
              data-size="large"
            >
              Follow @ralex1993
            </a>
            <a
              className="github-button"
              href="https://github.com/alexanderson1993"
              data-size="large"
              data-show-count="true"
              aria-label="Follow @alexanderson1993 on GitHub"
            >
              Follow @alexanderson1993
            </a>
          </div>
        </section>

        {/* --- STYLES --- */}
        <style jsx>{`
          .hero {
            align-items: center;
            background: ${theme.hero.background};
            background-image: url(${backgrounds.mobile});
            background-size: cover;
            color: ${theme.text.color.primary.inverse};
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            min-height: 100vh;
            height: 100px;
            padding: ${theme.space.inset.l};
            padding-top: ${theme.header.height.homepage};
          }
          .follow-buttons {
            width: 60%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }
          h1,
          h2 {
            text-align: center;
            font-size: ${theme.hero.h1.size};
            margin: ${theme.space.stack.l};
            color: ${theme.hero.h1.color};
            line-height: ${theme.hero.h1.lineHeight};
            text-remove-gap: both 0 "Open Sans";

            :global(strong) {
              position: relative;

              &::after,
              &::before {
                content: "›";
                color: ${theme.text.color.attention};
                margin: 0 ${theme.space.xs} 0 0;
              }
              &::after {
                content: "‹";
                margin: 0 0 0 ${theme.space.xs};
              }
            }
          }

          @from-width tablet {
            .hero {
              background-image: url(${backgrounds.tablet});
            }

            h1 {
              max-width: 90%;
              font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
            }

            h2 {
              max-width: 90%;
              font-size: ${`calc(${theme.hero.h1.size} * 0.9)`};
            }
            button {
              font-size: ${theme.font.size.l};
            }
          }

          @from-width desktop {
            .hero {
              background-image: url(${backgrounds.desktop});
            }

            h1 {
              max-width: 80%;
              font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
            }
            h2 {
              max-width: 80%;
              font-size: ${`calc(${theme.hero.h1.size} * 0.8)`};
            }
            button {
              font-size: ${theme.font.size.xl};
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
