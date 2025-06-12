export default function SteamReview ({reviews}:{reviews:any}) {

    return (
        <>
            <span>Steam: </span>  
            {
                reviews.steam_reviews 
                ? reviews.steam_reviews.review_score_desc + " (" +  Math.round(reviews.steam_reviews.total_positive / reviews.steam_reviews.total_reviews * 100) + "%)" 
                : null
            }
        </>
    )
}