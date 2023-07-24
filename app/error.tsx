"use client";

import { useEffect } from 'react';

import EmptyState from './components/EmptyState';

interface ErrorStateprops {
  error: Error;
}

const Error = ({ error }: ErrorStateprops) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh oh!" subtitle=" Something went wrong." />;
};

export default Error;
