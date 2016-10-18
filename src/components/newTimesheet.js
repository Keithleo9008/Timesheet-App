import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createTimesheet} from '../actions/time.actions';
import {Link} from 'react-router';

class NewTimesheet extends Component {

  onSubmit(props) {
    console.log('onSubmit props', props);
    this.props.createTimesheet(props);
    console.log('after on submit', props);
    this.context.router.push('/');
  }

  render() {
    const {fields: {dateWorked, hoursWorked, workType}, handleSubmit} = this.props;
      // {fields: {dateWorked, hoursWorked, workType}, handleSubmit}
    console.log('render props', this.props);
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Submit Your Time</h3>

        <div className={`form-group ${dateWorked.touched && dateWorked.invalid ? 'has-danger' : ''}`}>
          <label>Date Worked</label>
          <input type="date" className="form-control" {...dateWorked}/>
          <div className="text-help">
            {dateWorked.touched ? dateWorked.error : ''}
          </div>
        </div>

        <div className={`form-group ${hoursWorked.touched && hoursWorked.invalid ? 'has-danger' : ''}`}>
          <label>Hours Worked</label>
          <input type="number" className="form-control" {...hoursWorked}/>
          <div className="text-help">
            {hoursWorked.touched ? hoursWorked.error : ''}
          </div>
        </div>

        <div className={`form-group ${workType.touched && workType.invalid ? 'has-danger' : ''}`}>
          <label>Work Type</label>
          <input type="text" className="form-control" {...workType}/>
          <div className="text-help">
            {workType.touched ? workType.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

NewTimesheet.contextTypes = {
  router: PropTypes.object
};

function validate(values) {
  const errors = {};

  if (!values.dateWorked) {
    errors.dateWorked = 'Enter proper Date';
  }
  if (!values.hoursWorked) {
    errors.hoursWorked = 'Enter a proper number';
  }
  if (!values.workType) {
    errors.workType = 'Enter proper work type';
  }

  return errors;
}

NewTimesheet.propTypes = {
  createTimesheet: PropTypes.func,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'TimesheetNewForm',
  fields: ['hoursWorked', 'dateWorked', 'workType'],
  validate
}, null, {createTimesheet})(NewTimesheet);
