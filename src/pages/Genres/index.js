import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { URL_API } from '../../const';
import "./index.css";
import Card from '../../components/Card';
import { genres } from '../../components/Header';
import CardSke from '../../components/Skeleton/CardSke';
function Genres() {
    const params = useParams();
    const [listAnime, setListAnmie] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const title = genres.filter(gs => {
        return gs.slug === params.genres;
    })
    useEffect(() => {
        const fetchGenres = () => {
            const { genres } = params;
            setListAnmie([]);
            fetch(`${URL_API}/genres/${genres}?page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setTotalPage(data.pagination.totalPage);
                    setListAnmie(data.data);
                })
        }
        fetchGenres();
    }, [params, page])
    const onChangePage = (value) => {
        setPage(value.selected + 1)
        window.scrollTo(0, 0)
    }
    return (
        <div className="search-wrap">
            <h1 className="search-title">{title[0]?.name || "Thể Loại"}</h1>
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
                <ReactPaginate
                    containerClassName='container-pagination'
                    pageClassName='page-pagination'
                    activeClassName='active-pagination'
                    nextLabel={<AiFillRightCircle fontSize="24px" color="#132977" />}
                    previousLabel={< AiFillLeftCircle fontSize="24px" color="#132977" />}
                    pageCount={totalPage}
                    onPageChange={onChangePage}
                />
            </Container>
        </div>
    );
}

export default Genres;