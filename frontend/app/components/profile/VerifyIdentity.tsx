'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface VerifyIdentityProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const VerifyIdentity: React.FC<VerifyIdentityProps> = ({
  selectedFile,
  setSelectedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const file = files && files.length > 0 ? files[0] : null;
    if (file) setSelectedFile(file);
  }

  return (
    <div className="flex flex-col -translate-y-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 items-center justify-center p-6 bg-gray-100 rounded-lg w-fit mx-auto ">
      <p className="text-base font-semibold text-gray-700 mb-2">
        {selectedFile
          ? 'File selected:'
          : 'Upload a document or photo to verify your identity'}
      </p>
      {selectedFile && (
        <p className="text-sm text-amber-600 font-medium mb-4">
          {selectedFile.name}
        </p>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg transition-all shadow w-fit"
      >
        {selectedFile ? 'Change File' : 'Upload'}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
      />

      {selectedFile && selectedFile.type.startsWith('image/') && (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="mt-4 w-40 h-40 object-contain rounded border"
          width={40}
          height={40}
          onLoad={(e) =>
            URL.revokeObjectURL((e.target as HTMLImageElement).src)
          }
        />
      )}
    </div>
  );
};

export default VerifyIdentity;
