"use client";

interface DividerProps {
  type?: "dotted" | "dashed" | "solid";
}

const Divider = ({ type = "solid" }: DividerProps) => {
  return (
    <div
      className={`
        my-2 
        h-0 
        border-t-[1px]
        ${
          type === "dashed"
            ? "border-dashed"
            : type === "dotted"
            ? "border-dotted"
            : "border-solid"
        }  
      `}
    />
  );
};

export default Divider;
