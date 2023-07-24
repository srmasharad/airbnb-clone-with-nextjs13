import { getCurrentUser } from "app/actions/getCurrentUser";
import getReservations from "app/actions/getReservations";
import Container from "app/components/Container";
import EmptyState from "app/components/EmptyState";
import { SafeUser } from "app/types";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );

  return (
    <Container>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser as SafeUser}
      />
    </Container>
  );
};

export default ReservationsPage;
