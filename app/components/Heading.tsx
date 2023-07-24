"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-xl font-bold">{title}</div>
      <div className="text-md mt-1 font-semibold text-slate-500">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
