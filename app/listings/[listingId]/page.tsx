import { getCurrentUser } from "app/actions/getCurrentUser";
import getListingById from "app/actions/getListingById";
import getReservations from "app/actions/getReservations";
import Container from "app/components/Container";
import EmptyState from "app/components/EmptyState";
import { SafeUser } from "app/types";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <Container>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser as SafeUser}
      />
    </Container>
  );
};

export default ListingPage;
