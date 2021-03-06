import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {changeData} from '../actions';
import {characteristics} from '../reducers';
import {chars} from '../data/lists';

class Characteristics extends React.Component {

    countXP = () => {
        const {archetypes, archetype, creationCharacteristics} = this.props;
        let xp = 0;
        if (!archetype || !archetypes[archetype]) return 0;
        //starting characteristics
        let startingCharacteristics = archetypes[archetype].characteristics;

        Object.keys(creationCharacteristics).forEach((characteristic) => {
            let points = creationCharacteristics[characteristic];
            for (let i = 0; points > i; i++) {
                xp += (startingCharacteristics[characteristic] + i + 1) * 10;
            }
        });
        return xp;
    };

    handleClick = (event) => {
        const {creationCharacteristics, characteristics, changeData} = this.props;
        let newObj = {...creationCharacteristics};
        let characteristic = event.target.value;
        if (event.target.name === 'Up') {
            if (characteristics[characteristic] >= 5) {
                alert(`You have maxed out ${characteristic}`);
                return;
            }
            newObj[characteristic]++;
        }
        if (event.target.name === 'Down') {
            if (0 >= creationCharacteristics[characteristic]) {
                alert(`${characteristic} cannot be decreased further`);
                return;
            }
            newObj[characteristic]--;
        }
        changeData(newObj, 'creationCharacteristics');
    };

    render() {
        const {characteristics, modal, handleClose} = this.props;
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Modify Characteristics</ModalHeader>
                <ModalBody className='m-1 text-left'>
                    <Row>Total XP: {this.countXP()}</Row>
                    <Row className='justify-content-center'>
                        {chars.map((stat) =>
                            <div key={stat} className='m-2 text-center'>
                                <div className='imageBox m-auto'>
                                    <img src={'/images/png/Characteristic.png'} alt='' className='png'/>
                                    <Row className='characteristicValue'>{characteristics[stat]}</Row>
                                    <Row className='characteristicTitle'>{stat}</Row>
                                </div>
                                <ButtonGroup>
                                    <Button value={stat} name='Up' onClick={this.handleClick}>↑</Button>
                                    <Button value={stat} name='Down' onClick={this.handleClick}>↓</Button>
                                </ButtonGroup>
                            </div>
                        )}
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        creationCharacteristics: state.creationCharacteristics,
        characteristics: characteristics(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Characteristics);
