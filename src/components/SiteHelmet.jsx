import React from 'react'
import { HelmetProvider, Helmet } from "react-helmet-async";

function SiteHelmet() {
  return (
   <>
      <HelmetProvider>
         <Helmet>
            <title>Time Trekker</title>
         </Helmet>
      </HelmetProvider>
   </>
  )
}

export default SiteHelmet