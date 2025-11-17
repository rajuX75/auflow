import Logout from '@/components/logout';
import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';

const Page = async () => {
  await requireAuth();

  const data = await caller.getUser();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected server components
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Logout />
    </div>
  );
};

export default Page;
