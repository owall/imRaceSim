#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
imRaceSim <- function(data, indivdual, width = NULL, height = NULL, elementId = NULL) {

  cat("size of data = ", nrow(data))
  cat("\n")

  cat("size of indivdual = ", nrow(indivdual))
  cat("\n")

  # forward options using x
  if (missing(data)) {data <- data.frame()}
  if (missing(indivdual)) {indivdual <- data.frame()}

  data <- jsonlite::toJSON(data)
  indivdual <- jsonlite::toJSON(indivdual)

  x <- list(data = data, indivdual=indivdual)

  # create widget
  htmlwidgets::createWidget(
    name = 'imRaceSim',
    x,
    width = width,
    height = height,
    sizingPolicy = htmlwidgets::sizingPolicy(browser.padding = 75, browser.fill = TRUE),
    package = 'imRaceSim',
    elementId = elementId
  )
}

#' Shiny bindings for imRaceSim
#'
#' Output and render functions for using imRaceSim within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a imRaceSim
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name imRaceSim-shiny
#'
#' @export
imRaceSimOutput <- function(outputId, width = 'auto', height = '500px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'imRaceSim', width, height, package = 'imRaceSim')
}

#' @rdname imRaceSim-shiny
#' @export
renderImRaceSim <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, imRaceSimOutput, env, quoted = TRUE)
}
