import React, {Component} from 'react';

class QuizOptions extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.callParentChackedOptions = this.callParentChackedOptions.bind(this);
  }
   callParentChackedOptions() {
     this.props.checkResults(this.props.option);
   }
  render() {
    return (
      <div className = "fields animated zoomIn" onClick = {this.callParentChackedOptions}>
        <div className = "field-block">
        {this.props.option}
      </div></div>
    );
  }

}
export default QuizOptions;
