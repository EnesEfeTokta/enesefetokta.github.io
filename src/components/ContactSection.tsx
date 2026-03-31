export default function ContactSection() {
  return (
    <section className="nfx-contact-section" id="contact">
      <div className="container">
        <h2 className="nfx-section-title reveal">Let's Work Together</h2>
        <p className="nfx-section-sub reveal">Have a project in mind? I typically respond within 24 hours.</p>
        <div className="nfx-contact-grid reveal">
          {/* Left: Info */}
          <div className="nfx-contact-info">
            <h3>Reach me directly</h3>
            <div className="nfx-contact-links">
              <a className="nfx-contact-link" href="mailto:enesefetokta009@gmail.com">
                <div className="nfx-contact-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="nfx-contact-label">Email 1</div>
                  <div className="nfx-contact-val">enesefetokta009@gmail.com</div>
                </div>
              </a>
              <a className="nfx-contact-link" href="mailto:hi@enesefetokta.shop">
                <div className="nfx-contact-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="nfx-contact-label">Email 2</div>
                  <div className="nfx-contact-val">hi@enesefetokta.shop</div>
                </div>
              </a>
              <a className="nfx-contact-link" href="https://www.linkedin.com/in/enes-efe-tokta-6567151b5/" target="_blank" rel="noopener noreferrer">
                <div className="nfx-contact-icon"><i className="fab fa-linkedin"></i></div>
                <div>
                  <div className="nfx-contact-label">LinkedIn</div>
                  <div className="nfx-contact-val">Enes Efe Tokta</div>
                </div>
              </a>
              <a className="nfx-contact-link" href="https://github.com/EnesEfeTokta" target="_blank" rel="noopener noreferrer">
                <div className="nfx-contact-icon"><i className="fab fa-github"></i></div>
                <div>
                  <div className="nfx-contact-label">GitHub</div>
                  <div className="nfx-contact-val">@EnesEfeTokta</div>
                </div>
              </a>
              <a className="nfx-contact-link" href="https://medium.com/@EnesEfeTokta" target="_blank" rel="noopener noreferrer">
                <div className="nfx-contact-icon"><i className="fab fa-medium"></i></div>
                <div>
                  <div className="nfx-contact-label">Medium</div>
                  <div className="nfx-contact-val">@EnesEfeTokta</div>
                </div>
              </a>
              <div className="nfx-contact-link">
                <div className="nfx-contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <div className="nfx-contact-label">Location</div>
                  <div className="nfx-contact-val">Turkey · Remote Worldwide</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Form */}
          <div className="nfx-contact-form">
            <h3>Send a Message</h3>
            <p>Tell me about your project or just say hi.</p>
            <form action="https://formspree.io/f/xwvkdpjd" method="POST">
              <div className="nfx-form-row">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" placeholder="Jane Smith" required type="text" />
              </div>
              <div className="nfx-form-row">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="_replyto" placeholder="jane@example.com" required type="email" />
              </div>
              <div className="nfx-form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell me about your project..." required rows={5}></textarea>
              </div>
              <button className="nfx-btn-red" style={{ width: "100%", justifyContent: "center" }} type="submit">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
            <p className="nfx-form-note">
              <i className="fas fa-shield-alt"></i> Secured by Formspree — your data stays private.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
