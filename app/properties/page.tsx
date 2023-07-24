import { getCurrentUser } from 'app/actions/getCurrentUser';
import getListings from 'app/actions/getListings';
import Container from 'app/components/Container';
import EmptyState from 'app/components/EmptyState';
import { SafeUser } from 'app/types';

import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );

  return (
    <Container>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser as SafeUser}
      />
    </Container>
  );
};

export default PropertiesPage;
