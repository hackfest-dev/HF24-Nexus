import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/user.context";

const Educational_Content = () => {

    const articles = [
        {
          title: "Understanding the Impact of Trading Psychology",
          content: "Are you feeling overwhelmed and extremely stressed about your trading decisions? You're not alone. Trading can be intense, especially when emotions are running high...",
        },
        {
          title: "Mastering Your Emotions for Successful Trading",
          content: "Feeling like your emotions are spiraling out of control amidst the chaos of trading? Extreme stress can amplify emotional reactions, making it challenging to maintain composure and make rational decisions...",
        },
      ];
    
      // Randomly select an article
      const randomIndex = Math.floor(Math.random() * articles.length);
      const selectedArticle = articles[randomIndex];
    
      return (
        <div>
          <h2>{selectedArticle.title}</h2>
          <p>{selectedArticle.content}</p>
        </div>
      );
    };

export default Educational_Content;