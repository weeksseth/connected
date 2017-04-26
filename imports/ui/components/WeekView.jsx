import React from 'react';
// import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventDay from './EventDay.jsx';
import SmallGroups from './SmallGroups.jsx';
import Conference from './Conference.jsx';
import moment from "moment";


export default class WeekView extends TrackerReact(React.Component) {
  constructor() {
    super();

    var dayofweek = new moment(new Date().toISOString()).isoWeekday();

    this.state = {
      subscription: {
        Events: Meteor.subscribe("publishedEvents")  // for only grabbing published events
        //  on the public site.
      },
      start: new moment(new Date().toISOString()).subtract(dayofweek-1,"days")._d
    };


  }

  getDays(){
    var days = [];
    //days.push(this.state.start._d);
    for(i=0;i<7;i++){
      days.push(new moment(this.state.start).add(i,"days")._d);
    }
    return days;

  }

  next(){
    this.setState({start: new moment(this.state.start.toISOString()).add(1, "week")._d});
  }

  prev(){
    //this.state.start = new moment(this.state.start.toISOString()).subtract(1, "week");
    this.setState({start: new moment(this.state.start.toISOString()).subtract(1, "week")._d});
  }

  getConferences(){
    //return Events.find({$and:[{tags: "Conference"}, {start: {$gt: new moment(new Date().toISOString())._d}}]}).fetch();
    return Events.find({tags: "Conference", start: {$gt: new moment(new Date().toISOString())._d}}).fetch();
  }

  render() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var end = new moment(this.state.start.toISOString()).add(6,"days")._d;
    return (
      <section id="WeekView">
        <div className="wrow WeekHeader">
          <div className="wdate container s12">
            <a onClick={this.prev.bind(this)} className="btn-floating btn-small waves-effect waves-light gold left"><i className="material-icons">skip_previous</i></a>
            <h2>{monthNames[this.state.start.getMonth()]} {this.state.start.getDate()} -
              {end.getMonth()!=this.state.start.getMonth()?monthNames[end.getMonth()]+" ":""}{end.getDate()}</h2>
            <a onClick={this.next.bind(this)} className="btn-floating btn-small waves-effect waves-light gold right"><i className="material-icons">skip_next</i></a>
            <div className="clearfix"></div>
          </div>
          <div className="wcol">Monday</div>
          <div className="wcol">Tuesday</div>
          <div className="wcol">Wednesday</div>
          <div className="wcol">Thursday</div>
          <div className="wcol">Friday</div>
          <div className="wcol">Saturday</div>
          <div className="wcol">Sunday</div>
        </div>
        <div className="wrow WeekContent">
          {this.state.subscription.Events.ready()?this.getDays().map( (day)=>{
            return <EventDay key={day.getDate()} day={day} />
          }):""}
        </div>
        <div className="wrow WeekHeader">
          <h2>Small Groups</h2>
        </div>
        <SmallGroups />
        <div className="wrow WeekHeader">
          <h2>Conferences</h2>
        </div>
        <div className="wrow WeekContent">
          <div className="container">
            <div className="container">
              {this.state.subscription.Events.ready()?this.getConferences().length!=0?this.getConferences().map( (event)=>{
                return <Conference key={event._id} ev={event} />
              }):<p style={{textAlign: "center"}}>No Upcoming Conferences</p>:false}
            </div>
          </div>
        </div>

      </section>
    );
  }
}
