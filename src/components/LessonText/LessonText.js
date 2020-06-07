import React from 'react';
import TextSlide from '../TextSlide/TextSlide.js';
import Grid from '@material-ui/core/Grid';

class LessonText extends React.Component {
  render () {
    const lessonItems = this.props.lessonSlides.map(item => {
      return (item.slide);
    });
    
    return (
      <>
        <Grid 
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <TextSlide 
            count={this.props.count}
            lessonItems={lessonItems}
          />
        </Grid>
      </>
    );
  }
}

export default LessonText;
