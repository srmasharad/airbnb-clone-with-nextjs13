"use client";

import { useCallback } from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { IconPhotoPlus } from "@tabler/icons-react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="l7mznlse"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-slate-300 p-20 text-slate-900 transition hover:bg-slate-50"
          >
            <IconPhotoPlus size={36} stroke={1.25} className="text-slate-400" />
            <div className="text-md font-semibold">Click to upload</div>

            {value && (
              <div className="w-ful absolute inset-0 h-full">
                <Image src={value} alt="" fill style={{ objectFit: "cover" }} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
