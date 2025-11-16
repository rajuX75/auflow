import { caller } from '@/trpc/server';

const Page = async () => {
  const user = await caller.getUser();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(user)}
    </div>
  );
};

export default Page;
