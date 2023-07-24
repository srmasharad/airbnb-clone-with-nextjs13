"use client";

import { useCallback, useEffect, useState } from "react";

import { IconX } from "@tabler/icons-react";

import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(Boolean(isOpen));

  useEffect(() => {
    setShowModal(Boolean(isOpen));
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !handleSecondaryAction) return;

    secondaryAction?.();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline focus:outline-none">
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
        {/* Content */}
        <div
          className={`translate h-full duration-300 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="translate relative flex h-full w-full flex-col
      rounded-xl border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto"
          >
            {/* Header */}
            <div className="relative flex items-center justify-center rounded-t border-b-[1px] px-6 py-4">
              <button
                onClick={handleClose}
                type="button"
                className="absolute left-4 border-0 p-1 text-slate-600 transition hover:opacity-70"
              >
                <IconX size={18} />
              </button>
              <div className="font-semibold">{title}</div>
            </div>

            {/* Body */}
            <div className="relative flex-auto px-6 py-5">{children}</div>

            {/* Footer */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <div className="flex w-full flex-row items-center gap-4">
                {handleSecondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    label={secondaryActionLabel as string}
                    wide
                  />
                )}
                <Button
                  disabled={disabled}
                  onClick={handleSubmit}
                  label={actionLabel}
                  wide
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
