export default function SteamReview ({reviews}:{reviews:any}) {

    return (
        <>
            <span>Steam: </span>  
            {
                reviews.query_summary 
                ? reviews.query_summary.review_score_desc + " (" +  Math.round(reviews.query_summary.total_positive / reviews.query_summary.total_reviews * 100) + "%)" 
                : null
            }
        </>
    )
}