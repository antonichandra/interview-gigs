// import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useCallback, useState } from 'react';
import {
    faSearch,
    faIdCard,
    faAppleAlt,
    faAsterisk,
    faAnchor,
    faBug,
    faBarcode,
    faCrop,
    faDownload,
    faHeart,
    faHeartBroken
} from '@fortawesome/free-solid-svg-icons';

import ListFilterJob from "./../FilterJob/listFilterJob"
import DetailGigs from "./../DetailGigs/detailGigs"
import ListMyApplication from "./../MyApplication/listMyApplication"

import PassingContext from "../passingContext";

import './listGigs.css';

const ListGigs = (props: any) => {
    const [gigs, setGigs] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [clickedGigs, setClickedGigs] = useState({});
    const [filterJob, setFilterJob] = useState([
        {
            id: 1,
            label: "Mobile Developer",
            value: "mobiledeveloper",
            icon: faAppleAlt,
            checked: false,
        },
        {
            id: 2,
            label: "Product Designer",
            value: "productdesigner",
            icon: faAsterisk,
            checked: false,
        },
        {
            id: 3,
            label: "Software Engineer",
            value: "softwareengineer",
            icon: faAnchor,
            checked: false,
        },
        {
            id: 4,
            label: "Project Manager",
            value: "projectmanager",
            icon: faAnchor,
            checked: false,
        },
        {
            id: 5,
            label: "Back-End Developer",
            value: "backenddeveloper",
            icon: faBarcode,
            checked: false,
        },
        {
            id: 6,
            label: "Front-End Developer",
            value: "frontenddeveloper",
            icon: faBug,
            checked: false,
        },
        {
            id: 7,
            label: "Designer",
            value: "designer",
            icon: faCrop,
            checked: false,
        },
        {
            id: 8,
            label: "Fullstack Developer",
            value: "fullstackdeveloper",
            icon: faDownload,
            checked: false,
        },
    ]);
    const [isOpenModalListFilterJob, setOpenModalListFilterJob] = useState(false);
    const [isOpenModalDetail, setOpenModalDetail] = useState(false);
    const [isOpenModalListMyApplication, setOpenModalListMyApplication] = useState(false);

    const toogleModalListFilterJob = () => {
        setOpenModalListFilterJob(!isOpenModalListFilterJob);
    };
    const toogleModalDetail = () => {
        setOpenModalDetail(!isOpenModalDetail);
    };
    const toogleModalListMyApplication = () => {
        setOpenModalListMyApplication(!isOpenModalListMyApplication);
    };

    const fetchData = () => {
        const temp = filterJob
            .filter((item) => item.checked)
            .map((item) => {
                return item.value
            });
        return axios.get(`https://jobs.github.com/positions.json?title=${temp.join(",")}`)
            .then(({ data }) => {
                //handle success
                // data
                if (temp.length === 0) return []
                else return data;
            })
            .catch((err) => {
                //handle error
                console.error(err);
            })

    }

    const handleFetch = () => {
        fetchData().then((data: any) => {
            setGigs(
                data.map((item: any) => {
                    return {
                        id: item.id,
                        company: item.company,
                        location: item.location,
                        title: item.title,
                        description: item.description,
                        company_logo: item.company_logo,
                        favourite: false,
                        apply: false,
                    }
                })
            );
        })

    }

    const handleChangeSearch = useCallback(
        input => {
            input = input.currentTarget || input;
            setSearchValue(input.value)
        }, [])

    const fetchLocationIQ = (address: string) => {
        return axios
            .get(
                `https://us1.locationiq.com/v1/search.php?key=pk.4d3621b3fdfbc05d8a73a7e3e82bc592&q=${address.replace(" ", "%20")}&format=json`
            )
            .then(({ data }) => {
                //handle success
                // data
                return data;
            })
            .catch((err) => {
                //handle error
                console.error(err);
            })
    }

    const gigsClicked = (input: any) => {
        fetchLocationIQ(input.location).then((data) => {
            setClickedGigs({
                id: input.id,
                company: input.company,
                location: input.location,
                title: input.title,
                description: input.description,
                company_logo: input.company_logo,
                favourite: input.favourite,
                apply: input.apply,
                lat: data.length > 0 ? data[0].lat : "",
                lon: data.length > 0 ? data[0].lon : "",
            });
            toogleModalDetail();
        })
    }

    return (
        <>
            <div className="gigsView">
                <div className="gigsHeader">
                    <div className="gigsTitle">
                        Latest<strong>Gigs</strong>
                    </div>
                    <div className="gigsSearch">
                        <input
                            type="search"
                            className="searchField"
                            placeholder="Search for gigs"
                            onChange={handleChangeSearch}
                            value={searchValue || ""}
                            required
                        />
                        <FontAwesomeIcon
                            className="searchButton"
                            onClick={toogleModalListFilterJob}
                            icon={faSearch}
                        />
                    </div>
                </div>
                <div className="gigsBody">
                    {
                        gigs
                            .filter((item: any) =>
                                ((item.title + "").toLowerCase()).match((searchValue).toLocaleLowerCase()) ||
                                ((item.company + "").toLowerCase()).match((searchValue).toLocaleLowerCase())
                            )
                            .map((item: any, idx: number) => {
                                return (
                                    <div
                                        className="gig"
                                        key={idx}
                                        onClick={() => gigsClicked(item)}
                                    >
                                        <div className="gigImage">
                                            <img
                                                className="jobLogo"
                                                src={item.company_logo}
                                                alt={""}
                                            />
                                        </div>
                                        <div className="gigDescription">
                                            <div className="jobTitle">
                                                {item.title}
                                            </div>
                                            <small className="jobCompany">
                                                {item.company}
                                            </small>
                                        </div>
                                    </div>
                                )
                            })
                    }
                    {gigs.length === 0 && (
                        <div className="noResult">
                            <p>There are no results</p>
                            <p>
                                Please Click
                                <FontAwesomeIcon
                                    className="searchButton"
                                    icon={faSearch}
                                />
                                to find other results
                            </p>
                        </div>
                    )}
                </div>
                <div className="gigsFooter">
                    <FontAwesomeIcon
                        id="applicationhButton"
                        // className="searchButton"
                        onClick={toogleModalListMyApplication}
                        icon={faIdCard}
                    />
                </div>
            </div>
            <PassingContext.Provider
                value={{
                    gigs, setGigs,
                    clickedGigs, setClickedGigs,
                    filterJob, setFilterJob,
                    handleFetch,
                    faHeart, faHeartBroken
                }}
            >
                <ListFilterJob
                    isOpen={isOpenModalListFilterJob}
                    toogleOpen={toogleModalListFilterJob}
                />
                <DetailGigs
                    isOpen={isOpenModalDetail}
                    toogleOpen={toogleModalDetail}
                />
                <ListMyApplication
                    isOpen={isOpenModalListMyApplication}
                    toogleOpen={toogleModalListMyApplication}
                />


            </PassingContext.Provider>
        </>
    )
}
export default ListGigs;