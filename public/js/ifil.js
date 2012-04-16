

$(function () {

  if(!/Chrome|FireFox/.test(navigator.userAgent))
    return
  $('input, textarea, select').each(function () {this.required = true})

  var inputs = $('.field')
  var allowSubmit = false
  var next
  inputs.change(function (e) {
    //show the next item.
    if(this.nextElementSibling.type === 'submit')
      return allowSubmit = true
    if(next === this)
      next = this.nextElementSibling
    $(this.nextElementSibling)
      .show('slow').find('input, textarea, select').first().focus()
  })

  function pop () {
    return [].pop.call(inputs)
  }

  function shift () {
    return [].shift.call(inputs)
  }

  var submit = pop()

  shift()
  next = shift()
var filtered =
  inputs/*.filter(function() {
    var l = $(this)
      .find('input, textarea, select')
      .filter(function () {
        return !this.value
      })
    return l.length
  })*/.hide()

  console.log(filtered)

})

