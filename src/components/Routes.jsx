import React, { useState, useCallback, useMemo, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import theme from "../utils/theme";
import { css, Global } from "@emotion/react";
import "typeface-overpass";
import { Home } from "../containers";

import GoogleLogin from "react-google-login";
import { AUTH_TOKEN_STORAGE_KEY, API_URL, headers } from "../constants";
import { UserContext } from "../utils/datastore/UserContext";
import { Navbar } from "./Navbar";
import { Facebook as Loader } from "react-content-loader";
import {
  ThemeProvider,
  Stack,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

export const Routes = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY))
  );
  const refreshAuthStatus = useCallback(() => {
    setIsAuthenticated(Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)));
  }, []);

  const getUser = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      try {
        const response = await fetch(`${API_URL}/todos/current-user`, {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }),
          method: "GET",
        });
        const json = await response.json();
        setUser(json);
      } catch (e) {
        console.log(e);
        refreshAuthStatus();
        setUser(null);
      }
    } else {
      refreshAuthStatus();
      setUser(null);
    }
  }, [refreshAuthStatus]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setUser(null);
    refreshAuthStatus();
  }, [refreshAuthStatus]);

  const login = useCallback(
    async (token) => {
      try {
        const response = await fetch(`${API_URL}/rest-auth/google/`, {
          headers,
          method: "POST",
          body: JSON.stringify({ access_token: token.accessToken, code: "" }),
        });
        const authToken = await response.json();
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken.key);
        refreshAuthStatus();
        getUser();
      } catch (e) {
        console.log(e);
        setUser(null);
      }
    },
    [refreshAuthStatus, getUser]
  );

  useEffect(() => {
    getUser();
  }, [refreshAuthStatus, getUser, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          body {
            display: flex;
            flex-direction: column;
            font-family: ${theme.fonts.body};
          }
          input {
            border: none;
          }
          button {
            cursor: pointer;
            border: none;
          }
          h1 {
            font-family: ${theme.fonts.heading};
          }
          textarea:focus,
          button:focus,
          input:focus {
            outline: none;
          }
        `}
      />
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <ColorModeProvider>
            <CSSReset />
            <Navbar logout={logout}>
              {isAuthenticated ? (
                !user ? (
                  <Loader />
                ) : (
                  <Switch>
                    <Route exact path="/" component={Home} />
                  </Switch>
                )
              ) : (
                <Stack align="center" justify="center">
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={(token) => login(token)}
                    onFailure={(err) => console.log(err)}
                    cookiePolicy={"single_host_origin"}
                  />
                </Stack>
              )}
            </Navbar>
          </ColorModeProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
