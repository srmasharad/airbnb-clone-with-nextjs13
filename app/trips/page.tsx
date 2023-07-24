import { getCurrentUser } from "app/actions/getCurrentUser";
import getReservations from "app/actions/getReservations";
import Container from "app/components/Container";
import EmptyState from "app/components/EmptyState";
import { SafeUser } from "app/types";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );

  return (
    <Container>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser as SafeUser}
      />
    </Container>
  );
};

export default TripsPage;
