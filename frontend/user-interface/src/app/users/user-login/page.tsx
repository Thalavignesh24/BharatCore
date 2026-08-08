"use client";

import '../common-design/login.css' 
import {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (!cardRef.current || !sceneRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;

      const x = event.clientX / innerWidth - 0.5;
      const y = event.clientY / innerHeight - 0.5;

      const rotateX = y * -8;
      const rotateY = x * 10;

      cardRef.current.style.transform = `
        perspective(1400px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(0)
      `;

      sceneRef.current.style.setProperty(
        "--mouse-x",
        `${x * 30}px`
      );

      sceneRef.current.style.setProperty(
        "--mouse-y",
        `${y * 30}px`
      );
    };

    const handleMouseLeave = () => {
      if (!cardRef.current || !sceneRef.current) {
        return;
      }

      cardRef.current.style.transform = `
        perspective(1400px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0)
      `;

      sceneRef.current.style.setProperty("--mouse-x", "0px");
      sceneRef.current.style.setProperty("--mouse-y", "0px");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email address is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must contain at least 6 characters."
      );
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoginSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);
    setLoginSuccess(true);
  };

  const handleCardMouseMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const glowX = percentX * 100;
    const glowY = percentY * 100;

    card.style.setProperty(
      "--glow-x",
      `${glowX}%`
    );

    card.style.setProperty(
      "--glow-y",
      `${glowY}%`
    );
  };

  const handleForgotPassword = () => {
    setForgotMessage("");

    if (!forgotEmail.trim()) {
      setForgotMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(forgotEmail)) {
      setForgotMessage("Please enter a valid email address.");
      return;
    }

    setForgotMessage(
      "If an account exists for this email, a reset link has been sent."
    );
  };

  return (
    <main className="login-page">
      <div
        ref={sceneRef}
        className="scene"
        aria-hidden="true"
      >
        <div className="noise" />

        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="ambient ambient-three" />

        <div className="grid-floor" />

        <div className="orb orb-one">
          <div className="orb-inner" />
        </div>

        <div className="orb orb-two">
          <div className="orb-inner" />
        </div>

        <div className="cube cube-one">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="cube cube-two">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="ring ring-one" />
        <div className="ring ring-two" />

        <div className="particles">
          {Array.from({ length: 30 }).map((_, index) => (
            <span
              key={index}
              style={{
                "--delay": `${index * 0.18}s`,
                "--left": `${(index * 37) % 100}%`,
                "--top": `${(index * 61) % 100}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <section className="login-layout">
        <div className="brand-section">
          <div className="brand-mark">
            <div className="brand-mark-inner">
              N
            </div>
          </div>

          <div className="brand-text">
            <span className="brand-name">
              BHARATCORE
            </span>

            <span className="brand-tagline">
              DIGITAL INTELLIGENCE
            </span>
          </div>
        </div>

        <div className="content-wrapper">
          <div
            ref={cardRef}
            className="login-card"
            onMouseMove={handleCardMouseMove}
          >
            <div className="card-glow" />

            <div className="card-content">
              <div className="welcome-section">
                <div className="status-indicator">
                  <span className="status-dot" />
                  SYSTEM ONLINE
                </div>

                <h1>
                  Welcome
                  <br />
                  <span>back.</span>
                </h1>

                <p>
                  Sign in to continue to your
                  <br />
                  digital workspace.
                </p>
              </div>

              <form
                className="login-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="input-group">
                  <label htmlFor="email">
                    EMAIL ADDRESS
                  </label>

                  <div
                    className={`input-wrapper ${
                      emailError ? "input-error" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                        />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      autoComplete="email"
                      onChange={(event) => {
                        setEmail(event.target.value);

                        if (emailError) {
                          setEmailError("");
                        }
                      }}
                    />

                    {email.length > 0 && (
                      <div className="input-check">
                        {validateEmail(email) ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {emailError && (
                    <span className="error-message">
                      {emailError}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <label htmlFor="password">
                      PASSWORD
                    </label>

                    <button
                      type="button"
                      className="forgot-link"
                      onClick={() => {
                        setForgotOpen(true);
                        setForgotEmail(email);
                        setForgotMessage("");
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div
                    className={`input-wrapper ${
                      passwordError ? "input-error" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="4"
                          y="10"
                          width="16"
                          height="11"
                          rx="2"
                        />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                    </div>

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(event) => {
                        setPassword(event.target.value);

                        if (passwordError) {
                          setPasswordError("");
                        }
                      }}
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                          <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.7 3.5 10 8-0.5 1.8-1.4 3.3-2.7 4.6" />
                          <path d="M6.1 6.1C4.5 7.2 3.4 8.8 2 12c1.3 4.5 5 8 10 8 1.1 0 2.1-.2 3.1-.5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {passwordError && (
                    <span className="error-message">
                      {passwordError}
                    </span>
                  )}
                </div>

                <div className="form-options">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(
                          event.target.checked
                        )
                      }
                    />

                    <span className="custom-checkbox">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>

                    <span>Remember me</span>
                  </label>
                </div>

                <button
                  className={`login-button ${
                    isLoading ? "loading" : ""
                  } ${
                    loginSuccess ? "success" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="button-content">
                    {isLoading ? (
                      <>
                        <span className="spinner" />
                        AUTHENTICATING
                      </>
                    ) : loginSuccess ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                        ACCESS GRANTED
                      </>
                    ) : (
                      <>
                        SIGN IN

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </span>

                  <span className="button-shine" />
                </button>
              </form>

              <div className="card-footer">
                <span className="footer-line" />
                <span>SECURE CONNECTION</span>
                <span className="footer-line" />
              </div>
            </div>
          </div>

          <div className="security-badge">
            <div className="security-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                <path d="m8.5 12 2.2 2.2 4.8-5" />
              </svg>
            </div>

            <div>
              <strong>Protected by BharatCore Security</strong>
              <span>
                Your connection is encrypted end-to-end.
              </span>
            </div>
          </div>
        </div>

        <div className="bottom-meta">
          <span>© 2026 NEXUS SYSTEMS</span>

          <div>
            <button type="button">
              PRIVACY
            </button>

            <button type="button">
              TERMS
            </button>

            <button type="button">
              HELP
            </button>
          </div>
        </div>
      </section>

      {forgotOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setForgotOpen(false);
            }
          }}
        >
          <div className="forgot-modal">
            <button
              className="modal-close"
              type="button"
              onClick={() => setForgotOpen(false)}
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="modal-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
                <path d="m5 7 7 5 7-5" />
              </svg>
            </div>

            <div className="modal-heading">
              <span>ACCOUNT RECOVERY</span>

              <h2>
                Reset your
                <br />
                <strong>password.</strong>
              </h2>

              <p>
                Enter your email address and we&apos;ll
                send you a secure password reset link.
              </p>
            </div>

            <div className="modal-input">
              <label htmlFor="forgot-email">
                EMAIL ADDRESS
              </label>

              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(event) => {
                  setForgotEmail(
                    event.target.value
                  );
                  setForgotMessage("");
                }}
              />
            </div>

            {forgotMessage && (
              <div
                className={`forgot-message ${
                  forgotMessage.startsWith(
                    "If an account"
                  )
                    ? "message-success"
                    : "message-error"
                }`}
              >
                {forgotMessage}
              </div>
            )}

            <button
              className="reset-button"
              type="button"
              onClick={handleForgotPassword}
            >
              SEND RESET LINK
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}