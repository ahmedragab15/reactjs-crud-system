import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface Iprop {
  isOpen: boolean;
  close: () => void;
  title: string;
  children:ReactNode
}

const Modal = ({ isOpen, close, title, children }: Iprop) => {

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-xs">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel transition className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              {title && <DialogTitle className="text-lg font-semibold leading-6 text-black">{title}</DialogTitle>}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
