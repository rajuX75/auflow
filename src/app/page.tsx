'use client';

import Logout from '@/components/logout';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Protected Server Components
        </h1>

        <pre className="bg-gray-100 rounded-md p-4 overflow-auto text-sm border border-gray-200">
          {JSON.stringify(data, null, 2)}
        </pre>

        <div className="flex gap-4 justify-center">
          <Button disabled={create.isPending} onClick={() => create.mutate()}>
            Create Workflow
          </Button>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Page;
