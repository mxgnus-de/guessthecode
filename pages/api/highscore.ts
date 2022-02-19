import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   const session = await getSession({
      req,
   });
   const { points } = req.body;

   if (req.method === 'POST') {
      if (!session) {
         res.status(401).json({
            message: 'Unauthorized',
         });
         return;
      }
      if (!points) {
         res.status(400).json({
            message: 'Missing points',
         });
         return;
      }
      if (!Number.isInteger(points)) {
         res.status(400).json({
            message: 'Points must be an integer',
         });
         return;
      }

      const highscore = await prisma.highscore.findUnique({
         where: {
            id: session.user.id,
         },
      });

      if (!highscore) {
         await prisma.highscore.create({
            data: {
               id: session.user.id,
               score: Number(points),
            },
         });

         return res.status(200).json({
            message: 'Highscore created',
         });
      }

      if (highscore && highscore.score < points) {
         await prisma.highscore.update({
            where: {
               id: session.user.id,
            },
            data: {
               score: Number(points),
            },
         });
      }
   } else if (req.method === 'GET') {
      const highscores = await prisma.highscore.findMany({
         orderBy: {
            score: 'desc',
         },
      });
      const users = await prisma.user.findMany({
         where: {
            id: {
               in: highscores.map((highscore) => highscore.id),
            },
         },
      });

      const formattedHighscores = highscores.map((highscore) => {
         const user = users.find((user) => user.id === highscore.id);
         if (!user) return;
         return {
            id: highscore.id,
            score: highscore.score,
            user: {
               id: user.id,
               name: user.name,
               image: user.image,
            },
         };
      });

      return res.status(200).json({
         highscores: formattedHighscores,
      });
   } else {
      res.status(405).json({
         message: 'Method Not Allowed',
      });
      return;
   }
}
