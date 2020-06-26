import React from "react"
import PropTypes from "prop-types"
import Slide from "@material-ui/core/Slide"
import Grid from "@material-ui/core/Grid"

export default function TextSlide({ lessonItems, count }) {
  const slidingItems = lessonItems.map((item, i) => {
    const key = `message: ${i}`
    return (
      <Slide
        direction="left"
        in={count === i}
        mountOnEnter
        unmountOnExit
        key={key}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item sm={12}>
            {item}
          </Grid>
        </Grid>
      </Slide>
    )
  })

  return (
    <>
      {slidingItems.map((slide, i) => {
        return count === i ? slide : null
      })}
    </>
  )
}

TextSlide.propTypes = {
  lessonItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  count: PropTypes.number.isRequired,
}
