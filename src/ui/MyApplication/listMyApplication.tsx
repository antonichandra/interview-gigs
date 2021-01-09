import { useContext, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PassingContext from "../passingContext";

import './listMyApplication.css';

const ListMyApplication = (props: any) => {
    const { isOpen, toogleOpen } = props;
    const { gigs } = useContext(PassingContext);
    const [isViewFavourite, setIsViewFavourite] = useState(true)

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
            <ModalBody className="modalBody">
                <div className="largeTitle">
                    My Applications
                    </div>
                <div className="smallTitle">
                    We will show you relevant gigs associated with your skills set.
                </div>

                <div className="tab">
                    <button
                        className="buttonFavourite"
                        onClick={() => setIsViewFavourite(!isViewFavourite)}
                        style={
                            isViewFavourite ?
                                {
                                    borderColor: "crimson",
                                }
                                :
                                {
                                    // borderColor: "black",
                                    border: "none"
                                }
                        }
                    >
                        Favourite
                    </button>
                    <button
                        className="inProgressButton"
                        onClick={() => setIsViewFavourite(!isViewFavourite)}
                        style={
                            !isViewFavourite ?
                                {
                                    borderColor: "crimson",
                                }
                                :
                                {
                                    // borderColor: "black",
                                    border: "none"
                                }
                        }
                    >
                        In Progress
                    </button>
                </div>

                <div className="gigsBody">
                    {
                        gigs
                            .filter((item: any) =>
                                isViewFavourite ?
                                    item.favourite :
                                    item.apply
                            )
                            .map((item: any, idx: number) => {
                                return (
                                    <div
                                        className="gig"
                                        key={idx}
                                    // onClick={() => gigsClicked(item)}
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
                </div>
            </ModalBody>
        </Modal >
    )
}
export default ListMyApplication;