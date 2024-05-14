type ModalProps = {
  visible: boolean;
  render: JSX.Element;
  onClose: () => void;
};

function Modal({ visible, render, onClose }: ModalProps) {
  function handleOnClose(e: any) {
    if (e.target.id === "container") onClose();
  }
  if (!visible) return null;
  return (
    <div
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-screen z-[999] h-screen  transition-all duration-300 overflow-y-auto"
      onClick={handleOnClose}
    >
      <div className="p-5 rounded-2xl bg-white m-2 max-h-full overflow-y-auto">
        {render}
      </div>
    </div>
  );
}

export default Modal;
