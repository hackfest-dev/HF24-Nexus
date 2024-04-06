import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/user.context";
import { article1, article2 } from "../../Data/articles";

const Educational_Content = () => {
    const articles = [article1, article2];
    const randomIndex = Math.floor(Math.random() * articles.length);
    const selectedArticle = articles[randomIndex];
  
    return (
        <div>
          <h2>{selectedArticle.title}</h2>
          <div>
            {selectedArticle.content && selectedArticle.content.map((section, index) => (
              typeof section === 'string' ? (
                <p key={index}>{section}</p>
              ) : (
                <div key={index}>
                  <h3>{section.heading}</h3>
                  <ul>
                    {section.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>
      );
  };

export default Educational_Content;