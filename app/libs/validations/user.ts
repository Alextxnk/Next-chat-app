import * as z from 'zod';

export const userNameSchema = z.object({
   name: z.string().min(3).max(32),
   surname: z.string().min(3).max(32),
   patronymic: z.string().min(3).max(32),
   // faculty: z.string().min(3).max(32),
   // education_stage: z.string().min(3).max(32),
   // course: z.string().min(3).max(32),
   // academic_duty: z.string().min(3).max(32),
   faculty: z.object({ value: z.string(), label: z.string()}),
   education_stage: z.object({ value: z.string(), label: z.string()}),
   course: z.object({ value: z.string(), label: z.string()}),
   department: z.string().min(3).max(32),
   group: z.string().min(3).max(32),
   academic_duty: z.object({ value: z.string(), label: z.string()})
});

