const SlideOver = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md z-40" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideOver;
