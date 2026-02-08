import { createContext, type ReactNode,useContext,useState } from "react";

type ToastType = "success" | "warning" | "alert" | "info";

export type Toast = {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
}

type ToastContextType = {
    toasts: Toast[];
    showToasts: (toast: Omit<Toast, "id">) => void;
    removeToast: (id:string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be inside ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToasts = (toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    const newToast = { ...toast, id };

    setToasts((prev) => {
      const updated = [...prev, newToast];
    if (updated.length > 3) updated.shift();
  return updated});

    if (toast.duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}