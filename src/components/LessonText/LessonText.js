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
        userInput={this.props.userInput}
      />
    );
  }
}

export default LessonText;
