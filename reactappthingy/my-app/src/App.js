import React, {Component} from 'react';
import './App.css';
import DailyGoals from './DailyGoals'

class App extends Component {
    state = {
        goals:{
            dailyGoals : [
                {
                    id: 1,
                    title: 'Programme',
                    snippit: 'Write Code',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, false, null, null]
                },
                {
                    id: 2,
                    title: 'Learn React',
                    snippit: 'Write Code',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, false, null, null]
                },
                {
                    id: 3,
                    title: 'Be Cool',
                    snippit: 'Yea',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, false, null, null]
                }
            ],
            otherGoalsCategories:[
                {
                    category: 'Programming',
                    otherGoals:[
                        {
                            id: 1,
                            title: 'Learn React',
                            snippit: 'Yea',
                            startDate: new Date(2019, 7, 1),
                            endDate: new Date(2019, 7, 15 ),
                            percentComplete: 20
                        },
                        {
                            id: 2,
                            title: 'Learn to Code',
                            snippit: 'Yea',
                            startDate: new Date(2019, 5, 1),
                            endDate: new Date(2019, 8, 16 ),
                            percentComplete: 40
                        }
                    ]
                },
                {
                    category: 'Reading',
                    otherGoals:[
                        {
                            id: 1,
                            title: 'Read a book',
                            snippit: 'Yea',
                            startDate: new Date(2019, 7, 8),
                            endDate: new Date(2019, 7, 30),
                            percentComplete: 0
                        },
                        {
                            id: 2,
                            title: 'Read 20 books',
                            snippit: 'Yea',
                            startDate: new Date(2019, 1, 1),
                            endDate: new Date(2020, 1, 1 ),
                            percentComplete: 50
                        }
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <React.Fragment>
                <DailyGoals dailyGoals={this.state.goals.dailyGoals} />
            </React.Fragment>
          );
    }
}
{/* {this.state.dailyGoals.map(props => {
                    return(
                        <div className="onedailygoal">
                            <div className="onedailygoalheading">
                                <h4>{props.title}</h4>Write Code
                            </div>
                        </div>
                    )
                })
                } */}

export default App;

const createGoalBtn = document.getElementById('button');
const goalCreatePopup = document.getElementById('creategoaloverlay');
const cancelBtn = document.getElementById('cancelbutton');

createGoalBtn.addEventListener('click', ()=>{
    goalCreatePopup.style.display = "block";
}, false)

cancelBtn.addEventListener('click', ()=>{
    goalCreatePopup.style.display = "none";
}, false)

const navSlide = () => {
    const navdropdown = document.querySelector('.navdropdown');
    const nav = document.querySelector('.sidenav');
    const navlinks = document.querySelectorAll('.navlinks a')

    navdropdown.addEventListener('click', ()=>{
        nav.classList.toggle('nav-active');
        navlinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 7) + .15}s`;
            }
        });

        navdropdown.classList.toggle('toggle');
    });
}
navSlide();