"use client";

interface ListingCategoryProps {
  icon: React.ElementType;
  label: string;
  description: string;
}

const ListingCategory = ({
  icon: Icon,
  label,
  description,
}: ListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-slate-500" stroke={1.5} />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-slate-600 ">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
