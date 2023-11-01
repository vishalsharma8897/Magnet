import React from "react";
import useFetch from "../../../../hooks/useFetch";
import Carousel from "../../../../components/carousel/Carousel";


const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (

        data?.results.length>0 && (
            <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
        )
        
    )
};

export default Recommendation;