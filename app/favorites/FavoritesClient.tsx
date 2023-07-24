import Heading from 'app/components/Heading';
import ListingCard from 'app/components/listings/ListingCard';
import {
  SafeListing,
  SafeUser,
} from 'app/types';

interface FavoriteClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoriteClientProps) => {
  return (
    <>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesClient;
