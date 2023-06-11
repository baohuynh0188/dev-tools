import classNames from "classnames";
import React from "react";

interface ICard {
    title?: string;
    description?: string | null;
    createdDate?: string;
    footer?: string | React.ReactNode;
    imgSrc: string | null;
}

const Card = ({ title, description, createdDate, footer, imgSrc }: ICard) => {
    const renderImg = imgSrc && (
        <img src={imgSrc} className="img-fluid rounded-start" alt={title} />
    );

    const renderCreatedDate = createdDate ? (
        <small className="text-body-secondary">{createdDate}</small>
    ) : (
        <span className="placeholder col-5"></span>
    );
    const renderFooter = footer && (
        <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
        </div>
    );

    const renderBody = () => {
        const cardTitleClass = classNames("card-title", {
            "placeholder-glow": !title,
        });
        const cardTextClass = classNames("card-text", {
            "placeholder-glow": !description,
        });

        return (
            <>
                <h5 className={cardTitleClass}>
                    {title || <span className="placeholder col-6"></span>}
                </h5>
                <p className={cardTextClass}>
                    {description || (
                        <>
                            <span className="placeholder col-4 me-1"></span>
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-7 me-1"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-8"></span>
                        </>
                    )}
                </p>
                <p className={cardTextClass}>{renderCreatedDate}</p>
            </>
        );
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">{renderImg}</div>
                <div className="col-md-8">
                    <div className="card-body">{renderBody()}</div>
                </div>
                {renderFooter}
            </div>
        </div>
    );
};

export default Card;
