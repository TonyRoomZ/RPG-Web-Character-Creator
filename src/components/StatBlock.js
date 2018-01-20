import React from 'react';
import DynamicFont from 'react-dynamic-font';


class StatBlock extends React.Component {

    handleTextChange = (event) => {
        const {handleChange} = this.props;
        handleChange(event.target.value, this.props.type);
        event.preventDefault();

    }

    render() {
        const {block, textTop, textBottom, topMod, textEdit, onClick} = this.props;
        const blockType = block ? `${block}-box` : '';
        const mod = topMod ? `-${topMod}` : '';
        return (
            <div className={`stats-box ${blockType}`} onClick={onClick} >
                <div className={`stats-box-top ${blockType}-top${mod}`}>
                    <DynamicFont content={textTop}></DynamicFont>
                </div>
                <div className={`stats-box-bottom ${blockType}-bottom`}>
                    {(textEdit || textEdit === 0) &&
                    <div className='inlineblock'><input type='text'
                           maxLength='2'
                           className='textEdit'
                           onChange={this.handleTextChange}
                           onBlur={this.handleTextChange}
                                defaultValue={textEdit}/>&nbsp;|&nbsp;</div>}
                    <div className='inlineblock'>{textBottom}</div>
                </div>
            </div>
        )
    }
}
export default StatBlock;