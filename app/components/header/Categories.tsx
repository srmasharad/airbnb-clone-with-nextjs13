"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  IconBeach,
  IconBuildingCastle,
  IconBuildingCommunity,
  IconBuildingCottage,
  IconBuildingTunnel,
  IconCactus,
  IconCampfire,
  IconDiamond,
  IconMountain,
  IconPool,
  IconSailboat,
  IconSleigh,
  IconSnowflake,
  IconTree,
  IconWindmill,
} from "@tabler/icons-react";

import CategoryItem, { CategoryItemProps } from "../CategoryItem";
import Container from "../Container";

export const categories: CategoryItemProps[] = [
  {
    label: "Beach",
    icon: IconBeach,
    description: "This property is close  to the beach!",
  },
  {
    label: "Windmills",
    icon: IconWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: IconBuildingCommunity,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: IconMountain,
    description: "This property is close  to the beach!",
  },
  {
    label: "Pools",
    icon: IconPool,
    description: "This property has windmills!",
  },
  {
    label: "Islands",
    icon: IconTree,
    description: "This property is modern!",
  },
  {
    label: "Lake",
    icon: IconSailboat,
    description: "This property is close  to the beach!",
  },
  {
    label: "Skiing",
    icon: IconSleigh,
    description: "This property has windmills!",
  },
  {
    label: "Castles",
    icon: IconBuildingCastle,
    description: "This property is castles!",
  },
  {
    label: "Camping",
    icon: IconCampfire,
    description: "This property is modern!",
  },
  {
    label: "Arctic",
    icon: IconSnowflake,
    description: "This property is modern!",
  },
  {
    label: "Cave",
    icon: IconBuildingTunnel,
    description: "This property is modern!",
  },
  {
    label: "Desert",
    icon: IconCactus,
    description: "This property is modern!",
  },
  {
    label: "Barns",
    icon: IconBuildingCottage,
    description: "This property is modern!",
  },
  {
    label: "Lux",
    icon: IconDiamond,
    description: "This property is modern!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const currentCategory = params?.get("category");

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="mt-2.5 border-t-[1px] pt-2.5">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 overflow-x-auto 2xl-[1645px]:justify-center">
          {categories.map((category) => (
            <CategoryItem
              key={category.label}
              label={category.label}
              icon={category.icon}
              selected={currentCategory === category.label}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
