"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto max-w-[2520px] px-4 md:px-5">{children}</div>;
};

export default Container;
