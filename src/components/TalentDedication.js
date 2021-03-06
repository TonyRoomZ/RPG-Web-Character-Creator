import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Input, Row} from 'reactstrap';
import {changeData} from '../actions';
import {characteristics} from '../reducers';

class TalentDedication extends React.Component {
    state = {options: []};

    componentWillMount() {
        const {characteristics, talentModifiers, row} = this.props;
        let options = [];
        Object.keys(characteristics).forEach((characteristic) => {
            if (5 > characteristics[characteristic] && !Object.values(talentModifiers.Dedication).includes(characteristic)) options.push(characteristic);
        });
        talentModifiers.Dedication[row] && options.push(talentModifiers.Dedication[row]);
        options.sort();
        this.setState({options: options});
    }

    componentWillUnmount() {
        this.props.handleDedicationChange('');
    }

    handleChange = (event) => {
        this.props.handleDedicationChange(event.target.value);
        event.preventDefault();
    };

    render() {
        const {options} = this.state;
        const {selection} = this.props;
        return (
            <Row>
                <b>Select a characteristic to increase:</b>
                <Input type='select' value={selection} onChange={this.handleChange}>
                    <option value=''/>
                    {options.map((key) =>
                        <option value={key} key={key}>{key}</option>
                    )}
                </Input>
            </Row>
        )
    }
}


function mapStateToProps(state) {
    return {
        characteristics: characteristics(state),
        talentModifiers: state.talentModifiers,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TalentDedication);
