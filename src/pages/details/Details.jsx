import React from 'react'
import { useParams } from 'react-router-dom'
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import Similar from './carousels/similar/Similar'
import Recommendation from './carousels/recommendation/Recommendation'
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
      `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data = {credits?.cast} loading={creditsLoading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
