import React, { FC, MouseEventHandler, useEffect, useState } from "react";

export interface ToastTypes {
  content: string;
  type?: string;
  delay?: number;
}

interface Props {
  toast: ToastTypes;
  close: MouseEventHandler<HTMLButtonElement>;
}

const ToastWidget: FC<Props> = ({ toast, close }) => {
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFade(false);
    }, toast.delay);
  }, [toast.delay]);

  return (
    <div
      className="toast-container position-fixed start-50 translate-middle-x"
      aria-live="polite"
      aria-atomic="true"
      style={{
        zIndex: 2000,
      }}
    >
      <div
        className={`animate__animated ${
          fade ? "animate__fadeIn" : "animate__fadeOut"
        } bg-${
          toast.type || "primary"
        } animate__fast show toast align-items-center text-white border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
      >
        <div className="d-flex mx-2">
          <div className="toast-body fs-4">{toast.content}</div>
          <button
            type="button"
            onClick={close}
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  );
};

export { ToastWidget };
