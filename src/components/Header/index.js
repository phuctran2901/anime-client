import React, { useCallback, useState } from 'react';
import { AiFillPlayCircle, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { Row, Col, Container } from 'react-bootstrap';
import './index.css';
import { Link } from 'react-router-dom';
import SearchSke from '../Skeleton/SearchSke';
import { URL_API } from '../../const';
import { debounce } from 'lodash';
import { formatNumber } from '../../untils/formatNumber';
import { useHistory } from 'react-router';
export const genres = [
    { slug: "hanh-dong", name: "Hành Động" },
    { slug: "vien-tuong", name: "Viễn Tưởng" },
    { slug: "lang-man", name: "Lãng Mạn" },
    { slug: "kinh-di", name: "Kinh Dị" },
    { slug: "vo-thuat", name: "Võ Thuật" },
    { slug: "hai-huoc", name: "Hài Hước" },
    { slug: "truong-hoc", name: "Trường Học" },
    { slug: "trinh-tham", name: "Trinh Thám" },
    { slug: "am-nhac", name: "Âm Nhạc" },
    { slug: "phieu-luu", name: "Phiêu Lưu" },
    { slug: "sieu-nhien", name: "Siêu Nhiên" },
    { slug: "doi-thuong", name: "Đời Thường" },
    { slug: "gia-tuong", name: "Giả Tưởng" },
    { slug: "robot", name: "Robot" },
    { slug: "game", name: "Game" },
    { slug: "the-thao", name: "Thể Thao" },
    { slug: "kich-tinh", name: "Kịch Tính" },
];
export const ranking = [
    {
        slug: "ngay",
        name: "BXH ngày",
    },
    {
        slug: "tuan",
        name: "BXH tuần",
    },
    {
        slug: "thang",
        name: "BXH tháng",
    },
    {
        slug: "nam",
        name: "BXH năm",
    },
];
function Header(props) {
    const [searchResult, setSearchResult] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const fetchDropDown = (key) => {
        setSearchResult([]);
        setIsSearch(true);
        fetch(`${URL_API}/search?q=${key}&limit=5`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data.data);
                setIsSearch(false);
            })
    }
    const debounceSearch = useCallback(debounce(value => fetchDropDown(value), 1000), []);
    const onChangeSearch = (e) => {
        const { value } = e.target;
        debounceSearch(value);
    }
    return (
        <header className="header">
            <Container>
                <div className="header-main">
                    <Link className="header-logo">
                        <AiFillPlayCircle
                            fontSize="42px"
                        />AnimeFree
                    </Link>
                    <div className="header-link">
                        <ul>
                            <li>
                                <Link to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <span>Thể loại</span>
                                <Row className="sub-menu">
                                    {genres.map(gs => {
                                        return (
                                            <Col lg={4} xs={6}>
                                                <Link to={`/anime/${gs.slug}`}>{gs.name}</Link>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </li>
                            <li>
                                <span>Bảng xếp hạng</span>
                                <Row className="sub-menu rank">
                                    {ranking.map(gs => {
                                        return (
                                            <Col lg={4} xs={6} sm={6}>
                                                <Link to={`/rank/${gs.slug}`}>{gs.name}</Link>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </li>
                        </ul>
                    </div>
                    <div className="header-search">
                        <form>
                            <input type="text" placeholder="Tìm kiếm tên phim..." onChange={onChangeSearch} />
                        </form>
                        <AiOutlineSearch
                            fontSize="20px"
                            color="#dddddd;"
                            cursor="pointer"
                            fontWeight="600"
                            className="search-icon"
                        />
                        <ul className="search-result">
                            {searchResult.length !== 0 && searchResult.map(s => {
                                return (
                                    <li key={s.id}>
                                        <Link to={`/xem-phim/${s.slug}`}>
                                            <div className="result-thumbnail">
                                                <p className="result-episode">{s.time}</p>
                                                <img src={s.thumbnail} alt={s.name} />
                                            </div>
                                            <div className="result-content">
                                                <p>{s.name}</p>
                                                <p>{formatNumber(s.views)} lượt xem</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                            {isSearch === true ?
                                searchResult.length === 0 && [...Array(5)].map((s, i) => {
                                    return <SearchSke key={i} />
                                })
                                : <h3 className="search-default">Tìm kiếm</h3>}
                        </ul>
                    </div>
                </div>
            </Container>
        </header >
    );
}

export default Header;