import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PassingContext from "../passingContext";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import './detailGigs.css';

const DetailGigs = (props: any) => {
    const { isOpen, toogleOpen } = props;
    const { gigs, setGigs, clickedGigs, setClickedGigs, faHeart, faHeartBroken } = useContext(PassingContext);

    const heartClicked = useCallback(input => {
        const tempData = gigs.map((e: any) => {
            if (e.id === input) {
                e.favourite = !e.favourite;
                setClickedGigs({
                    ...clickedGigs,
                    favourite: e.favourite
                });
            }
            return e;
        })
        setGigs(tempData);
    }, [gigs, setGigs, clickedGigs, setClickedGigs])

    const applyClicked = useCallback(input => {
        const tempData = gigs.map((e: any) => {
            if (e.id === input) {
                e.apply = !e.apply;
                setClickedGigs({
                    ...clickedGigs,
                    apply: e.apply
                });
            }
            return e;
        })
        setGigs(tempData);

    }, [gigs, setGigs, clickedGigs, setClickedGigs])

    const labelingDescription = (description: string) => {
        return description
            .replaceAll("<p>", "").replaceAll("</p>", "")
            .replaceAll("<strong>", "").replaceAll("</strong>", "")
            .replaceAll("<ul>", "").replaceAll("</ul>", "")
            .replaceAll("<li>", "").replaceAll("</li>", "")
            .replaceAll("<em>", "").replaceAll("</em>", "")
            .replaceAll("<ol>", "").replaceAll("</ol>", "")
    }

    return (
        <Modal className="modal" isOpen={isOpen} toggle={toogleOpen} backdrop={true}>
            <ModalHeader className="modalHeader">
                <button
                    className="buttonClose"
                    onClick={toogleOpen}
                >
                    X
                </button>
            </ModalHeader>
            <ModalBody className="modalBodyGigs">
                {clickedGigs.lat !== "" && clickedGigs.lon !== "" && (
                    <div >
                        <MapContainer
                            id="mapid"
                            center={[clickedGigs.lat, clickedGigs.lon]}
                            zoom={12}
                        >
                            <TileLayer
                                tileSize={128}
                                zoomOffset={-1}
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker
                                key={clickedGigs.id}
                                position={[clickedGigs.lat, clickedGigs.lon]}
                            />
                        </MapContainer>
                    </div>
                )}
                <div className="largeTitle">
                    {clickedGigs.title}
                </div>
                <div className="smallTitle">
                    {clickedGigs.company}
                </div>
                <div className="gigsModalDescription">
                    {labelingDescription(clickedGigs.description + "")}
                </div>
                <div>

                </div>
            </ModalBody>
            <ModalFooter className="modalFooterGigs">
                <div>
                    <FontAwesomeIcon
                        className="loveButton"
                        onClick={() => heartClicked(clickedGigs.id)}
                        icon={clickedGigs.favourite ? faHeart : faHeartBroken}
                    />
                </div>
                <button
                    className="applyButton"
                    onClick={() => applyClicked(clickedGigs.id)}
                >
                    {clickedGigs.apply ? "Applied" : "Apply Now"}
                </button>

            </ModalFooter>
        </Modal >
    )
}
export default DetailGigs;