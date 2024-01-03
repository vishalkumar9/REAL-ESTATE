import React from 'react';
import "./ReviewCard.css";
const ReviewCard = ({img,content}) => {
    return (
        <div className="review_card">
            <img src={img} alt=""/>
            <div className="content">
                {content}
            </div>
        </div>
    );
};

export default ReviewCard;