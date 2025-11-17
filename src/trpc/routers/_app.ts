import { inngest } from '@/inngest/client';
import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
export const appRouter = createTRPCRouter({
  testAI: baseProcedure.mutation(async () => {
    // throw new TRPCError({
    //   code: 'BAD_REQUEST',
    //   message: 'This is a test error from testAI mutation',
    // });
    await inngest.send({
      name: 'execute/ai',
    });
    return { success: true, message: 'AI execution triggered' };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'raju@mail.com',
      },
    });

    return prisma.workflow.create({
      data: {
        name: 'test-workflow',
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
