import IntroductionSection from "../components/IntroductionSection";
import Improve from "../components/ImproveSection";
import ChefsSection from "../components/ChefsSection";
import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.setState({content: ""})
  }

  render() {
    return (
      <div>
          <IntroductionSection/>
          <Improve/>
          <ChefsSection/>
      </div>
    );
  }
}