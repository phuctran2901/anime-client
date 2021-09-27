import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { URL_API } from '../../const';
import { useParams } from 'react-router';
import WatchMovie from '../WatchMovie';
import { formatNumber } from '../../untils/formatNumber';
import { createMarkup } from '../../untils/createMarkup';
import "./index.css";
import VideoSke from '../../components/Skeleton/VideoSke';
import InfoSke from '../../components/Skeleton/InfoSke';
function Info() {
    const params = useParams();
    const [animeInfo, setAnimeInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [episode, setEpisode] = useState(0);
    const [isLoadingE, setIsLoadingE] = useState(false);
    const [source, setSource] = useState("");
    const [currentEpisode, setCurrentEpisode] = useState(1);
    useEffect(() => {
        const fetchInfo = () => {
            setIsLoading(false);
            const { anime } = params;
            fetch(`${URL_API}/anime/${anime}`)
                .then(res => res.json())
                .then(data => {
                    setAnimeInfo(data.data);
                    setIsLoading(true);
                })
        }
        fetchInfo();
    }, [params])

    useEffect(() => {
        const fetchEpisode = async () => {
            setIsLoadingE(false);
            setSource("");
            const res = await (await fetch(`${URL_API}/anime/${animeInfo.id}/episodes/${episode}`)).json();
            if (res) {
                setSource(res.data?.videoSource);
                setIsLoadingE(true);
            }
        }
        fetchEpisode();
    }, [episode, animeInfo])
    return (
        <div className="info-wrap">
            <Container fluid>
                <Row>
                    <Col lg={9}>
                        {source ? <WatchMovie
                            source={source}
                        /> : <VideoSke />}
                        {isLoading ? <div>
                            <div className="info-main">
                                <h3 className="info-title">{animeInfo.name} Tập {episode + 1}</h3>
                                <p className="info-views">{formatNumber(animeInfo?.views || 0)} lượt xem</p>
                                <p className="info-genres">Thể loại : {animeInfo?.genres?.map(g => g.name + ", ")}</p>
                                <div dangerouslySetInnerHTML={createMarkup(animeInfo.description)}></div>
                            </div>
                        </div> : <InfoSke />}
                    </Col>
                    <Col lg={3}>
                        {isLoadingE === true ? <div>
                            <div className="info-episodes">
                                <div className="episodes-title">
                                    <span>Danh sách tập</span>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        setEpisode(currentEpisode - 1)
                                    }}>
                                        <label>Tập:  </label>
                                        <input type="number" value={currentEpisode} onChange={(e) => {
                                            setCurrentEpisode(e.target.value)
                                        }} />
                                    </form>
                                </div>
                                <ul>
                                    {animeInfo?.episodes?.map((es, index) => {
                                        return (
                                            <li key={es.id} onClick={() => {
                                                setEpisode(index);
                                                setCurrentEpisode(index + 1);
                                            }}>
                                                <div className="episode-thumbnail">
                                                    <img src={es.thumbnail_medium} alt={es.full_name} />
                                                    <span>
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <div className="episode-main">
                                                    <p className="episode-name">{es.full_name}</p>
                                                    <p>{es.views} lượt xem</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div> : <VideoSke />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Info;