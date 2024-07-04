import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CatchAllPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/404');
  }, [router]);

  return null;
};

export default CatchAllPage;
