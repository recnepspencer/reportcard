import { Input } from "postcss";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reportRouter = createTRPCRouter({
  getStudent: publicProcedure
  .query(({ctx}) => {
    return ctx.prisma.student.findFirst()
  }),
  getReportcard: publicProcedure
  .query(({ctx}) => {
    return ctx.prisma.reportcard.findMany({
      include: {
        classes: true,
      },
    })
  })
})
