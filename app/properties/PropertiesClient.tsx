"use client";

import {
  useCallback,
  useState,
} from 'react';

import Heading from 'app/components/Heading';
import ListingCard from 'app/components/listings/ListingCard';
import {
  SafeListing,
  SafeUser,
} from 'app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Properties Removed");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <>
      <Heading title="Properties" subtitle="List of your properties" />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Remove Properties"
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default PropertiesClient;
