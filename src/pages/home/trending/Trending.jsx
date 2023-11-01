import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../../../components/switchTabs/switchTabs'
import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);
  const onTabChange = (tab) => {
     const period = tab[0].toLowerCase() + tab.substr(1);
     setEndPoint(period);
  }

  return (
    <div className='carouselSection' >
      <ContentWrapper>
        <span className="carouselTitle">
          Trending
        </span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
