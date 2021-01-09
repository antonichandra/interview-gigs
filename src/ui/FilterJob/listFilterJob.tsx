import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PassingContext from "../passingContext";

import './listFilterJob.css';

const ListFilterJob = (props: any) => {
    const { isOpen, toogleOpen } = props;
    const { filterJob, setFilterJob, handleFetch } = useContext(PassingContext);

    const cardClicked = useCallback(input => {
        const tempData = filterJob.map((e: any) => {
            if (e.id === input) {
                e.checked = !e.checked;
            }
            return e;
        })
        setFilterJob(tempData);
        handleFetch();
    }, [filterJob, setFilterJob, handleFetch])

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
                    Choose Your Skills
                    </div>
                <div className="smallTitle">
                    We will show you relevant gigs associated with your skills set.
                </div>

                <div className="cards">
                    {
                        filterJob.map((item: any) => {
                            return (
                                <div
                                    key={item.label}
                                    className="card"
                                    onClick={() => cardClicked(item.id)}
                                    style={
                                        item.checked ?
                                            {
                                                borderColor: "green"
                                            }
                                            :
                                            {
                                                borderColor: "black"
                                            }
                                    }>
                                    <FontAwesomeIcon
                                        className="skillIcon"
                                        // id="applicationhButton"
                                        // className="searchButton"
                                        // onClick={toogleModalListFilterJob}
                                        icon={item.icon}
                                        size="2x"
                                    />
                                    <div className="skillLabel">{item.label}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </ModalBody>
        </Modal >
    )
}
export default ListFilterJob;