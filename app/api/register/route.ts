import { create } from 'zustand';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   try {
      console.log('kek');
      const body = await request.json();
      const { email, academic_duty, password } = body;

      if (!email || !academic_duty || !password) {
         return new NextResponse('Недостающая информация', { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      console.log(academic_duty);

      const user = await prisma.user.create({
         data: {
            email,
            academic_duty,
            hashedPassword
         }
      });

      console.log(academic_duty);
      

      return NextResponse.json(user);
   } catch (error: any) {
      console.log(error, 'REGISTRATION_ERROR');
      return new NextResponse('Внутренняя ошибка', { status: 500 });
   }
}
