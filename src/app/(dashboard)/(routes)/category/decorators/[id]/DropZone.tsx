const Dropzone = ({ onDrop, onClick }:any) => (
    <div
      onClick={onClick}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          onDrop(e.dataTransfer.files);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer text-center"
    >
      <p className="text-gray-500">Drag & Drop images here or click to upload</p>
    </div>
  );

export default Dropzone;