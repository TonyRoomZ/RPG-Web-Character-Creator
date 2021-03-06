import React from 'react';
import {Row, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {Description} from "../index";
import {gearDice} from "../../reducers";

class EquippedWeapons extends React.Component {

    render() {
        const {equipmentWeapons, skills, qualities, gearDice, weapons} = this.props;
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>EQUIPPED WEAPONS</h5></Row>
                <hr/>
                {Object.keys(equipmentWeapons).length > 0 &&
                <Row>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DAM</th>
                            <th>CRIT</th>
                            <th>RANGE</th>
                            <th>SKILL</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                            <th>DICE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentWeapons).map(key =>
                            equipmentWeapons[key].carried &&
                            <tr key={key}>
                                <td>{weapons[equipmentWeapons[key].id].name}</td>
                                <td>{weapons[equipmentWeapons[key].id].damage}</td>
                                <td>{weapons[equipmentWeapons[key].id].critical}</td>
                                <td>{weapons[equipmentWeapons[key].id].range}</td>
                                <td>{weapons[equipmentWeapons[key].id].skill ? (skills[weapons[equipmentWeapons[key].id].skill] ? skills[weapons[equipmentWeapons[key].id].skill].name : '') : ''}</td>
                                <td>{weapons[equipmentWeapons[key].id].encumbrance}</td>
                                <td>{weapons[equipmentWeapons[key].id].qualitiesList && weapons[equipmentWeapons[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                <td><Description text={gearDice.weapons[key]}/></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gearDice: gearDice(state),
        qualities: state.qualities,
        skills: state.skills,
        equipmentWeapons: state.equipmentWeapons,
        weapons: state.weapons,
    };
}


export default connect(mapStateToProps)(EquippedWeapons);