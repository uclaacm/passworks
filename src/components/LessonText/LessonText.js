import React from 'react';
import TextSlide from '../TextSlide/TextSlide.js';

class LessonText extends React.Component {

  render () {
    const lessonItems = this.props.lessonSlides.map(item => {
      return (item.slide);
    });
    
    return (
      <TextSlide 
        count={this.props.count}
        lessonItems={lessonItems}
        lessonSlides={this.props.lessonSlides}
        usesInput={this.props.lessonSlides[this.props.count].usesInput}
        userInput={this.props.userInput}
        inputLength={this.props.lessonSlides[this.props.count].inputLength}
        inputType={this.props.lessonSlides[this.props.count].inputType}
      />
    );
  }
}

export default LessonText;
