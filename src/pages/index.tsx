import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): React.ReactNode {
  const baseUrl = useBaseUrl('/docs/overview');
  return <Redirect to={baseUrl} />;
}