import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/user.context";
import { article1, article2 } from "../../Data/articles";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Container = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'DM Sans', sans-serif;
  background-image: url("edu.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  line-height: 1.6;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardAnimated = animated(styled.div`
  background-color: rgba(240, 240, 240, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
  max-width: 400px;
  width: 100%;
`);

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Subheading = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: normal;
`;

const List = styled.ul`
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-weight: normal;
  font-size: 1.2rem;
`;

const Educational_Content = () => {
  const articles = [article1, article2];
  const randomIndex = Math.floor(Math.random() * articles.length);
  const selectedArticle = articles[randomIndex];

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { mass: 1, tension: 280, friction: 20 },
    delay: 200,
  });

  return (
    <Container>
      <Title>{selectedArticle.title}</Title>
      <Content>
        {selectedArticle.content &&
          selectedArticle.content.map((section, index) =>
            typeof section === "string" ? (
              <CardAnimated key={index} style={cardAnimation}>
                <Paragraph>{section}</Paragraph>
              </CardAnimated>
            ) : (
              <CardAnimated key={index} style={cardAnimation}>
                <Heading>{section.heading}</Heading>
                <List>
                  {section.points.map((point, idx) => (
                    <ListItem key={idx}>{point}</ListItem>
                  ))}
                </List>
              </CardAnimated>
            )
          )}
      </Content>
    </Container>
  );
};

export default Educational_Content;