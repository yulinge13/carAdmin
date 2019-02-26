import React, { Component } from "react";
import './NavigationToggle.less'
export default class NavigationToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointLists: [
                {
                    left: 0,
                    top: 0
                },
                {
                    left: 10,
                    top: 0
                },
                {
                    left: 20,
                    top: 0
                },
                {
                    left: 0,
                    top: 10
                },
                {
                    left: 10,
                    top: 10
                },
                {
                    left: 20,
                    top: 10
                },
                {
                    left: 0,
                    top: 20
                },
                {
                    left: 10,
                    top: 20
                },
                {
                    left: 20,
                    top: 20
                }
            ]
        }
    }
    render() {
        const { pointLists } = this.state
        console.log(11);
        return (
            <div className="navigation">
                <div className="navigation_toggle">
                    {
                        pointLists.map((i, index) => (
                            <div className="item" style={{
                                left: i.left,
                                top: i.top
                            }} key={index}></div>
                        ))
                    }
                </div>
            </div>
        )
    }
} 