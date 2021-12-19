import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import store, { persistor } from "./store/store";
import i18n from "./i18n/i18next";
import AuthInit from "./components/authinit/AuthInit";
import { AppRoutes } from "./routes/AppRoutes";
import { Spinner } from "./components/loader/Spinner";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={Spinner}>
            <BrowserRouter>
              <AuthInit>
                <AppRoutes />
              </AuthInit>
            </BrowserRouter>
          </Suspense>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
