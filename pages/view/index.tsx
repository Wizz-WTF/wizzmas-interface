import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardSentViewer from "../../components/card/CardSentViewer";
import CardReceivedViewer from "../../components/card/CardReceivedViewer";

const View = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
        setDomLoaded(true);
    }, []);

    if (domLoaded) {
        return (
            <>
                <Header />

                <Content>
                    <FillSection>
                        <h2>Your Cards</h2>
                        <CardSentViewer />
                        <CardReceivedViewer />
                    </FillSection>
                </Content>
            </>
        );
    }
};

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 3em;
  margin-bottom: 2em;
`;

export const FillSection = styled.div`
  background: #111;
  width: 100%;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1em;
`;



export default View;