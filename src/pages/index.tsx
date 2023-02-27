import { CircularProgress } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ReactEmbededGist from 'react-embed-gist';
import styled, { css } from 'styled-components';
import { Gist } from 'types/Gist';
import { shuffle } from 'utils/array';
import { getRandomFinalGist } from 'utils/gist';
import { capitalizeFirstLetter } from 'utils/string';

interface SiteProps {}

interface AnswerButtonProps {
   isRight: boolean;
   isRightClicked: boolean;
   isWrongButtonClicked: {
      state: boolean;
      id: number;
   };
   languageid: number;
}

const Home: NextPage<SiteProps> = ({}) => {
   const [points, setPoints] = useState(0);
   const [gist, setGist] = useState<Gist>();
   const [languages, setLanguages] = useState<string[]>([]);
   const [rigthLanguage, setRigthLanguages] = useState<string>();
   const [clickedRightButton, setClickedRightButton] = useState(false);
   const [clickedWrongButton, setClickedWrongButton] = useState({
      state: false,
      id: 0,
   });

   useEffect(() => {
      showGist();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   async function showGist() {
      const gist = await getRandomFinalGist();
      if (!gist) return alert('Hm, something went wrong. Try again later.');
      setGist(gist.gist);
      const rigthLanguage = (
         Object.values(gist.gist.files)[0].language as string
      ).toLowerCase();
      resetVariables();
      setRigthLanguages(rigthLanguage);
      setLanguages(shuffle(gist.languages.concat(rigthLanguage)));
      return true;
   }

   function resetVariables() {
      setClickedRightButton(false);
      setClickedWrongButton({ state: false, id: 0 });
   }

   async function startNewGame() {
      setPoints(0);
      await showGist();
   }

   return (
      <Wrapper>
         <PointsWrapper>
            <PointsValue>{points}</PointsValue>
            <PointsTitle>Your score</PointsTitle>
         </PointsWrapper>
         <ContentWrapper>
            <CodeWrapper>
               <CodeQuestion>Guess the code language!</CodeQuestion>
               <Code>
                  {gist ? (
                     <ReactEmbededGist
                        gist={`${gist.owner.login}/${gist.id}`}
                        titleClass='gist-title'
                        file={Object.keys(gist.files)[0]}
                     />
                  ) : (
                     <CircularProgress />
                  )}
               </Code>
            </CodeWrapper>
            <ButtonWrapper>
               {languages.length ? (
                  <>
                     {languages.map((language, index) => (
                        <AnswerButton
                           languageid={index}
                           isWrongButtonClicked={clickedWrongButton}
                           key={index}
                           isRight={language === rigthLanguage}
                           isRightClicked={clickedRightButton}
                           onClick={() => {
                              if (
                                 clickedRightButton ||
                                 clickedWrongButton.state
                              )
                                 return;
                              if (language !== rigthLanguage) {
                                 setClickedRightButton(false);
                                 setClickedWrongButton({
                                    id: index,
                                    state: true,
                                 });
                              } else {
                                 setClickedRightButton(true);
                                 setPoints((prev) => prev + 50);

                                 setTimeout(async () => {
                                    await showGist();
                                    resetVariables();
                                 }, 1500);
                              }
                           }}
                        >
                           {capitalizeFirstLetter(language)}
                        </AnswerButton>
                     ))}
                  </>
               ) : null}
            </ButtonWrapper>
            <ButtonWrapper>
               {clickedWrongButton.state && (
                  <Button onClick={startNewGame}>New game</Button>
               )}
            </ButtonWrapper>
            <TextWrapper>
               {clickedWrongButton.state && <RedText>You loose</RedText>}
            </TextWrapper>
         </ContentWrapper>
      </Wrapper>
   );
};

const Wrapper = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 2em;
`;

const PointsWrapper = styled.div`
   margin-top: 2rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`;

const PointsValue = styled.span`
   font-size: 4rem;
   font-weight: 800;
   color: #fff;
`;

const PointsTitle = styled.span`
   font-size: 1.5rem;
   font-weight: 500;
   color: #fff;
`;

const ContentWrapper = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
`;

const CodeWrapper = styled.div`
   flex-grow: 1;
   width: clamp(300px, 50vw, 700px);
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`;

const CodeQuestion = styled.span`
   font-size: 1.7rem;
   font-weight: 600;
   align-self: flex-start;
   font-family: 'Poppins', sans-serif;
   color: #fff;
`;

const Code = styled.div`
   max-height: 500px;
   overflow-y: scroll;
   width: 100%;
`;

const ButtonWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   gap: 1rem;
   padding: 1rem;

   @media (max-width: 700px) {
      flex-direction: column;
   }
`;

const Button = styled.button`
   width: 130px;
   height: 50px;
   border-radius: 50px;
   padding: 30px 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #fff;
   cursor: pointer;
`;

const AnswerButton = styled(Button)<AnswerButtonProps>`
   ${({ isRight, isRightClicked, isWrongButtonClicked }) =>
      (isRight && isRightClicked) || (isWrongButtonClicked.state && isRight)
         ? css`
              background: linear-gradient(
                    119.32deg,
                    #7bff2a 16.26%,
                    rgba(255, 255, 255, 0) 67.98%
                 ),
                 #59eb00;
           `
         : ''}

   ${({ languageid, isWrongButtonClicked }) =>
      languageid === isWrongButtonClicked.id && isWrongButtonClicked.state
         ? css`
              background: linear-gradient(
                    109.45deg,
                    #ff7373 -7.86%,
                    rgba(255, 255, 255, 0) 79.2%
                 ),
                 #ff4949;
           `
         : ''}
`;

const TextWrapper = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
`;

const Text = styled.span`
   font-size: 1rem;
`;

const RedText = styled(Text)`
   color: red;
`;

const BlueText = styled(Text)`
   color: #3b3bff;
`;

export default Home;
