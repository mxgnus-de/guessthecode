import axios from 'axios';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styled from 'styled-components';
import { FormattedHighscores } from 'types/Highscore';

interface SiteProps {
   highscores: FormattedHighscores[];
}

const Highscore: NextPage<SiteProps> = ({ highscores }) => {
   const { data: session } = useSession();
   console.log(highscores);
   return (
      <HighscoreWrapper>
         <PageTitle>Highscores</PageTitle>
         <HighscoreContainer>
            {highscores
               .sort((a, b) => a.score - b.score)
               .map(({ id, score, user }, index) => {
                  return (
                     <HighscoreItem key={index}>
                        <HighscoreItemPosition>{index}</HighscoreItemPosition>

                        <HighscoreItemImage
                           src={
                              user.image ||
                              'https://www.gravatar.com/avatar/83400efd27050ed0361efc0110230f81.jpg?s=80&d=mp&r=g'
                           }
                           width={40}
                           height={40}
                           alt={user.image}
                        />
                        <HighscoreItemUsername>
                           {user.name}
                        </HighscoreItemUsername>
                        <HighscoreItemScore>{score}</HighscoreItemScore>
                     </HighscoreItem>
                  );
               })}
         </HighscoreContainer>
      </HighscoreWrapper>
   );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = async () => {
   let error = false;
   const reponse = await axios
      .get(
         (process.env.NEXT_PUBLIC_URL || process.env.VERCEL) + '/api/highscore',
      )
      .catch((err) => {
         error = true;
         return;
      });
   if (error || !reponse) {
      return {
         props: {
            highscores: [],
         },
      };
   }

   return {
      props: {
         highscores: error ? [] : reponse.data.highscores,
      },
   };
};

const HighscoreWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const PageTitle = styled.h1`
   font-size: 3em;
   font-weight: bold;
   margin-top: 1em;
`;

const HighscoreContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   padding: 1rem;
   padding-top: 3em;
   gap: 0.5rem;
`;

const HighscoreItem = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-start;
   height: 50px;
   padding: 0 1rem;
   width: clamp(5rem, 50vw, 100%);
   border-bottom: 1px solid #707070;
   gap: 5em;

   @media (max-width: 1000px) {
      gap: 1rem;
   }
`;

const HighscoreItemPosition = styled.span`
   font-size: 1.5rem;
   font-weight: bold;
   color: #ff7e40;

   &::after {
      content: '.';
   }
`;

const HighscoreItemScore = styled.span`
   font-size: 1rem;
   font-weight: bold;
   color: #ff7e40;
`;

const HighscoreItemImage = styled(Image)`
   width: 40px;
   height: 40px;
   border-radius: 50%;
`;

const HighscoreItemUsername = styled.span`
   font-size: 1rem;
   font-weight: bold;
   color: #ff7e40;
`;

export default Highscore;
