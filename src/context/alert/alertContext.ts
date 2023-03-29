import { createContext } from "react";
import Alert from "../../components/Alert";

interface AlertContextType {
    alert: Alert | null;
    show: (alert: Alert) => void;
    hide: () => void;
  }

  export const AlertContext = createContext<AlertContextType>({
    alert: null,
    show: () => {},
    hide: () => {},
  });