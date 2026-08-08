"use client";

import {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "../common-design/register.css"

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (!cardRef.current || !sceneRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;

      const mouseX = event.clientX / innerWidth - 0.5;
      const mouseY = event.clientY / innerHeight - 0.5;

      const rotateX = mouseY * -8;
      const rotateY = mouseX * 10;

      cardRef.current.style.transform = `
        perspective(1400px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(0)
      `;

      sceneRef.current.style.setProperty(
        "--mouse-x",
        `${mouseX * 35}px`
      );

      sceneRef.current.style.setProperty(
        "--mouse-y",
        `${mouseY * 35}px`
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

      sceneRef.current.style.setProperty(
        "--mouse-x",
        "0px"
      );

      sceneRef.current.style.setProperty(
        "--mouse-y",
        "0px"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateForm = () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required.");
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError(
        "Name must contain at least 2 characters."
      );
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email address is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError(
        "Please enter a valid email address."
      );
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError(
        "Password must contain at least 8 characters."
      );
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(
        "Please confirm your password."
      );
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Passwords do not match."
      );
      valid = false;
    }

    return valid;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    setRegisterSuccess(false);
    setIsLoading(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setRegisterSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    /*
      Replace this simulated request with your
      actual registration API call.

      Example:

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );

    setIsLoading(false);
    setRegisterSuccess(true);
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

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    card.style.setProperty(
      "--glow-x",
      `${percentX}%`
    );

    card.style.setProperty(
      "--glow-y",
      `${percentY}%`
    );
  };

  const passwordStrength = () => {
    if (!password) {
      return {
        level: 0,
        text: "",
      };
    }

    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    if (score <= 1) {
      return {
        level: 1,
        text: "WEAK",
      };
    }

    if (score === 2) {
      return {
        level: 2,
        text: "FAIR",
      };
    }

    if (score === 3) {
      return {
        level: 3,
        text: "GOOD",
      };
    }

    return {
      level: 4,
      text: "STRONG",
    };
  };

  const strength = passwordStrength();

  return (
    <main className="register-page">
      {/* =========================================
          3D BACKGROUND
      ========================================= */}

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

        <div className="cube cube-three">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="ring ring-one" />
        <div className="ring ring-two" />
        <div className="ring ring-three" />

        <div className="particles">
          {Array.from({ length: 36 }).map(
            (_, index) => (
              <span
                key={index}
                style={
                  {
                    "--delay": `${
                      index * 0.16
                    }s`,
                    "--left": `${
                      (index * 37) % 100
                    }%`,
                    "--top": `${
                      (index * 61) % 100
                    }%`,
                  } as React.CSSProperties
                }
              />
            )
          )}
        </div>
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="register-layout">
        {/* BRAND */}

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
            className="register-card"
            onMouseMove={handleCardMouseMove}
          >
            <div className="card-glow" />

            <div className="card-content">
              {/* =========================================
                  HEADER
              ========================================= */}

              <div className="welcome-section">
                <div className="status-indicator">
                  <span className="status-dot" />
                  NEW ACCOUNT REGISTRATION
                </div>

                <h1>
                  Create
                  <br />
                  <span>your account.</span>
                </h1>

                <p>
                  Join the bharatcore digital workspace
                  <br />
                  and unlock your full potential.
                </p>
              </div>

              {/* =========================================
                  FORM
              ========================================= */}

              <form
                className="register-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* NAME */}

                <div className="input-group">
                  <label htmlFor="name">
                    FULL NAME
                  </label>

                  <div
                    className={`input-wrapper ${
                      nameError
                        ? "input-error"
                        : ""
                    }`}
                  >
                    <div className="input-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                        />

                        <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
                      </svg>
                    </div>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      autoComplete="name"
                      onChange={(event) => {
                        setName(
                          event.target.value
                        );

                        if (nameError) {
                          setNameError("");
                        }

                        setRegisterSuccess(false);
                      }}
                    />

                    {name.length > 0 &&
                      name.trim().length >=
                        2 && (
                        <div className="input-check">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        </div>
                      )}
                  </div>

                  {nameError && (
                    <span className="error-message">
                      {nameError}
                    </span>
                  )}
                </div>

                {/* EMAIL */}

                <div className="input-group">
                  <label htmlFor="email">
                    EMAIL ADDRESS
                  </label>

                  <div
                    className={`input-wrapper ${
                      emailError
                        ? "input-error"
                        : ""
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
                        setEmail(
                          event.target.value
                        );

                        if (emailError) {
                          setEmailError("");
                        }

                        setRegisterSuccess(false);
                      }}
                    />

                    {email.length > 0 &&
                      isValidEmail(email) && (
                        <div className="input-check">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        </div>
                      )}
                  </div>

                  {emailError && (
                    <span className="error-message">
                      {emailError}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}

                <div className="input-group">
                  <label htmlFor="password">
                    PASSWORD
                  </label>

                  <div
                    className={`input-wrapper ${
                      passwordError
                        ? "input-error"
                        : ""
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
                      placeholder="Create a strong password"
                      value={password}
                      autoComplete="new-password"
                      onChange={(event) => {
                        setPassword(
                          event.target.value
                        );

                        if (passwordError) {
                          setPasswordError("");
                        }

                        setRegisterSuccess(false);
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
                        setShowPassword(
                          !showPassword
                        )
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

                  {password.length > 0 && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map(
                          (bar) => (
                            <span
                              key={bar}
                              className={
                                bar <=
                                strength.level
                                  ? `strength-active strength-${strength.level}`
                                  : ""
                              }
                            />
                          )
                        )}
                      </div>

                      <span
                        className={`strength-text strength-text-${strength.level}`}
                      >
                        {strength.text}
                      </span>
                    </div>
                  )}

                  {passwordError && (
                    <span className="error-message">
                      {passwordError}
                    </span>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="input-group">
                  <label htmlFor="confirmPassword">
                    CONFIRM PASSWORD
                  </label>

                  <div
                    className={`input-wrapper ${
                      confirmPasswordError
                        ? "input-error"
                        : ""
                    }`}
                  >
                    <div className="input-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />

                        <path d="m8.5 12 2.2 2.2 4.8-5" />
                      </svg>
                    </div>

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      autoComplete="new-password"
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target.value
                        );

                        if (
                          confirmPasswordError
                        ) {
                          setConfirmPasswordError(
                            ""
                          );
                        }

                        setRegisterSuccess(false);
                      }}
                    />

                    {confirmPassword.length >
                      0 &&
                      password ===
                        confirmPassword && (
                        <div className="input-check">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        </div>
                      )}

                    <button
                      type="button"
                      className="password-toggle"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
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

                  {confirmPasswordError && (
                    <span className="error-message">
                      {confirmPasswordError}
                    </span>
                  )}
                </div>

                {/* BUTTONS */}

                <div className="action-buttons">
                  <button
                    type="button"
                    className="clear-button"
                    onClick={clearForm}
                    disabled={isLoading}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 6h18" />

                      <path d="M8 6V4h8v2" />

                      <path d="M19 6l-1 15H6L5 6" />

                      <path d="M10 11v6M14 11v6" />
                    </svg>

                    CLEAR
                  </button>

                  <button
                    type="submit"
                    className={`submit-button ${
                      isLoading
                        ? "loading"
                        : ""
                    } ${
                      registerSuccess
                        ? "success"
                        : ""
                    }`}
                    disabled={isLoading}
                  >
                    <span className="button-content">
                      {isLoading ? (
                        <>
                          <span className="spinner" />
                          CREATING
                        </>
                      ) : registerSuccess ? (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>

                          ACCOUNT CREATED
                        </>
                      ) : (
                        <>
                          CREATE ACCOUNT

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
                </div>
              </form>

              {/* CARD FOOTER */}

              <div className="card-footer">
                <span className="footer-line" />

                <span>
                  ENCRYPTED REGISTRATION
                </span>

                <span className="footer-line" />
              </div>
            </div>
          </div>

          {/* SECURITY BADGE */}

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
              <strong>
                Protected by BharatCore Security
              </strong>

              <span>
                Your registration data is securely
                transmitted.
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="bottom-meta">
          <span>
            © 2026 BHARATCORE SYSTEMS
          </span>

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
    </main>
  );
}