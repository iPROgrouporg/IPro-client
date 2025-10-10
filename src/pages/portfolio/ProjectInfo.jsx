import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {portfolioApi, portfolioOtzivApi, servicesApi} from "../../connection/BaseUrl.js";

const ProjectInfo = () => {
    const {id} = useParams();
    const [portfolioOtziv, setPortfolioOtziv] = useState(null)
    const [loading, setLoading] = useState(true)

    const getOneServices = async () => {
        try {
            const res = await portfolioOtzivApi.getOne(id)
            setPortfolioOtziv(res.data)
            console.log("sasasa" + res.data)
        } catch (err) {
            console.log("portfolio oztiv error" + err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getOneServices()
    }, []);

    if (loading) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-2xl">Loading...</h1>
            </div>
        );
    }

    if (!portfolioOtziv) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">Portfolio otziv Not Found</h1>
            </div>
        );
    }

    return (
        <div className="text-white text-center  mb-10 mt-20">
                <>
                    <h1 className="text-3xl">Project ID: {portfolioOtziv.id}</h1>
                    <p>Loihaga qarab qilinadi joylashuv va dizayn barchasi </p>
                </>

        </div>
    )
}

export default ProjectInfo