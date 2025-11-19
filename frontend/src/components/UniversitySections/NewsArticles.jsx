import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";   // 👈 get id from URL
import "./NewsArticles.css";

const NewsArticles = () => {
  const { id: universityId } = useParams();   // 👈 extract :id
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    if (!universityId) return;

    fetch(`https://acvora-07fo.onrender.com/api/universities/${universityId}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNewsItems(data.news);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, [universityId]);

  return (
    <div className="news-container">
      <div className="news-header">
        <div>
          <h1>Latest News</h1>
          <p>Stay updated with the latest stories</p>
        </div>
      </div>

      <div className="news-grid">
        {newsItems.length === 0 ? (
          <p>No news available for this university</p>
        ) : (
          newsItems.map((item) => (
            <div
              key={item._id}
              className="news-card"
              style={{ maxWidth: "320px", height: "280px" }}
            >
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <p className="news-date">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="news-description">
                  {item.description}
                  <a href="#"> Read more</a>
                </p>
                <div className="news-meta">
                  <div className="news-meta-actions">
                    <i className="fa fa-share" title="Share"></i>
                    <i className="fa fa-bookmark" title="Save"></i>
                    <span>2 min</span>
                  </div>
                  <span>{item.views || "0 views"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsArticles;
