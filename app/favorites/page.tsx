import { getCurrentUser } from 'app/actions/getCurrentUser';
import getFavoriteListings from 'app/actions/getfavoriteListings';
import Container from 'app/components/Container';
import EmptyState from 'app/components/EmptyState';
import { SafeUser } from 'app/types';

import FavoritesClient from './FavoritesClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites listing"
      />
    );
  }

  return (
    <Container>
      <FavoritesClient
        listings={favoriteListings}
        currentUser={currentUser as SafeUser}
      />
    </Container>
  );
};

export default ReservationsPage;
