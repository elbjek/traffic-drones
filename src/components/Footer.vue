<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-sitemap row">
          <div class="col-sm-12 col-lg-6 footer-sitemap-heading">
            <img src="../assets/logo.svg" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div class="col-sm-12 col-lg-6 footer-sitemap-info">
            <div class="row">
              <div class="col-sm-4">
                <p>Services</p>
                <ul>
                  <li><a href="#">Email Marketing</a></li>
                  <li><a href="#">Campaigns</a></li>
                </ul>
              </div>
              <div class="col-sm-4">
                <p>Services</p>
                <ul>
                  <li><a href="#">Our Story</a></li>
                  <li><a href="#">Benefits</a></li>
                </ul>
              </div>
              <div class="col-sm-4">
                <p>Follow us</p>
                <ul class="footer-social-media">
                  <li><a href="https://facebook.com"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a></li>
                  <li><a href="https://twitter.com"><font-awesome-icon :icon="['fab', 'twitter']" /></a></li>
                  <li><a href="https://instagram.com"><font-awesome-icon :icon="['fab', 'instagram']" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      Copyright &copy; 2020. LogoIpsum. All rights reserved.
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  font-family: "DM Sans", "sans-serif";
  background-color: $background--color-white;
  margin-top:35px;
  .footer-top {
    border-bottom: 1px solid #f4f4f4;
    .footer-sitemap {
      align-items: flex-start;
      .footer-sitemap-heading,
      .footer-sitemap-info {
        padding-top: 60px;
        padding-bottom: 50px;
      }
      .footer-sitemap-heading {
        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
        border-right: 1px solid #f4f4f4;

        @media screen and (max-width: 992px) {
          border-right: none;
        }

        @media screen and (max-width: 575px) {
          flex-direction: column;
          padding-bottom: 30px;
        }

        p {
          margin: 0;
          margin-left: 20px;
          max-width: 50%;
          font-size: 12.5px;

          @media screen and (max-width: 575px) {
            max-width: 100%;
            margin-top: 20px;
            margin-left: 0;
            text-align: center;
          }
        }
        img {
          @media screen and (max-width: 575px) {
            margin: 0 auto;
          }
        }
      }

      .footer-sitemap-info {
        padding-left: 50px;

        @media screen and (max-width: 992px) {
          padding-left: 0;
          text-align: center;
          padding-top: 0px;
        }

        p {
          color: $footer--color-accent;
          margin-bottom: 15px;
        }
        ul {
          margin-bottom: 0;

          @media screen and (max-width: 575px) {
            margin-bottom: 15px;
          }

          li {
            a {
              color: $black;
              font-size: 12.5px;
            }
          }

          &.footer-social-media {
            li {
              display: inline-block;
              a {
                display: block;
              }
              &:nth-child(2) {
                padding: 0px 10px;
              }
            }
          }
        }
      }
    }
  }

  .footer-copyright {
    text-align: center;
    opacity: 0.7;
    padding: 30px 15px;
    font-size: 12.5px;
  }
}
</style>
