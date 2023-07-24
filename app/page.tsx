import { getCurrentUser } from './actions/getCurrentUser';
import getListings, { IListingParams } from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import {
  SafeListing,
  SafeUser,
} from './types';

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div className="pt-8">
      <Container>
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-8 pt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 2xl:pt-5 ">
          {listings.map((listing: SafeListing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser as SafeUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
