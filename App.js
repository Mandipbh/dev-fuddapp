import React, { useEffect } from 'react';
import MianStack from './src/navigation/MianStack';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Appearance, LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    Appearance.addChangeListener({ colorScheme: 'light' });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <MianStack />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
