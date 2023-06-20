import * as z from 'zod';

export const userNameSchema = z.object({
   name: z.string().min(3).max(32),
   surname: z.string().min(3).max(32),
   patronymic: z.string().min(3).max(32),
   faculty: z.string().min(3).max(32),
   academic_duty: z.string().min(3).max(32),
});
