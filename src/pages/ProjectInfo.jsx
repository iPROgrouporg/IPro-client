import React from 'react'
import { useParams } from "react-router-dom";

const ProjectInfo = () => {
      const { id } = useParams();

  return (
     <div className="text-white text-center  mb-10 mt-20">
      <h1 className="text-3xl">Project ID: {id}</h1>
      <p>Loihaga qarab qilinadi joylashuv va dizayn barchasi </p>
    </div>
  )
}

export default ProjectInfo