import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { URL_API } from '../../const';
import "./index.css";
import Card from '../../components/Card';
import { ranking } from '../../components/Header';
import CardSke from '../../components/Skeleton/CardSke';
function Rank() {
    const params = useParams();
    const [listAnime, setListAnmie] = useState([]);
    const title = ranking.filter(gs => {
        return gs.slug === params.slug;
    })
    useEffect(() => {
        const fetchRanking = () => {
            const { slug = "ngay" } = params;
            fetch(`${URL_API}/ranking/${slug}`)
                .then(res => res.json())
                .then(data => {
                    setListAnmie(data.data);
                })
        }
        fetchRanking();
    }, [params])
    return (
        <div className="search-wrap">
            <h1 className="search-title">{title[0]?.name || "Bảng xếp hạng"}</h1>
            <Container fluid>
                <Row>
                    {listAnime.length !== 0 && listAnime.map(anime => {
                        return (
                            <Col lg={3} md={6}
                                key={anime.slug}>
                                <Card
                                    card={anime}
                                />
                            </Col>
                        )
                    })}
                    {listAnime.length === 0 && [...Array(24)].map((a, i) => {
                        return (
                            <Col lg={3} key={i}>
                                <CardSke />
                            </Col>
                        )
                    })}
                </Row>

            </Container>
        </div>
    );
}

export default Rank;