import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet2, fetchTest, convertToDateString, convertToDate} from '../actions/time.actions';
import {parseJwt} from '../actions/auth.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

class NewTimesheet3 extends Component {
  componentWillMount() {
    this.props.fetchTest(this.props.params.id);
    setTimeout(console.log('test', this.props), 3000);
  }

  onSubmit(props) {
    console.log('onSubmit this.props.params.id', this.props.params.id);
    const dayOne = this.props.params.id;

    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);

    const monday = moment(this.props.params.id);
    console.log('on submit', props);
    if (!props.mon._id || !props.tue._id || !props.wed._id || !props.thur._id || !props.fri._id || !props.sat._id || !props.sun._id) {
      console.log('userInfo exits');
      props.mon.userInfo = userInfo;
      props.tue.userInfo = userInfo;
      props.wed.userInfo = userInfo;
      props.thur.userInfo = userInfo;
      props.fri.userInfo = userInfo;
      props.sat.userInfo = userInfo;
      props.sun.userInfo = userInfo;

      props.mon.dateWorked = convertToDate(dayOne, 0);
      props.tue.dateWorked = convertToDate(dayOne, 1);
      props.wed.dateWorked = convertToDate(dayOne, 2);
      props.thur.dateWorked = convertToDate(dayOne, 3);
      props.fri.dateWorked = convertToDate(dayOne, 4);
      props.sat.dateWorked = convertToDate(dayOne, 5);
      props.sun.dateWorked = convertToDate(dayOne, 6);
    }

    // console.log('dayOne', dayOne);
    // console.log('convertToDate(dayOne, 0)', convertToDate(dayOne, 0));
    // console.log('the real date', props.mon.dateWorked);

    // if(!props.mon.dateWorked) {
    //   props.mon.dateWorked = convertToDate(dayOne, 0);
    // } 
    // props.Tue.dateWorked = convertToDate(dayOne, 1);
    // props.Wed.dateWorked = convertToDate(dayOne, 2);
    // props.Thur.dateWorked = convertToDate(dayOne, 3);
    // props.Fri.dateWorked = convertToDate(dayOne, 4);
    // props.Sat.dateWorked = convertToDate(dayOne, 5);
    // props.Sun.dateWorked = convertToDate(dayOne, 6);
    console.log('on submit', props);
    // this.props.fetchTest();

    createTimesheet2(props);
  }

  render() {
    // console.log('this.props.', this.props);

    const pickedString = convertToDateString(this.props.params.id);
    const {handleSubmit} = this.props;

    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>

              <h4><b>Timesheet:</b> <i>for the week of {pickedString}</i></h4>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Table responsive bordered condensed hover className="input-width" type="number">
                  <thead>
                    <tr>
                      <th>Work Type</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thur</th>
                      <th>Fri</th>
                      <th>Sat</th>
                      <th>Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><div className="workType-width">Client App Dev.</div></td>
                      <td><Field name="mon.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="tue.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="wed.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="thur.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="fri.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sat.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sun.dev" type="number" component="input" className="input-width"/></td>
                    </tr>
                    <tr>
                      <td><div className="workType-width">QA</div></td>
                      <td><Field name="mon.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="tue.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="wed.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="thur.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="fri.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sat.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sun.qa" type="number" component="input" className="input-width"/></td>
                    </tr>
                  </tbody>
                </Table>
                <button type="submit">Submit</button>
              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

NewTimesheet3.contextTypes = {
  router: PropTypes.object
};

NewTimesheet3.propTypes = {
  handleSubmit: PropTypes.func,
  params: PropTypes.object,
  fetchTest: PropTypes.func,
  createTimesheet2: PropTypes.func
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  if ((state.sheets.test.length > 0)) { // wait until state.sheets.test has a value
    return {
      sheets: state.sheets.test,
      initialValues: {
        mon: state.sheets.test[0],
        tue: state.sheets.test[1],
        wed: state.sheets.test[2],
        thur: state.sheets.test[3],
        fri: state.sheets.test[4],
        sat: state.sheets.test[5],
        sun: state.sheets.test[6]
      }
    };
  } else {
    return {};
  }
}

const TimesheetForm = reduxForm({
  form: 'TimesheetNewForm'
}
, null, {createTimesheet2})(NewTimesheet3);

export default connect(mapStateToProps, {fetchTest})(TimesheetForm);
